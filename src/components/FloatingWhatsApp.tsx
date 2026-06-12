import { MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { openWhatsApp } from '../lib/utils';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex flex-col items-end gap-3.5"
        >
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
                  className="absolute top-1.5 right-1.5 text-brand-dark/30 hover:text-brand-dark transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>

                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                  <span className="font-bold text-[10px] text-brand-green uppercase tracking-wider">Conseiller en Ligne</span>
                </div>
                <p className="font-light text-brand-dark/90 pr-2">
                  Salam ! Besoin d'aide pour choisir le bon pack ? Je suis disponible pour répondre à vos questions.
                </p>
                {/* Triangle pointer */}
                <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-b border-r border-brand-border/30 transform rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main Floating Button */}
          <div className="relative">
            {/* Pulsing Outer Glow */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10 pointer-events-none"></span>

            {/* Notification Badged Dot */}
            {showNotification && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-md border-2 border-white animate-bounce"
              >
                1
              </motion.span>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => openWhatsApp("Bonjour, j'ai besoin de conseils pour ma commande Health Power.")}
              className="w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer relative"
              aria-label="Contacter sur WhatsApp"
            >
              <MessageCircle size={30} className="animate-pulse-soft" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
