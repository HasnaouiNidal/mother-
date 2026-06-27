import { useState } from 'react';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import StickyPurchaseBar from './components/StickyPurchaseBar';
import LeafParticles from './components/LeafParticles';

// New trust-first sections
import HeroTrustSection from './components/HeroTrustSection';
import TrustBar from './components/TrustBar';
import OwnerStorySection from './components/OwnerStorySection';
import ProblemSection from './components/ProblemSection';

// Products & quiz
import QuizSection from './components/QuizSection';
import ProductsSection from './components/ProductsSection';

// Trust & transparency
import TransparencySection from './components/TransparencySection';

// Order flow
import CheckoutForm from './components/CheckoutForm';
import ProcessSection from './components/ProcessSection';

// Proof
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTASection from './components/FinalCTASection';

export default function App() {
  // Global order state — pre-selected when clicking problem cards, quiz result, or product cards
  const [orderState, setOrderState] = useState({
    productId: 'glycimax',
    qty: 2,
  });

  const handleSelectProduct = (productId: string, qty: number) => {
    setOrderState({ productId, qty });
    // Scroll to order form after short delay so the product card animation completes
    setTimeout(() => {
      const form = document.getElementById('form-commande');
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-brand-beige font-sans text-brand-dark selection:bg-brand-green/20 selection:text-brand-dark relative">
      {/* Drifting leaf background particles */}
      <LeafParticles />

      <Navbar />

      <main className="relative z-10">
        {/* 1. Hero — Human Trust First */}
        <HeroTrustSection />

        {/* 2. Trust Bar — fast reassurance strip */}
        <TrustBar />

        {/* 3. Owner Story — why people trust her */}
        <OwnerStorySection />

        {/* 4. Problem Cards — choose your need */}
        <ProblemSection onSelectProduct={handleSelectProduct} />

        {/* 5. Smart Quiz — get recommendation */}
        <QuizSection onRecommend={handleSelectProduct} />

        {/* 6. Products — Glycimax and Appeto+ */}
        <ProductsSection onSelectProduct={handleSelectProduct} />

        {/* 7. Transparency — quality, stock, advice, payment */}
        <TransparencySection />

        {/* 8. Order Form — WhatsApp pre-filled */}
        <CheckoutForm selectedProduct={orderState.productId} selectedQty={orderState.qty} />

        {/* 9. How it works — send, confirm, receive/pay */}
        <ProcessSection />

        {/* 10. Testimonials — real trust stories */}
        <Testimonials />

        {/* 11. FAQ — objections */}
        <FAQ />

        {/* 12. Final CTA — talk with advisor */}
        <FinalCTASection />
      </main>

      <Footer />

      {/* Floating WhatsApp button (desktop + tablet) */}
      <FloatingWhatsApp />

      {/* Mobile sticky WhatsApp bar */}
      <StickyPurchaseBar />
    </div>
  );
}
