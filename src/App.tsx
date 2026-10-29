import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { GameDemosShowcase } from './components/GameDemosShowcase';
import { ProductModal } from './components/ProductModal';
import { RepairServices } from './components/RepairServices';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { RepairTracker } from './components/RepairTracker';
import { TradeInValuator } from './components/TradeInValuator';
import { CartDrawer } from './components/CartDrawer';
import { OnlineChatWidget } from './components/OnlineChatWidget';
import { StoreLocation } from './components/StoreLocation';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { PRODUCTS, SAMPLE_APPOINTMENTS } from './data/mockData';
import { Product, RepairService, CartItem, RepairAppointment } from './types';
import { Check } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appointments, setAppointments] = useState<RepairAppointment[]>(SAMPLE_APPOINTMENTS);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<RepairService | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartFeedback, setCartFeedback] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Provide subtle feedback
    setCartFeedback(`Added "${product.name}" to bag`);
    setTimeout(() => setCartFeedback(null), 2500);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Booking handlers
  const handleOpenBooking = (service?: RepairService) => {
    setPreSelectedService(service || null);
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (newAppointment: RepairAppointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
        {/* Subtle cart add toast */}
        {cartFeedback && (
          <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white shadow-xl animate-in fade-in slide-in-from-top-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{cartFeedback}</span>
          </div>
        )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreStore={() => {
            document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenTradeIn={() => {
            document.getElementById('tradein')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* E-Commerce Store Section */}
        <ProductCatalog
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onViewDetails={(product) => setSelectedProduct(product)}
        />

        {/* Next-Gen Playable Game Demos & Cinematic Showcases */}
        <GameDemosShowcase />

        {/* Repair Workshop Section */}
        <RepairServices
          onSelectServiceForBooking={(service) => handleOpenBooking(service)}
          onOpenGeneralBooking={() => handleOpenBooking()}
        />

        {/* Real-Time Repair Tracker Section */}
        <RepairTracker
          appointments={appointments}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Trade-In & Buy/Sell Valuation Section */}
        <TradeInValuator />

        {/* Storefront Location, Dugbe Map & Verified Reviews */}
        <StoreLocation />
      </main>

      {/* Footer */}
      <Footer />

      {/* Appointment Booking Modal */}
      <AppointmentBookingModal
        isOpen={isBookingOpen}
        preSelectedService={preSelectedService}
        onClose={() => {
          setIsBookingOpen(false);
          setPreSelectedService(null);
        }}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Integrated Online Chat Widget */}
      <OnlineChatWidget onOpenBooking={() => handleOpenBooking()} />

      {/* User Login & Account Creation Modal */}
      <AuthModal />
    </div>
    </AuthProvider>
  );
}
