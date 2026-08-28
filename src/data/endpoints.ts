import { ApiEndpoint } from '../types/ecommerce';

export const apiEndpoints: ApiEndpoint[] = [
  // Authentication
  {
    id: 'auth-register',
    method: 'POST',
    path: '/api/v1/auth/register',
    summary: 'Register New User',
    description: 'Creates a new customer account with BCrypt password hashing and returns JWT tokens.',
    category: 'Authentication',
    requiresAuth: false,
    defaultBody: {
      email: 'customer@example.com',
      password: 'SecurePassword123!',
      fullName: 'Alex Reynolds',
      role: 'ROLE_CUSTOMER'
    }
  },
  {
    id: 'auth-login',
    method: 'POST',
    path: '/api/v1/auth/login',
    summary: 'Login & Obtain JWT',
    description: 'Authenticates credentials and generates a signed HMAC-SHA256 JWT access token.',
    category: 'Authentication',
    requiresAuth: false,
    defaultBody: {
      email: 'customer@example.com',
      password: 'SecurePassword123!'
    }
  },
  // Products
  {
    id: 'products-list',
    method: 'GET',
    path: '/api/v1/products',
    summary: 'List Products (Paginated & Filtered)',
    description: 'Retrieves catalog items with optional category filtering, keyword search, price range, and sorting.',
    category: 'Products',
    requiresAuth: false,
    defaultQueryParams: {
      page: '0',
      size: '10',
      category: '',
      keyword: '',
      sort: 'rating,desc'
    }
  },
  {
    id: 'products-get-id',
    method: 'GET',
    path: '/api/v1/products/{id}',
    summary: 'Get Product by ID',
    description: 'Fetches cached product details with real-time stock levels.',
    category: 'Products',
    requiresAuth: false,
    defaultQueryParams: {
      id: 'prod_001'
    }
  },
  {
    id: 'products-create',
    method: 'POST',
    path: '/api/v1/products',
    summary: 'Create Product (Admin/Seller)',
    description: 'Creates a new product in the catalog. Requires ROLE_ADMIN or ROLE_SELLER authorization.',
    category: 'Products',
    requiresAuth: true,
    requiredRole: 'ROLE_ADMIN',
    defaultBody: {
      sku: 'AUD-STUDIO-X',
      name: 'StudioMaster Pro Reference Monitors',
      description: 'Active 2-way nearfield studio monitors with 8-inch kevlar woofer and class-D bi-amplification.',
      price: 499.00,
      originalPrice: 549.00,
      stockQuantity: 15,
      categoryId: 'cat_electronics',
      imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
      tags: ['studio', 'monitors', 'audio', 'reference']
    }
  },
  // Cart
  {
    id: 'cart-get',
    method: 'GET',
    path: '/api/v1/cart',
    summary: 'Get Current User Cart',
    description: 'Retrieves the authenticated user active shopping cart, calculated subtotal, discounts, and tax.',
    category: 'Cart',
    requiresAuth: true,
    requiredRole: 'ROLE_CUSTOMER'
  },
  {
    id: 'cart-add-item',
    method: 'POST',
    path: '/api/v1/cart/items',
    summary: 'Add Item to Cart',
    description: 'Adds an item with specified quantity to the user shopping cart.',
    category: 'Cart',
    requiresAuth: true,
    requiredRole: 'ROLE_CUSTOMER',
    defaultBody: {
      productId: 'prod_002',
      quantity: 1
    }
  },
  {
    id: 'cart-apply-coupon',
    method: 'POST',
    path: '/api/v1/cart/apply-coupon',
    summary: 'Apply Coupon Discount',
    description: 'Validates promotional voucher and applies calculated discount.',
    category: 'Cart',
    requiresAuth: true,
    requiredRole: 'ROLE_CUSTOMER',
    defaultBody: {
      couponCode: 'SPRING2026'
    }
  },
  // Orders
  {
    id: 'orders-checkout',
    method: 'POST',
    path: '/api/v1/orders/checkout',
    summary: 'Checkout & Place Order (@Transactional)',
    description: 'Atomically verifies pessimistic stock locks, deducts inventory, charges payment, and generates invoice order.',
    category: 'Orders',
    requiresAuth: true,
    requiredRole: 'ROLE_CUSTOMER',
    defaultBody: {
      items: [
        {
          productId: 'prod_001',
          quantity: 1
        },
        {
          productId: 'prod_004',
          quantity: 2
        }
      ],
      couponCode: 'SPRING2026',
      paymentMethod: 'STRIPE',
      shippingAddress: {
        fullName: 'Alex Reynolds',
        street: '742 Evergreen Terrace',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA'
      }
    }
  },
  {
    id: 'orders-list',
    method: 'GET',
    path: '/api/v1/orders',
    summary: 'List User Orders',
    description: 'Fetches order history for current authenticated user or all orders for admin.',
    category: 'Orders',
    requiresAuth: true,
    requiredRole: 'ROLE_CUSTOMER'
  },
  {
    id: 'orders-update-status',
    method: 'PUT',
    path: '/api/v1/orders/{id}/status',
    summary: 'Update Order Status (Admin)',
    description: 'Transitions order state (e.g. PAID -> PROCESSING -> SHIPPED -> DELIVERED). Requires ROLE_ADMIN.',
    category: 'Orders',
    requiresAuth: true,
    requiredRole: 'ROLE_ADMIN',
    defaultQueryParams: {
      id: 'ord_9801'
    },
    defaultBody: {
      status: 'PROCESSING'
    }
  },
  // Coupons
  {
    id: 'coupons-list',
    method: 'GET',
    path: '/api/v1/coupons',
    summary: 'List Active Coupons',
    description: 'Retrieves all currently active promotional codes and criteria.',
    category: 'Coupons',
    requiresAuth: false
  },
  // Actuator
  {
    id: 'actuator-health',
    method: 'GET',
    path: '/api/v1/actuator/health',
    summary: 'Spring Actuator Health Check',
    description: 'Probes overall application status, DB connection, Redis cache, and disk space.',
    category: 'Actuator',
    requiresAuth: false
  },
  {
    id: 'actuator-metrics',
    method: 'GET',
    path: '/api/v1/actuator/metrics',
    summary: 'Spring Actuator JVM Metrics',
    description: 'Returns real-time JVM memory stats, thread counts, Hikari connection pool, and HTTP request metrics.',
    category: 'Actuator',
    requiresAuth: false
  }
];
