import { Truck, ShieldCheck, Leaf, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: "Formule Naturelle",
    description: "Ingrédients d'origine naturelle sans additifs."
  },
  {
    icon: HeartHandshake,
    title: "Paiement à la Livraison",
    description: "Payez en espèces à la réception."
  },
  {
    icon: Truck,
    title: "Livraison Express",
    description: "Livré sous 24h à 48h partout au Maroc."
  },
  {
    icon: ShieldCheck,
    title: "Qualité Contrôlée",
    description: "Produits rigoureusement testés et validés."
  }
];

export default function TrustBadges() {
  return (
    <section className="py-16 sm:py-20 bg-brand-beige border-y border-brand-border/40 relative z-20 shadow-xs" aria-label="Garanties principales">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: 2 columns on mobile (360px+), 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            
            return (
              <div 
                key={idx}
                className="flex flex-col items-center text-center p-4 sm:p-6 bg-brand-beige-light border border-brand-border/30 rounded-2xl shadow-xs h-full transition-all duration-200 motion-safe:md:hover:-translate-y-1 motion-safe:md:hover:shadow-sm group cursor-default"
              >
                {/* Icon Container: identical styling and size */}
                <div className="w-11 h-11 rounded-full bg-brand-green/5 text-brand-green border border-brand-green/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-brand-green group-hover:text-white transition-colors duration-200" aria-hidden="true">
                  <Icon size={20} className="stroke-[2.25]" />
                </div>
                
                {/* Title: high contrast font size >= 14px on mobile */}
                <h3 className="font-sans font-extrabold text-sm sm:text-base text-brand-dark tracking-tight leading-tight">
                  {feature.title}
                </h3>
                
                {/* Short Description: reduced to exactly one readable line, size 14px on mobile */}
                <p className="mt-1.5 font-sans font-light text-sm text-brand-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
