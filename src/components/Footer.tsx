import { Leaf, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';
import SecondaryCTA from './ui/SecondaryCTA';

export default function Footer() {
  return (
    <footer id="footer" className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/5 relative z-20" aria-label="Pied de page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Brand + short description + WhatsApp CTA */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="bg-brand-green text-white p-2 rounded-xl flex items-center justify-center border border-white/10 shadow-md">
                <Leaf size={18} className="text-brand-gold" aria-hidden="true" />
              </div>
              <span className="font-serif font-black text-xl uppercase tracking-wider flex items-center gap-1.5">
                Health <span className="text-brand-gold">Power</span>
              </span>
            </div>
            
            <p className="text-white/85 leading-relaxed mb-6 max-w-sm text-sm font-sans font-light">
              Votre marque marocaine de confiance pour des compléments alimentaires naturels et de haute qualité, formulés pour votre vitalité au quotidien.
            </p>
            
            <SecondaryCTA
              onClick={() => openWhatsApp("Bonjour Health Power, j'aimerais avoir plus d'informations sur vos cures de compléments.")}
              theme="outline"
              icon={<MessageCircle size={16} aria-hidden="true" />}
              className="border-white/20 text-white hover:bg-white/10 hover:border-brand-gold hover:text-brand-gold min-h-[44px] w-full sm:w-auto"
              ariaLabel="Nous contacter par WhatsApp"
            >
              Contacter le support
            </SecondaryCTA>
          </div>
          
          {/* Column 2: Liens rapides */}
          <div className="flex flex-col items-start md:pl-8 lg:pl-16">
            <h4 className="font-serif font-bold text-sm tracking-wider mb-6 text-brand-gold uppercase">Liens Rapides</h4>
            <ul className="space-y-4 font-sans text-sm font-light">
              <li>
                <a href="#produits" className="text-white/85 hover:text-brand-gold transition-colors block focus-visible:ring-2 focus-visible:ring-brand-gold outline-none rounded-md px-1 py-0.5">
                  Nos Produits & Cures
                </a>
              </li>
              <li>
                <a href="#bienfaits" className="text-white/85 hover:text-brand-gold transition-colors block focus-visible:ring-2 focus-visible:ring-brand-gold outline-none rounded-md px-1 py-0.5">
                  Comment commander
                </a>
              </li>
              <li>
                <a href="#temoignages" className="text-white/85 hover:text-brand-gold transition-colors block focus-visible:ring-2 focus-visible:ring-brand-gold outline-none rounded-md px-1 py-0.5">
                  Avis & Retours Clients
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/85 hover:text-brand-gold transition-colors block focus-visible:ring-2 focus-visible:ring-brand-gold outline-none rounded-md px-1 py-0.5">
                  Questions Fréquentes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Nos garanties */}
          <div className="flex flex-col items-start">
            <h4 className="font-serif font-bold text-sm tracking-wider mb-6 text-brand-gold uppercase">Nos Garanties</h4>
            <ul className="space-y-4 text-white/85 font-sans text-sm font-light" role="list">
              <li className="flex items-center gap-3" role="listitem">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" aria-hidden="true"></span>
                <span>Paiement en espèces à la livraison (COD)</span>
              </li>
              <li className="flex items-center gap-3" role="listitem">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" aria-hidden="true"></span>
                <span>Service client réactif 7j/7 sur WhatsApp</span>
              </li>
              <li className="flex items-center gap-3" role="listitem">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" aria-hidden="true"></span>
                <span>Ingrédients certifiés conformes & sûrs</span>
              </li>
              <li className="flex items-center gap-3" role="listitem">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" aria-hidden="true"></span>
                <span>Livraison gratuite et rapide partout au Maroc</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-white/45 uppercase tracking-widest font-sans">
          <p>© {new Date().getFullYear()} Health Power Maroc. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>Production de Qualité Supérieure</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

