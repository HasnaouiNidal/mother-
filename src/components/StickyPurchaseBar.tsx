import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import PrimaryCTA from './ui/PrimaryCTA';

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
          className="fixed bottom-0 left-0 right-0 z-sticky bg-white/95 backdrop-blur-md border-t border-brand-border/40 shadow-xl py-3.5 px-4 md:hidden flex items-center justify-between gap-4 select-none"
        >
          {/* Product Info Preview */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-brand-beige flex items-center justify-center font-bold text-base shadow-inner" aria-hidden="true">
              🌱
            </div>
            <div>
              <p className="text-[10px] text-brand-muted uppercase tracking-widest font-black leading-tight">Cure Vitalité</p>
              <p className="text-xs font-bold text-brand-dark leading-tight mt-0.5">Livraison Gratuite</p>
            </div>
          </div>

          {/* Quick Action Button */}
          <PrimaryCTA
            onClick={scrollToCheckout}
            theme="whatsapp"
            icon={<ShoppingBag size={14} aria-hidden="true" />}
            className="flex-grow max-w-[190px] min-h-[44px] py-2.5 px-4 text-xs font-black uppercase tracking-wider"
            ariaLabel="Aller au formulaire de commande"
          >
            Commander
          </PrimaryCTA>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
