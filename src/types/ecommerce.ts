export type Role = 'ROLE_CUSTOMER' | 'ROLE_ADMIN' | 'ROLE_SELLER';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  enabled: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  reservedStock: number;
  categoryId: string;
  categoryName: string;
  status: 'ACTIVE' | 'DRAFT' | 'OUT_OF_STOCK';
  imageUrl: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  couponCode?: string;
  discountPercentage: number;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
}

export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: 'CREDIT_CARD' | 'PAYPAL' | 'STRIPE' | 'APPLE_PAY';
  paymentId: string;
  transactionRef: string;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  minOrderAmount: number;
  validUntil: string;
  active: boolean;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | 'REFUNDED';
  provider: string;
  referenceId: string;
  createdAt: string;
}

export interface SpringLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR' | 'TRACE';
  thread: string;
  logger: string;
  message: string;
  details?: string;
  type?: 'HTTP' | 'SECURITY' | 'HIBERNATE' | 'TRANSACTION' | 'EVENT' | 'APP';
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  description: string;
  category: 'Authentication' | 'Products' | 'Cart' | 'Orders' | 'Coupons' | 'Actuator';
  requiresAuth: boolean;
  requiredRole?: Role;
  defaultHeaders?: Record<string, string>;
  defaultQueryParams?: Record<string, string>;
  defaultBody?: any;
}

export interface JvmMetrics {
  uptimeSeconds: number;
  heapUsedMb: number;
  heapMaxMb: number;
  nonHeapUsedMb: number;
  activeThreads: number;
  httpRequestsTotal: number;
  httpRequests2xx: number;
  httpRequests4xx: number;
  httpRequests5xx: number;
  avgResponseTimeMs: number;
  hikariActiveConnections: number;
  hikariIdleConnections: number;
  hikariMaxConnections: number;
  redisCacheHitRatio: number;
  cpuUsagePercent: number;
}
