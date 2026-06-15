import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { openWhatsApp } from '../lib/utils';
import FloatingWhatsAppButton from './ui/FloatingWhatsAppButton';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    // Show when scrolled or after 5 seconds delay
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Show notification bubble shortly after button is visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Hide floating button when near the footer to avoid covering content
  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearFooter(entry.isIntersecting);
      },
      { rootMargin: "100px 0px 0px 0px" } // trigger slightly before footer is in view
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, [isVisible]);

  const handleButtonClick = () => {
    openWhatsApp("Bonjour, j'ai besoin de conseils pour ma commande Health Power.");
  };

  return (
    <AnimatePresence>
      {isVisible && !isNearFooter && (
        <div className="fixed right-6 md:right-8 lg:right-10 z-floating flex flex-col items-end gap-3.5 bottom-[calc(6.5rem+env(safe-area-inset-bottom))] md:bottom-8 lg:bottom-10 select-none">
          {/* Notification bubble */}
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-white p-3.5 rounded-2xl shadow-xl border border-brand-border/40 text-xs text-brand-dark max-w-[240px] relative select-none"
              >
                {/* Close button */}
                <button 
                  onClick={() => setShowNotification(false)}
                  className="absolute top-1.5 right-1.5 text-brand-dark/30 hover:text-brand-dark transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green rounded-md outline-none"
                  aria-label="Fermer la suggestion"
                >
                  <X size={12} />
                </button>

                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                  <span className="font-bold text-[10px] text-brand-green uppercase tracking-wider">Conseiller en Ligne</span>
                </div>
                <p className="font-light text-brand-dark/95 pr-2">
                  Salam ! Besoin d'aide pour choisir le bon pack ? Je suis disponible pour répondre à vos questions.
                </p>
                {/* Triangle pointer */}
                <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-b border-r border-brand-border/30 transform rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main Floating Button */}
          <FloatingWhatsAppButton
            onClick={handleButtonClick}
            badgeCount={showNotification ? 1 : 0}
            ariaLabel="Discuter avec un conseiller sur WhatsApp"
          />
        </div>
      )}
    </AnimatePresence>
  );
}

