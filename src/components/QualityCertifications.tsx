import { useState } from 'react';
import { ShieldCheck, Award, HeartPulse, CalendarRange, ChevronDown } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

interface Certification {
  id: number;
  icon: React.ComponentType<any>;
  title: string;
  frontDesc: string;
  backDesc: string;
  seal: string;
}

export default function QualityCertifications() {
  const certifications: Certification[] = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "Conformité Suivie",
      frontDesc: "Suivi rigoureux des processus réglementaires sanitaires.",
      backDesc: "Tous nos produits font l'objet d'un suivi sanitaire attentif. Nous assurons la traçabilité de chaque boîte depuis la fabrication jusqu'au transport.",
      seal: "Traçabilité"
    },
    {
      id: 2,
      icon: Award,
      title: "Formulation Assimilée",
      frontDesc: "Choix de composants offrant un bon confort digestif.",
      backDesc: "Nous privilégions le magnésium sous sa forme Bisglycinate, reconnue pour être bien assimilée par l'organisme sans provoquer d'inconfort intestinal.",
      seal: "Assimilation"
    },
    {
      id: 3,
      icon: HeartPulse,
      title: "Gélules Végétales",
      frontDesc: "Capsules élaborées à partir de cellulose de pin.",
      backDesc: "Les enveloppes de nos gélules sont fabriquées uniquement avec de la cellulose de pin d'origine végétale, excluant tout composant d'origine animale.",
      seal: "HPMC"
    },
    {
      id: 4,
      icon: CalendarRange,
      title: "Stock Contrôlé",
      frontDesc: "Renouvellement régulier pour une conservation soignée.",
      backDesc: "Nos approvisionnements sont planifiés à intervalles réguliers afin de stocker les compléments dans des conditions idéales de conservation.",
      seal: "Stock contrôlé"
    }
  ];

  // Track expanded state (only one card can be expanded at a time)
  const [expandedCardId, setExpandedCardId] = useState<number | null>(1); // Default first card open
  const [lastActiveCert, setLastActiveCert] = useState<Certification | null>(certifications[0]);

  const toggleCard = (id: number) => {
    setExpandedCardId(prev => {
      const next = prev === id ? null : id;
      if (next !== null) {
        const found = certifications.find(c => c.id === next);
        if (found) setLastActiveCert(found);
      }
      return next;
    });
  };

  return (
    <section className="py-20 sm:py-24 md:py-28 bg-white border-b border-brand-border/30 relative z-20 overflow-hidden" aria-label="Engagements de qualité et transparence">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header primitive */}
        <SectionHeader
          tagline="Suivi & Engagements"
          title="Transparence & Qualité"
          description="Des choix d'ingrédients rigoureux et un suivi attentif pour accompagner votre hygiène de vie au quotidien. Cliquez pour voir les détails."
          className="mb-14 sm:mb-16"
        />

        {/* Responsive Grid: 1 column on mobile, 2 columns on tablet, 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            const isOpen = expandedCardId === cert.id;
            const panelId = `quality-panel-${cert.id}`;

            return (
              <div 
                key={cert.id}
                onClick={() => toggleCard(cert.id)}
                className={`flex flex-col justify-between p-6 bg-white border rounded-2xl shadow-xs transition-all duration-200 cursor-pointer text-left h-full select-none ${
                  isOpen 
                    ? 'border-brand-green bg-brand-green/5 shadow-sm' 
                    : 'border-brand-border/50 hover:border-brand-green/30 hover:shadow-xs'
                }`}
              >
                <div className="w-full">
                  {/* Top Row: Icon and Proof Badge with wrap to prevent overflow */}
                  <div className="flex flex-wrap items-center justify-between gap-3 w-full">
                    <div className="w-11 h-11 rounded-xl bg-brand-green/5 text-brand-green border border-brand-green/10 flex items-center justify-center shrink-0" aria-hidden="true">
                      <Icon size={20} className="stroke-[2.25]" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-md shrink-0 max-w-full truncate">
                      {cert.seal}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-sans font-extrabold text-brand-dark tracking-tight leading-tight mt-6">
                    {cert.title}
                  </h3>

                  {/* Short description */}
                  <p className="mt-2 text-sm text-brand-muted font-sans font-light leading-relaxed">
                    {cert.frontDesc}
                  </p>

                  {/* Inline Details Expansion Panel (Mobile only: < 640px) */}
                  <div 
                    id={panelId}
                    className={`block sm:hidden grid transition-[grid-template-rows,opacity] duration-200 ease-in-out overflow-hidden motion-reduce:transition-none ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-brand-border/30' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="text-sm text-brand-dark/95 font-sans font-medium leading-relaxed bg-brand-beige/40 p-3.5 rounded-xl border border-brand-border/30">
                        <strong>Détails de qualité :</strong> {cert.backDesc}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Link & Arrow Action */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCard(cert.id);
                  }}
                  className="w-full mt-6 pt-3 border-t border-brand-border/10 flex items-center justify-between text-xs font-black text-brand-green uppercase tracking-widest leading-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 rounded-sm select-none"
                >
                  <span>{isOpen ? "Masquer détails" : "En savoir plus"}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Shared Desktop Details Panel (Tablet/Desktop only: >= 640px) */}
        <div 
          id="quality-details-panel-desktop"
          role="region"
          aria-label="Détails de qualité"
          className={`hidden sm:grid transition-[grid-template-rows,opacity] duration-200 ease-in-out mt-8 motion-reduce:transition-none ${
            expandedCardId !== null ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            {lastActiveCert && (
              <div className="bg-brand-beige border border-brand-border/50 p-6 rounded-2xl shadow-xs text-left">
                <h4 className="font-sans font-extrabold text-brand-green text-sm sm:text-base mb-2">
                  Détails de qualité : {lastActiveCert.title}
                </h4>
                <p className="text-sm text-brand-dark/90 leading-relaxed font-sans font-light">
                  {lastActiveCert.backDesc}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

