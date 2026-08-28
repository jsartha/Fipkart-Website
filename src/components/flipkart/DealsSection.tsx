import React, { useState, useEffect } from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { ProductCard } from './ProductCard';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';

interface DealsSectionProps {
  title: string;
  tag?: string;
  categoryFilter?: string;
  showTimer?: boolean;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  title,
  tag = 'Deals of the Day',
  categoryFilter,
  showTimer = true
}) => {
  const { products, navigateCategory } = useFlipkart();

  // 18 hours countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 42
  });

  useEffect(() => {
    if (!showTimer) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showTimer]);

  const filteredProducts = products.filter(p => {
    if (categoryFilter && categoryFilter !== 'All') {
      return p.category === categoryFilter;
    }
    return p.discountPercent >= 10;
  }).slice(0, 5);

  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="px-4 py-3 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-1.5">
              <span>{title}</span>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            </h3>
            <p className="text-xs text-gray-500 font-medium">{tag}</p>
          </div>

          {/* Live Timer */}
          {showTimer && (
            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded text-xs font-bold border border-blue-100">
              <Clock className="w-3.5 h-3.5 animate-spin-slow" />
              <span>
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s Left
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => navigateCategory(categoryFilter || 'All')}
          className="inline-flex items-center gap-1 bg-[#2874f0] hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-sm shadow-xs transition"
        >
          <span>VIEW ALL</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Products Row Grid */}
      <div className="p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} layout="grid" />
        ))}
      </div>
    </div>
  );
};
