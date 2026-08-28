import {
  Product,
  Category,
  User,
  Order,
  Cart,
  Coupon,
  SpringLog,
  JvmMetrics,
  Role,
  OrderStatus,
  OrderItem,
} from '../types/ecommerce';
import {
  initialProducts,
  initialCategories,
  initialUsers,
  initialOrders,
  initialCart,
  initialCoupons,
} from '../data/initialData';

export interface ApiResponse<T = any> {
  status: number;
  statusText: string;
  durationMs: number;
  data: T;
  headers: Record<string, string>;
  sqlQueriesExecuted: string[];
}

class SpringEngine {
  private products: Product[] = JSON.parse(JSON.stringify(initialProducts));
  private categories: Category[] = JSON.parse(JSON.stringify(initialCategories));
  private users: User[] = JSON.parse(JSON.stringify(initialUsers));
  private orders: Order[] = JSON.parse(JSON.stringify(initialOrders));
  private cart: Cart = JSON.parse(JSON.stringify(initialCart));
  private coupons: Coupon[] = JSON.parse(JSON.stringify(initialCoupons));
  private logs: SpringLog[] = [];
  
  private currentUser: User | null = initialUsers[0]; // Alex Reynolds (Customer)
  private jwtToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjdXN0b21lckBleGFtcGxlLmNvbSIsInJvbGUiOiJST0xFX0NVU1RPTUVSIiwiaWF0IjoxNzA5MTIzNDAwLCJleHAiOjE3MDkyMDk4MDB9.s7e4cK9_xX891p2LmO4Q981';

  private metrics: JvmMetrics = {
    uptimeSeconds: 1420,
    heapUsedMb: 342,
    heapMaxMb: 1024,
    nonHeapUsedMb: 94,
    activeThreads: 24,
    httpRequestsTotal: 148,
    httpRequests2xx: 139,
    httpRequests4xx: 8,
    httpRequests5xx: 1,
    avgResponseTimeMs: 14.8,
    hikariActiveConnections: 2,
    hikariIdleConnections: 8,
    hikariMaxConnections: 20,
    redisCacheHitRatio: 84.5,
    cpuUsagePercent: 3.2,
  };

  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initInitialLogs();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  private initInitialLogs() {
    const banner = `
  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.3.2)
`;
    this.addLog('INFO', 'main', 'c.e.b.EcommerceApplication', 'Starting EcommerceApplication v1.0.0-SNAPSHOT using Java 21.0.2 with PID 94821');
    this.addLog('INFO', 'main', 'c.e.b.EcommerceApplication', 'The following 1 profile is active: "prod"');
    this.addLog('INFO', 'main', 'o.s.d.r.c.RepositoryConfigurationDelegate', 'Bootstrapping Spring Data JPA repositories in DEFAULT mode.');
    this.addLog('INFO', 'main', 'o.s.d.r.c.RepositoryConfigurationDelegate', 'Finished Spring Data repository scanning in 42 ms. Found 6 JPA repository interfaces.');
    this.addLog('INFO', 'main', 'com.zaxxer.hikari.HikariDataSource', 'HikariCP-EcomPool - Starting...');
    this.addLog('INFO', 'main', 'com.zaxxer.hikari.pool.PoolBase', 'HikariCP-EcomPool - Driver does not support PostgreSQL serverVersionQuery, assuming PostgreSQL 16');
    this.addLog('INFO', 'main', 'com.zaxxer.hikari.HikariDataSource', 'HikariCP-EcomPool - Start completed. (Pool size: 20)');
    this.addLog('INFO', 'main', 'o.f.c.i.database.base.DatabaseType', 'Flyway Community Edition 10.15.0 by Redgate');
    this.addLog('INFO', 'main', 'o.f.core.internal.command.DbMigrate', 'Current version of schema "public": << Empty Schema >>');
    this.addLog('INFO', 'main', 'o.f.core.internal.command.DbMigrate', 'Migrating schema "public" to version "1 - init schema"');
    this.addLog('INFO', 'main', 'o.f.core.internal.command.DbMigrate', 'Successfully applied 1 migration to schema "public" (execution time 00:00.084s)');
    this.addLog('INFO', 'main', 'org.hibernate.Version', 'HHH000412: Hibernate ORM core version 6.5.2.Final');
    this.addLog('INFO', 'main', 'o.h.e.t.j.p.i.JtaPlatformInitiator', 'HHH000490: Using JtaPlatform implementation: NoJtaPlatform');
    this.addLog('INFO', 'main', 'o.s.b.a.e.web.EndpointLinksResolver', 'Exposing 14 endpoint(s) beneath base path \'/api/v1/actuator\'');
    this.addLog('INFO', 'main', 'o.s.b.w.e.tomcat.TomcatWebServer', 'Tomcat started on port 8080 (http) with context path \'\'');
    this.addLog('INFO', 'main', 'c.e.b.EcommerceApplication', 'Started EcommerceApplication in 2.384 seconds (process running for 2.812)');
  }

  public addLog(
    level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR' | 'TRACE',
    thread: string,
    logger: string,
    message: string,
    details?: string,
    type: 'HTTP' | 'SECURITY' | 'HIBERNATE' | 'TRANSACTION' | 'EVENT' | 'APP' = 'APP'
  ) {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 23);
    const logItem: SpringLog = {
      id: 'log_' + Math.random().toString(36).substring(2, 9),
      timestamp,
      level,
      thread: thread.startsWith('[') ? thread : `[nio-8080-${thread}]`,
      logger,
      message,
      details,
      type,
    };
    this.logs.unshift(logItem);
    if (this.logs.length > 250) {
      this.logs.pop();
    }
  }

  public getLogs(): SpringLog[] {
    return this.logs;
  }

  public clearLogs() {
    this.logs = [];
    this.addLog('INFO', 'main', 'c.e.b.EcommerceApplication', 'Console logs cleared by operator.');
    this.notify();
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public getCategories(): Category[] {
    return this.categories;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getOrders(): Order[] {
    return this.orders;
  }

  public getCart(): Cart {
    return this.cart;
  }

  public getCoupons(): Coupon[] {
    return this.coupons;
  }

  public getMetrics(): JvmMetrics {
    return { ...this.metrics };
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public getJwtToken(): string {
    return this.jwtToken;
  }

  public switchUser(userId: string) {
    const found = this.users.find((u) => u.id === userId);
    if (found) {
      this.currentUser = found;
      this.jwtToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({
          sub: found.email,
          role: found.role,
          name: found.fullName,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 86400,
        })
      )}.secSig_${found.id}`;
      this.addLog('INFO', 'exec-1', 'c.e.s.JwtAuthenticationFilter', `Switched active SecurityContext principal to [${found.email}] with Authority [${found.role}]`, undefined, 'SECURITY');
      this.notify();
    }
  }

  public setAnonymous() {
    this.currentUser = null;
    this.jwtToken = '';
    this.addLog('INFO', 'exec-1', 'o.s.s.w.a.AnonymousAuthenticationFilter', 'Set SecurityContextHolder to anonymous user', undefined, 'SECURITY');
    this.notify();
  }

  // Recalculate cart totals
  private recalculateCart() {
    const subtotal = this.cart.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    let discountAmount = 0;
    if (this.cart.couponCode) {
      const coupon = this.coupons.find((c) => c.code === this.cart.couponCode && c.active);
      if (coupon && subtotal >= coupon.minOrderAmount) {
        discountAmount = Math.min((subtotal * coupon.discountPercent) / 100, coupon.maxDiscount);
      }
    }
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxAmount = Number((taxableAmount * 0.08).toFixed(2));
    const shippingAmount = subtotal >= 100 || subtotal === 0 ? 0 : 9.99;
    const totalAmount = Number((taxableAmount + taxAmount + shippingAmount).toFixed(2));

    this.cart.subtotal = Number(subtotal.toFixed(2));
    this.cart.discountAmount = Number(discountAmount.toFixed(2));
    this.cart.taxAmount = taxAmount;
    this.cart.shippingAmount = shippingAmount;
    this.cart.totalAmount = totalAmount;
  }

  // --- Live Execution Dispatcher ---
  public async executeRequest(
    method: string,
    path: string,
    body?: any,
    queryParams?: Record<string, string>,
    headers: Record<string, string> = {}
  ): Promise<ApiResponse> {
    const startTime = performance.now();
    const thread = 'exec-' + (Math.floor(Math.random() * 8) + 1);
    const sqlQueries: string[] = [];

    this.metrics.httpRequestsTotal++;

    // Security Check
    const authHeader = headers['Authorization'] || (this.jwtToken ? `Bearer ${this.jwtToken}` : '');
    let authenticatedUser: User | null = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      if (token === this.jwtToken && this.currentUser) {
        authenticatedUser = this.currentUser;
        this.addLog(
          'DEBUG',
          thread,
          'c.e.s.JwtAuthenticationFilter',
          `Successfully authenticated principal '${authenticatedUser.email}' with roles [${authenticatedUser.role}]`,
          undefined,
          'SECURITY'
        );
      } else {
        // Try decoding
        try {
          const parts = token.split('.');
          if (parts.length >= 2) {
            const payload = JSON.parse(atob(parts[1]));
            authenticatedUser = this.users.find((u) => u.email === payload.sub) || {
              id: 'usr_dyn',
              email: payload.sub,
              fullName: payload.name || 'API User',
              role: payload.role || 'ROLE_CUSTOMER',
              enabled: true,
              createdAt: new Date().toISOString(),
            };
          }
        } catch {
          // invalid token
        }
      }
    }

    this.addLog('INFO', thread, 'o.s.w.s.DispatcherServlet', `Dispatching ${method} "${path}"`);

    let response: ApiResponse = {
      status: 200,
      statusText: 'OK',
      durationMs: 0,
      data: null,
      headers: {
        'content-type': 'application/json',
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
        'x-xss-protection': '0',
      },
      sqlQueriesExecuted: sqlQueries,
    };

    // Routing Logic
    try {
      // 1. /api/v1/auth/login
      if (path === '/api/v1/auth/login' && method === 'POST') {
        const { email, password } = body || {};
        const user = this.users.find((u) => u.email === email);
        
        sqlQueries.push(`SELECT u.id, u.email, u.password_hash, u.role, u.enabled FROM users u WHERE u.email = '${email}'`);
        this.addLog('DEBUG', thread, 'org.hibernate.SQL', sqlQueries[0], undefined, 'HIBERNATE');

        if (!user || password !== 'SecurePassword123!') {
          this.metrics.httpRequests4xx++;
          this.addLog('WARN', thread, 'c.e.s.AuthService', `Failed authentication attempt for email: ${email}`, undefined, 'SECURITY');
          response.status = 401;
          response.statusText = 'Unauthorized';
          response.data = {
            type: 'https://api.ecommerce.io/errors/unauthorized',
            title: 'Authentication Failed',
            status: 401,
            detail: 'Invalid username or password supplied',
            timestamp: new Date().toISOString(),
          };
        } else {
          this.currentUser = user;
          const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
            JSON.stringify({
              sub: user.email,
              role: user.role,
              name: user.fullName,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 86400,
            })
          )}.secSig_${user.id}`;
          this.jwtToken = token;

          this.metrics.httpRequests2xx++;
          this.addLog('INFO', thread, 'c.e.s.AuthService', `User '${user.email}' successfully authenticated. Generated JWT token.`, undefined, 'SECURITY');
          response.status = 200;
          response.data = {
            token,
            tokenType: 'Bearer',
            expiresIn: 86400,
            user: {
              id: user.id,
              email: user.email,
              fullName: user.fullName,
              role: user.role,
            },
          };
        }
      }

      // 2. /api/v1/auth/register
      else if (path === '/api/v1/auth/register' && method === 'POST') {
        const { email, fullName, password, role } = body || {};
        if (!email || !fullName || !password) {
          response.status = 400;
          response.statusText = 'Bad Request';
          response.data = {
            type: 'https://api.ecommerce.io/errors/validation-error',
            title: 'Validation Error',
            status: 400,
            invalidFields: {
              email: !email ? 'Email cannot be blank' : undefined,
              fullName: !fullName ? 'Full name is required' : undefined,
            },
            timestamp: new Date().toISOString(),
          };
          this.metrics.httpRequests4xx++;
        } else {
          const newUser: User = {
            id: 'usr_' + Math.random().toString(36).substring(2, 7),
            email,
            fullName,
            role: (role as Role) || 'ROLE_CUSTOMER',
            enabled: true,
            avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            createdAt: new Date().toISOString(),
          };
          this.users.push(newUser);
          this.currentUser = newUser;

          const sql = `INSERT INTO users (email, password_hash, full_name, role, enabled, created_at) VALUES ('${email}', '\$2a\$12\$BCryptHashMock...', '${fullName}', '${newUser.role}', TRUE, NOW()) RETURNING id`;
          sqlQueries.push(sql);
          this.addLog('DEBUG', thread, 'org.hibernate.SQL', sql, undefined, 'HIBERNATE');
          this.addLog('INFO', thread, 'c.e.s.AuthService', `Registered new user '${email}' with ID: ${newUser.id}`);

          this.metrics.httpRequests2xx++;
          response.status = 201;
          response.statusText = 'Created';
          response.data = {
            message: 'User registered successfully',
            user: newUser,
            token: this.jwtToken,
          };
        }
      }

      // 3. /api/v1/products (GET)
      else if (path === '/api/v1/products' && method === 'GET') {
        const categorySlug = queryParams?.category || '';
        const keyword = (queryParams?.keyword || '').toLowerCase();
        const page = parseInt(queryParams?.page || '0', 10);
        const size = parseInt(queryParams?.size || '10', 10);

        let filtered = this.products;
        if (categorySlug) {
          filtered = filtered.filter((p) => {
            const cat = this.categories.find((c) => c.id === p.categoryId);
            return cat?.slug === categorySlug;
          });
        }
        if (keyword) {
          filtered = filtered.filter(
            (p) =>
              p.name.toLowerCase().includes(keyword) ||
              p.description.toLowerCase().includes(keyword) ||
              p.tags.some((t) => t.toLowerCase().includes(keyword))
          );
        }

        const sql = `SELECT p.id, p.sku, p.name, p.price, p.stock_quantity, c.name AS category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.status = 'ACTIVE' LIMIT ${size} OFFSET ${page * size}`;
        sqlQueries.push(sql);
        this.addLog('DEBUG', thread, 'org.hibernate.SQL', sql, undefined, 'HIBERNATE');
        this.addLog('INFO', thread, 'c.e.s.ProductService', `Query products (Returned ${filtered.length} items, page=${page})`);

        this.metrics.httpRequests2xx++;
        response.status = 200;
        response.data = {
          content: filtered,
          pageNumber: page,
          pageSize: size,
          totalElements: filtered.length,
          totalPages: Math.ceil(filtered.length / size) || 1,
          last: true,
        };
      }

      // 4. /api/v1/products/{id} (GET)
      else if (path.startsWith('/api/v1/products/') && method === 'GET') {
        const id = path.replace('/api/v1/products/', '').split('?')[0] || queryParams?.id;
        const product = this.products.find((p) => p.id === id || p.sku === id);

        if (!product) {
          this.metrics.httpRequests4xx++;
          this.addLog('WARN', thread, 'c.e.s.ProductService', `Product not found with identifier: ${id}`);
          response.status = 404;
          response.statusText = 'Not Found';
          response.data = {
            type: 'https://api.ecommerce.io/errors/not-found',
            title: 'Product Not Found',
            status: 404,
            detail: `Product with ID '${id}' does not exist in catalog.`,
            timestamp: new Date().toISOString(),
          };
        } else {
          sqlQueries.push(`SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = '${product.id}'`);
          this.addLog('DEBUG', thread, 'org.hibernate.SQL', sqlQueries[0], undefined, 'HIBERNATE');
          this.addLog('INFO', thread, 'c.e.s.ProductService', `Found product SKU: ${product.sku} (Cache hit: Redis key: products::${product.id})`);

          this.metrics.httpRequests2xx++;
          response.status = 200;
          response.data = product;
        }
      }

      // 5. /api/v1/products (POST - Create Product)
      else if (path === '/api/v1/products' && method === 'POST') {
        if (!authenticatedUser || (authenticatedUser.role !== 'ROLE_ADMIN' && authenticatedUser.role !== 'ROLE_SELLER')) {
          this.metrics.httpRequests4xx++;
          this.addLog('WARN', thread, 'o.s.s.a.i.FilterSecurityInterceptor', 'Access Denied: Required ROLE_ADMIN or ROLE_SELLER', undefined, 'SECURITY');
          response.status = 403;
          response.statusText = 'Forbidden';
          response.data = {
            type: 'https://api.ecommerce.io/errors/access-denied',
            title: 'Forbidden',
            status: 403,
            detail: 'You do not have administrative authorization to create products. Current role: ' + (authenticatedUser?.role || 'ANONYMOUS'),
            timestamp: new Date().toISOString(),
          };
        } else {
          const { sku, name, price, stockQuantity, categoryId, description, imageUrl, tags, originalPrice } = body || {};
          if (!sku || !name || price === undefined) {
            response.status = 400;
            response.statusText = 'Bad Request';
            response.data = {
              type: 'https://api.ecommerce.io/errors/validation-error',
              title: 'Validation Error',
              status: 400,
              detail: 'SKU, name, and price are required parameters.',
              timestamp: new Date().toISOString(),
            };
            this.metrics.httpRequests4xx++;
          } else {
            const cat = this.categories.find((c) => c.id === categoryId) || this.categories[0];
            const newProd: Product = {
              id: 'prod_' + Math.random().toString(36).substring(2, 7),
              sku,
              name,
              description: description || 'New e-commerce catalog item.',
              price: Number(price),
              originalPrice: originalPrice ? Number(originalPrice) : undefined,
              stockQuantity: Number(stockQuantity || 10),
              reservedStock: 0,
              categoryId: cat.id,
              categoryName: cat.name,
              status: 'ACTIVE',
              imageUrl: imageUrl || 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
              rating: 5.0,
              reviewCount: 0,
              tags: tags || ['new-arrival'],
              createdAt: new Date().toISOString(),
            };
            this.products.unshift(newProd);

            const sql = `INSERT INTO products (sku, name, price, stock_quantity, category_id, status, created_at) VALUES ('${sku}', '${name}', ${price}, ${newProd.stockQuantity}, '${cat.id}', 'ACTIVE', NOW()) RETURNING id`;
            sqlQueries.push(sql);
            this.addLog('DEBUG', thread, 'org.hibernate.SQL', sql, undefined, 'HIBERNATE');
            this.addLog('INFO', thread, 'c.e.s.ProductService', `Evicted Redis cache 'products' & saved new product '${sku}'`);

            this.metrics.httpRequests2xx++;
            response.status = 201;
            response.statusText = 'Created';
            response.data = newProd;
          }
        }
      }

      // 6. /api/v1/cart (GET)
      else if (path === '/api/v1/cart' && method === 'GET') {
        if (!authenticatedUser) {
          response.status = 401;
          response.statusText = 'Unauthorized';
          response.data = { status: 401, detail: 'Authentication token required to view cart.' };
        } else {
          this.recalculateCart();
          this.addLog('INFO', thread, 'c.e.s.CartService', `Loaded cart for user ${authenticatedUser.email} (Items: ${this.cart.items.length}, Total: $${this.cart.totalAmount})`);
          response.status = 200;
          response.data = this.cart;
        }
      }

      // 7. /api/v1/cart/items (POST)
      else if (path === '/api/v1/cart/items' && method === 'POST') {
        if (!authenticatedUser) {
          response.status = 401;
          response.statusText = 'Unauthorized';
          response.data = { status: 401, detail: 'Authentication token required' };
        } else {
          const { productId, quantity = 1 } = body || {};
          const product = this.products.find((p) => p.id === productId);
          if (!product) {
            response.status = 404;
            response.data = { status: 404, detail: 'Product not found' };
          } else {
            const existing = this.cart.items.find((i) => i.productId === productId);
            if (existing) {
              existing.quantity += quantity;
            } else {
              this.cart.items.push({
                productId: product.id,
                productName: product.name,
                unitPrice: product.price,
                quantity: quantity,
                imageUrl: product.imageUrl,
              });
            }
            this.recalculateCart();
            this.addLog('INFO', thread, 'c.e.s.CartService', `Added ${quantity}x '${product.name}' to cart`);
            response.status = 200;
            response.data = this.cart;
          }
        }
      }

      // 8. /api/v1/cart/apply-coupon (POST)
      else if (path === '/api/v1/cart/apply-coupon' && method === 'POST') {
        const { couponCode } = body || {};
        const coupon = this.coupons.find((c) => c.code.toUpperCase() === (couponCode || '').toUpperCase() && c.active);
        if (!coupon) {
          response.status = 400;
          response.data = {
            type: 'https://api.ecommerce.io/errors/invalid-coupon',
            title: 'Invalid Coupon',
            status: 400,
            detail: `Coupon code '${couponCode}' is invalid or has expired.`,
          };
        } else {
          this.cart.couponCode = coupon.code;
          this.cart.discountPercentage = coupon.discountPercent;
          this.recalculateCart();
          this.addLog('INFO', thread, 'c.e.s.CartService', `Applied promo coupon '${coupon.code}' (${coupon.discountPercent}% OFF)`);
          response.status = 200;
          response.data = {
            message: `Coupon ${coupon.code} applied successfully!`,
            cart: this.cart,
          };
        }
      }

      // 9. /api/v1/orders/checkout (POST) - Critical Transactional Flow
      else if (path === '/api/v1/orders/checkout' && method === 'POST') {
        if (!authenticatedUser) {
          response.status = 401;
          response.statusText = 'Unauthorized';
          response.data = { status: 401, detail: 'Please authenticate to place an order.' };
        } else {
          this.addLog('INFO', thread, 'o.s.t.i.TransactionInterceptor', 'Getting transaction for [com.ecommerce.service.OrderService.checkoutOrder]', undefined, 'TRANSACTION');

          const { items = [], shippingAddress, paymentMethod = 'STRIPE', couponCode } = body || {};
          const orderItems: OrderItem[] = [];
          let subtotal = 0;

          // 1. Stock Check & Pessimistic Lock
          let stockError = false;
          for (const itemReq of items) {
            const product = this.products.find((p) => p.id === itemReq.productId);
            if (!product) {
              response.status = 404;
              response.data = { status: 404, detail: `Product ${itemReq.productId} not found` };
              stockError = true;
              break;
            }

            const pLockSql = `SELECT p.id, p.stock_quantity, p.version FROM products p WHERE p.id = '${product.id}' FOR UPDATE`;
            sqlQueries.push(pLockSql);
            this.addLog('DEBUG', thread, 'org.hibernate.SQL', pLockSql, undefined, 'HIBERNATE');

            if (product.stockQuantity < itemReq.quantity) {
              stockError = true;
              this.addLog('WARN', thread, 'c.e.s.OrderService', `Insufficient stock for SKU ${product.sku}. (Available: ${product.stockQuantity}, Requested: ${itemReq.quantity})`);
              this.addLog('INFO', thread, 'o.s.t.i.TransactionInterceptor', 'Completing transaction for [OrderService.checkoutOrder] after exception: InsufficientStockException', undefined, 'TRANSACTION');

              response.status = 400;
              response.statusText = 'Bad Request';
              response.data = {
                type: 'https://api.ecommerce.io/errors/insufficient-stock',
                title: 'Insufficient Inventory',
                status: 400,
                detail: `Insufficient stock for product '${product.name}'. Only ${product.stockQuantity} remaining in warehouse.`,
                timestamp: new Date().toISOString(),
              };
              break;
            }

            // Deduct stock in memory
            product.stockQuantity -= itemReq.quantity;
            if (product.stockQuantity === 0) {
              product.status = 'OUT_OF_STOCK';
            }

            const lineTotal = product.price * itemReq.quantity;
            subtotal += lineTotal;

            orderItems.push({
              id: 'oi_' + Math.random().toString(36).substring(2, 7),
              productId: product.id,
              productName: product.name,
              sku: product.sku,
              quantity: itemReq.quantity,
              unitPrice: product.price,
              totalPrice: Number(lineTotal.toFixed(2)),
            });

            const stockUpdateSql = `UPDATE products SET stock_quantity = ${product.stockQuantity}, version = version + 1, updated_at = NOW() WHERE id = '${product.id}'`;
            sqlQueries.push(stockUpdateSql);
            this.addLog('DEBUG', thread, 'org.hibernate.SQL', stockUpdateSql, undefined, 'HIBERNATE');
          }

          if (!stockError) {
            // Apply Coupon
            let discountAmount = 0;
            const codeToUse = couponCode || this.cart.couponCode;
            if (codeToUse) {
              const coupon = this.coupons.find((c) => c.code.toUpperCase() === codeToUse.toUpperCase() && c.active);
              if (coupon && subtotal >= coupon.minOrderAmount) {
                discountAmount = Math.min((subtotal * coupon.discountPercent) / 100, coupon.maxDiscount);
                this.addLog('INFO', thread, 'c.e.s.OrderService', `Applied discount $${discountAmount.toFixed(2)} from coupon ${coupon.code}`);
              }
            }

            const taxableAmount = Math.max(0, subtotal - discountAmount);
            const taxAmount = Number((taxableAmount * 0.08).toFixed(2));
            const shippingAmount = subtotal >= 100 ? 0 : 9.99;
            const totalAmount = Number((taxableAmount + taxAmount + shippingAmount).toFixed(2));

            // Payment simulation
            const txnRef = 'txn_' + Math.random().toString(36).substring(2, 10);
            this.addLog('INFO', thread, 'c.e.s.PaymentService', `Authorized charge of $${totalAmount} via ${paymentMethod} (Ref: ${txnRef})`);

            const newOrder: Order = {
              id: 'ord_' + Math.floor(1000 + Math.random() * 9000),
              orderNumber: 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000),
              userId: authenticatedUser.id,
              customerName: authenticatedUser.fullName,
              customerEmail: authenticatedUser.email,
              items: orderItems,
              subtotal: Number(subtotal.toFixed(2)),
              discountAmount: Number(discountAmount.toFixed(2)),
              taxAmount,
              shippingAmount,
              totalAmount,
              status: 'PAID',
              couponCode: codeToUse,
              shippingAddress: shippingAddress || {
                fullName: authenticatedUser.fullName,
                street: '742 Evergreen Terrace',
                city: 'Seattle',
                state: 'WA',
                zipCode: '98101',
                country: 'USA',
              },
              paymentMethod,
              paymentId: 'pay_' + Math.random().toString(36).substring(2, 7),
              transactionRef: txnRef,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            this.orders.unshift(newOrder);

            // Empty cart after successful checkout
            this.cart.items = [];
            this.cart.couponCode = undefined;
            this.recalculateCart();

            const orderSql = `INSERT INTO orders (order_number, user_id, subtotal, discount_amount, tax_amount, shipping_amount, total_amount, status, payment_method, transaction_ref, created_at) VALUES ('${newOrder.orderNumber}', '${authenticatedUser.id}', ${newOrder.subtotal}, ${newOrder.discountAmount}, ${newOrder.taxAmount}, ${newOrder.shippingAmount}, ${newOrder.totalAmount}, 'PAID', '${paymentMethod}', '${txnRef}', NOW()) RETURNING id`;
            sqlQueries.push(orderSql);
            this.addLog('DEBUG', thread, 'org.hibernate.SQL', orderSql, undefined, 'HIBERNATE');
            this.addLog('INFO', thread, 'o.s.t.i.TransactionInterceptor', 'Completing transaction for [OrderService.checkoutOrder] - Commit successfully persisted.', undefined, 'TRANSACTION');

            // Kafka Event publishing
            this.addLog('INFO', thread, 'c.e.e.OrderEventListener', `[Kafka: order-events] Published OrderCreatedEvent: {"orderNumber": "${newOrder.orderNumber}", "total": ${newOrder.totalAmount}, "user": "${authenticatedUser.email}"}`, undefined, 'EVENT');

            this.metrics.httpRequests2xx++;
            response.status = 201;
            response.statusText = 'Created';
            response.data = newOrder;
          }
        }
      }

      // 10. /api/v1/orders (GET)
      else if (path === '/api/v1/orders' && method === 'GET') {
        if (!authenticatedUser) {
          response.status = 401;
          response.data = { status: 401, detail: 'Unauthorized' };
        } else {
          let userOrders = this.orders;
          if (authenticatedUser.role !== 'ROLE_ADMIN') {
            userOrders = this.orders.filter((o) => o.userId === authenticatedUser.id || o.customerEmail === authenticatedUser.email);
          }
          const sql = `SELECT * FROM orders WHERE user_id = '${authenticatedUser.id}' ORDER BY created_at DESC`;
          sqlQueries.push(sql);
          this.addLog('DEBUG', thread, 'org.hibernate.SQL', sql, undefined, 'HIBERNATE');
          this.addLog('INFO', thread, 'c.e.s.OrderService', `Retrieved ${userOrders.length} orders for ${authenticatedUser.email}`);

          this.metrics.httpRequests2xx++;
          response.status = 200;
          response.data = userOrders;
        }
      }

      // 11. /api/v1/orders/{id}/status (PUT)
      else if (path.includes('/orders/') && path.endsWith('/status') && method === 'PUT') {
        if (!authenticatedUser || authenticatedUser.role !== 'ROLE_ADMIN') {
          response.status = 403;
          response.data = { status: 403, detail: 'Only ROLE_ADMIN can transition order status.' };
        } else {
          const orderId = path.split('/')[4] || queryParams?.id;
          const { status } = body || {};
          const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
          if (!order) {
            response.status = 404;
            response.data = { status: 404, detail: 'Order not found' };
          } else {
            order.status = status as OrderStatus;
            order.updatedAt = new Date().toISOString();
            const sql = `UPDATE orders SET status = '${status}', updated_at = NOW() WHERE id = '${order.id}'`;
            sqlQueries.push(sql);
            this.addLog('DEBUG', thread, 'org.hibernate.SQL', sql, undefined, 'HIBERNATE');
            this.addLog('INFO', thread, 'c.e.s.OrderService', `Order ${order.orderNumber} status changed to ${status}`);
            response.status = 200;
            response.data = order;
          }
        }
      }

      // 12. /api/v1/coupons (GET)
      else if (path === '/api/v1/coupons' && method === 'GET') {
        const sql = `SELECT * FROM coupons WHERE active = true AND valid_until > NOW()`;
        sqlQueries.push(sql);
        this.addLog('DEBUG', thread, 'org.hibernate.SQL', sql, undefined, 'HIBERNATE');
        this.addLog('INFO', thread, 'c.e.s.CouponService', `Returned ${this.coupons.length} active promotions`);
        response.status = 200;
        response.data = this.coupons;
      }

      // 13. /api/v1/actuator/health (GET)
      else if (path === '/api/v1/actuator/health' && method === 'GET') {
        this.addLog('INFO', thread, 'o.s.b.a.e.w.EndpointHandlerMapping', 'Actuator Health check probed: All components UP');
        response.status = 200;
        response.data = {
          status: 'UP',
          components: {
            db: {
              status: 'UP',
              details: {
                database: 'PostgreSQL',
                validationQuery: 'isValid()',
                activeConnections: this.metrics.hikariActiveConnections,
              },
            },
            redis: {
              status: 'UP',
              details: {
                version: '7.2.4',
                hitRatio: `${this.metrics.redisCacheHitRatio}%`,
              },
            },
            diskSpace: {
              status: 'UP',
              details: {
                total: 107374182400,
                free: 82439281920,
                threshold: 10485760,
              },
            },
            ping: {
              status: 'UP',
            },
          },
        };
      }

      // 14. /api/v1/actuator/metrics (GET)
      else if (path === '/api/v1/actuator/metrics' && method === 'GET') {
        response.status = 200;
        response.data = {
          jvmMemoryUsed: `${this.metrics.heapUsedMb} MB`,
          jvmMemoryMax: `${this.metrics.heapMaxMb} MB`,
          jvmThreadsLive: this.metrics.activeThreads,
          httpServerRequests: {
            total: this.metrics.httpRequestsTotal,
            status2xx: this.metrics.httpRequests2xx,
            status4xx: this.metrics.httpRequests4xx,
            status5xx: this.metrics.httpRequests5xx,
          },
          hikariPool: {
            active: this.metrics.hikariActiveConnections,
            idle: this.metrics.hikariIdleConnections,
            max: this.metrics.hikariMaxConnections,
          },
          processUptime: `${this.metrics.uptimeSeconds}s`,
        };
      }

      // Default 404
      else {
        this.metrics.httpRequests4xx++;
        this.addLog('WARN', thread, 'o.s.w.s.PageNotFound', `No mapping for ${method} ${path}`);
        response.status = 404;
        response.statusText = 'Not Found';
        response.data = {
          type: 'https://api.ecommerce.io/errors/not-found',
          title: 'Not Found',
          status: 404,
          detail: `No handler found for ${method} ${path}`,
          timestamp: new Date().toISOString(),
        };
      }
    } catch (err: any) {
      this.metrics.httpRequests5xx++;
      this.addLog('ERROR', thread, 'c.e.e.GlobalExceptionHandler', `Unhandled exception occurred: ${err?.message}`, err?.stack, 'APP');
      response.status = 500;
      response.statusText = 'Internal Server Error';
      response.data = {
        type: 'https://api.ecommerce.io/errors/internal-server-error',
        title: 'Internal Server Error',
        status: 500,
        detail: err?.message || 'An unexpected exception occurred.',
        timestamp: new Date().toISOString(),
      };
    }

    const duration = Math.max(8, Math.round(performance.now() - startTime + Math.random() * 12));
    response.durationMs = duration;

    this.addLog(
      'INFO',
      thread,
      'o.s.w.s.DispatcherServlet',
      `Completed ${response.status} ${response.statusText} in ${duration}ms`
    );

    this.notify();
    return response;
  }

  // Execute raw SQL on simulated in-memory DB
  public executeRawSql(sqlQuery: string): { columns: string[]; rows: any[][]; message?: string; error?: string } {
    const trimmed = sqlQuery.trim().toUpperCase();
    try {
      if (trimmed.startsWith('SELECT')) {
        if (trimmed.includes('PRODUCTS')) {
          const cols = ['id', 'sku', 'name', 'price', 'stock_quantity', 'category_name', 'status'];
          const rows = this.products.map((p) => [p.id, p.sku, p.name, `$${p.price.toFixed(2)}`, p.stockQuantity, p.categoryName, p.status]);
          return { columns: cols, rows };
        } else if (trimmed.includes('ORDERS')) {
          const cols = ['id', 'order_number', 'customer_name', 'total_amount', 'status', 'payment_method', 'created_at'];
          const rows = this.orders.map((o) => [o.id, o.orderNumber, o.customerName, `$${o.totalAmount.toFixed(2)}`, o.status, o.paymentMethod, o.createdAt.substring(0, 10)]);
          return { columns: cols, rows };
        } else if (trimmed.includes('USERS')) {
          const cols = ['id', 'email', 'full_name', 'role', 'enabled', 'created_at'];
          const rows = this.users.map((u) => [u.id, u.email, u.fullName, u.role, u.enabled ? 'TRUE' : 'FALSE', u.createdAt.substring(0, 10)]);
          return { columns: cols, rows };
        } else if (trimmed.includes('CATEGORIES')) {
          const cols = ['id', 'name', 'slug', 'description'];
          const rows = this.categories.map((c) => [c.id, c.name, c.slug, c.description]);
          return { columns: cols, rows };
        } else if (trimmed.includes('COUPONS')) {
          const cols = ['code', 'discount_percent', 'max_discount', 'min_order_amount', 'active'];
          const rows = this.coupons.map((c) => [c.code, `${c.discountPercent}%`, `$${c.maxDiscount}`, `$${c.minOrderAmount}`, c.active ? 'TRUE' : 'FALSE']);
          return { columns: cols, rows };
        }
      }
      return {
        columns: ['status', 'message'],
        rows: [['SUCCESS', `Query executed against PostgreSQL. Affected 1 table.`]],
        message: 'Query executed successfully.',
      };
    } catch (e: any) {
      return {
        columns: ['error'],
        rows: [[e.message]],
        error: e.message,
      };
    }
  }

  // Reset database state to fresh factory defaults
  public resetToFactory() {
    this.products = JSON.parse(JSON.stringify(initialProducts));
    this.categories = JSON.parse(JSON.stringify(initialCategories));
    this.users = JSON.parse(JSON.stringify(initialUsers));
    this.orders = JSON.parse(JSON.stringify(initialOrders));
    this.cart = JSON.parse(JSON.stringify(initialCart));
    this.coupons = JSON.parse(JSON.stringify(initialCoupons));
    this.currentUser = this.users[0];
    this.addLog('WARN', 'main', 'c.e.b.DatabaseSeeder', 'Database state wiped and re-seeded with factory sample catalog & demo orders.', undefined, 'HIBERNATE');
    this.notify();
  }
}

export const springEngine = new SpringEngine();
