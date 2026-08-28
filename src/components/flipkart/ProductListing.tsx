import React, { useState, useMemo } from 'react';
import { useFlipkart } from '../../context/FlipkartContext';
import { ProductCard } from './ProductCard';
import { flipkartCategories } from '../../data/flipkartCategories';
import { 
  Filter, 
  RotateCcw, 
  Star, 
  ShieldCheck, 
  Grid, 
  List, 
  ChevronRight,
  Search,
  Check
} from 'lucide-react';

export const ProductListing: React.FC = () => {
  const { products, filters, setFilters, resetFilters, setCurrentView } = useFlipkart();
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [brandSearch, setBrandSearch] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract all unique brands in current products
  const allBrands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach(p => brandSet.add(p.brand));
    return Array.from(brandSet).sort();
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      // Category filter
      if (filters.category && filters.category !== 'All' && filters.category !== 'Top Offers') {
        if (p.category !== filters.category) return false;
      }

      // Subcategory filter
      if (filters.subcategory && filters.subcategory !== 'All') {
        if (p.subcategory !== filters.subcategory) return false;
      }

      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        const matchSub = p.subcategory.toLowerCase().includes(query);
        if (!matchTitle && !matchBrand && !matchCategory && !matchSub) return false;
      }

      // Price range
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
        return false;
      }

      // Minimum rating
      if (filters.minRating > 0 && p.rating < filters.minRating) {
        return false;
      }

      // Selected brands
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(p.brand)) {
        return false;
      }

      // Flipkart Assured
      if (filters.isAssuredOnly && !p.isAssured) {
        return false;
      }

      // Minimum discount
      if (filters.minDiscount > 0 && p.discountPercent < filters.minDiscount) {
        return false;
      }

      // In stock
      if (filters.inStockOnly && !p.inStock) {
        return false;
      }

      return true;
    });

    // Sorting
    if (filters.sortBy === 'price_low_high') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_high_low') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating_high') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'popularity') {
      result.sort((a, b) => b.ratingCount - a.ratingCount);
    }

    return result;
  }, [products, filters]);

  const toggleBrand = (brand: string) => {
    setFilters(prev => {
      const exists = prev.selectedBrands.includes(brand);
      return {
        ...prev,
        selectedBrands: exists
          ? prev.selectedBrands.filter(b => b !== brand)
          : [...prev.selectedBrands, brand]
      };
    });
  };

  const handlePriceChange = (max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [prev.priceRange[0], max]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 space-y-4">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto whitespace-nowrap py-1">
        <button onClick={() => { resetFilters(); setCurrentView('home'); }} className="hover:text-blue-600 font-medium">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <button onClick={() => setFilters(prev => ({ ...prev, subcategory: 'All' }))} className="hover:text-blue-600 font-medium">
          {filters.category}
        </button>
        {filters.subcategory !== 'All' && (
          <>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-semibold">{filters.subcategory}</span>
          </>
        )}
        {filters.searchQuery && (
          <>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-gray-900 font-semibold">"{filters.searchQuery}"</span>
          </>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden w-full flex items-center justify-between bg-white p-3 rounded border border-gray-200 shadow-xs">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 text-sm font-bold text-[#2874f0]"
          >
            <Filter className="w-4 h-4" />
            <span>Filters ({filters.selectedBrands.length + (filters.minRating > 0 ? 1 : 0) + (filters.isAssuredOnly ? 1 : 0)})</span>
          </button>
          <span className="text-xs text-gray-500 font-medium">{filteredProducts.length} Products</span>
        </div>

        {/* LEFT SIDEBAR: Authentic Flipkart Filters */}
        <aside className={`w-full lg:w-72 bg-white rounded-md border border-gray-200 shadow-xs overflow-hidden ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
            </h2>
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>CLEAR ALL</span>
            </button>
          </div>

          <div className="p-4 space-y-6 divide-y divide-gray-100 text-xs">
            
            {/* Category Tree */}
            <div>
              <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-2">Categories</h3>
              <div className="space-y-1 pl-1">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, category: 'All', subcategory: 'All' }))}
                  className={`w-full text-left py-1 hover:text-blue-600 font-semibold ${filters.category === 'All' ? 'text-blue-600' : 'text-gray-600'}`}
                >
                  All Categories
                </button>
                {flipkartCategories.map(cat => (
                  <div key={cat.id}>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, category: cat.name, subcategory: 'All' }))}
                      className={`w-full text-left py-1 hover:text-blue-600 font-medium flex items-center justify-between ${filters.category === cat.name ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-gray-400">›</span>
                    </button>
                    {filters.category === cat.name && (
                      <div className="pl-3 py-1 space-y-1 border-l-2 border-blue-500 my-1">
                        {cat.subcategories.map((sub, i) => (
                          <button
                            key={i}
                            onClick={() => setFilters(prev => ({ ...prev, subcategory: sub }))}
                            className={`w-full text-left py-0.5 text-[11px] ${filters.subcategory === sub ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-800'}`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-4">
              <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-2">Price</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                  <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">₹0</span>
                  <span className="text-gray-400">to</span>
                  <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">
                    ₹{filters.priceRange[1].toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Flipkart Assured Checkbox */}
            <div className="pt-4">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.isAssuredOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, isAssuredOnly: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-extrabold text-blue-700 text-[11px]">f-Assured</span>
                </div>
              </label>
            </div>

            {/* Brand Filter */}
            <div className="pt-4">
              <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-2">Brand</h3>
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search Brand"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full text-xs py-1.5 pl-7 pr-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-2" />
              </div>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {allBrands
                  .filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()))
                  .map(brand => {
                    const isChecked = filters.selectedBrands.includes(brand);
                    return (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleBrand(brand)}
                          className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{brand}</span>
                      </label>
                    );
                  })}
              </div>
            </div>

            {/* Customer Ratings */}
            <div className="pt-4">
              <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-2">Customer Ratings</h3>
              <div className="space-y-1.5">
                {[4, 3, 2].map(rating => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600">
                    <input
                      type="radio"
                      name="minRating"
                      checked={filters.minRating === rating}
                      onChange={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                      className="w-3.5 h-3.5 text-blue-600"
                    />
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{rating}★ &amp; above</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount */}
            <div className="pt-4">
              <h3 className="font-bold text-gray-900 uppercase tracking-wider mb-2">Discount</h3>
              <div className="space-y-1.5">
                {[40, 30, 20, 10].map(disc => (
                  <label key={disc} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600">
                    <input
                      type="radio"
                      name="minDiscount"
                      checked={filters.minDiscount === disc}
                      onChange={() => setFilters(prev => ({ ...prev, minDiscount: disc }))}
                      className="w-3.5 h-3.5 text-blue-600"
                    />
                    <span>{disc}% or more</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* RIGHT MAIN: Product Listing & Sorting */}
        <main className="flex-1 w-full space-y-3">
          
          {/* Sort Tabs & View Mode Bar */}
          <div className="bg-white p-3 rounded-md border border-gray-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            
            {/* Sort Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-500 uppercase tracking-tight">Sort By:</span>
              
              <button
                onClick={() => setFilters(prev => ({ ...prev, sortBy: 'relevance' }))}
                className={`px-2.5 py-1 rounded font-semibold transition ${
                  filters.sortBy === 'relevance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Relevance
              </button>

              <button
                onClick={() => setFilters(prev => ({ ...prev, sortBy: 'popularity' }))}
                className={`px-2.5 py-1 rounded font-semibold transition ${
                  filters.sortBy === 'popularity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Popularity
              </button>

              <button
                onClick={() => setFilters(prev => ({ ...prev, sortBy: 'price_low_high' }))}
                className={`px-2.5 py-1 rounded font-semibold transition ${
                  filters.sortBy === 'price_low_high' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Price -- Low to High
              </button>

              <button
                onClick={() => setFilters(prev => ({ ...prev, sortBy: 'price_high_low' }))}
                className={`px-2.5 py-1 rounded font-semibold transition ${
                  filters.sortBy === 'price_high_low' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Price -- High to Low
              </button>

              <button
                onClick={() => setFilters(prev => ({ ...prev, sortBy: 'rating_high' }))}
                className={`px-2.5 py-1 rounded font-semibold transition ${
                  filters.sortBy === 'rating_high' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Customer Rating
              </button>
            </div>

            {/* Layout Toggle (Grid / List) */}
            <div className="flex items-center gap-2 self-end sm:self-center border-l pl-3 border-gray-200">
              <span className="text-gray-400">View:</span>
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded ${layoutMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-700'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded ${layoutMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-700'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Result Count Info */}
          <div className="px-1 text-xs text-gray-500">
            Showing <span className="font-bold text-gray-800">{filteredProducts.length}</span> products for "{filters.category !== 'All' ? filters.category : filters.searchQuery || 'All Items'}"
          </div>

          {/* Products Grid or List */}
          {filteredProducts.length > 0 ? (
            <div className={layoutMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3' : 'space-y-3'}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} layout={layoutMode} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-md border border-gray-200 shadow-xs space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-800">No matching products found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try adjusting your price slider, brand selections, or clear the search query to view more items.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-[#2874f0] text-white text-xs font-bold rounded-sm shadow hover:bg-blue-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
