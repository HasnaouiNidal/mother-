import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CalendarRange, HeartPulse, Award } from 'lucide-react';

interface Certification {
  id: number;
  icon: any;
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
      title: "Enregistré & Conforme",
      frontDesc: "Normes de sécurité alimentaire marocaines strictes.",
      backDesc: "Tous nos compléments respectent scrupuleusement les régulations de contrôle sanitaire en vigueur au Maroc. Nous garantissons une traçabilité totale.",
      seal: "ONSSA Norms"
    },
    {
      id: 2,
      icon: Award,
      title: "Bio-disponibilité Forte",
      frontDesc: "Formulations hautement assimilables par les cellules.",
      backDesc: "Nous sélectionnons la forme Bisglycinate pour le Magnésium. Elle est absorbée à 95% sans causer de maux d'estomac ou d'effets laxatifs gênants.",
      seal: "Bio-active"
    },
    {
      id: 3,
      icon: HeartPulse,
      title: "Gélules 100% Végétales",
      frontDesc: "Capsules HPMC naturelles (zéro gélatine animale).",
      backDesc: "Contrairement aux gélules pas chères à base de porc ou de boeuf, nous utilisons uniquement des enveloppes végétales en cellulose naturelle de pin (Halal/Vegan).",
      seal: "HPMC Vegan"
    },
    {
      id: 4,
      icon: CalendarRange,
      title: "Fraîcheur Garantie",
      frontDesc: "Paiement en espèces à la livraison sous 24h/48h.",
      backDesc: "Nos stocks sont renouvelés chaque mois pour vous assurer des compléments frais avec une date d'expiration lointaine. Livraison gratuite à domicile.",
      seal: "Strict Fresh"
    }
  ];

  // Track flipped state per card index
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 bg-white border-b border-brand-border/30 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-widest text-brand-green font-bold bg-brand-green/5 border border-brand-green/10 px-4 py-1.5 rounded-full">
            Authenticité
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-dark mt-4 mb-4 leading-tight">
            Transparence & Qualité
          </h2>
          <p className="text-base text-brand-dark/70 font-sans font-light">
            Parce que votre santé mérite le meilleur. Cliquez sur les cartes ci-dessous pour découvrir nos gages de confiance.
          </p>
        </div>

        {/* 3D Flipping Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            const isFlipped = !!flippedCards[cert.id];

            return (
              <div 
                key={cert.id}
                onClick={() => toggleFlip(cert.id)}
                className="h-64 cursor-pointer relative group rounded-2xl w-full"
                style={{ perspective: "1000px" }}
              >
                {/* Rotatable Inner Container */}
                <motion.div 
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full relative duration-500 rounded-2xl"
                >
                  
                  {/* Front Side */}
                  <div 
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0 w-full h-full bg-brand-beige-light/70 border border-brand-border/40 hover:border-brand-green p-6 rounded-2xl flex flex-col justify-between transition-colors shadow-sm"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-6">
                        <Icon size={22} />
                      </div>
                      <h4 className="font-serif font-bold text-base text-brand-dark mb-2">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-brand-dark/60 leading-relaxed font-sans font-light">
                        {cert.frontDesc}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[8px] font-black uppercase tracking-widest text-brand-gold bg-brand-dark px-2.5 py-1 rounded-full">
                        {cert.seal}
                      </span>
                      <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider group-hover:translate-x-1 transition-all">
                        Détails →
                      </span>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div 
                    style={{ 
                      backfaceVisibility: "hidden", 
                      transform: "rotateY(180deg)" 
                    }}
                    className="absolute inset-0 w-full h-full bg-brand-dark text-white p-6 rounded-2xl flex flex-col justify-between shadow-lg border border-brand-green-light"
                  >
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-brand-gold-light border border-brand-gold/20 px-2 py-0.5 rounded-full inline-block mb-3">
                        Gage de Confiance
                      </span>
                      <h5 className="font-serif font-bold text-sm text-brand-gold mb-2">
                        {cert.title}
                      </h5>
                      <p className="text-xs text-white/80 leading-relaxed font-sans font-light">
                        {cert.backDesc}
                      </p>
                    </div>

                    <span className="text-[10px] text-brand-gold-light font-bold uppercase text-right block tracking-wider">
                      ← Retour
                    </span>
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
