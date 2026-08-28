import React, { useState } from 'react';
import { flipkartCategories, FlipkartCategory } from '../../data/flipkartCategories';
import { useFlipkart } from '../../context/FlipkartContext';
import { ChevronDown } from 'lucide-react';

export const CategoryBar: React.FC = () => {
  const { navigateCategory, filters } = useFlipkart();
  const [activeHoverCategory, setActiveHoverCategory] = useState<string | null>(null);

  return (
    <div className="bg-white border-b border-gray-200 shadow-xs relative z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between sm:justify-around overflow-x-auto no-scrollbar py-2.5 gap-3">
          {flipkartCategories.map((cat) => {
            const isSelected = filters.category === cat.name;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveHoverCategory(cat.id)}
                onMouseLeave={() => setActiveHoverCategory(null)}
                className="relative group flex-shrink-0"
              >
                <button
                  onClick={() => navigateCategory(cat.name)}
                  className={`flex flex-col items-center gap-1.5 p-1 rounded-md transition-transform duration-200 hover:-translate-y-0.5 ${
                    isSelected ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center p-1 shadow-xs group-hover:shadow-md transition">
                    <img
                      src={cat.iconImage}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-xs font-semibold whitespace-nowrap">{cat.name}</span>
                    {cat.subcategories.length > 0 && (
                      <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:rotate-180" />
                    )}
                  </div>
                </button>

                {/* Dropdown Menu on Hover */}
                {activeHoverCategory === cat.id && cat.subcategories.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-white rounded-md shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 border-b border-gray-100 mb-1">
                      {cat.name} Deals
                    </div>
                    {cat.subcategories.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHoverCategory(null);
                          navigateCategory(cat.name, sub);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-between"
                      >
                        <span>{sub}</span>
                        <span className="text-[10px] text-gray-400">›</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
