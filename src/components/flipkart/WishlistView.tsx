import React from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { Heart, ShoppingCart, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, setCurrentView, openProductDetail } = useFlipkart();

  const handleMoveToCart = (item: any) => {
    addToCart(item.product);
    toggleWishlist(item.product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-md border border-gray-200 shadow-xs p-8 text-center space-y-4">
          <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900">Empty Wishlist</h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You have no items in your wishlist. Start adding what you love to save for later!
            </p>
          </div>
          <button
            onClick={() => setCurrentView('home')}
            className="px-6 py-2.5 bg-[#2874f0] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-md transition"
          >
            Explore Today's Deals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-4">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>My Wishlist ({wishlist.length})</span>
          </h1>
          <p className="text-xs text-gray-500">Items saved for later purchase</p>
        </div>

        <button
          onClick={() => setCurrentView('listing')}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-md border border-gray-200 shadow-xs p-4 flex flex-col justify-between hover:shadow-md transition group text-xs"
          >
            <div>
              <div className="relative w-full h-44 flex items-center justify-center p-2 bg-gray-50/50 rounded mb-3">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition"
                />
                <button
                  onClick={() => toggleWishlist(item.product)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow text-gray-400 hover:text-rose-600 transition"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{item.product.brand}</span>
                <h3
                  onClick={() => openProductDetail(item.product)}
                  className="font-bold text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2"
                >
                  {item.product.title}
                </h3>

                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-base font-bold text-gray-900">
                    ₹{item.product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-400 line-through text-[11px]">
                    ₹{item.product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-emerald-600 font-bold text-[11px]">
                    {item.product.discountPercent}% Off
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mt-4 flex items-center gap-2">
              <button
                onClick={() => handleMoveToCart(item)}
                className="flex-1 py-2 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold rounded flex items-center justify-center gap-1.5 transition"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
