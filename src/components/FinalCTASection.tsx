import { MessageCircle, Leaf } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';

export default function FinalCTASection() {
  return (
    <section
      id="contact-conseillere"
      className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-[#071E12] via-[#0E2E1C] to-[#071E12] text-white relative z-20 overflow-hidden"
      aria-label="Contactez notre conseillère"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-green/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <svg className="absolute top-8 right-12 w-24 h-24 text-white/5" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 5 Q80 30 75 65 Q50 90 25 65 Q20 30 50 5Z" />
        </svg>
        <svg className="absolute bottom-8 left-12 w-16 h-16 text-brand-gold/10 rotate-45" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 5 Q80 30 75 65 Q50 90 25 65 Q20 30 50 5Z" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Icon */}
        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Leaf size={28} className="text-brand-gold" aria-hidden="true" />
        </div>

        {/* Headline */}
        <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
          Vous hésitez encore ?{' '}
          <span className="text-brand-gold">Parlez directement</span>{' '}
          avec notre conseillère.
        </h2>

        {/* Sub text */}
        <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto font-light">
          Expliquez votre besoin sur WhatsApp et recevez une orientation simple avant de commander. Aucun engagement, aucun paiement en ligne.
        </p>

        {/* Trust pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {['✓ Réponse rapide', '✓ Conseil gratuit', '✓ Sans pression', '✓ Paiement à la livraison'].map((pill) => (
            <span
              key={pill}
              className="text-xs font-bold text-white/60 bg-white/5 border border-white/10 rounded-full px-4 py-1.5"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          id="final-cta-whatsapp"
          onClick={() => openWhatsApp('Bonjour Health Power Maroc ! J\'hésite encore et j\'aimerais un conseil avant de commander. Pouvez-vous m\'aider ?')}
          className="shimmer-btn inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-base text-white shadow-2xl shadow-whatsapp-green/20 hover:scale-[1.03] active:scale-[0.98] transition-transform cursor-pointer focus-visible:ring-2 focus-visible:ring-whatsapp-green outline-none min-h-[60px]"
          aria-label="Discuter sur WhatsApp avec la conseillère"
        >
          <MessageCircle size={22} aria-hidden="true" />
          Discuter sur WhatsApp
        </button>

        <p className="text-white/30 text-xs mt-5 font-medium">
          Health Power Maroc — Compléments alimentaires naturels 🇲🇦
        </p>

      </div>
    </section>
  );
}
