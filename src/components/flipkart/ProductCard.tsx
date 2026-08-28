import React from 'react';
import { Product } from '../../types/flipkart';
import { useFlipkart } from '../../context/FlipkartContext';
import { Star, Heart, ShoppingCart, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { openProductDetail, addToCart, toggleWishlist, isInWishlist } = useFlipkart();
  const isWishlisted = isInWishlist(product.id);

  if (layout === 'list') {
    return (
      <div 
        onClick={() => openProductDetail(product)}
        className="bg-white p-4 rounded-md border border-gray-200 hover:shadow-lg transition duration-200 cursor-pointer flex flex-col sm:flex-row gap-4 relative group"
      >
        {/* Left: Image Container */}
        <div className="w-full sm:w-56 h-48 sm:h-52 flex-shrink-0 flex items-center justify-center p-2 bg-gray-50/50 rounded relative">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
            loading="lazy"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:scale-110 transition z-10"
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Center: Details & Highlights */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase">{product.brand}</span>
            {product.isAssured && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                <span>f-Assured</span>
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
            {product.title}
          </h3>

          {/* Rating Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-emerald-700 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-current" />
            </span>
            <span className="text-xs text-gray-500">
              ({product.ratingCount.toLocaleString('en-IN')} Ratings &amp; {product.reviewCount.toLocaleString('en-IN')} Reviews)
            </span>
          </div>

          {/* Highlights bullet list */}
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside pt-1 hidden sm:block">
            {product.highlights.slice(0, 4).map((h, i) => (
              <li key={i} className="truncate">{h}</li>
            ))}
          </ul>
        </div>

        {/* Right: Pricing & CTA */}
        <div className="sm:w-56 flex flex-col justify-between border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-4 pt-3 sm:pt-0">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {product.discountPercent}% off
              </span>
            </div>

            <p className="text-[11px] text-gray-500 mt-1">
              Free delivery by <span className="font-semibold text-gray-700">Tomorrow</span>
            </p>

            {product.bankOffers.length > 0 && (
              <p className="text-[11px] text-emerald-700 font-medium mt-1">
                Bank Offer available
              </p>
            )}
          </div>

          <div className="pt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-sm shadow-sm transition"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout Default
  return (
    <div
      onClick={() => openProductDetail(product)}
      className="bg-white p-3 rounded-md border border-gray-200 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between relative group"
    >
      {/* Top Wishlist Heart */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-xs hover:scale-110 transition z-10"
        aria-label="Save to Wishlist"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
      </button>

      {/* Image */}
      <div className="w-full h-44 flex items-center justify-center p-2 mb-2 bg-gray-50/40 rounded">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">{product.brand}</span>
            {product.isAssured && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-100">
                <span>f-Assured</span>
              </span>
            )}
          </div>

          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </div>

        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 my-1">
            <span className="inline-flex items-center gap-0.5 bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-current" />
            </span>
            <span className="text-[10px] text-gray-400">
              ({product.ratingCount > 1000 ? `${(product.ratingCount / 1000).toFixed(1)}k` : product.ratingCount})
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-gray-950">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] font-bold text-emerald-600">
              {product.discountPercent}% off
            </span>
          </div>

          <div className="pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full py-1.5 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold text-xs rounded-sm shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
