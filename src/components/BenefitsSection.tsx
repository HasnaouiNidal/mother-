import { MessageCircle, CheckCircle, Truck } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';
import PrimaryCTA from './ui/PrimaryCTA';

export default function BenefitsSection() {
  const steps = [
    {
      icon: MessageCircle,
      title: "Contactez-nous",
      desc: "Cliquez pour envoyer un message WhatsApp pré-rempli en un clic."
    },
    {
      icon: CheckCircle,
      title: "Confirmation facile",
      desc: "Un conseiller vous recontacte rapidement pour valider votre commande."
    },
    {
      icon: Truck,
      title: "Recevez & payez",
      desc: "Livraison rapide à domicile et paiement sécurisé à la livraison."
    }
  ];

  return (
    <section 
      id="bienfaits" 
      className="py-28 sm:py-32 md:py-36 bg-brand-dark text-white border-y border-brand-border/10 relative overflow-hidden z-20" 
      aria-label="Processus de commande"
    >
      {/* Background Ambience Glow */}
      <div 
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-brand-green/15 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header (No clipping or overlap) */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-24">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-brand-gold font-bold bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-5 inline-block">
            Processus Simple
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white leading-tight mt-2 px-2">
            Commander chez nous est simple
          </h2>
          <p className="text-brand-gold-light/85 text-sm sm:text-base font-sans font-light mt-4 max-w-lg mx-auto">
            Pas besoin de carte bancaire. Nous privilégions la simplicité et la confiance mutuelle.
          </p>
        </div>

        {/* Steps Pipeline Grid */}
        <div className="relative" role="list">
          {/* Connecting line for desktop only */}
          <div 
            className="hidden md:block absolute top-[64px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-brand-gold/10 via-brand-gold/45 to-brand-gold/10 -z-0 pointer-events-none" 
            aria-hidden="true"
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;

              return (
                <div 
                  key={idx}
                  className="relative z-10 flex flex-col items-center text-center p-8 bg-brand-green-hover/20 rounded-3xl group border border-white/5 hover:border-brand-gold/30 transition-all duration-300"
                  role="listitem"
                >
                  {/* Step badge/icon wrap */}
                  <div className="relative mb-6">
                    {/* Outer circle: consistent icon style and size */}
                    <div 
                      className="w-16 h-16 bg-brand-green text-brand-gold rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors duration-300 relative" 
                      aria-hidden="true"
                    >
                      <IconComponent size={24} className="stroke-[2.25] group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    
                    {/* Step absolute index badge */}
                    <span 
                      className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-brand-gold text-brand-dark font-sans font-black text-sm flex items-center justify-center border-2 border-brand-dark shadow-md"
                    >
                      {idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-serif font-bold mb-3 tracking-wide text-white group-hover:text-brand-gold transition-colors">
                    {step.title}
                  </h3>
                  
                  {/* Short text description: font size >= 14px on mobile */}
                  <p className="text-white/75 leading-relaxed text-sm sm:text-base font-sans font-light">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Big centered CTA and reassurance line */}
        <div className="mt-16 md:mt-20 text-center flex flex-col items-center justify-center space-y-5">
          <PrimaryCTA
            onClick={() => openWhatsApp("Bonjour, je souhaite passer commande d'un de vos produits et bénéficier de la livraison gratuite ! ")}
            theme="whatsapp"
            icon={<MessageCircle size={22} aria-hidden="true" />}
            className="px-8 sm:px-12 py-4 sm:py-5 text-sm sm:text-base font-black tracking-wide shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            ariaLabel="Commander maintenant par WhatsApp"
          >
            Commander Maintenant via WhatsApp
          </PrimaryCTA>
          
          {/* Reassurance line: font size >= 14px on mobile */}
          <p className="text-sm text-white/60 font-sans font-medium tracking-wide max-w-md mx-auto leading-relaxed" aria-label="Réassurance de commande">
            Paiement à la livraison • Confirmation rapide • Livraison partout au Maroc
          </p>
        </div>

      </div>
    </section>
  );
}

