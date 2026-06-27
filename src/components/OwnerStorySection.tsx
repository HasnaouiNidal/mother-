import { ShieldCheck, MessageCircle, Package, Star } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';

const trustCards = [
  {
    icon: <MessageCircle size={22} className="text-brand-gold" />,
    title: 'Conseil avant commande',
    text: 'Vous n\'achetez jamais au hasard. Notre conseillère vous oriente selon votre besoin réel.',
  },
  {
    icon: <Star size={22} className="text-brand-gold" />,
    title: 'Explication simple des produits',
    text: 'Chaque produit vous est expliqué : utilisation, durée, résultats attendus, en toute clarté.',
  },
  {
    icon: <ShieldCheck size={22} className="text-brand-gold" />,
    title: 'Paiement à la livraison',
    text: 'Vous ne donnez rien en avance. Vous payez directement au livreur, après réception.',
  },
  {
    icon: <Package size={22} className="text-brand-gold" />,
    title: 'Suivi WhatsApp personnalisé',
    text: 'Avant et après la commande, notre conseillère reste disponible pour vous accompagner.',
  },
];

export default function OwnerStorySection() {
  return (
    <section
      id="notre-histoire"
      className="py-12 sm:py-16 lg:py-24 bg-brand-beige relative z-20"
      aria-label="Pourquoi nos clients nous font confiance"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-4 py-1.5 rounded-full mb-4">
            Votre conseillère
          </span>
          <h2 className="font-serif font-black text-brand-dark text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Latifa Aqallal —<br className="hidden sm:block" /> votre conseillère de confiance
          </h2>
          <p className="text-brand-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Avec plus de 20 ans d'expérience en pharmacie et parapharmacie, Latifa accompagne personnellement chaque client pour choisir le bon complément, sans confusion et sans pression.
          </p>
        </div>

        {/* Main story block */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">

          {/* Left: Images */}
          <div className="grid grid-cols-2 gap-4">
            {/* Certificate image */}
            <div className="col-span-1 relative">
              <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-green/10 to-brand-green/5 border border-brand-border/40 shadow-md">
                <img
                  src="/images/certificate.jpg"
                  alt="Certificat de formation bien-être naturel"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const p = e.currentTarget.nextElementSibling as HTMLElement;
                    if (p) p.style.display = 'flex';
                  }}
                />
                <div
                  className="absolute inset-0 hidden flex-col items-center justify-center gap-2 text-brand-muted p-3"
                  aria-hidden="true"
                >
                  <ShieldCheck size={28} className="text-brand-green/40" />
                  <p className="text-[10px] font-bold text-center text-brand-muted/70">
                    Photo certificat<br />/images/certificate.jpg
                  </p>
                </div>
                {/* Label */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <p className="text-[10px] font-black text-brand-green uppercase tracking-wider">Formation & certificat</p>
                  <p className="text-xs font-medium text-brand-dark">Bien-être naturel</p>
                </div>
              </div>
            </div>

            {/* Mother story image */}
            <div className="col-span-1 mt-6">
              <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-gold/10 to-brand-gold/5 border border-brand-border/40 shadow-md">
                <img
                  src="/images/mother-story.jpg"
                  alt="Conseillère Health Power Maroc à l'écoute"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    const p = e.currentTarget.nextElementSibling as HTMLElement;
                    if (p) p.style.display = 'flex';
                  }}
                />
                <div
                  className="absolute inset-0 hidden flex-col items-center justify-center gap-2 text-brand-muted p-3"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-brand-muted/40">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <p className="text-[10px] font-bold text-center text-brand-muted/70">
                    Photo histoire<br />/images/mother-story.jpg
                  </p>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <p className="text-[10px] font-black text-brand-gold uppercase tracking-wider">Votre conseillère</p>
                  <p className="text-xs font-medium text-brand-dark">Écoute & orientation</p>
                </div>
              </div>
            </div>

            {/* Stat chips */}
            <div className="col-span-2 grid grid-cols-3 gap-3 mt-2">
              {[
                { value: '500+', label: 'Clients accompagnés' },
                { value: '48h', label: 'Délai livraison max' },
                { value: '100%', label: 'Paiement à réception' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl p-3 text-center border border-brand-border/40 shadow-sm">
                  <p className="font-serif font-black text-brand-green text-lg">{stat.value}</p>
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider leading-tight mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Story text */}
          <div>
            <blockquote className="border-l-4 border-brand-gold pl-5 mb-6">
              <p className="text-brand-dark/80 text-sm sm:text-base leading-relaxed font-light italic">
                "Avant chaque commande, je prends le temps de vous écouter, d'identifier votre besoin réel, et de vous expliquer le produit adapté — son utilisation, sa durée, et comment il sera livré. Vous ne payez qu'à la réception."
              </p>
              <footer className="mt-3 text-xs font-black uppercase tracking-wider text-brand-gold">— Latifa Aqallal, Health Power Maroc</footer>
            </blockquote>

            <p className="text-brand-muted text-sm leading-relaxed mb-8 font-light">
              Latifa Aqallal — votre conseillère Health Power Maroc — répond personnellement sur WhatsApp avant et après chaque commande. Avec 20+ ans d'expérience en pharmacie, elle oriente chaque client avec soin et honnêteté.
            </p>

            <button
              id="owner-story-whatsapp-cta"
              onClick={() => openWhatsApp('Bonjour Latifa ! Je voudrais un conseil personnalisé avant de commander chez Health Power Maroc.')}
              className="inline-flex items-center gap-2.5 bg-whatsapp-green hover:bg-whatsapp-hover text-white font-black text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-whatsapp-green/20 cursor-pointer focus-visible:ring-2 focus-visible:ring-whatsapp-green outline-none"
              aria-label="Parler avec Latifa Aqallal sur WhatsApp"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Parler avec Latifa sur WhatsApp
            </button>
          </div>
        </div>

        {/* Trust cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 border border-brand-border/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-green/5 flex items-center justify-center mb-4 border border-brand-border/30">
                {card.icon}
              </div>
              <h3 className="font-bold text-brand-dark text-sm mb-2">{card.title}</h3>
              <p className="text-brand-muted text-xs leading-relaxed font-light">{card.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
