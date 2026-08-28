import React, { useState, useEffect } from 'react';
import { heroBanners } from '../../data/flipkartCategories';
import { useFlipkart } from '../../context/FlipkartContext';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, CreditCard, RotateCcw } from 'lucide-react';

export const HeroBannerSlider: React.FC = () => {
  const { navigateCategory } = useFlipkart();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto scroll banners every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  return (
    <div className="space-y-3">
      {/* Main Carousel Banner */}
      <div className="relative overflow-hidden rounded-md shadow-md bg-slate-900 h-[220px] sm:h-[300px] md:h-[340px] group">
        {heroBanners.map((banner, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className={`w-full h-full bg-gradient-to-r ${banner.bgGradient} flex items-center justify-between px-6 sm:px-12 relative`}>
                
                {/* Banner Text Content */}
                <div className="max-w-md sm:max-w-xl text-white space-y-2.5 z-20">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-400 text-slate-950 font-black text-[11px] tracking-wide uppercase shadow">
                    <span>{banner.badge}</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                    {banner.title}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 drop-shadow">
                    {banner.subtitle}
                  </p>

                  <div className="text-xs sm:text-sm font-bold text-yellow-300">
                    {banner.highlightTag}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigateCategory(banner.targetCategory)}
                      className="px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs sm:text-sm font-bold rounded-sm shadow-lg transition transform active:scale-95 cursor-pointer"
                    >
                      {banner.ctaText} →
                    </button>
                  </div>
                </div>

                {/* Banner Right Image */}
                <div className="hidden sm:flex h-full w-1/2 items-center justify-end z-10">
                  <div className="relative h-[85%] w-[85%] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Subtle Background Glow */}
                <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-r-md bg-white/80 hover:bg-white text-slate-800 shadow-md transition opacity-0 group-hover:opacity-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-l-md bg-white/80 hover:bg-white text-slate-800 shadow-md transition opacity-0 group-hover:opacity-100"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {heroBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-6 bg-yellow-400' : 'w-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust & Bank Offer Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white p-3 rounded-md border border-gray-200 shadow-xs text-xs">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-gray-800">Superfast Delivery</p>
            <p className="text-[11px] text-gray-500">Same / Next Day Shipping</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1 border-l border-gray-100">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-full">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-gray-800">Bank Instant Off</p>
            <p className="text-[11px] text-gray-500">HDFC, Axis, ICICI &amp; SBI</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1 border-l border-gray-100">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-gray-800">Flipkart Assured</p>
            <p className="text-[11px] text-gray-500">6-Stage Quality Tested</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-2 py-1 border-l border-gray-100">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-full">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-gray-800">Easy 7-Day Returns</p>
            <p className="text-[11px] text-gray-500">Doorstep Pickup Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};
