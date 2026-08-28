import React, { useState } from 'react';
import { FlipkartProvider, useFlipkart } from './context/FlipkartContext';
import { Header } from './components/flipkart/Header';
import { CategoryBar } from './components/flipkart/CategoryBar';
import { FlipkartHome } from './components/flipkart/FlipkartHome';
import { ProductListing } from './components/flipkart/ProductListing';
import { ProductDetail } from './components/flipkart/ProductDetail';
import { CartView } from './components/flipkart/CartView';
import { CheckoutView } from './components/flipkart/CheckoutView';
import { OrdersView } from './components/flipkart/OrdersView';
import { WishlistView } from './components/flipkart/WishlistView';
import { SuperCoinsZone } from './components/flipkart/SuperCoinsZone';
import { SellerModal } from './components/flipkart/SellerModal';
import { LoginModal } from './components/flipkart/LoginModal';
import { Footer } from './components/flipkart/Footer';
import { ToastContainer } from './components/flipkart/ToastContainer';

// Main Storefront Screen
const FlipkartStore: React.FC = () => {
  const { currentView } = useFlipkart();
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f1f3f6] text-gray-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Flipkart Header (Search, Cart, SuperCoins, Account) */}
      <Header 
        onOpenSeller={() => setIsSellerModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Categories Bar */}
      {currentView !== 'checkout' && <CategoryBar />}

      {/* Dynamic View Router */}
      <main className="flex-1 w-full pb-8">
        {currentView === 'home' && <FlipkartHome />}
        {currentView === 'listing' && <ProductListing />}
        {currentView === 'detail' && <ProductDetail />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'orders' && <OrdersView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'supercoins' && <SuperCoinsZone />}
      </main>

      {/* Flipkart Footer */}
      <Footer onOpenSeller={() => setIsSellerModalOpen(true)} />

      {/* Seller Modal */}
      <SellerModal 
        isOpen={isSellerModalOpen} 
        onClose={() => setIsSellerModalOpen(false)} 
      />

      {/* Login & Profile Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <FlipkartProvider>
      <FlipkartStore />
    </FlipkartProvider>
  );
}
