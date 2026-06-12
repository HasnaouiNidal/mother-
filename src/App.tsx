import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import QuizSection from './components/QuizSection';
import ProductsSection from './components/ProductsSection';
import QualityCertifications from './components/QualityCertifications';
import CheckoutForm from './components/CheckoutForm';
import BenefitsSection from './components/BenefitsSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LeafParticles from './components/LeafParticles';
import StickyPurchaseBar from './components/StickyPurchaseBar';

export default function App() {
  // Global order state (pre-selected when clicking commander or finishing quiz)
  const [orderState, setOrderState] = useState({
    productId: 'glycimax',
    qty: 2
  });

  const handleSelectProduct = (productId: string, qty: number) => {
    setOrderState({ productId, qty });
  };

  return (
    <div className="min-h-screen bg-brand-beige font-sans text-brand-dark selection:bg-brand-green/20 selection:text-brand-dark relative">
      {/* Drifting Leaves Particles Background */}
      <LeafParticles />

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <TrustBadges />
        <QuizSection onRecommend={handleSelectProduct} />
        <ProductsSection onSelectProduct={handleSelectProduct} />
        <QualityCertifications />
        <CheckoutForm selectedProduct={orderState.productId} selectedQty={orderState.qty} />
        <BenefitsSection />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
      <FloatingWhatsApp />
      
      {/* Mobile Sticky Order Conversion Bar */}
      <StickyPurchaseBar />
    </div>
  );
}
