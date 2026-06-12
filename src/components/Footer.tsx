import { Leaf, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Logo and Intro */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="bg-brand-green text-white p-2 rounded-xl flex items-center justify-center border border-white/10 shadow-md">
                <Leaf size={18} className="text-brand-gold-light" />
              </div>
              <span className="font-serif font-black text-xl uppercase tracking-wider flex items-center gap-1.5">
                Health <span className="text-brand-gold">Power</span>
              </span>
            </div>
            
            <p className="text-white/70 leading-relaxed mb-6 max-w-sm text-sm font-sans font-light">
              Votre marque marocaine de confiance pour des compléments alimentaires naturels et de haute qualité, formulés pour votre vitalité au quotidien.
            </p>
            
            <button 
              onClick={() => openWhatsApp("Bonjour Health Power, j'aimerais avoir plus d'informations sur vos cures de compléments.")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-all font-bold text-xs uppercase tracking-widest cursor-pointer hover:border-brand-gold hover:text-brand-gold"
            >
              <MessageCircle size={16} />
              Nous Contacter sur WhatsApp
            </button>
          </div>
          
          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-serif font-bold text-sm tracking-wider mb-6 text-brand-gold uppercase">Liens Rapides</h4>
            <ul className="space-y-4 font-sans text-sm font-light">
              <li>
                <a href="#produits" className="text-white/70 hover:text-brand-gold transition-colors block">
                  Nos Produits & Cures
                </a>
              </li>
              <li>
                <a href="#bienfaits" className="text-white/70 hover:text-brand-gold transition-colors block">
                  Comment commander
                </a>
              </li>
              <li>
                <a href="#temoignages" className="text-white/70 hover:text-brand-gold transition-colors block">
                  Avis & Retours Clients
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/70 hover:text-brand-gold transition-colors block">
                  Questions Fréquentes
                </a>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="md:col-span-4">
            <h4 className="font-serif font-bold text-sm tracking-wider mb-6 text-brand-gold uppercase">Nos Garanties</h4>
            <ul className="space-y-4 text-white/70 font-sans text-sm font-light">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                Paiement en espèces à la livraison (COD)
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                Service client réactif 7j/7 sur WhatsApp
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                Ingrédients certifiés conformes & sûrs
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                Livraison gratuite et rapide partout au Maroc
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest font-sans">
          <p>© {new Date().getFullYear()} Health Power Maroc. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>Production de Qualité Supérieure</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
