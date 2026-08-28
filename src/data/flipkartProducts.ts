import { Product, Review } from '../types/flipkart';

export const sampleProducts: Product[] = [
  // MOBILES & TABLETS
  {
    id: 'mob-ip16-pro',
    title: 'Apple iPhone 16 Pro Max (Desert Titanium, 256 GB)',
    brand: 'Apple',
    category: 'Mobiles',
    subcategory: 'Smartphones',
    price: 144900,
    originalPrice: 159900,
    discountPercent: 9,
    rating: 4.7,
    ratingCount: 14280,
    reviewCount: 1240,
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 18,
    isAssured: true,
    highlights: [
      '256 GB ROM Storage',
      '17.53 cm (6.9 inch) Super Retina XDR ProMotion OLED Display',
      '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto | 12MP TrueDepth Front',
      'A18 Pro Bionic Chip with 6-core GPU & Apple Intelligence Ready',
      'Grade 5 Titanium Construction with Camera Control Button',
      'Ceramic Shield Gen 2 Protection | Action Button'
    ],
    specifications: [
      {
        groupName: 'General',
        specs: [
          { name: 'Model Name', value: 'iPhone 16 Pro Max' },
          { name: 'Color', value: 'Desert Titanium' },
          { name: 'SIM Type', value: 'Dual SIM (Nano + eSIM)' },
          { name: 'Quick Charging', value: 'Yes (50% in 30 mins with 20W or higher)' }
        ]
      },
      {
        groupName: 'Display Features',
        specs: [
          { name: 'Display Size', value: '17.53 cm (6.9 inch)' },
          { name: 'Resolution', value: '2868 x 1320 Pixels' },
          { name: 'Display Type', value: 'Super Retina XDR OLED' },
          { name: 'Refresh Rate', value: '120 Hz ProMotion' }
        ]
      },
      {
        groupName: 'Processor & Memory',
        specs: [
          { name: 'Processor', value: 'A18 Pro Hexa Core Chip' },
          { name: 'Internal Storage', value: '256 GB' },
          { name: 'RAM', value: '8 GB' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-1', bankName: 'HDFC Bank', title: 'Flat ₹5,000 Instant Discount on HDFC Bank Credit Card EMI', code: 'HDFC5000' },
      { id: 'bo-2', bankName: 'Flipkart Axis Bank', title: '5% Unlimited Cashback on Flipkart Axis Bank Credit Card', code: 'AXIS5' },
      { id: 'bo-3', bankName: 'Special Offer', title: 'Get Extra ₹3,000 Off with Exchange of Old Smartphone' }
    ],
    seller: {
      name: 'SuperComNet Retail',
      rating: 4.8,
      isFlipkartAssured: true,
      returnPolicyDays: 7
    },
    variants: {
      colors: [
        { name: 'Desert Titanium', colorCode: '#C4A482', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80' },
        { name: 'Natural Titanium', colorCode: '#9A9A9A', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80' },
        { name: 'Black Titanium', colorCode: '#2B2B2B', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80' },
        { name: 'White Titanium', colorCode: '#EDEDED', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80' }
      ],
      storage: ['256 GB', '512 GB', '1 TB']
    },
    tags: ['BESTSELLER', 'BIG_BILLION_SPECIAL'],
    deliveryDays: 1,
    warranty: '1 Year Brand Warranty for Phone & 6 Months for In-Box Accessories'
  },
  {
    id: 'mob-s25-ultra',
    title: 'SAMSUNG Galaxy S25 Ultra 5G (Titanium Gray, 512 GB)',
    brand: 'Samsung',
    category: 'Mobiles',
    subcategory: 'Smartphones',
    price: 139999,
    originalPrice: 154999,
    discountPercent: 10,
    rating: 4.8,
    ratingCount: 9430,
    reviewCount: 980,
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 24,
    isAssured: true,
    highlights: [
      '12 GB RAM | 512 GB ROM',
      '17.27 cm (6.8 inch) Quad HD+ Dynamic AMOLED 2X Display (Anti-Reflective)',
      '200MP + 50MP + 50MP + 12MP Quad Rear Camera | 12MP Front Camera',
      '5000 mAh Massive Battery with 45W Fast Charging',
      'Snapdragon 8 Elite Processor with Galaxy AI',
      'Integrated S-Pen Stylus with Air Actions'
    ],
    specifications: [
      {
        groupName: 'General',
        specs: [
          { name: 'Model Name', value: 'Galaxy S25 Ultra 5G' },
          { name: 'Color', value: 'Titanium Gray' },
          { name: 'Operating System', value: 'Android 15 with One UI 7.1' }
        ]
      },
      {
        groupName: 'Camera Features',
        specs: [
          { name: 'Primary Camera', value: '200MP OIS Wide + 50MP Periscope 5x' },
          { name: 'Video Recording', value: '8K @ 30fps, 4K @ 120fps' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-s1', bankName: 'ICICI Bank', title: '₹10,000 Instant Bank Discount on ICICI Bank Cards', code: 'ICICI10K' },
      { id: 'bo-s2', bankName: 'Axis Bank', title: '₹8,000 Instant Discount on Axis Bank Credit Cards' }
    ],
    seller: {
      name: 'IndiFlash Electronics',
      rating: 4.9,
      isFlipkartAssured: true,
      returnPolicyDays: 7
    },
    variants: {
      colors: [
        { name: 'Titanium Gray', colorCode: '#737373', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80' },
        { name: 'Titanium Black', colorCode: '#1C1C1C', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80' },
        { name: 'Titanium Blue', colorCode: '#2B4C7E', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80' }
      ],
      storage: ['256 GB', '512 GB', '1 TB']
    },
    tags: ['DEAL_OF_DAY', 'TRENDING'],
    deliveryDays: 1,
    warranty: '1 Year Manufacturer Warranty for Device and 6 Months for In-Box Accessories'
  },
  {
    id: 'mob-nothing-2a',
    title: 'Nothing Phone (2a) Plus (Black, 256 GB)',
    brand: 'Nothing',
    category: 'Mobiles',
    subcategory: 'Smartphones',
    price: 24999,
    originalPrice: 29999,
    discountPercent: 16,
    rating: 4.5,
    ratingCount: 38400,
    reviewCount: 3290,
    thumbnail: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 45,
    isAssured: true,
    highlights: [
      '8 GB RAM | 256 GB ROM',
      '17.02 cm (6.7 inch) Full HD+ Flexible AMOLED 120Hz Display',
      '50MP OIS + 50MP Ultra-Wide | 50MP Front Camera',
      '5000 mAh Battery with 50W Fast Charging',
      'Dimensity 7350 Pro 5G Processor',
      'Iconic Glyph Interface 3-Light Strip'
    ],
    specifications: [
      {
        groupName: 'General',
        specs: [
          { name: 'Model Name', value: 'Phone (2a) Plus' },
          { name: 'Color', value: 'Black' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-n1', bankName: 'SBI Card', title: '10% Instant Discount on SBI Credit Card EMI up to ₹1,500', code: 'SBI1500' }
    ],
    seller: {
      name: 'OmniTech Retail',
      rating: 4.6,
      isFlipkartAssured: true,
      returnPolicyDays: 7
    },
    variants: {
      colors: [
        { name: 'Black', colorCode: '#111111', image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&auto=format&fit=crop&q=80' },
        { name: 'Grey', colorCode: '#A0A0A0', image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&auto=format&fit=crop&q=80' }
      ],
      storage: ['128 GB', '256 GB']
    },
    tags: ['BESTSELLER'],
    deliveryDays: 2,
    warranty: '1 Year Brand Warranty'
  },
  {
    id: 'mob-oneplus-13r',
    title: 'OnePlus 13R 5G (Astral Trail, 256 GB)',
    brand: 'OnePlus',
    category: 'Mobiles',
    subcategory: 'Smartphones',
    price: 42999,
    originalPrice: 47999,
    discountPercent: 10,
    rating: 4.6,
    ratingCount: 22100,
    reviewCount: 2150,
    thumbnail: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 30,
    isAssured: true,
    highlights: [
      '16 GB LPDDR5X RAM | 256 GB UFS 4.0 ROM',
      '17.22 cm (6.78 inch) 1.5K ProXDR 120Hz Display',
      '50MP Sony LYT-700 OIS + 8MP Ultra-Wide + 50MP Telephoto',
      '6000 mAh Glacier Battery with 100W SUPERVOOC Charge',
      'Snapdragon 8 Gen 3 Processor'
    ],
    specifications: [
      {
        groupName: 'General',
        specs: [{ name: 'Processor', value: 'Snapdragon 8 Gen 3' }]
      }
    ],
    bankOffers: [
      { id: 'bo-op1', bankName: 'OneCard', title: 'Flat ₹3,000 Instant Discount on OneCard Credit Cards' }
    ],
    seller: {
      name: 'SuperComNet',
      rating: 4.8,
      isFlipkartAssured: true,
      returnPolicyDays: 7
    },
    deliveryDays: 1,
    warranty: '1 Year Phone Warranty'
  },

  // LAPTOPS & ELECTRONICS
  {
    id: 'elec-macbook-m3',
    title: 'Apple MacBook Air M3 (16 GB Unified Memory / 512 GB SSD / macOS Sonoma / 13.6 Inch Liquid Retina)',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 124900,
    originalPrice: 134900,
    discountPercent: 7,
    rating: 4.8,
    ratingCount: 5120,
    reviewCount: 460,
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 12,
    isAssured: true,
    highlights: [
      'Apple M3 Chip (8-Core CPU, 10-Core GPU, 16-Core Neural Engine)',
      '16 GB Unified RAM | 512 GB Superfast NVMe SSD',
      '34.54 cm (13.6 Inch) Liquid Retina Display with True Tone (500 Nits)',
      'Up to 18 Hours Battery Life with MagSafe 3 Fast Charging',
      '1080p FaceTime HD Camera & 4-Speaker Sound System with Spatial Audio',
      'Backlit Magic Keyboard with Touch ID Sensor'
    ],
    specifications: [
      {
        groupName: 'General',
        specs: [
          { name: 'Model Name', value: 'MacBook Air 13 M3' },
          { name: 'Color', value: 'Midnight' },
          { name: 'Operating System', value: 'macOS Sonoma' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-mb1', bankName: 'HDFC Bank', title: 'Flat ₹10,000 Instant Discount on HDFC Credit Cards', code: 'HDFC10K' }
    ],
    seller: {
      name: 'RetailNet Tech',
      rating: 4.9,
      isFlipkartAssured: true,
      returnPolicyDays: 7
    },
    variants: {
      colors: [
        { name: 'Midnight', colorCode: '#1C2530', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80' },
        { name: 'Starlight', colorCode: '#E6DEC9', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80' },
        { name: 'Space Grey', colorCode: '#737478', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80' }
      ]
    },
    tags: ['BESTSELLER', 'BIG_BILLION_SPECIAL'],
    deliveryDays: 1,
    warranty: '1 Year Limited Apple Warranty'
  },
  {
    id: 'elec-sony-xm5',
    title: 'Sony WH-1000XM5 Active Noise Cancelling Bluetooth Headset with Auto NC Optimizer',
    brand: 'Sony',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 26990,
    originalPrice: 34990,
    discountPercent: 22,
    rating: 4.6,
    ratingCount: 18900,
    reviewCount: 2100,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 28,
    isAssured: true,
    highlights: [
      'Industry-leading Active Noise Cancellation with 2 processors & 8 microphones',
      'Magnificent sound engineered with lightweight 30mm carbon fiber drivers',
      'Crystal clear hands-free calling with 4 beamforming microphones',
      'Up to 30-hour battery life with quick charging (3 min charge for 3 hours)',
      'Touch sensor controls for music playback and Speak-to-Chat'
    ],
    specifications: [
      {
        groupName: 'Sound Features',
        specs: [
          { name: 'Driver Size', value: '30 mm' },
          { name: 'Frequency Response', value: '4 Hz - 40,000 Hz' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-sn1', bankName: 'Axis Bank', title: '5% Unlimited Cashback with Flipkart Axis Bank Card' }
    ],
    seller: {
      name: 'Appario Retail Pvt Ltd',
      rating: 4.7,
      isFlipkartAssured: true,
      returnPolicyDays: 7
    },
    variants: {
      colors: [
        { name: 'Silver Platinum', colorCode: '#DCDCDC', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80' },
        { name: 'Black', colorCode: '#181818', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80' }
      ]
    },
    tags: ['DEAL_OF_DAY', 'TRENDING'],
    deliveryDays: 1,
    warranty: '1 Year Manufacturer Warranty'
  },
  {
    id: 'elec-asus-rog',
    title: 'ASUS ROG Zephyrus G16 (2024) Intel Core Ultra 9 185H / RTX 4070 / 32GB RAM / 1TB SSD / 2.5K OLED 240Hz',
    brand: 'Asus',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 189990,
    originalPrice: 229990,
    discountPercent: 17,
    rating: 4.8,
    ratingCount: 1420,
    reviewCount: 180,
    thumbnail: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 8,
    isAssured: true,
    highlights: [
      'Intel Core Ultra 9 185H (16 Cores, 22 Threads, up to 5.1 GHz)',
      'NVIDIA GeForce RTX 4070 with 8GB GDDR6 VRAM (105W TGP)',
      '32 GB LPDDR5X 7467MHz RAM | 1 TB PCIe 4.0 NVMe M.2 SSD',
      '40.64 cm (16.0 inch) 2.5K OLED ROG Nebula Display (240Hz, 0.2ms, 100% DCI-P3)',
      'CNC Aluminum Unibody with Slash Lighting Array (1.85 kg Light)',
      'Windows 11 Home + Office Home & Student 2021 Pre-installed'
    ],
    specifications: [
      {
        groupName: 'Graphics',
        specs: [{ name: 'Dedicated Graphic Memory', value: '8 GB RTX 4070' }]
      }
    ],
    bankOffers: [
      { id: 'bo-as1', bankName: 'SBI Card', title: 'Flat ₹5,000 Instant Discount on SBI Credit Card' }
    ],
    seller: {
      name: 'OmniTech Gaming Retail',
      rating: 4.9,
      isFlipkartAssured: true,
      returnPolicyDays: 7
    },
    tags: ['TRENDING'],
    deliveryDays: 1,
    warranty: '1 Year Onsite Warranty + 1 Year Accidental Damage Protection'
  },
  {
    id: 'elec-canon-r50',
    title: 'Canon EOS R50 Mirrorless Camera with RF-S 18-45mm IS STM Lens Kit (24.2 MP, 4K 30p, Dual Pixel AF II)',
    brand: 'Canon',
    category: 'Electronics',
    subcategory: 'Cameras',
    price: 54990,
    originalPrice: 65995,
    discountPercent: 16,
    rating: 4.6,
    ratingCount: 3100,
    reviewCount: 390,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 15,
    isAssured: true,
    highlights: [
      '24.2 Megapixel APS-C CMOS Sensor with DIGIC X Image Engine',
      'Dual Pixel CMOS AF II with Subject Detection for Humans, Animals & Vehicles',
      'Uncropped 4K 30p Video oversampled from 6K & Full HD 120p Slow Motion',
      'Up to 15 frames/sec Continuous Shooting with Electronic Shutter',
      'Vari-angle Touchscreen LCD & 2.36M-dot OLED Electronic Viewfinder'
    ],
    specifications: [
      {
        groupName: 'Sensor',
        specs: [{ name: 'Sensor Type', value: 'APS-C CMOS (24.2 MP)' }]
      }
    ],
    bankOffers: [
      { id: 'bo-cn1', bankName: 'Federal Bank', title: '10% Instant Discount on Federal Bank Credit Cards' }
    ],
    seller: {
      name: 'PhotoPro Hub',
      rating: 4.8,
      isFlipkartAssured: true,
      returnPolicyDays: 7
    },
    tags: ['DEAL_OF_DAY'],
    deliveryDays: 2,
    warranty: '2 Years Canon India Warranty'
  },

  // FASHION & LIFESTYLE
  {
    id: 'fash-nike-jordan',
    title: 'Nike Air Jordan 1 Retro High OG Men Sneakers (University Blue / White / Black)',
    brand: 'Nike',
    category: 'Fashion',
    subcategory: 'Footwear',
    price: 13995,
    originalPrice: 16995,
    discountPercent: 17,
    rating: 4.7,
    ratingCount: 6800,
    reviewCount: 820,
    thumbnail: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 22,
    isAssured: true,
    highlights: [
      'Genuine Premium Nubuck Leather Upper with Iconic Wings Logo',
      'Encapsulated Nike Air-Sole Cushioning Unit in Heel',
      'Solid Rubber Cupsole with Deep Flex Grooves for Grip',
      'Classic High-Top Silhouette for Ankle Support'
    ],
    specifications: [
      {
        groupName: 'General',
        specs: [
          { name: 'Ideal For', value: 'Men' },
          { name: 'Type', value: 'High-Ankle Casual Sneakers' },
          { name: 'Sole Material', value: 'Rubber' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-nk1', bankName: 'Flipkart Axis', title: '5% Unlimited Cashback on Flipkart Axis Bank Credit Card' }
    ],
    seller: {
      name: 'Nike Flagship Direct',
      rating: 4.9,
      isFlipkartAssured: true,
      returnPolicyDays: 14
    },
    variants: {
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
    },
    tags: ['BESTSELLER', 'TRENDING'],
    deliveryDays: 2,
    warranty: '6 Months Manufacturer Warranty against manufacturing defects'
  },
  {
    id: 'fash-levis-jeans',
    title: "Levi's 511 Slim Fit Mid-Rise Clean Stretch Denim Jeans (Dark Indigo)",
    brand: "Levi's",
    category: 'Fashion',
    subcategory: "Men's Wear",
    price: 1999,
    originalPrice: 3999,
    discountPercent: 50,
    rating: 4.4,
    ratingCount: 28400,
    reviewCount: 2900,
    thumbnail: 'https://images.unsplash.com/photo-1542272604-780c96856453?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542272604-780c96856453?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 65,
    isAssured: true,
    highlights: [
      '99% Cotton, 1% Elastane Stretch Comfort Fabric',
      'Slim through the seat and thigh with a slim leg opening',
      'Classic 5-pocket styling with Levi’s Red Tab on back pocket',
      'Machine Wash Cold with like colors'
    ],
    specifications: [
      {
        groupName: 'Details',
        specs: [
          { name: 'Fit', value: 'Slim Fit' },
          { name: 'Closure', value: 'Button and Zip Fly' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-lv1', bankName: 'SBI Card', title: '10% Instant Discount on SBI Cards' }
    ],
    seller: {
      name: 'RetailNet Fashion',
      rating: 4.7,
      isFlipkartAssured: true,
      returnPolicyDays: 14
    },
    variants: {
      sizes: ['30', '32', '34', '36', '38']
    },
    tags: ['BESTSELLER', 'DEAL_OF_DAY'],
    deliveryDays: 1,
    warranty: 'Brand Warranty for manufacturing defects'
  },
  {
    id: 'fash-fossil-gen6',
    title: 'Fossil Gen 6 Hybrid Smartwatch with Heart Rate & Alexa (Smoke Stainless Steel, 44mm)',
    brand: 'Fossil',
    category: 'Fashion',
    subcategory: 'Watches',
    price: 9995,
    originalPrice: 18495,
    discountPercent: 45,
    rating: 4.5,
    ratingCount: 8900,
    reviewCount: 920,
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 19,
    isAssured: true,
    highlights: [
      'Classic Mechanical Hands paired with Always-on E-Ink Readout Display',
      'Up to 2 Weeks Battery Life on a single magnetic rapid charge',
      'Integrated SpO2, Heart Rate, Activity & Sleep Monitoring',
      'Built-in Amazon Alexa Voice Assistant & Notification Previews',
      '3 ATM Water Resistant (30 Meters Swimproof)'
    ],
    specifications: [
      {
        groupName: 'Sensors',
        specs: [{ name: 'Sensors', value: 'Optical Heart Rate, SpO2, Accelerometer' }]
      }
    ],
    bankOffers: [
      { id: 'bo-fs1', bankName: 'Axis Bank', title: '5% Unlimited Cashback with Flipkart Axis Bank Card' }
    ],
    seller: {
      name: 'TimeTrend Watch Studio',
      rating: 4.8,
      isFlipkartAssured: true,
      returnPolicyDays: 7
    },
    tags: ['DEAL_OF_DAY'],
    deliveryDays: 1,
    warranty: '2 Years International Manufacturer Warranty'
  },

  // HOME, KITCHEN & APPLIANCES
  {
    id: 'app-lg-washing',
    title: 'LG 8 Kg 5-Star AI Direct Drive Fully Automatic Front Load Washing Machine with In-Built Heater',
    brand: 'LG',
    category: 'Appliances',
    subcategory: 'Washing Machines',
    price: 33990,
    originalPrice: 48990,
    discountPercent: 30,
    rating: 4.7,
    ratingCount: 34200,
    reviewCount: 4120,
    thumbnail: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 14,
    isAssured: true,
    highlights: [
      '8 Kg Capacity: Suitable for large families (5 or more members)',
      '5 Star BEE Energy Rating for best-in-class power and water savings',
      'AI DD (Artificial Intelligence Direct Drive) intelligently protects fabric by 18%',
      'Steam Wash technology removes 99.9% allergens and dust mites',
      '1400 RPM spin speed for ultra-fast clothes drying',
      'Smart ThinQ WiFi connectivity for remote control & diagnosis'
    ],
    specifications: [
      {
        groupName: 'General',
        specs: [
          { name: 'Washing Capacity', value: '8 kg' },
          { name: 'Energy Rating', value: '5 Star' },
          { name: 'Maximum Spin Speed', value: '1400 rpm' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-lg1', bankName: 'HDFC Bank', title: '₹2,500 Instant Discount on HDFC Bank Credit Card EMI', code: 'HDFC2500' },
      { id: 'bo-lg2', bankName: 'Exchange Offer', title: 'Up to ₹4,000 Off on Exchange of Old Washing Machine' }
    ],
    seller: {
      name: 'OmniTech Appliances',
      rating: 4.8,
      isFlipkartAssured: true,
      returnPolicyDays: 10
    },
    tags: ['BESTSELLER', 'BIG_BILLION_SPECIAL'],
    deliveryDays: 1,
    warranty: '2 Years Comprehensive Warranty on Product & 10 Years on Motor'
  },
  {
    id: 'app-samsung-tv-55',
    title: 'SAMSUNG Crystal 4K Dynamic 138 cm (55 inch) Ultra HD Smart Tizen TV with Voice Assistant',
    brand: 'Samsung',
    category: 'Appliances',
    subcategory: 'Televisions',
    price: 39990,
    originalPrice: 68900,
    discountPercent: 41,
    rating: 4.6,
    ratingCount: 52100,
    reviewCount: 6800,
    thumbnail: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 20,
    isAssured: true,
    highlights: [
      'Ultra HD (4K) 3840 x 2160 Pixels Resolution',
      'Dynamic Crystal Color with 1 Billion True Colors & HDR 10+',
      'Crystal Processor 4K for Intelligent Upscaling',
      '20W Sound Output with Q-Symphony & Object Tracking Sound Lite',
      'Tizen OS with Netflix, Prime Video, Disney+ Hotstar, YouTube & Apple TV',
      '3 HDMI ports and 2 USB ports'
    ],
    specifications: [
      {
        groupName: 'Display',
        specs: [
          { name: 'Screen Size', value: '138 cm (55 inch)' },
          { name: 'Resolution', value: '4K Ultra HD (3840 x 2160)' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-tv1', bankName: 'ICICI Bank', title: '₹3,000 Instant Discount on ICICI Bank Cards' }
    ],
    seller: {
      name: 'IndiFlash Electronics',
      rating: 4.9,
      isFlipkartAssured: true,
      returnPolicyDays: 10
    },
    tags: ['DEAL_OF_DAY', 'TRENDING'],
    deliveryDays: 1,
    warranty: '1 Year Comprehensive Warranty + 1 Year Additional on Panel'
  },
  {
    id: 'home-philips-airfryer',
    title: 'PHILIPS Digital Air Fryer XL (4.1 L, Rapid Air Technology, 1400W, 90% Less Fat)',
    brand: 'Philips',
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Cookware',
    price: 6999,
    originalPrice: 11995,
    discountPercent: 41,
    rating: 4.6,
    ratingCount: 16400,
    reviewCount: 1890,
    thumbnail: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 35,
    isAssured: true,
    highlights: [
      'Patented Rapid Air Technology with Starfish Pan for even crispy results',
      'Touchscreen with 7 Pre-set cooking menus: Fries, Meat, Fish, Cake & Veggies',
      'Keep Warm function keeps food at optimal temperature for up to 30 mins',
      'QuickClean basket with non-stick coating & dishwasher safe parts'
    ],
    specifications: [
      {
        groupName: 'Power & Capacity',
        specs: [
          { name: 'Capacity', value: '4.1 Litres' },
          { name: 'Power Consumption', value: '1400 W' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-ph1', bankName: 'Axis Bank', title: '5% Cashback on Flipkart Axis Bank Card' }
    ],
    seller: {
      name: 'KitchenCraft Retail',
      rating: 4.7,
      isFlipkartAssured: true,
      returnPolicyDays: 7
    },
    tags: ['BESTSELLER'],
    deliveryDays: 1,
    warranty: '2 Years Global Philips Warranty'
  },

  // GROCERY & ESSENTIALS
  {
    id: 'groc-basmati-rice',
    title: 'India Gate Classic Aged Premium Basmati Rice (5 kg Jar, Long Grain & Aromatic)',
    brand: 'India Gate',
    category: 'Grocery',
    subcategory: 'Staples',
    price: 899,
    originalPrice: 1250,
    discountPercent: 28,
    rating: 4.7,
    ratingCount: 42000,
    reviewCount: 3800,
    thumbnail: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 100,
    isAssured: true,
    highlights: [
      'Aged for minimum 2 years for exquisite aroma and fluffy non-sticky grains',
      'Elongates up to 2.5x times its raw length when cooked',
      'Perfect for Royal Biryanis, Pulao and special festive dishes',
      'Airtight 5kg reusable food-grade container'
    ],
    specifications: [
      {
        groupName: 'General',
        specs: [
          { name: 'Quantity', value: '5 kg' },
          { name: 'Shelf Life', value: '24 Months' }
        ]
      }
    ],
    bankOffers: [
      { id: 'bo-gr1', bankName: 'SuperCoins', title: 'Save Extra ₹50 using 50 SuperCoins' }
    ],
    seller: {
      name: 'Flipkart Supermarket',
      rating: 4.9,
      isFlipkartAssured: true,
      returnPolicyDays: 3
    },
    tags: ['BESTSELLER'],
    deliveryDays: 1,
    warranty: '100% Quality Guaranteed by Flipkart Grocery'
  },
  {
    id: 'groc-nescafe-gold',
    title: 'NESCAFE Gold Blend Rich & Smooth Premium Instant Coffee Powder (200 g Glass Jar)',
    brand: 'Nescafe',
    category: 'Grocery',
    subcategory: 'Beverages',
    price: 649,
    originalPrice: 895,
    discountPercent: 27,
    rating: 4.8,
    ratingCount: 31000,
    reviewCount: 2900,
    thumbnail: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    stockCount: 85,
    isAssured: true,
    highlights: [
      'Crafted with carefully selected mountain-grown Arabica and Robusta beans',
      'Golden roasted to bring out smooth taste and tantalizing rich aroma',
      'Quick and easy to prepare hot or iced coffee'
    ],
    specifications: [
      {
        groupName: 'General',
        specs: [{ name: 'Net Quantity', value: '200 g' }]
      }
    ],
    bankOffers: [
      { id: 'bo-gr2', bankName: 'Flipkart Axis', title: '5% Unlimited Cashback' }
    ],
    seller: {
      name: 'Flipkart Supermarket',
      rating: 4.9,
      isFlipkartAssured: true,
      returnPolicyDays: 3
    },
    tags: ['DEAL_OF_DAY'],
    deliveryDays: 1,
    warranty: 'Authentic 100% Imported Product'
  }
];

export const sampleReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Rahul Sharma',
    rating: 5,
    title: 'Simply Outstanding & Flipkart Assured Delivery Was Lighting Fast!',
    comment: 'Got this delivered within 18 hours in Bangalore! The titanium finish is gorgeous and performance is blistering fast. Battery easily lasts 1.5 days under heavy usage.',
    date: '24 Aug 2026',
    verifiedBuyer: true,
    helpfulCount: 428,
    location: 'Bengaluru, Karnataka'
  },
  {
    id: 'rev-2',
    author: 'Pooja Verma',
    rating: 5,
    title: 'Value for Money! Camera is mindblowing 🔥',
    comment: 'The 5x optical zoom and 4K 120fps recording is cinema quality. Bank discount saved me extra ₹5,000 on my HDFC card. Highly recommended!',
    date: '18 Aug 2026',
    verifiedBuyer: true,
    helpfulCount: 295,
    location: 'Mumbai, Maharashtra'
  },
  {
    id: 'rev-3',
    author: 'Amitabh Sen',
    rating: 4,
    title: 'Great product, but charger not in the box',
    comment: 'Device is phenomenal. Just remember you need a 30W USB-C brick separately. Display is stunning in direct sunlight.',
    date: '12 Aug 2026',
    verifiedBuyer: true,
    helpfulCount: 114,
    location: 'Kolkata, West Bengal'
  }
];
