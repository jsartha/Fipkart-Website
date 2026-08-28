export interface FlipkartCategory {
  id: string;
  name: string;
  slug: string;
  iconImage: string;
  subcategories: string[];
  bannerText: string;
}

export const flipkartCategories: FlipkartCategory[] = [
  {
    id: 'cat-top-offers',
    name: 'Top Offers',
    slug: 'top-offers',
    iconImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=160&auto=format&fit=crop&q=80',
    subcategories: ['Deals of the Day', 'Big Billion Special', 'Bank Discounts', 'Clearance Sale', 'Under ₹499'],
    bannerText: 'Up to 80% Off on Top Brands'
  },
  {
    id: 'cat-mobiles',
    name: 'Mobiles',
    slug: 'mobiles',
    iconImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=160&auto=format&fit=crop&q=80',
    subcategories: ['Smartphones', 'Apple iPhones', 'Samsung Galaxy', '5G Phones', 'Budget Phones', 'Mobile Cases & Covers'],
    bannerText: 'Latest 5G Flagships from ₹9,999'
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    iconImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=160&auto=format&fit=crop&q=80',
    subcategories: ['Laptops', 'Audio & Headphones', 'Cameras', 'Smart Watches', 'Gaming Consoles', 'Power Banks'],
    bannerText: 'Intel Core Ultra & M3 Laptops from ₹32,990'
  },
  {
    id: 'cat-fashion',
    name: 'Fashion',
    slug: 'fashion',
    iconImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=160&auto=format&fit=crop&q=80',
    subcategories: ["Men's Wear", "Women's Ethnic", "Footwear", "Watches", "Luggage & Bags", "Sunglasses"],
    bannerText: '50-80% Off on 5,000+ Fashion Brands'
  },
  {
    id: 'cat-appliances',
    name: 'Appliances',
    slug: 'appliances',
    iconImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=160&auto=format&fit=crop&q=80',
    subcategories: ['Televisions', 'Washing Machines', 'Refrigerators', 'Air Conditioners', 'Microwaves'],
    bannerText: 'Smart 4K TVs & Inverter ACs up to 60% Off'
  },
  {
    id: 'cat-home',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    iconImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=160&auto=format&fit=crop&q=80',
    subcategories: ['Kitchen Cookware', 'Home Furnishings', 'Bedsheets & Curtains', 'Mattresses', 'Cleaning Tools'],
    bannerText: 'Makeover Your Living Space'
  },
  {
    id: 'cat-grocery',
    name: 'Grocery',
    slug: 'grocery',
    iconImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=160&auto=format&fit=crop&q=80',
    subcategories: ['Staples', 'Beverages', 'Packaged Food', 'Personal Care', 'Household Care'],
    bannerText: 'Fresh Essentials Delivered to Your Doorstep'
  }
];

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  highlightTag: string;
  targetCategory: string;
  bgGradient: string;
  image: string;
  ctaText: string;
  badge: string;
}

export const heroBanners: HeroBanner[] = [
  {
    id: 'banner-1',
    title: 'THE BIG BILLION DAYS',
    subtitle: 'iPhone 16 Pro, Galaxy S25 Ultra & M3 MacBooks at Unbeatable Exchange Prices',
    highlightTag: 'UP TO 50% OFF + FLAT ₹10,000 BANK DISCOUNT',
    targetCategory: 'Mobiles',
    bgGradient: 'from-blue-900 via-indigo-900 to-slate-950',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1000&auto=format&fit=crop&q=80',
    ctaText: 'Shop Smartphone Deals',
    badge: '★ BIG BILLION SPECIAL'
  },
  {
    id: 'banner-2',
    title: 'ELECTRONICS CARNIVAL',
    subtitle: 'Sony XM5 Noise Cancelling, ROG Gaming Laptops & 4K OLED Displays',
    highlightTag: 'STARTING AT ₹1,499 | NO COST EMI UP TO 24 MONTHS',
    targetCategory: 'Electronics',
    bgGradient: 'from-purple-900 via-slate-900 to-indigo-950',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
    ctaText: 'Explore Gadgets',
    badge: '⚡ FLASH SALE LIVE'
  },
  {
    id: 'banner-3',
    title: 'TRENDING FASHION STEALS',
    subtitle: "Air Jordan 1s, Levi's Stretch Denims & Fossil Hybrid Smartwatches",
    highlightTag: 'MINIMUM 40-70% OFF + EXTRA 10% SUPERCOIN SAVINGS',
    targetCategory: 'Fashion',
    bgGradient: 'from-amber-900 via-rose-950 to-slate-950',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=80',
    ctaText: 'Grab Fashion Picks',
    badge: '🔥 HOT DEALS'
  },
  {
    id: 'banner-4',
    title: 'SUPER VALUE APPLIANCES',
    subtitle: 'LG AI Front Loaders & Samsung 55" Crystal 4K UHD Smart TVs',
    highlightTag: 'FREE INSTALLATION + EXTENDED 3-YEAR WARRANTY',
    targetCategory: 'Appliances',
    bgGradient: 'from-teal-900 via-slate-900 to-emerald-950',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1000&auto=format&fit=crop&q=80',
    ctaText: 'Upgrade Home',
    badge: '🛡️ FLIPKART ASSURED'
  }
];
