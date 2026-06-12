import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowUp } from 'lucide-react';

export default function StickyPurchaseBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal after user scrolls past 600px (typically hero section)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCheckout = () => {
    const orderForm = document.getElementById("form-commande");
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-brand-border/40 shadow-xl shadow-brand-dark/10 py-3.5 px-4 md:hidden flex items-center justify-between gap-4 select-none"
        >
          {/* Product Info Preview */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-brand-beige flex items-center justify-center font-bold text-base shadow-inner">
              🌱
            </div>
            <div>
              <p className="text-[10px] text-brand-dark/50 uppercase tracking-widest font-black leading-tight">Cure Vitalité</p>
              <p className="text-xs font-bold text-brand-dark leading-tight mt-0.5">Livraison Gratuite</p>
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={scrollToCheckout}
            className="flex-grow max-w-[190px] py-3 bg-[#25D366] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#25D366]/25 flex items-center justify-center gap-2 shimmer-btn cursor-pointer"
          >
            <ShoppingBag size={14} />
            Commander
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
