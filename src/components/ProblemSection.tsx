import { Moon, Zap, Apple, ChevronRight } from 'lucide-react';

interface ProblemSectionProps {
  onSelectProduct: (productId: string, qty: number) => void;
}

const problems = [
  {
    icon: <Moon size={28} className="text-brand-green" />,
    emoji: '😴',
    title: 'Sommeil difficile',
    text: 'Vous dormez mal, vous vous réveillez fatigué ou vous cherchez plus de relaxation la nuit ?',
    badge: 'Glycimax',
    badgeSub: 'Magnésium & Vitamine B6',
    product: 'glycimax',
    qty: 2,
    color: 'from-brand-green/5 to-brand-green/10',
    borderColor: 'border-brand-green/20',
    badgeColor: 'bg-brand-green text-white',
  },
  {
    icon: <Zap size={28} className="text-brand-gold" />,
    emoji: '😩',
    title: 'Fatigue & stress',
    text: 'Vous sentez une fatigue nerveuse persistante ou un manque d\'équilibre dans votre routine quotidienne ?',
    badge: 'Glycimax',
    badgeSub: 'Soutien du système nerveux',
    product: 'glycimax',
    qty: 2,
    color: 'from-brand-gold/5 to-brand-gold/10',
    borderColor: 'border-brand-gold/20',
    badgeColor: 'bg-brand-gold text-white',
  },
  {
    icon: <Apple size={28} className="text-[#E88C4E]" />,
    emoji: '🍽️',
    title: "Manque d'appétit",
    text: 'Vous cherchez un soutien naturel pour stimuler l\'appétit et retrouver plus de vitalité au quotidien ?',
    badge: 'Appeto+',
    badgeSub: 'Sirop fortifiant naturel',
    product: 'appeto',
    qty: 2,
    color: 'from-[#E88C4E]/5 to-[#E88C4E]/10',
    borderColor: 'border-[#E88C4E]/20',
    badgeColor: 'bg-[#E88C4E] text-white',
  },
];

export default function ProblemSection({ onSelectProduct }: ProblemSectionProps) {
  const scrollToProduct = (productId: string, qty: number) => {
    onSelectProduct(productId, qty);
    const anchor = productId === 'glycimax' ? 'product-glycimax' : 'product-appeto';
    const el = document.getElementById(anchor) ?? document.getElementById('produits');
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
    }
  };

  return (
    <section
      id="vos-besoins"
      className="py-12 sm:py-16 lg:py-24 bg-white border-b border-brand-border/30 relative z-20"
      aria-label="Choisissez votre besoin"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-green bg-brand-green/5 border border-brand-green/15 px-4 py-1.5 rounded-full mb-4">
            Trouvez votre solution
          </span>
          <h2 className="font-serif font-black text-brand-dark text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Quel est votre besoin aujourd'hui ?
          </h2>
          <p className="text-brand-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-light">
            Choisissez la situation qui vous correspond. Notre conseillère peut aussi vous orienter directement sur WhatsApp.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div
              key={p.title}
              className={`relative bg-gradient-to-br ${p.color} border ${p.borderColor} rounded-3xl p-7 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white border border-brand-border/30 shadow-sm flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                {p.icon}
              </div>

              {/* Emoji for mobile friendliness */}
              <div className="absolute top-5 right-5 text-3xl select-none" aria-hidden="true">{p.emoji}</div>

              <h3 className="font-serif font-black text-brand-dark text-xl mb-3">{p.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed font-light mb-6 flex-grow">{p.text}</p>

              {/* Recommended product badge */}
              <div className="mb-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-2">Solution recommandée :</p>
                <div className={`inline-flex items-center gap-2 ${p.badgeColor} rounded-full px-4 py-1.5`}>
                  <span className="text-xs font-black">{p.badge}</span>
                  <span className="text-[10px] font-medium opacity-80">— {p.badgeSub}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                id={`problem-${p.product}-cta`}
                onClick={() => scrollToProduct(p.product, p.qty)}
                className="w-full flex items-center justify-center gap-2 bg-white border border-brand-border/50 text-brand-dark font-black text-sm px-5 py-3 rounded-xl hover:border-brand-green hover:text-brand-green hover:bg-brand-green/5 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green outline-none min-h-[48px] group"
                aria-label={`Voir la solution pour ${p.title}`}
              >
                Voir la solution
                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-brand-muted/70 mt-8 max-w-xl mx-auto font-light italic">
          Ces produits sont des compléments alimentaires et ne remplacent pas un avis médical.
        </p>
      </div>
    </section>
  );
}
