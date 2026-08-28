import React from 'react';
import { HeroBannerSlider } from './HeroBannerSlider';
import { DealsSection } from './DealsSection';
import { useFlipkart } from '../../context/FlipkartContext';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Award, Flame } from 'lucide-react';

export const FlipkartHome: React.FC = () => {
  const { navigateCategory, setCurrentView } = useFlipkart();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 space-y-5">
      
      {/* Hero Banner Slider */}
      <HeroBannerSlider />

      {/* Deals of the Day (Live Timer) */}
      <DealsSection
        title="Deals of the Day"
        tag="24-Hour Flash Discounts on Top-Rated Gadgets"
        showTimer={true}
      />

      {/* Flipkart Plus / SuperCoins Promotional Banner */}
      <div 
        onClick={() => {
          setCurrentView('supercoins');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-4 sm:p-5 rounded-md shadow-md cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-lg transition transform hover:-translate-y-0.5"
      >
        <div className="flex items-center gap-3 text-slate-950">
          <div className="w-12 h-12 rounded-full bg-slate-950 text-yellow-300 font-black text-xl flex items-center justify-center shadow">
            🪙
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-base sm:text-lg">Flipkart Plus Rewards Zone</h3>
              <span className="bg-slate-950 text-yellow-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase">
                ★ 2X Coins
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-900 mt-0.5">
              Earn 4 SuperCoins on every ₹100 spent. Redeem for instant cart discounts, OTT passes &amp; free delivery!
            </p>
          </div>
        </div>

        <button className="px-5 py-2 bg-slate-950 hover:bg-slate-900 text-yellow-300 font-bold text-xs rounded-sm uppercase tracking-wider shadow flex items-center gap-1.5 whitespace-nowrap">
          <span>Explore Rewards</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Best of Mobiles & Smartphones */}
      <DealsSection
        title="Best Deals on Smartphones"
        tag="iPhone 16, Galaxy S25 &amp; 5G Flagships"
        categoryFilter="Mobiles"
        showTimer={false}
      />

      {/* Mid Banner: Electronics & Laptops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Banner 1 */}
        <div 
          onClick={() => navigateCategory('Electronics', 'Laptops')}
          className="relative rounded-md overflow-hidden bg-gradient-to-r from-indigo-900 to-slate-900 p-6 text-white cursor-pointer shadow hover:shadow-xl transition group"
        >
          <div className="relative z-10 space-y-2 max-w-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-yellow-400 bg-black/30 px-2 py-0.5 rounded">
              High Performance Computing
            </span>
            <h3 className="text-xl font-black">Apple M3 &amp; RTX 4070 Laptops</h3>
            <p className="text-xs text-gray-300">Up to ₹10,000 Bank Instant Discount + No Cost EMI</p>
            <button className="pt-2 text-xs font-bold text-yellow-300 group-hover:underline flex items-center gap-1">
              <span>Shop Laptops</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-80 group-hover:scale-105 transition duration-500 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80" 
              alt="Laptops"
              className="w-full h-full object-cover mix-blend-luminosity" 
            />
          </div>
        </div>

        {/* Banner 2 */}
        <div 
          onClick={() => navigateCategory('Fashion')}
          className="relative rounded-md overflow-hidden bg-gradient-to-r from-rose-950 to-slate-900 p-6 text-white cursor-pointer shadow hover:shadow-xl transition group"
        >
          <div className="relative z-10 space-y-2 max-w-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300 bg-black/30 px-2 py-0.5 rounded">
              Lifestyle &amp; Footwear
            </span>
            <h3 className="text-xl font-black">Nike Jordans &amp; Levi's Denims</h3>
            <p className="text-xs text-gray-300">Flat 40% - 70% Off on 5,000+ top fashion brands</p>
            <button className="pt-2 text-xs font-bold text-rose-300 group-hover:underline flex items-center gap-1">
              <span>Explore Wardrobe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-80 group-hover:scale-105 transition duration-500 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80" 
              alt="Fashion"
              className="w-full h-full object-cover mix-blend-luminosity" 
            />
          </div>
        </div>

      </div>

      {/* Top Appliances & Home */}
      <DealsSection
        title="Appliances for Your Home"
        tag="Smart 4K TVs, Front Load Washers &amp; Inverter ACs"
        categoryFilter="Appliances"
        showTimer={false}
      />

      {/* Featured Brand Logos */}
      <div className="bg-white p-4 rounded-md border border-gray-200 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Official Brand Stores on Flipkart
        </h4>
        <div className="flex items-center justify-between overflow-x-auto gap-6 py-2">
          {['Apple', 'Samsung', 'Sony', 'Nike', "Levi's", 'LG', 'Philips', 'Canon', 'Asus', 'Nothing'].map((brand, idx) => (
            <button
              key={idx}
              onClick={() => navigateCategory('All')}
              className="text-xs font-black text-gray-600 hover:text-blue-600 uppercase tracking-widest px-3 py-1.5 bg-gray-50 hover:bg-blue-50 rounded border border-gray-200 whitespace-nowrap transition"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
