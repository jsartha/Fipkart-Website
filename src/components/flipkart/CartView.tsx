import React, { useState } from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight, 
  Coins, 
  Tag, 
  Check, 
  X, 
  MapPin,
  Bookmark
} from 'lucide-react';

export const CartView: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    setCurrentView, 
    openProductDetail,
    user,
    addresses,
    selectedAddressId,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    showToast,
    toggleWishlist
  } = useFlipkart();

  const [useSuperCoins, setUseSuperCoins] = useState(false);
  const [couponInput, setCouponInput] = useState('');

  const currentAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];

  // Calculations
  const totalOriginalPrice = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalDiscount = totalOriginalPrice - totalPrice;
  const deliveryFee = totalPrice > 500 ? 0 : 40;
  const packagingFee = cart.length > 0 ? 29 : 0;

  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCoupon === 'BIGBILLION' || appliedCoupon === 'FLIPKART10') {
    couponDiscount = Math.round(totalPrice * 0.1);
  } else if (appliedCoupon === 'WELCOME500') {
    couponDiscount = Math.min(totalPrice, 500);
  }

  // Supercoins discount (1 coin = ₹1, up to available coins or 10% of total)
  const maxCoinsUsable = Math.min(user.superCoins, Math.round(totalPrice * 0.15));
  const superCoinsDiscount = useSuperCoins ? maxCoinsUsable : 0;

  const finalAmount = Math.max(0, totalPrice + deliveryFee + packagingFee - couponDiscount - superCoinsDiscount);
  const totalSavings = totalDiscount + couponDiscount + superCoinsDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput.trim());
    setCouponInput('');
  };

  const handleSaveForLater = (cartItem: any) => {
    toggleWishlist(cartItem.product);
    removeFromCart(cartItem.id);
    showToast(`Saved "${cartItem.product.title.substring(0, 20)}..." for later in Wishlist ❤️`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-md border border-gray-200 shadow-xs p-8 text-center space-y-4">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900">Your Flipkart Cart is empty!</h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Explore our Big Billion Deals, discover trending smartphones, laptops, and fashion essentials to add items to your cart.
            </p>
          </div>
          <div>
            <button
              onClick={() => setCurrentView('home')}
              className="px-6 py-2.5 bg-[#2874f0] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT 8 COLS: Cart Items & Address Bar */}
        <div className="lg:col-span-8 space-y-3">
          
          {/* Address Delivery Header */}
          {currentAddress && (
            <div className="bg-white p-4 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-xs">
                  <p className="text-gray-700">
                    Deliver to: <span className="font-bold text-gray-900">{currentAddress.fullName}, {currentAddress.pincode}</span>
                  </p>
                  <p className="text-gray-500 truncate max-w-md">
                    {currentAddress.locality}, {currentAddress.city}, {currentAddress.state}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('checkout')}
                className="px-3 py-1.5 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded text-xs font-bold transition uppercase"
              >
                Change
              </button>
            </div>
          )}

          {/* Cart Item Cards */}
          <div className="bg-white rounded-md border border-gray-200 shadow-xs divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="p-4 sm:p-5 space-y-3">
                <div className="flex flex-col sm:flex-row gap-4">
                  
                  {/* Thumbnail */}
                  <div 
                    onClick={() => openProductDetail(item.product)}
                    className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center p-1 bg-gray-50 rounded cursor-pointer"
                  >
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gray-500 uppercase">{item.product.brand}</span>
                      <span className="text-xs text-gray-500">Delivery by <span className="font-semibold text-gray-800">Tomorrow</span></span>
                    </div>

                    <h3 
                      onClick={() => openProductDetail(item.product)}
                      className="text-sm font-semibold text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2"
                    >
                      {item.product.title}
                    </h3>

                    {/* Variant tags */}
                    {(item.selectedColor || item.selectedStorage || item.selectedSize) && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {item.selectedColor && <span>Color: <strong className="text-gray-700">{item.selectedColor}</strong></span>}
                        {item.selectedStorage && <span>Storage: <strong className="text-gray-700">{item.selectedStorage}</strong></span>}
                        {item.selectedSize && <span>Size: <strong className="text-gray-700">{item.selectedSize}</strong></span>}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-0.5">
                      <span>Seller: {item.product.seller.name}</span>
                      {item.product.isAssured && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] font-extrabold text-blue-700 bg-blue-50 px-1 rounded border border-blue-200">
                          <ShieldCheck className="w-2.5 h-2.5 text-blue-600" />
                          <span>f-Assured</span>
                        </span>
                      )}
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-base font-bold text-gray-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">
                        {item.product.discountPercent}% Off
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions bar: Quantity Counter, Save for Later, Remove */}
                <div className="flex items-center gap-4 text-xs pt-1 border-t border-gray-100">
                  {/* Quantity Counter */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-900 text-xs py-1 border border-gray-200 rounded">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleSaveForLater(item)}
                    className="font-bold text-gray-700 hover:text-blue-600 uppercase tracking-tight flex items-center gap-1 transition"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>SAVE FOR LATER</span>
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="font-bold text-gray-700 hover:text-rose-600 uppercase tracking-tight flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>REMOVE</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Bottom Place Order CTA Strip */}
            <div className="p-4 bg-white flex items-center justify-between sticky bottom-0 z-10 shadow-lg border-t border-gray-200">
              <div className="text-xs text-gray-500">
                <span>Total Items: <strong>{cart.reduce((a, b) => a + b.quantity, 0)}</strong></span>
              </div>
              <button
                onClick={() => {
                  setCurrentView('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-[#fb641b] hover:bg-[#e85b16] text-white font-extrabold text-sm uppercase tracking-wide rounded-xs shadow-md transition flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>PLACE ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT 4 COLS: Price Details Breakdown & SuperCoins */}
        <div className="lg:col-span-4 space-y-3 sticky top-18">
          
          {/* SuperCoins Discount Option */}
          {user.superCoins > 0 && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-md p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-600 fill-yellow-500" />
                  <span className="font-bold text-gray-900">Use SuperCoins</span>
                </div>
                <span className="font-semibold text-amber-700">Balance: {user.superCoins} 🪙</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                <input
                  type="checkbox"
                  checked={useSuperCoins}
                  onChange={(e) => setUseSuperCoins(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <span>Redeem <strong>{maxCoinsUsable} SuperCoins</strong> to get ₹{maxCoinsUsable} instant discount</span>
              </label>
            </div>
          )}

          {/* Coupon Code Box */}
          <div className="bg-white p-4 rounded-md border border-gray-200 shadow-xs space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-gray-900">
              <Tag className="w-4 h-4 text-blue-600" />
              <span>Apply Promo Coupon</span>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Coupon "{appliedCoupon}" Applied! (Saved ₹{couponDiscount})</span>
                </div>
                <button onClick={removeCoupon} className="text-rose-600 hover:text-rose-800 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code: BIGBILLION, FLIPKART10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 uppercase font-semibold text-xs py-1.5 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#2874f0] hover:bg-blue-700 text-white font-bold rounded text-xs transition"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Price Details Card */}
          <div className="bg-white rounded-md border border-gray-200 shadow-xs p-4 space-y-4 text-xs">
            <h3 className="font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
              Price Details
            </h3>

            <div className="space-y-2.5 text-gray-700">
              <div className="flex items-center justify-between">
                <span>Price ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span>- ₹{totalDiscount.toLocaleString('en-IN')}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings</span>
                  <span>- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {superCoinsDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-semibold">
                  <span>SuperCoins Discount</span>
                  <span>- ₹{superCoinsDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Delivery Charges</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Secured Packaging Fee</span>
                <span>₹{packagingFee}</span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-3 flex items-center justify-between text-sm font-extrabold text-gray-900">
                <span>Total Amount</span>
                <span>₹{finalAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-2 text-emerald-700 font-bold text-xs">
                You will save ₹{totalSavings.toLocaleString('en-IN')} on this order
              </div>
            </div>

            {/* Safe & Secure Badge */}
            <div className="pt-2 flex items-center gap-2 text-gray-500 text-[11px] border-t border-gray-100">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              <span>Safe and Secure Payments. 100% Authentic products.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
