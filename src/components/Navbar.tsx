import { ShoppingBag, Menu, X, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { openWhatsApp } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "py-3 glass-panel shadow-lg shadow-brand-dark/5 border-b border-brand-border/40" 
        : "py-5 bg-transparent border-b border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer group">
            <div className="bg-brand-green text-white p-2 rounded-xl flex items-center justify-center shadow-md shadow-brand-green/10 transition-transform duration-500 group-hover:rotate-12">
              <Leaf size={20} className="text-brand-gold-light" />
            </div>
            <span className="font-serif font-black text-xl md:text-2xl uppercase tracking-tight text-brand-dark flex items-center gap-1.5">
              Health <span className="text-brand-gold">Power</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['produits', 'bienfaits', 'temoignages', 'faq'].map((link) => (
              <a 
                key={link}
                href={`#${link}`} 
                className="text-brand-dark/80 hover:text-brand-green text-xs font-bold uppercase tracking-widest transition-colors relative py-2 group"
              >
                {link === 'temoignages' ? 'Avis Clients' : link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openWhatsApp("Bonjour, je souhaite passer une commande.")}
              className="px-6 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-full shadow-md shadow-[#25D366]/20 transition-all flex items-center gap-2 text-sm shimmer-btn cursor-pointer"
            >
              <ShoppingBag size={16} />
              Commander
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark hover:text-brand-green p-2 transition-colors"
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
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-brand-border/40 shadow-xl overflow-hidden py-4"
          >
            <div className="px-4 space-y-2 flex flex-col">
              <a href="#produits" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm uppercase tracking-wider font-bold text-brand-dark/80 hover:bg-brand-beige-light hover:text-brand-green rounded-xl transition-all">Produits</a>
              <a href="#bienfaits" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm uppercase tracking-wider font-bold text-brand-dark/80 hover:bg-brand-beige-light hover:text-brand-green rounded-xl transition-all">Bienfaits</a>
              <a href="#temoignages" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm uppercase tracking-wider font-bold text-brand-dark/80 hover:bg-brand-beige-light hover:text-brand-green rounded-xl transition-all">Avis Clients</a>
              <a href="#faq" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-sm uppercase tracking-wider font-bold text-brand-dark/80 hover:bg-brand-beige-light hover:text-brand-green rounded-xl transition-all">Questions Fréquentes</a>
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  openWhatsApp("Bonjour, je souhaite passer une commande.");
                }}
                className="mt-4 w-full px-5 py-4 bg-[#25D366] text-white font-black rounded-full shadow-lg shadow-[#25D366]/25 flex justify-center items-center gap-2 text-base shimmer-btn cursor-pointer"
              >
                <ShoppingBag size={18} />
                Commander Maintenant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
