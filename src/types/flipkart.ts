export interface Variant {
  type: 'color' | 'storage' | 'size';
  name: string;
  value: string;
  priceModifier?: number;
  inStock?: boolean;
}

export interface SpecificationGroup {
  groupName: string;
  specs: {
    name: string;
    value: string;
  }[];
}

export interface BankOffer {
  id: string;
  bankName: string;
  title: string;
  code?: string;
  termsUrl?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
  location?: string;
  images?: string[];
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number; // in INR ₹
  originalPrice: number; // M.R.P. in INR ₹
  discountPercent: number;
  rating: number; // e.g. 4.6
  ratingCount: number; // e.g. 148290
  reviewCount: number; // e.g. 8420
  images: string[];
  thumbnail: string;
  inStock: boolean;
  stockCount: number;
  isAssured: boolean; // Flipkart Assured (F-Assured)
  highlights: string[];
  specifications: SpecificationGroup[];
  bankOffers: BankOffer[];
  seller: {
    name: string;
    rating: number;
    isFlipkartAssured: boolean;
    returnPolicyDays: number;
  };
  variants?: {
    colors?: { name: string; colorCode: string; image: string }[];
    storage?: string[];
    sizes?: string[];
  };
  tags?: ('BESTSELLER' | 'DEAL_OF_DAY' | 'BIG_BILLION_SPECIAL' | 'TRENDING' | 'PLUS_EXCLUSIVE')[];
  deliveryDays: number; // e.g. 1 (Tomorrow), 2 (2 Days)
  warranty: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  selectedSize?: string;
  addedAt: string;
}

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  locality: string;
  addressLine: string;
  city: string;
  state: string;
  landmark?: string;
  type: 'HOME' | 'WORK';
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  price: number;
  originalPrice: number;
  quantity: number;
  selectedVariant?: string;
}

export type OrderStatus = 'ORDER_PLACED' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  originalTotalAmount: number;
  discountAmount: number;
  superCoinsUsed: number;
  superCoinsDiscount: number;
  couponCodeApplied?: string;
  couponDiscount: number;
  deliveryFee: number;
  packagingFee: number;
  finalPaidAmount: number;
  address: Address;
  paymentMethod: 'UPI' | 'CREDIT_DEBIT_CARD' | 'NET_BANKING' | 'WALLET' | 'EMI' | 'CASH_ON_DELIVERY';
  paymentStatus: 'PAID' | 'PENDING_COD';
  status: OrderStatus;
  orderedDate: string;
  expectedDeliveryDate: string;
  trackingSteps: TrackingStep[];
  invoiceNumber: string;
  superCoinsEarned: number;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  subcategory: string;
  priceRange: [number, number];
  minRating: number;
  selectedBrands: string[];
  isAssuredOnly: boolean;
  minDiscount: number;
  inStockOnly: boolean;
  sortBy: 'relevance' | 'popularity' | 'price_low_high' | 'price_high_low' | 'newest' | 'rating_high';
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  superCoins: number;
  isPlusMember: boolean;
  memberSince: string;
  avatarUrl?: string;
}
