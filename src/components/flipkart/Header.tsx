import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronDown, 
  Store, 
  Heart, 
  Package, 
  Coins, 
  Sparkles, 
  LogOut, 
  X, 
  Mic, 
  Menu, 
  Tag, 
  CreditCard, 
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { useFlipkart } from '../../context/FlipkartContext';

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenSeller: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLogin, onOpenSeller }) => {
  const { 
    cart, 
    wishlist, 
    user, 
    currentView, 
    setCurrentView, 
    filters, 
    setFilters, 
    products, 
    openProductDetail,
    showToast 
  } = useFlipkart();

  const [searchTerm, setSearchTerm] = useState(filters.searchQuery || '');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Sync internal search input with filter state
  useEffect(() => {
    setSearchTerm(filters.searchQuery);
  }, [filters.searchQuery]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      searchQuery: searchTerm.trim(),
      category: 'All',
      subcategory: 'All'
    }));
    setShowSearchSuggestions(false);
    setCurrentView('listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuggestionClick = (query: string) => {
    setSearchTerm(query);
    setFilters(prev => ({
      ...prev,
      searchQuery: query,
      category: 'All',
      subcategory: 'All'
    }));
    setShowSearchSuggestions(false);
    setCurrentView('listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.start();
        setIsListening(true);
        showToast('Listening... Speak now 🎙️', 'info');

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchTerm(transcript);
          setIsListening(false);
          handleSuggestionClick(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
          showToast('Voice input stopped or microphone permission denied', 'info');
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } catch (err) {
        setIsListening(false);
        showToast('Simulating voice: searched for "iPhone 16 Pro"', 'info');
        handleSuggestionClick('iPhone 16 Pro');
      }
    } else {
      showToast('Voice Search: Searched for "MacBook M3"', 'info');
      handleSuggestionClick('MacBook');
    }
  };

  // Matched search suggestions
  const suggestions = products
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 6);

  const popularSearches = ['iPhone 16 Pro', 'MacBook Air M3', 'Sony WH-1000XM5', 'LG Washing Machine', 'Air Jordan 1', 'Samsung S25 Ultra'];

  return (
    <header className="sticky top-0 z-50 bg-[#2874f0] text-white shadow-md select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Left: Mobile Menu Trigger & Flipkart Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 hover:bg-blue-600 rounded-md transition"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            <div 
              onClick={() => {
                setFilters(prev => ({ ...prev, searchQuery: '', category: 'All', subcategory: 'All' }));
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer group flex flex-col items-start leading-none"
            >
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">Flipkart</span>
                <span className="text-xs ml-0.5 text-yellow-300 font-bold italic">plus</span>
              </div>
              <div className="flex items-center text-[10px] text-gray-200 font-medium italic mt-0.5 tracking-tight group-hover:underline">
                <span>Explore</span>
                <span className="text-yellow-300 font-bold ml-1">Plus</span>
                <Sparkles className="w-2.5 h-2.5 text-yellow-400 ml-0.5 fill-yellow-400" />
              </div>
            </div>
          </div>

          {/* Center: Search Bar with Suggestions & Voice Search */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-2xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                placeholder="Search for Products, Brands and More"
                className="w-full bg-white text-slate-900 placeholder:text-gray-400 text-sm font-normal py-2 pl-4 pr-16 rounded-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setFilters(prev => ({ ...prev, searchQuery: '' }));
                  }}
                  className="absolute right-9 text-gray-400 hover:text-gray-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={startVoiceSearch}
                title="Search with Voice"
                className={`absolute right-9 sm:right-10 text-gray-500 hover:text-blue-600 p-1 transition ${isListening ? 'animate-pulse text-red-500' : ''}`}
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-3 bg-white text-[#2874f0] hover:text-blue-700 rounded-r-sm transition flex items-center justify-center"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSearchSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white text-slate-800 rounded-b-md shadow-2xl border border-gray-200 overflow-hidden z-50">
                {searchTerm.trim().length > 0 ? (
                  <div>
                    <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-50 border-b border-gray-100">
                      Product Suggestions
                    </div>
                    {suggestions.length > 0 ? (
                      suggestions.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setShowSearchSuggestions(false);
                            openProductDetail(p);
                          }}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-50 transition"
                        >
                          <img src={p.thumbnail} alt={p.title} className="w-8 h-8 object-contain rounded bg-white p-0.5 border border-gray-100" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-800 truncate">{p.title}</p>
                            <p className="text-[11px] text-gray-500">in <span className="font-semibold text-blue-600">{p.category}</span></p>
                          </div>
                          <span className="text-xs font-bold text-gray-900">₹{p.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-500">
                        No exact match found for "{searchTerm}". Press Enter to search catalog.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                      <span>Trending &amp; Popular Searches</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {popularSearches.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSuggestionClick(item)}
                          className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded-full border border-gray-200 transition"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Actions (Login/Account, Become Seller, More, Cart) */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* User Account / Login Button */}
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 bg-white text-[#2874f0] hover:bg-gray-50 px-3.5 py-1.5 text-sm font-semibold rounded-sm shadow-sm transition"
              >
                <User className="w-4 h-4 text-[#2874f0]" />
                <span className="hidden sm:inline">{user.fullName.split(' ')[0]}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-md shadow-2xl border border-gray-200 py-1 z-50 divide-y divide-gray-100">
                  <div className="px-4 py-3 bg-blue-50/50 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow">
                      {user.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{user.fullName}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[11px] text-yellow-600 font-bold bg-yellow-100 px-1.5 py-0.5 rounded">
                          ★ Plus Member
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">({user.superCoins} 🪙)</span>
                      </div>
                    </div>
                  </div>

                  <div className="py-1 text-xs">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setCurrentView('supercoins');
                      }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 text-gray-700 transition"
                    >
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span>SuperCoins Zone ({user.superCoins} Coins)</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setCurrentView('orders');
                      }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 text-gray-700 transition"
                    >
                      <Package className="w-4 h-4 text-blue-600" />
                      <span>My Orders</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setCurrentView('wishlist');
                      }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 text-gray-700 transition"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Wishlist ({wishlist.length})</span>
                    </button>
                  </div>

                  <div className="py-1 text-xs">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenLogin();
                      }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-100 text-gray-600 transition"
                    >
                      <LogOut className="w-4 h-4 text-gray-400" />
                      <span>Switch / Re-login User</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Become a Seller */}
            <button
              onClick={onOpenSeller}
              className="hidden lg:flex items-center gap-1.5 text-sm font-semibold hover:text-yellow-300 transition"
              title="List your products on Flipkart marketplace"
            >
              <Store className="w-4 h-4" />
              <span>Become a Seller</span>
            </button>

            {/* More 3-Dots Menu */}
            <div ref={moreMenuRef} className="relative hidden md:block">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="flex items-center gap-1 text-sm font-semibold hover:text-yellow-300 transition"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
              </button>

              {showMoreMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-md shadow-2xl border border-gray-200 py-1.5 z-50 text-xs">
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      showToast('Notification preferences are up-to-date', 'info');
                    }}
                    className="w-full px-4 py-2 flex items-center gap-2.5 hover:bg-blue-50 text-gray-700"
                  >
                    <Tag className="w-4 h-4 text-blue-500" />
                    <span>Notification Preferences</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      showToast('24x7 Customer Helpline: 1800-202-9898 (Toll Free)', 'info');
                    }}
                    className="w-full px-4 py-2 flex items-center gap-2.5 hover:bg-blue-50 text-gray-700"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-500" />
                    <span>24x7 Customer Care</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMoreMenu(false);
                      onOpenSeller();
                    }}
                    className="w-full px-4 py-2 flex items-center gap-2.5 hover:bg-blue-50 text-gray-700"
                  >
                    <CreditCard className="w-4 h-4 text-purple-500" />
                    <span>Advertise on Flipkart</span>
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => {
                setCurrentView('cart');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 font-bold hover:text-yellow-300 transition relative py-1 px-2 rounded-sm"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-sm">Cart</span>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full text-slate-900 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="bg-[#2874f0] p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white text-[#2874f0] font-bold flex items-center justify-center text-base shadow">
                    {user.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight">{user.fullName}</h3>
                    <p className="text-xs text-yellow-300 font-semibold">★ Flipkart Plus Member</p>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-blue-600 rounded">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-3 divide-y divide-gray-100 text-sm">
                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCurrentView('supercoins');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 text-gray-700 rounded-md font-medium"
                  >
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span>SuperCoin Zone ({user.superCoins} Coins)</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCurrentView('orders');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 text-gray-700 rounded-md font-medium"
                  >
                    <Package className="w-4 h-4 text-blue-600" />
                    <span>My Orders</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCurrentView('wishlist');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 text-gray-700 rounded-md font-medium"
                  >
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>My Wishlist ({wishlist.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCurrentView('cart');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 text-gray-700 rounded-md font-medium"
                  >
                    <ShoppingCart className="w-4 h-4 text-emerald-600" />
                    <span>My Cart ({totalCartCount} items)</span>
                  </button>
                </div>

                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSeller();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-50 text-gray-700 rounded-md font-medium"
                  >
                    <Store className="w-4 h-4 text-indigo-600" />
                    <span>Become a Seller</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">Flipkart Online Shopping App v2026</p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
