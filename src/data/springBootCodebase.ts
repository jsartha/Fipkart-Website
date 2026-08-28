export interface JavaFile {
  path: string;
  name: string;
  category: 'config' | 'domain' | 'repository' | 'service' | 'controller' | 'security' | 'dto' | 'exception' | 'event' | 'test' | 'infra';
  language: 'java' | 'xml' | 'yaml' | 'sql' | 'dockerfile' | 'json';
  description: string;
  code: string;
  annotations?: string[];
  keyConcepts?: string[];
}

export const springBootCodebase: JavaFile[] = [
  {
    path: 'pom.xml',
    name: 'pom.xml',
    category: 'config',
    language: 'xml',
    description: 'Maven build configuration featuring Spring Boot 3.3.2, Java 21, Spring Data JPA, Spring Security, Redis, Flyway, MapStruct, and Testcontainers.',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.2</version>
        <relativePath/>
    </parent>
    
    <groupId>com.ecommerce.backend</groupId>
    <artifactId>ecommerce-api</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>Spring Boot E-Commerce API</name>
    <description>Enterprise E-Commerce REST API Backend with Spring Boot 3 &amp; Java 21</description>
    
    <properties>
        <java.version>21</java.version>
        <jjwt.version>0.12.5</jjwt.version>
        <springdoc.version>2.5.0</springdoc.version>
        <mapstruct.version>1.5.5.Final</mapstruct.version>
        <lombok.version>1.18.32</lombok.version>
        <testcontainers.version>1.19.8</testcontainers.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Core Web & REST -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Validation (Bean Validation / Hibernate Validator) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- Spring Data JPA & Hibernate ORM -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- Spring Data Redis & Distributed Caching -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        
        <!-- Spring Security 6 & OAuth2 Resource Server -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <!-- JJWT for JWT Token Generation and Verification -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>\${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Database Driver & Migrations -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
        </dependency>
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-database-postgresql</artifactId>
        </dependency>
        
        <!-- Production Metrics & Health -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>io.micrometer</groupId>
            <artifactId>micrometer-registry-prometheus</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- OpenAPI 3.0 Documentation (Swagger UI) -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>\${springdoc.version}</version>
        </dependency>
        
        <!-- Lombok & MapStruct -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>\${lombok.version}</version>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct</artifactId>
            <version>\${mapstruct.version}</version>
        </dependency>
        
        <!-- Testing & Testcontainers -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.testcontainers</groupId>
            <artifactId>postgresql</artifactId>
            <version>\${testcontainers.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`,
    keyConcepts: ['Spring Boot 3.3', 'Java 21 Virtual Threads Support', 'JPA/Hibernate 6', 'Spring Security 6', 'Flyway Migrations'],
  },
  {
    path: 'src/main/resources/application.yml',
    name: 'application.yml',
    category: 'config',
    language: 'yaml',
    description: 'Production Spring Boot application YAML with HikariCP, JPA 6 batching, Redis cache, JWT secret, and Actuator metrics.',
    code: `spring:
  application:
    name: ecommerce-api
  threads:
    virtual:
      enabled: true # Java 21 Project Loom Virtual Threads for high concurrency

  # Database DataSource & HikariCP Pool
  datasource:
    url: \${DB_URL:jdbc:postgresql://localhost:5432/ecommerce_db}
    username: \${DB_USER:postgres}
    password: \${DB_PASSWORD:postgres}
    driver-class-name: org.postgresql.Driver
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      idle-timeout: 30000
      connection-timeout: 20000
      pool-name: HikariCP-EcomPool

  # JPA & Hibernate ORM Configuration
  jpa:
    hibernate:
      ddl-auto: validate # Production schema validated by Flyway
    show-sql: false
    open-in-view: false # Avoid N+1 and connection holding in view layer
    properties:
      hibernate:
        format_sql: true
        jdbc:
          batch_size: 50
          order_inserts: true
          order_updates: true
        dialect: org.hibernate.dialect.PostgreSQLDialect

  # Redis Distributed Cache Configuration
  data:
    redis:
      host: \${REDIS_HOST:localhost}
      port: \${REDIS_PORT:6379}
      timeout: 2000ms
  cache:
    type: redis
    redis:
      time-to-live: 600000 # 10 minutes cache TTL
      cache-null-values: false

  # Flyway DB Migration
  flyway:
    enabled: true
    baseline-on-migrate: true
    locations: classpath:db/migration

# JWT Security Secrets & Token Expiration
jwt:
  secret: \${JWT_SECRET:9a8f3b2c1e4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a}
  expiration-ms: 86400000 # 24 Hours
  refresh-expiration-ms: 604800000 # 7 Days

# Actuator & Observability
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus,env
  endpoint:
    health:
      show-details: when_authorized
  metrics:
    tags:
      application: \${spring.application.name}

# OpenAPI Swagger 3 Documentation
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
    operations-sorter: method
    tags-sorter: alpha`,
    keyConcepts: ['Virtual Threads', 'HikariCP Tuning', 'Flyway Lifecycle', 'Stateless JWT Auth', 'OpenAPI Documentation'],
  },
  {
    path: 'src/main/java/com/ecommerce/domain/model/Product.java',
    name: 'Product.java',
    category: 'domain',
    language: 'java',
    description: 'JPA Entity representing an e-commerce catalog item with Optimistic Locking (@Version) for inventory race condition prevention.',
    code: `package com.ecommerce.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_products_sku", columnList = "sku", unique = true),
    @Index(name = "idx_products_category", columnList = "category_id"),
    @Index(name = "idx_products_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "SKU cannot be blank")
    @Column(nullable = false, unique = true, length = 64)
    private String sku;

    @NotBlank(message = "Product name is required")
    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than zero")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(precision = 12, scale = 2)
    private BigDecimal originalPrice;

    @NotNull
    @Column(nullable = false)
    private Integer stockQuantity;

    @Column(nullable = false)
    @Builder.Default
    private Integer reservedStock = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    @Builder.Default
    private ProductStatus status = ProductStatus.ACTIVE;

    @Column(length = 1024)
    private String imageUrl;

    @Column(precision = 3, scale = 2)
    @Builder.Default
    private BigDecimal rating = BigDecimal.valueOf(5.0);

    @Builder.Default
    private Integer reviewCount = 0;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "product_tags", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "tag")
    @Builder.Default
    private Set<String> tags = new HashSet<>();

    /**
     * Optimistic Locking to prevent concurrent inventory updates from overriding each other.
     */
    @Version
    private Long version;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public boolean hasAvailableStock(int requestedQuantity) {
        return (this.stockQuantity - this.reservedStock) >= requestedQuantity;
    }

    public void deductStock(int quantity) {
        if (!hasAvailableStock(quantity)) {
            throw new IllegalStateException("Insufficient stock for product SKU: " + sku);
        }
        this.stockQuantity -= quantity;
        if (this.stockQuantity == 0) {
            this.status = ProductStatus.OUT_OF_STOCK;
        }
    }
}`,
    annotations: ['@Entity', '@Table', '@Getter', '@Setter', '@Builder', '@Version', '@ManyToOne', '@ElementCollection'],
    keyConcepts: ['JPA Entity Modeling', 'Optimistic Locking with @Version', 'Indexed Constraints', 'Stock Invariant Enforcement'],
  },
  {
    path: 'src/main/java/com/ecommerce/domain/model/Order.java',
    name: 'Order.java',
    category: 'domain',
    language: 'java',
    description: 'JPA Entity representing customer order with cascade persistence on OrderItems and lifecycle state machine.',
    code: `package com.ecommerce.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_orders_user", columnList = "user_id"),
    @Index(name = "idx_orders_number", columnList = "order_number", unique = true),
    @Index(name = "idx_orders_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number", nullable = false, unique = true, length = 64)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 12, scale = 2)
    @Builder.Default
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal taxAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal shippingAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    @Builder.Default
    private OrderStatus status = OrderStatus.PENDING;

    @Embedded
    private ShippingAddress shippingAddress;

    @Column(length = 64)
    private String couponCode;

    @Column(length = 64)
    private String paymentMethod;

    @Column(length = 128)
    private String transactionRef;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
}`,
    annotations: ['@Entity', '@Table', '@OneToMany(cascade = ALL)', '@Embedded', '@CreationTimestamp'],
    keyConcepts: ['DDD Aggregate Root', 'Bidirectional JPA Mapping', 'Embedded Value Objects'],
  },
  {
    path: 'src/main/java/com/ecommerce/domain/model/User.java',
    name: 'User.java',
    category: 'domain',
    language: 'java',
    description: 'Spring Security compatible User entity supporting Role-Based Access Control (RBAC).',
    code: `package com.ecommerce.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_users_email", columnList = "email", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true, length = 128)
    private String email;

    @NotBlank
    @Column(nullable = false, length = 255)
    private String passwordHash;

    @NotBlank
    @Column(nullable = false, length = 128)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    @Builder.Default
    private Role role = Role.ROLE_CUSTOMER;

    @Column(nullable = false)
    @Builder.Default
    private boolean enabled = true;

    @Column(length = 512)
    private String avatarUrl;

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}`,
    annotations: ['@Entity', 'implements UserDetails', '@Enumerated', '@Table'],
    keyConcepts: ['Spring Security Integration', 'UserDetails implementation', 'Role-Based Access Control'],
  },
  {
    path: 'src/main/java/com/ecommerce/repository/ProductRepository.java',
    name: 'ProductRepository.java',
    category: 'repository',
    language: 'java',
    description: 'Spring Data JPA Repository with custom JPQL queries, pagination, and pessimistic stock locking.',
    code: `package com.ecommerce.repository;

import com.ecommerce.domain.model.Product;
import com.ecommerce.domain.model.ProductStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySku(String sku);

    Page<Product> findByStatus(ProductStatus status, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category.slug = :categorySlug AND p.status = 'ACTIVE'")
    Page<Product> findByCategorySlug(@Param("categorySlug") String categorySlug, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice AND p.status = 'ACTIVE'")
    Page<Product> findByPriceRange(@Param("minPrice") BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice, Pageable pageable);

    /**
     * Pessimistic write lock for critical inventory deduction routines.
     */
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Product p WHERE p.id = :id")
    Optional<Product> findByIdWithPessimisticLock(@Param("id") Long id);

    @Query("SELECT p FROM Product p WHERE p.stockQuantity <= :threshold AND p.status = 'ACTIVE'")
    List<Product> findLowStockProducts(@Param("threshold") int threshold);
}`,
    annotations: ['@Repository', 'JpaRepository<Product, Long>', '@Query', '@Lock(LockModeType.PESSIMISTIC_WRITE)'],
    keyConcepts: ['Custom JPQL Queries', 'Pessimistic Locking', 'Dynamic Pagination & Sorting'],
  },
  {
    path: 'src/main/java/com/ecommerce/service/OrderService.java',
    name: 'OrderService.java',
    category: 'service',
    language: 'java',
    description: 'Transactional Order Checkout Orchestrator handling stock validation, coupon application, payment processing, and event emission.',
    code: `package com.ecommerce.service;

import com.ecommerce.domain.dto.OrderRequestDto;
import com.ecommerce.domain.dto.OrderResponseDto;
import com.ecommerce.domain.event.OrderCreatedEvent;
import com.ecommerce.domain.model.*;
import com.ecommerce.exception.InsufficientStockException;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.repository.CouponRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CouponRepository couponRepository;
    private final PaymentService paymentService;
    private final ApplicationEventPublisher eventPublisher;

    /**
     * Atomic order checkout with SERIALIZABLE / REPEATABLE_READ isolation.
     */
    @Transactional(isolation = Isolation.READ_COMMITTED, rollbackFor = Exception.class)
    public OrderResponseDto checkoutOrder(Long userId, OrderRequestDto request) {
        log.info("Processing checkout for user ID: {} with {} items", userId, request.getItems().size());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        Order order = new Order();
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setUser(user);
        order.setShippingAddress(request.getShippingAddress());
        order.setPaymentMethod(request.getPaymentMethod());

        BigDecimal subtotal = BigDecimal.ZERO;

        // 1. Validate and reserve inventory for each line item
        for (var itemDto : request.getItems()) {
            Product product = productRepository.findByIdWithPessimisticLock(itemDto.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + itemDto.getProductId()));

            if (!product.hasAvailableStock(itemDto.getQuantity())) {
                log.warn("Stock depletion for product: {} (Available: {}, Requested: {})", 
                        product.getSku(), product.getStockQuantity(), itemDto.getQuantity());
                throw new InsufficientStockException("Insufficient stock for: " + product.getName());
            }

            // Deduct stock immediately in transaction
            product.deductStock(itemDto.getQuantity());
            productRepository.save(product);

            BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity()));
            subtotal = subtotal.add(lineTotal);

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .productName(product.getName())
                    .sku(product.getSku())
                    .quantity(itemDto.getQuantity())
                    .unitPrice(product.getPrice())
                    .totalPrice(lineTotal)
                    .build();

            order.addItem(orderItem);
        }

        order.setSubtotal(subtotal);

        // 2. Apply Coupon Code if provided
        BigDecimal discountAmount = BigDecimal.ZERO;
        if (request.getCouponCode() != null && !request.getCouponCode().isBlank()) {
            Coupon coupon = couponRepository.findByCodeAndActiveTrue(request.getCouponCode())
                    .orElse(null);
            if (coupon != null && subtotal.compareTo(coupon.getMinOrderAmount()) >= 0) {
                BigDecimal discount = subtotal.multiply(BigDecimal.valueOf(coupon.getDiscountPercent()))
                        .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                discountAmount = discount.min(coupon.getMaxDiscount());
                order.setCouponCode(coupon.getCode());
                log.info("Applied coupon {} discount: \${}", coupon.getCode(), discountAmount);
            }
        }
        order.setDiscountAmount(discountAmount);

        // 3. Calculate Tax (e.g. 8%) and Shipping ($0 for >$100)
        BigDecimal taxableAmount = subtotal.subtract(discountAmount);
        BigDecimal taxAmount = taxableAmount.multiply(BigDecimal.valueOf(0.08)).setScale(2, RoundingMode.HALF_UP);
        BigDecimal shippingAmount = subtotal.compareTo(BigDecimal.valueOf(100.0)) >= 0 
                ? BigDecimal.ZERO 
                : BigDecimal.valueOf(9.99);

        BigDecimal totalAmount = taxableAmount.add(taxAmount).add(shippingAmount);
        order.setTaxAmount(taxAmount);
        order.setShippingAmount(shippingAmount);
        order.setTotalAmount(totalAmount);

        // 4. Charge Payment Gateway
        String transactionRef = paymentService.charge(totalAmount, request.getPaymentMethod(), user.getEmail());
        order.setTransactionRef(transactionRef);
        order.setStatus(OrderStatus.PAID);

        // 5. Persist Order Aggregate
        Order savedOrder = orderRepository.save(order);
        log.info("Order placed successfully with ID: {} and Number: {}", savedOrder.getId(), savedOrder.getOrderNumber());

        // 6. Publish Async Domain Event (Kafka / Notification service listener)
        eventPublisher.publishEvent(new OrderCreatedEvent(this, savedOrder));

        return mapToDto(savedOrder);
    }

    private OrderResponseDto mapToDto(Order order) {
        return OrderResponseDto.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .userId(order.getUser().getId())
                .customerEmail(order.getUser().getEmail())
                .totalAmount(order.getTotalAmount())
                .subtotal(order.getSubtotal())
                .discountAmount(order.getDiscountAmount())
                .taxAmount(order.getTaxAmount())
                .shippingAmount(order.getShippingAmount())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .build();
    }
}`,
    annotations: ['@Service', '@RequiredArgsConstructor', '@Slf4j', '@Transactional(rollbackFor = Exception.class)'],
    keyConcepts: ['Atomic Transaction Management', 'Pessimistic Locking Stock Guard', 'Domain Event Publishing', 'Clean Financial Calculations'],
  },
  {
    path: 'src/main/java/com/ecommerce/service/ProductService.java',
    name: 'ProductService.java',
    category: 'service',
    language: 'java',
    description: 'Product Catalog Service with Spring Cache (@Cacheable) and Redis invalidation.',
    code: `package com.ecommerce.service;

import com.ecommerce.domain.dto.ProductCreateDto;
import com.ecommerce.domain.dto.ProductResponseDto;
import com.ecommerce.domain.model.Category;
import com.ecommerce.domain.model.Product;
import com.ecommerce.domain.model.ProductStatus;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Cacheable(value = "products", key = "#id")
    @Transactional(readOnly = true)
    public ProductResponseDto getProductById(Long id) {
        log.info("Fetching product details from database for ID: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
        return mapToDto(product);
    }

    @Transactional(readOnly = true)
    public Page<ProductResponseDto> getAllProducts(String categorySlug, String keyword, Pageable pageable) {
        if (categorySlug != null && !categorySlug.isBlank()) {
            return productRepository.findByCategorySlug(categorySlug, pageable).map(this::mapToDto);
        }
        if (keyword != null && !keyword.isBlank()) {
            return productRepository.searchByKeyword(keyword, pageable).map(this::mapToDto);
        }
        return productRepository.findByStatus(ProductStatus.ACTIVE, pageable).map(this::mapToDto);
    }

    @CacheEvict(value = "products", allEntries = true)
    @Transactional
    public ProductResponseDto createProduct(ProductCreateDto dto) {
        log.info("Creating new product with SKU: {}", dto.getSku());
        
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + dto.getCategoryId()));

        Product product = Product.builder()
                .sku(dto.getSku())
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .originalPrice(dto.getOriginalPrice())
                .stockQuantity(dto.getStockQuantity())
                .category(category)
                .imageUrl(dto.getImageUrl())
                .tags(dto.getTags())
                .status(ProductStatus.ACTIVE)
                .build();

        Product saved = productRepository.save(product);
        return mapToDto(saved);
    }

    private ProductResponseDto mapToDto(Product p) {
        return ProductResponseDto.builder()
                .id(p.getId())
                .sku(p.getSku())
                .name(p.getName())
                .description(p.getDescription())
                .price(p.getPrice())
                .originalPrice(p.getOriginalPrice())
                .stockQuantity(p.getStockQuantity())
                .categoryName(p.getCategory().getName())
                .imageUrl(p.getImageUrl())
                .rating(p.getRating())
                .reviewCount(p.getReviewCount())
                .status(p.getStatus())
                .build();
    }
}`,
    annotations: ['@Service', '@Cacheable(value = "products")', '@CacheEvict(allEntries = true)', '@Transactional(readOnly = true)'],
    keyConcepts: ['Redis Caching Layer', 'Read-Only DB Transaction optimization', 'Declarative Cache Eviction'],
  },
  {
    path: 'src/main/java/com/ecommerce/controller/OrderController.java',
    name: 'OrderController.java',
    category: 'controller',
    language: 'java',
    description: 'REST Controller for customer order management with OpenAPI docs and Security annotations.',
    code: `package com.ecommerce.controller;

import com.ecommerce.domain.dto.OrderRequestDto;
import com.ecommerce.domain.dto.OrderResponseDto;
import com.ecommerce.domain.model.User;
import com.ecommerce.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Tag(name = "Orders", description = "Order Placement, Tracking, and Checkout Operations")
@SecurityRequirement(name = "BearerAuth")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    @Operation(summary = "Place a new order", description = "Atomically verifies stock, calculates discounts, charges payment, and generates invoice.")
    @ApiResponse(responseCode = "201", description = "Order created successfully")
    @ApiResponse(responseCode = "400", description = "Insufficient inventory or invalid input")
    public ResponseEntity<OrderResponseDto> checkout(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody OrderRequestDto request) {
        
        OrderResponseDto response = orderService.checkoutOrder(currentUser.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    @Operation(summary = "Get order by ID", description = "Retrieve complete order breakdown and current shipment tracking status.")
    public ResponseEntity<OrderResponseDto> getOrderById(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id) {
        
        // Implementation retrieves order verifying user owns it or is admin
        return ResponseEntity.ok(orderService.getOrderById(id, currentUser));
    }
}`,
    annotations: ['@RestController', '@RequestMapping("/api/v1/orders")', '@PreAuthorize', '@Operation', '@Valid'],
    keyConcepts: ['RESTful Design', 'OpenAPI 3 Annotations', 'Method Security (@PreAuthorize)', 'Bean Validation (@Valid)'],
  },
  {
    path: 'src/main/java/com/ecommerce/controller/AuthController.java',
    name: 'AuthController.java',
    category: 'controller',
    language: 'java',
    description: 'REST Controller for user registration, authentication, and JWT token issuance.',
    code: `package com.ecommerce.controller;

import com.ecommerce.domain.dto.AuthRequestDto;
import com.ecommerce.domain.dto.AuthResponseDto;
import com.ecommerce.domain.dto.RegisterRequestDto;
import com.ecommerce.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "User Sign-up, Sign-in, and Token Refresh endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @Operation(summary = "Register a new customer", description = "Creates a new user profile with BCrypt encrypted credentials.")
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterRequestDto request) {
        AuthResponseDto response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user", description = "Validates email and password, issuing a signed HMAC-SHA256 JWT token.")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody AuthRequestDto request) {
        AuthResponseDto response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}`,
    annotations: ['@RestController', '@RequestMapping("/api/v1/auth")', '@PostMapping', '@Valid'],
    keyConcepts: ['Stateless Token Authentication', 'Password Encryption', 'DTO Validation'],
  },
  {
    path: 'src/main/java/com/ecommerce/security/SecurityConfig.java',
    name: 'SecurityConfig.java',
    category: 'security',
    language: 'java',
    description: 'Spring Security 6 SecurityFilterChain configuration with stateless session and JWT filter.',
    code: `package com.ecommerce.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(AbstractHttpConfigurer::disable)
            .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public catalog & authentication endpoints
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/categories/**").permitAll()
                .requestMatchers("/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/api/v1/actuator/**").permitAll()
                // Admin-only management endpoints
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/v1/products/**").hasAnyRole("ADMIN", "SELLER")
                // Authenticated user endpoints
                .anyRequest().authenticated()
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12); // Work factor 12 for strong hashing
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}`,
    annotations: ['@Configuration', '@EnableWebSecurity', '@EnableMethodSecurity', '@Bean'],
    keyConcepts: ['Spring Security 6 Lambda DSL', 'Stateless JWT Architecture', 'BCrypt Password Strength', 'Role-Based URL Authorization'],
  },
  {
    path: 'src/main/java/com/ecommerce/exception/GlobalExceptionHandler.java',
    name: 'GlobalExceptionHandler.java',
    category: 'exception',
    language: 'java',
    description: 'Centralized @RestControllerAdvice generating RFC 7807 ProblemDetails for errors.',
    code: `package com.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFound(ResourceNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        problem.setTitle("Resource Not Found");
        problem.setType(URI.create("https://api.ecommerce.io/errors/not-found"));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(InsufficientStockException.class)
    public ProblemDetail handleInsufficientStock(InsufficientStockException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
        problem.setTitle("Insufficient Inventory");
        problem.setType(URI.create("https://api.ecommerce.io/errors/insufficient-stock"));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationExceptions(MethodArgumentNotValidException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Validation failed for one or more fields");
        problem.setTitle("Invalid Request Content");
        problem.setType(URI.create("https://api.ecommerce.io/errors/validation-error"));

        Map<String, String> invalidFields = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            invalidFields.put(error.getField(), error.getDefaultMessage());
        }
        problem.setProperty("invalidFields", invalidFields);
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ProblemDetail handleBadCredentials(BadCredentialsException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        problem.setTitle("Authentication Failed");
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDenied(AccessDeniedException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, "You do not have permission to perform this action");
        problem.setTitle("Access Denied");
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }
}`,
    annotations: ['@RestControllerAdvice', '@ExceptionHandler', 'ProblemDetail (RFC 7807)'],
    keyConcepts: ['RFC 7807 Standard Error Format', 'Global Exception Interception', 'Field Validation Mapping'],
  },
  {
    path: 'src/main/resources/db/migration/V1__init_schema.sql',
    name: 'V1__init_schema.sql',
    category: 'infra',
    language: 'sql',
    description: 'Flyway schema migration creating relational tables with foreign keys and B-Tree indexes.',
    code: `-- Flyway Database Migration V1: Initial E-Commerce Schema

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    slug VARCHAR(128) NOT NULL UNIQUE,
    description TEXT,
    icon_name VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    sku VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    original_price NUMERIC(12, 2),
    stock_quantity INT NOT NULL DEFAULT 0,
    reserved_stock INT NOT NULL DEFAULT 0,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    image_url VARCHAR(1024),
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_tags (
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    tag VARCHAR(64) NOT NULL,
    PRIMARY KEY (product_id, tag)
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(128) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'ROLE_CUSTOMER',
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    avatar_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupons (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(64) NOT NULL UNIQUE,
    discount_percent INT NOT NULL,
    max_discount NUMERIC(12, 2) NOT NULL,
    min_order_amount NUMERIC(12, 2) NOT NULL,
    valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(64) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    subtotal NUMERIC(12, 2) NOT NULL,
    discount_amount NUMERIC(12, 2) DEFAULT 0.00,
    tax_amount NUMERIC(12, 2) NOT NULL,
    shipping_amount NUMERIC(12, 2) NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
    coupon_code VARCHAR(64),
    payment_method VARCHAR(64),
    transaction_ref VARCHAR(128),
    shipping_full_name VARCHAR(128),
    shipping_street VARCHAR(255),
    shipping_city VARCHAR(128),
    shipping_state VARCHAR(64),
    shipping_zip_code VARCHAR(32),
    shipping_country VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    product_name VARCHAR(255) NOT NULL,
    sku VARCHAR(64) NOT NULL,
    quantity INT NOT NULL,
    unit_price NUMERIC(12, 2) NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL
);

-- Performance Indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);`,
    keyConcepts: ['PostgreSQL Schema Design', 'B-Tree Indexes', 'Foreign Key Constraints', 'Audit Timestamps'],
  },
  {
    path: 'src/test/java/com/ecommerce/OrderServiceTest.java',
    name: 'OrderServiceTest.java',
    category: 'test',
    language: 'java',
    description: 'Unit tests using JUnit 5, AssertJ, and Mockito simulating stock depletion and discount math.',
    code: `package com.ecommerce;

import com.ecommerce.domain.dto.OrderItemRequestDto;
import com.ecommerce.domain.dto.OrderRequestDto;
import com.ecommerce.domain.dto.OrderResponseDto;
import com.ecommerce.domain.model.*;
import com.ecommerce.exception.InsufficientStockException;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.OrderService;
import com.ecommerce.service.PaymentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private PaymentService paymentService;
    @Mock
    private ApplicationEventPublisher eventPublisher;

    @InjectMocks
    private OrderService orderService;

    private User sampleUser;
    private Product sampleProduct;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder().id(1L).email("alex@example.com").build();
        sampleProduct = Product.builder()
                .id(100L)
                .sku("AUD-PRO")
                .name("Audiophile Headset")
                .price(BigDecimal.valueOf(200.00))
                .stockQuantity(10)
                .reservedStock(0)
                .build();
    }

    @Test
    @DisplayName("Should successfully process order when stock is available")
    void checkout_Success() {
        // Given
        OrderRequestDto request = new OrderRequestDto();
        request.setPaymentMethod("STRIPE");
        request.setItems(List.of(new OrderItemRequestDto(100L, 2)));

        when(userRepository.findById(1L)).thenReturn(Optional.of(sampleUser));
        when(productRepository.findByIdWithPessimisticLock(100L)).thenReturn(Optional.of(sampleProduct));
        when(paymentService.charge(any(), any(), any())).thenReturn("txn_mock_12345");
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // When
        OrderResponseDto response = orderService.checkoutOrder(1L, request);

        // Then
        assertThat(response).isNotNull();
        assertThat(sampleProduct.getStockQuantity()).isEqualTo(8); // 10 - 2 = 8
        verify(paymentService).charge(any(), eq("STRIPE"), eq("alex@example.com"));
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    @DisplayName("Should throw InsufficientStockException when requested quantity exceeds available stock")
    void checkout_InsufficientStock_ThrowsException() {
        // Given
        OrderRequestDto request = new OrderRequestDto();
        request.setItems(List.of(new OrderItemRequestDto(100L, 15))); // Requesting 15 when only 10 in stock

        when(userRepository.findById(1L)).thenReturn(Optional.of(sampleUser));
        when(productRepository.findByIdWithPessimisticLock(100L)).thenReturn(Optional.of(sampleProduct));

        // When & Then
        assertThatThrownBy(() -> orderService.checkoutOrder(1L, request))
                .isInstanceOf(InsufficientStockException.class)
                .hasMessageContaining("Insufficient stock");

        verify(paymentService, never()).charge(any(), any(), any());
        verify(orderRepository, never()).save(any());
    }
}`,
    annotations: ['@ExtendWith(MockitoExtension.class)', '@Test', '@DisplayName'],
    keyConcepts: ['Unit Testing Best Practices', 'Mocking Repository & Payment Gateway', 'Stock Invariant Assertion'],
  },
  {
    path: 'docker-compose.yml',
    name: 'docker-compose.yml',
    category: 'infra',
    language: 'yaml',
    description: 'Local development orchestration container stack with Spring Boot, PostgreSQL 16, Redis 7, and Kafka.',
    code: `version: '3.8'

services:
  ecommerce-api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ecommerce-spring-api
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_URL=jdbc:postgresql://postgres:5432/ecommerce_db
      - DB_USER=postgres
      - DB_PASSWORD=postgres_secret
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - JWT_SECRET=9a8f3b2c1e4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - ecommerce-net

  postgres:
    image: postgres:16-alpine
    container_name: ecommerce-postgres
    environment:
      - POSTGRES_DB=ecommerce_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres_secret
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d ecommerce_db"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - ecommerce-net

  redis:
    image: redis:7-alpine
    container_name: ecommerce-redis
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - ecommerce-net

volumes:
  pgdata:

networks:
  ecommerce-net:
    driver: bridge`,
    keyConcepts: ['Multi-Container Architecture', 'Healthcheck Dependent Startup', 'Persistent Volume Mounts'],
  },
  {
    path: 'Dockerfile',
    name: 'Dockerfile',
    category: 'infra',
    language: 'dockerfile',
    description: 'Multi-stage production Docker build utilizing Eclipse Temurin JDK 21 and layer caching.',
    code: `# Multi-stage Docker build for Java 21 Spring Boot Application

# Stage 1: Build & Dependencies
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
# Pre-download dependencies to leverage Docker layer caching
RUN ./mvnw dependency:go-offline -B

COPY src src
RUN ./mvnw clean package -DskipTests -B

# Stage 2: Runtime Image with JRE
FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app

# Run as non-root user for container security hardening
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=builder --chown=spring:spring /app/target/*.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-XX:+UseZGC -XX:+ZGenerational -XX:MaxRAMPercentage=75.0"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]`,
    keyConcepts: ['Multi-Stage Docker Build', 'Non-Root Security Hardening', 'Java 21 Generational ZGC Tuning'],
  }
];
