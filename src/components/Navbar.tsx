import { ShoppingBag, Menu, X, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { openWhatsApp } from '../lib/utils';
import PrimaryCTA from './ui/PrimaryCTA';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-sticky transition-[padding,background-color,border-color,box-shadow] duration-200 ${
        scrolled 
          ? "py-3 bg-white/95 backdrop-blur-md shadow-md border-b border-brand-border/40" 
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <button 
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              closeMenu();
            }}
            className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group focus-visible:ring-2 focus-visible:ring-brand-green outline-none rounded-xl"
            aria-label="Health Power - Retour en haut"
          >
            <div className={`p-2 rounded-xl flex items-center justify-center transition-all duration-200 ${
              scrolled 
                ? "bg-brand-green text-white shadow-sm" 
                : "bg-white/10 text-white border border-white/20"
            }`}>
              <Leaf size={20} className={scrolled ? "text-brand-gold" : "text-brand-gold-light"} aria-hidden="true" />
            </div>
            <span className={`font-serif font-black text-xl md:text-2xl uppercase tracking-tight transition-colors duration-200 ${
              scrolled ? "text-brand-dark" : "text-white"
            }`}>
              Health <span className={scrolled ? "text-brand-green-light" : "text-brand-gold-light"}>Power</span>
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['produits', 'bienfaits', 'temoignages', 'faq'].map((link) => (
              <a 
                key={link}
                href={`#${link}`} 
                className={`text-xs font-bold uppercase tracking-widest transition-colors relative py-2 group focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1 rounded-sm outline-none ${
                  scrolled 
                    ? "text-brand-dark/90 hover:text-brand-green" 
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link === 'temoignages' ? 'Avis Clients' : link}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full ${
                  scrolled ? "bg-brand-green" : "bg-brand-gold-light"
                }`}></span>
              </a>
            ))}
            
            <PrimaryCTA
              onClick={() => openWhatsApp("Bonjour, je souhaite passer une commande.")}
              theme="whatsapp"
              icon={<ShoppingBag size={16} aria-hidden="true" />}
              className="min-h-[40px] py-2 px-5 text-xs font-bold"
              ariaLabel="Commander par WhatsApp"
            >
              Commander
            </PrimaryCTA>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors focus-visible:ring-2 focus-visible:ring-brand-green rounded-xl outline-none min-h-[44px] min-w-[44px] flex items-center justify-center ${
                scrolled ? "text-brand-dark hover:text-brand-green" : "text-white hover:text-brand-gold-light"
              }`}
              aria-label={isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-brand-border/40 shadow-xl overflow-hidden py-4 z-drawer"
          >
            <div className="px-4 space-y-2 flex flex-col">
              <a 
                href="#produits" 
                onClick={closeMenu} 
                className="block px-4 py-3 text-sm uppercase tracking-wider font-bold text-brand-dark hover:bg-brand-beige-light hover:text-brand-green rounded-xl transition-all min-h-[44px] flex items-center focus-visible:ring-2 focus-visible:ring-brand-green outline-none"
              >
                Produits
              </a>
              <a 
                href="#bienfaits" 
                onClick={closeMenu} 
                className="block px-4 py-3 text-sm uppercase tracking-wider font-bold text-brand-dark hover:bg-brand-beige-light hover:text-brand-green rounded-xl transition-all min-h-[44px] flex items-center focus-visible:ring-2 focus-visible:ring-brand-green outline-none"
              >
                Bienfaits
              </a>
              <a 
                href="#temoignages" 
                onClick={closeMenu} 
                className="block px-4 py-3 text-sm uppercase tracking-wider font-bold text-brand-dark hover:bg-brand-beige-light hover:text-brand-green rounded-xl transition-all min-h-[44px] flex items-center focus-visible:ring-2 focus-visible:ring-brand-green outline-none"
              >
                Avis Clients
              </a>
              <a 
                href="#faq" 
                onClick={closeMenu} 
                className="block px-4 py-3 text-sm uppercase tracking-wider font-bold text-brand-dark hover:bg-brand-beige-light hover:text-brand-green rounded-xl transition-all min-h-[44px] flex items-center focus-visible:ring-2 focus-visible:ring-brand-green outline-none"
              >
                Questions Fréquentes
              </a>
              
              <PrimaryCTA
                onClick={() => {
                  closeMenu();
                  openWhatsApp("Bonjour, je souhaite passer une commande.");
                }}
                theme="whatsapp"
                icon={<ShoppingBag size={18} aria-hidden="true" />}
                className="w-full mt-4 min-h-[48px] text-sm"
                ariaLabel="Commander maintenant par WhatsApp depuis le menu mobile"
              >
                Commander Maintenant
              </PrimaryCTA>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
