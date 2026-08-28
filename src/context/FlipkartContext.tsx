import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, WishlistItem, Address, Order, FilterState, UserProfile } from '../types/flipkart';
import { sampleProducts } from '../data/flipkartProducts';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface FlipkartContextType {
  products: Product[];
  currentView: 'home' | 'listing' | 'detail' | 'cart' | 'checkout' | 'orders' | 'wishlist' | 'supercoins' | 'seller';
  setCurrentView: (view: 'home' | 'listing' | 'detail' | 'cart' | 'checkout' | 'orders' | 'wishlist' | 'supercoins' | 'seller') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: { color?: string; storage?: string; size?: string }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addresses: Address[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  orders: Order[];
  createOrder: (orderData: {
    items: CartItem[];
    address: Address;
    paymentMethod: Order['paymentMethod'];
    superCoinsUsed: number;
    couponCode?: string;
    couponDiscount?: number;
  }) => Order;
  cancelOrder: (orderId: string) => void;
  user: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; discount: number; message: string };
  removeCoupon: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  addNewProduct: (product: Product) => void;
  navigateCategory: (categoryName: string, subcategoryName?: string) => void;
  openProductDetail: (product: Product) => void;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  category: 'All',
  subcategory: 'All',
  priceRange: [0, 200000],
  minRating: 0,
  selectedBrands: [],
  isAssuredOnly: false,
  minDiscount: 0,
  inStockOnly: false,
  sortBy: 'relevance'
};

const initialAddresses: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Rahul Sharma',
    phone: '9876543210',
    pincode: '560034',
    locality: 'Koramangala 4th Block',
    addressLine: '#402, Sunshine Residency, 100ft Inner Ring Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    landmark: 'Near Sony World Signal',
    type: 'HOME',
    isDefault: true
  },
  {
    id: 'addr-2',
    fullName: 'Rahul Sharma (Office)',
    phone: '9876543210',
    pincode: '560103',
    locality: 'Bellandur EcoSpace',
    addressLine: 'Building 2B, 5th Floor, Flipkart Campus',
    city: 'Bengaluru',
    state: 'Karnataka',
    landmark: 'Opposite Outer Ring Road',
    type: 'WORK',
    isDefault: false
  }
];

const initialUser: UserProfile = {
  id: 'usr-flipkart-1',
  fullName: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  superCoins: 240,
  isPlusMember: true,
  memberSince: 'Oct 2022',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
};

const FlipkartContext = createContext<FlipkartContextType | undefined>(undefined);

export const FlipkartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('fk_products');
    return saved ? JSON.parse(saved) : sampleProducts;
  });

  const [currentView, setCurrentView] = useState<'home' | 'listing' | 'detail' | 'cart' | 'checkout' | 'orders' | 'wishlist' | 'supercoins' | 'seller'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('fk_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'cart-init-1',
        product: sampleProducts[0], // iPhone 16 Pro Max
        quantity: 1,
        selectedColor: 'Desert Titanium',
        selectedStorage: '256 GB',
        addedAt: new Date().toISOString()
      },
      {
        id: 'cart-init-2',
        product: sampleProducts[5], // Sony XM5 Headset
        quantity: 1,
        selectedColor: 'Black',
        addedAt: new Date().toISOString()
      }
    ];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('fk_wishlist');
    return saved ? JSON.parse(saved) : [
      {
        id: 'wish-1',
        product: sampleProducts[4], // MacBook Air M3
        addedAt: new Date().toISOString()
      },
      {
        id: 'wish-2',
        product: sampleProducts[7], // Nike Air Jordan 1
        addedAt: new Date().toISOString()
      }
    ];
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('fk_addresses');
    return saved ? JSON.parse(saved) : initialAddresses;
  });

  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    return addresses[0]?.id || '';
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('fk_orders');
    if (saved) return JSON.parse(saved);

    // Initial realistic past order
    const pastOrder: Order = {
      id: 'ord-1001',
      orderNumber: 'OD3298109283019',
      items: [
        {
          productId: sampleProducts[1].id,
          productTitle: sampleProducts[1].title,
          productImage: sampleProducts[1].thumbnail,
          price: sampleProducts[1].price,
          originalPrice: sampleProducts[1].originalPrice,
          quantity: 1,
          selectedVariant: 'Titanium Gray | 512 GB'
        }
      ],
      totalAmount: 139999,
      originalTotalAmount: 154999,
      discountAmount: 15000,
      superCoinsUsed: 100,
      superCoinsDiscount: 100,
      couponDiscount: 0,
      deliveryFee: 0,
      packagingFee: 29,
      finalPaidAmount: 139928,
      address: initialAddresses[0],
      paymentMethod: 'UPI',
      paymentStatus: 'PAID',
      status: 'DELIVERED',
      orderedDate: '15 Aug 2026, 02:40 PM',
      expectedDeliveryDate: '17 Aug 2026',
      trackingSteps: [
        { status: 'ORDER_PLACED', label: 'Order Confirmed', description: 'Your order was verified by Flipkart Seller', date: '15 Aug 2026, 02:40 PM', completed: true, current: false },
        { status: 'PACKED', label: 'Item Packed', description: 'Seller has packed item with F-Assured seal', date: '15 Aug 2026, 06:10 PM', completed: true, current: false },
        { status: 'SHIPPED', label: 'Shipped from Hub', description: 'Received at Bengaluru Central Sorting Hub', date: '16 Aug 2026, 09:20 AM', completed: true, current: false },
        { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', description: 'Delivery agent Prakash is delivering to your address', date: '17 Aug 2026, 10:15 AM', completed: true, current: false },
        { status: 'DELIVERED', label: 'Delivered', description: 'Package handed over successfully', date: '17 Aug 2026, 01:45 PM', completed: true, current: true }
      ],
      invoiceNumber: 'FK-INV-2026-88910',
      superCoinsEarned: 100
    };
    return [pastOrder];
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fk_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('fk_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('fk_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fk_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fk_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('fk_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fk_user', JSON.stringify(user));
  }, [user]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, variant?: { color?: string; storage?: string; size?: string }) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item =>
        item.product.id === product.id &&
        item.selectedColor === variant?.color &&
        item.selectedStorage === variant?.storage &&
        item.selectedSize === variant?.size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      const newItem: CartItem = {
        id: 'cart-' + Date.now() + Math.random().toString(36).substring(2, 4),
        product,
        quantity,
        selectedColor: variant?.color || product.variants?.colors?.[0]?.name,
        selectedStorage: variant?.storage || product.variants?.storage?.[0],
        selectedSize: variant?.size || product.variants?.sizes?.[0],
        addedAt: new Date().toISOString()
      };
      return [newItem, ...prev];
    });

    showToast(`Added "${product.title.substring(0, 32)}..." to your Cart! 🛒`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity: Math.min(10, newQty) } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(item => item.product.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.product.id !== product.id));
      showToast(`Removed from your Wishlist`, 'info');
    } else {
      setWishlist(prev => [{ id: 'wish-' + Date.now(), product, addedAt: new Date().toISOString() }, ...prev]);
      showToast(`Saved to your Wishlist ❤️`);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.product.id === productId);
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addressData,
      id: 'addr-' + Date.now()
    };
    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses(prev => [...prev, newAddr]);
    }
    setSelectedAddressId(newAddr.id);
    showToast('New delivery address saved successfully!');
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showToast('Address deleted', 'info');
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BIGBILLION' || clean === 'FLIPKART10') {
      setAppliedCoupon(clean);
      showToast(`Coupon "${clean}" applied! 10% instant discount unlocked.`, 'success');
      return { success: true, discount: 0.1, message: '10% Discount Applied!' };
    }
    if (clean === 'WELCOME500') {
      setAppliedCoupon(clean);
      showToast(`Coupon "WELCOME500" applied! Flat ₹500 discount unlocked.`, 'success');
      return { success: true, discount: 500, message: '₹500 Flat Discount Applied!' };
    }
    showToast(`Invalid coupon code: "${code}". Try "BIGBILLION" or "WELCOME500"`, 'error');
    return { success: false, discount: 0, message: 'Invalid or expired coupon' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const createOrder = (orderData: {
    items: CartItem[];
    address: Address;
    paymentMethod: Order['paymentMethod'];
    superCoinsUsed: number;
    couponCode?: string;
    couponDiscount?: number;
  }) => {
    const totalOriginal = orderData.items.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
    const totalPrice = orderData.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discountAmount = totalOriginal - totalPrice;
    const packagingFee = 29;
    const deliveryFee = totalPrice > 500 ? 0 : 40;
    const superCoinsDiscount = orderData.superCoinsUsed; // 1 Coin = ₹1
    const couponDiscount = orderData.couponDiscount || 0;

    const finalPaid = Math.max(0, totalPrice + packagingFee + deliveryFee - superCoinsDiscount - couponDiscount);
    const superCoinsEarned = Math.min(100, Math.floor(finalPaid / 100) * (user.isPlusMember ? 4 : 2));

    const orderNumber = 'OD' + Math.floor(1000000000000 + Math.random() * 9000000000000);
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + 2);
    const expectedFormatted = expectedDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      items: orderData.items.map(item => ({
        productId: item.product.id,
        productTitle: item.product.title,
        productImage: item.product.thumbnail,
        price: item.product.price,
        originalPrice: item.product.originalPrice,
        quantity: item.quantity,
        selectedVariant: [item.selectedColor, item.selectedStorage, item.selectedSize].filter(Boolean).join(' | ')
      })),
      totalAmount: totalPrice,
      originalTotalAmount: totalOriginal,
      discountAmount,
      superCoinsUsed: orderData.superCoinsUsed,
      superCoinsDiscount,
      couponCodeApplied: orderData.couponCode,
      couponDiscount,
      deliveryFee,
      packagingFee,
      finalPaidAmount: finalPaid,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'CASH_ON_DELIVERY' ? 'PENDING_COD' : 'PAID',
      status: 'ORDER_PLACED',
      orderedDate: dateFormatted,
      expectedDeliveryDate: expectedFormatted,
      trackingSteps: [
        { status: 'ORDER_PLACED', label: 'Order Confirmed', description: 'Your order was verified by Flipkart Seller', date: dateFormatted, completed: true, current: true },
        { status: 'PACKED', label: 'Item Packed', description: 'Seller will pack item with tamper-proof F-Assured seal', date: 'Expected Tomorrow', completed: false, current: false },
        { status: 'SHIPPED', label: 'Shipped', description: 'Item will be dispatched to nearest local logistics center', date: 'Expected in 2 days', completed: false, current: false },
        { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', description: 'Courier partner will contact you with secure delivery OTP', date: 'Expected by ' + expectedFormatted, completed: false, current: false },
        { status: 'DELIVERED', label: 'Delivered', description: 'Package handed over to ' + orderData.address.fullName, date: expectedFormatted, completed: false, current: false }
      ],
      invoiceNumber: 'FK-INV-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000),
      superCoinsEarned
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update User SuperCoins
    setUser(prev => ({
      ...prev,
      superCoins: prev.superCoins - orderData.superCoinsUsed + superCoinsEarned
    }));

    clearCart();
    setAppliedCoupon(null);
    showToast(`Order Placed Successfully! Order ID: ${orderNumber}`, 'success');

    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: 'CANCELLED' as const,
          trackingSteps: ord.trackingSteps.map(s => ({ ...s, completed: false, current: false }))
        };
      }
      return ord;
    }));
    showToast('Order cancelled. Refund initiated to your original payment method.', 'info');
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profile }));
    showToast('Profile details updated!');
  };

  const addNewProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    showToast(`Product "${product.title.substring(0, 24)}..." successfully listed on Flipkart!`, 'success');
  };

  const navigateCategory = (categoryName: string, subcategoryName?: string) => {
    setFilters(prev => ({
      ...prev,
      category: categoryName,
      subcategory: subcategoryName || 'All',
      searchQuery: ''
    }));
    setCurrentView('listing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FlipkartContext.Provider
      value={{
        products,
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        addAddress,
        deleteAddress,
        orders,
        createOrder,
        cancelOrder,
        user,
        updateUserProfile,
        filters,
        setFilters,
        resetFilters,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        toasts,
        showToast,
        removeToast,
        addNewProduct,
        navigateCategory,
        openProductDetail
      }}
    >
      {children}
    </FlipkartContext.Provider>
  );
};

export const useFlipkart = () => {
  const context = useContext(FlipkartContext);
  if (!context) {
    throw new Error('useFlipkart must be used within a FlipkartProvider');
  }
  return context;
};
