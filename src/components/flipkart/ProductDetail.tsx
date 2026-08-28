import React, { useState } from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { sampleReviews } from '../../data/flipkartProducts';
import { ProductCard } from './ProductCard';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  Share2, 
  Tag, 
  Info,
  ThumbsUp,
  MapPin
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { 
    selectedProduct, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setCurrentView, 
    showToast 
  } = useFlipkart();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">No product selected.</p>
        <button 
          onClick={() => setCurrentView('listing')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded"
        >
          Browse All Products
        </button>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.variants?.colors?.[0]?.name || '');
  const [selectedStorage, setSelectedStorage] = useState(selectedProduct.variants?.storage?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(selectedProduct.variants?.sizes?.[0] || '');
  const [pincode, setPincode] = useState('560034');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [userReviews, setUserReviews] = useState(sampleReviews);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isWishlisted = isInWishlist(selectedProduct.id);

  const handleBuyNow = () => {
    addToCart(selectedProduct, 1, {
      color: selectedColor,
      storage: selectedStorage,
      size: selectedSize
    });
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, 1, {
      color: selectedColor,
      storage: selectedStorage,
      size: selectedSize
    });
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeChecked(true);
      showToast(`Delivery available for ${pincode} by Tomorrow, 9 PM! 🚚`, 'success');
    } else {
      showToast('Please enter a valid 6-digit Indian PIN code', 'warning');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewText.trim()) {
      showToast('Please provide both review title and comment', 'warning');
      return;
    }
    const rev = {
      id: 'rev-' + Date.now(),
      author: 'You (Verified Buyer)',
      rating: newReviewRating,
      title: newReviewTitle,
      comment: newReviewText,
      date: 'Just now',
      verifiedBuyer: true,
      helpfulCount: 0,
      location: 'Bengaluru, Karnataka'
    };
    setUserReviews([rev, ...userReviews]);
    setNewReviewTitle('');
    setNewReviewText('');
    setShowReviewForm(false);
    showToast('Your review was posted successfully! ⭐', 'success');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!', 'info');
  };

  // Similar products in same category
  const similarProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 space-y-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-gray-500 overflow-x-auto whitespace-nowrap">
        <button onClick={() => setCurrentView('home')} className="hover:text-blue-600">Home</button>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <button onClick={() => setCurrentView('listing')} className="hover:text-blue-600">{selectedProduct.category}</button>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-800 font-semibold truncate max-w-xs">{selectedProduct.title}</span>
      </div>

      {/* Main Product Layout */}
      <div className="bg-white rounded-md border border-gray-200 shadow-xs p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 5 COLS: Sticky Image Gallery & Action Buttons */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              
              {/* Thumbnail strip */}
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-96 pb-2 sm:pb-0">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 p-1 rounded border-2 transition ${
                      activeImageIndex === idx ? 'border-blue-600 shadow-sm' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>

              {/* Big Main Image Container */}
              <div className="flex-1 h-72 sm:h-96 relative border border-gray-100 rounded-md p-4 bg-gray-50/50 flex items-center justify-center group overflow-hidden">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.thumbnail}
                  alt={selectedProduct.title}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-300"
                />

                {/* Wishlist & Share buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition text-gray-500"
                    title="Share product link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sticky Action CTA Buttons (Add to Cart & Buy Now) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="py-3 bg-[#ff9f00] hover:bg-[#f39700] text-white font-bold text-sm rounded-xs shadow-md transition flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer active:scale-98"
              >
                <ShoppingCart className="w-4 h-4 fill-white" />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3 bg-[#fb641b] hover:bg-[#e85b16] text-white font-bold text-sm rounded-xs shadow-md transition flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer active:scale-98"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>BUY NOW</span>
              </button>
            </div>
          </div>

          {/* RIGHT 7 COLS: Product Details, Specs, Offers */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Title & Brand */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{selectedProduct.brand}</span>
                {selectedProduct.isAssured && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    <span>f-Assured</span>
                  </span>
                )}
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                {selectedProduct.title}
              </h1>
            </div>

            {/* Ratings & Reviews Summary */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 bg-emerald-700 text-white font-bold px-2 py-0.5 rounded-sm">
                <span>{selectedProduct.rating}</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-gray-500 font-medium">
                {selectedProduct.ratingCount.toLocaleString('en-IN')} Ratings &amp; {selectedProduct.reviewCount.toLocaleString('en-IN')} Reviews
              </span>
            </div>

            {/* Special Price Block */}
            <div className="bg-emerald-50/50 p-3 rounded border border-emerald-100 space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-tight">Special Price</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-bold text-emerald-600">
                  {selectedProduct.discountPercent}% off
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                + ₹29 Secured Packaging Fee
              </p>
            </div>

            {/* Available Bank & Partner Offers */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                <span>Available Offers</span>
              </h3>
              <div className="space-y-1.5 text-xs text-gray-700">
                {selectedProduct.bankOffers.map(offer => (
                  <div key={offer.id} className="flex items-start gap-2">
                    <Tag className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">{offer.bankName}: </span>
                      <span>{offer.title}</span>
                      {offer.code && (
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(offer.code!);
                            showToast(`Coupon code ${offer.code} copied!`, 'success');
                          }}
                          className="ml-2 font-bold text-blue-600 underline text-[11px]"
                        >
                          Use Code: {offer.code}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="border-t border-b border-gray-100 py-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>Delivery Options</span>
              </div>
              <form onSubmit={handlePincodeCheck} className="flex items-center gap-2 max-w-xs">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Delivery Pincode"
                  className="w-full text-xs py-1.5 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-tight"
                >
                  Check
                </button>
              </form>
              {pincodeChecked && (
                <div className="text-xs text-gray-600 space-y-0.5">
                  <p className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Delivery by Tomorrow, 9 PM | Free ₹40</span>
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Cash on Delivery also available for {pincode}
                  </p>
                </div>
              )}
            </div>

            {/* Color Variants */}
            {selectedProduct.variants?.colors && selectedProduct.variants.colors.length > 0 && (
              <div className="space-y-2 text-xs">
                <span className="font-bold text-gray-800">Color: <span className="text-blue-600 font-semibold">{selectedColor}</span></span>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedProduct.variants.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-medium transition ${
                        selectedColor === c.name ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: c.colorCode }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage Variants */}
            {selectedProduct.variants?.storage && selectedProduct.variants.storage.length > 0 && (
              <div className="space-y-2 text-xs">
                <span className="font-bold text-gray-800">Storage: <span className="text-blue-600 font-semibold">{selectedStorage}</span></span>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedProduct.variants.storage.map((st, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedStorage(st)}
                      className={`px-3 py-1.5 rounded border text-xs font-semibold transition ${
                        selectedStorage === st ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Variants (for Fashion) */}
            {selectedProduct.variants?.sizes && selectedProduct.variants.sizes.length > 0 && (
              <div className="space-y-2 text-xs">
                <span className="font-bold text-gray-800">Size: <span className="text-blue-600 font-semibold">{selectedSize}</span></span>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedProduct.variants.sizes.map((sz, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded border text-xs font-semibold transition ${
                        selectedSize === sz ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Highlights</h3>
              <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                {selectedProduct.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Seller & Warranty Info */}
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-gray-800">Seller: <span className="text-blue-600 font-semibold">{selectedProduct.seller.name}</span></p>
                <p className="text-[11px] text-gray-500">
                  {selectedProduct.seller.rating}★ Rating | {selectedProduct.seller.returnPolicyDays} Days Replacement Guarantee
                </p>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Award className="w-4 h-4" />
                <span>{selectedProduct.warranty}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Specifications Accordion / Table */}
        <div className="mt-8 border-t border-gray-200 pt-6 space-y-4">
          <h2 className="text-base font-bold text-gray-900">Specifications</h2>
          
          <div className="border border-gray-200 rounded-md divide-y divide-gray-200 text-xs">
            {selectedProduct.specifications.map((group, gIdx) => (
              <div key={gIdx} className="p-4 space-y-2">
                <h4 className="font-bold text-gray-900 text-sm mb-2">{group.groupName}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                  {group.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex">
                      <span className="w-1/2 text-gray-500">{spec.name}</span>
                      <span className="w-1/2 font-medium text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Customer Reviews */}
        <div className="mt-8 border-t border-gray-200 pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Ratings &amp; Reviews</h2>
              <p className="text-xs text-gray-500">Verified buyer ratings from Flipkart customers</p>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-xs transition"
            >
              {showReviewForm ? 'Cancel' : 'Rate Product'}
            </button>
          </div>

          {/* Add Review Form */}
          {showReviewForm && (
            <form onSubmit={handleAddReview} className="bg-blue-50/60 p-4 rounded-md border border-blue-200 space-y-3 text-xs">
              <h4 className="font-bold text-gray-900">Write a Review</h4>
              
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Rating:</span>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewReviewRating(star)}
                    className="p-1"
                  >
                    <Star className={`w-5 h-5 ${star <= newReviewRating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Review Headline / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Best purchase, super fast delivery!"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Detailed Feedback</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the build quality, performance, and overall experience..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-600"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow-xs"
              >
                Submit Verified Review
              </button>
            </form>
          )}

          {/* Review List */}
          <div className="space-y-4">
            {userReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-0.5 bg-emerald-700 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">
                    <span>{review.rating}</span>
                    <Star className="w-2.5 h-2.5 fill-current" />
                  </span>
                  <span className="font-bold text-gray-900">{review.title}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                <div className="flex items-center gap-3 text-gray-400 text-[11px] pt-1">
                  <span className="font-semibold text-gray-600">{review.author}</span>
                  {review.verifiedBuyer && (
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Certified Buyer</span>
                    </span>
                  )}
                  <span>• {review.date}</span>
                  {review.location && <span>• {review.location}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Similar Products Recommendation */}
      {similarProducts.length > 0 && (
        <div className="bg-white rounded-md border border-gray-200 p-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Similar Products You Might Like
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} layout="grid" />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
