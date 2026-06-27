import { Leaf, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';
import SecondaryCTA from './ui/SecondaryCTA';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-brand-dark text-white pt-16 pb-8 border-t border-white/5 relative z-20"
      aria-label="Pied de page"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Guarantee strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 p-6 bg-white/5 rounded-2xl border border-white/10">
          {[
            { icon: <ShieldCheck size={16} className="text-brand-gold" />, text: 'Paiement à la livraison' },
            { icon: <Truck size={16} className="text-brand-green-light" />, text: 'Livraison partout au Maroc' },
            { icon: <MessageCircle size={16} className="text-whatsapp-green" />, text: 'Conseil WhatsApp' },
            { icon: <Leaf size={16} className="text-brand-gold" />, text: 'Compléments naturels' },
          ].map((g) => (
            <div key={g.text} className="flex items-center gap-2.5">
              <div className="shrink-0">{g.icon}</div>
              <span className="text-xs font-bold text-white/75">{g.text}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">

          {/* Column 1: Brand */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="bg-brand-green text-white p-2 rounded-xl flex items-center justify-center border border-white/10 shadow-md">
                <Leaf size={18} className="text-brand-gold" aria-hidden="true" />
              </div>
              <span className="font-serif font-black text-xl uppercase tracking-wider">
                Health <span className="text-brand-gold">Power</span> Maroc
              </span>
            </div>

            <p className="text-white/70 leading-relaxed mb-6 max-w-sm text-sm font-light">
              Votre marque marocaine de confiance pour des compléments alimentaires naturels. Accompagnement personnalisé avant chaque commande.
            </p>

            <SecondaryCTA
              onClick={() => openWhatsApp('Bonjour Health Power Maroc, j\'aimerais un conseil sur vos produits.')}
              theme="outline"
              icon={<MessageCircle size={16} aria-hidden="true" />}
              className="border-white/20 text-white hover:bg-white/10 hover:border-brand-gold hover:text-brand-gold min-h-[44px]"
              ariaLabel="Nous contacter par WhatsApp"
            >
              Contacter la conseillère
            </SecondaryCTA>
          </div>

          {/* Column 2: Quick links */}
          <div className="flex flex-col items-start md:pl-8">
            <h4 className="font-serif font-bold text-sm tracking-wider mb-5 text-brand-gold uppercase">
              Liens rapides
            </h4>
            <ul className="space-y-3 font-sans text-sm font-light">
              {[
                { href: '#accueil', label: 'Accueil' },
                { href: '#notre-histoire', label: 'Notre histoire' },
                { href: '#vos-besoins', label: 'Vos besoins' },
                { href: '#produits', label: 'Nos produits' },
                { href: '#comment-commander', label: 'Comment commander' },
                { href: '#temoignages', label: 'Avis clients' },
                { href: '#faq', label: 'FAQ' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/75 hover:text-brand-gold transition-colors block focus-visible:ring-2 focus-visible:ring-brand-gold outline-none rounded-md px-1 py-0.5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Guarantees */}
          <div className="flex flex-col items-start">
            <h4 className="font-serif font-bold text-sm tracking-wider mb-5 text-brand-gold uppercase">
              Nos garanties
            </h4>
            <ul className="space-y-3 text-white/75 font-sans text-sm font-light" role="list">
              {[
                'Paiement en espèces à la livraison (COD)',
                'Livraison gratuite partout au Maroc',
                'Conseil WhatsApp avant commande',
                'Produits naturels sélectionnés avec soin',
                'Aucun engagement, aucune pression',
              ].map((g) => (
                <li key={g} className="flex items-center gap-2.5" role="listitem">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" aria-hidden="true" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-6 mb-4">
          <p className="text-[11px] text-white/30 font-light leading-relaxed text-center max-w-2xl mx-auto">
            Les produits Health Power Maroc sont des compléments alimentaires et ne remplacent pas un traitement médical ni un avis médical professionnel. Ces produits ne sont pas des médicaments.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-bold text-white/35 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Health Power Maroc. Tous droits réservés.</p>
          <p>Compléments alimentaires naturels 🇲🇦</p>
        </div>

      </div>
    </footer>
  );
}
