import { useState } from 'react';
import { ShieldCheck, Truck, Star, Zap, Award, MessageCircle, ArrowRight } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';
import PrimaryCTA from './ui/PrimaryCTA';

const productData = {
  glycimax: {
    id: 'glycimax',
    eyebrow: 'Sommeil Profond & Relaxation',
    title: 'Retrouvez des Nuits Paisibles',
    titleAccent: 'Et Réveillez-vous Plein de Vie',
    subtitle: 'Bisglycinate de Magnésium Pur + Vitamine B6',
    desc: 'Dormez d\'un sommeil réparateur et éliminez le stress au quotidien. Notre formule haut de gamme apaise votre système nerveux sans causer de maux d\'estomac.',
    tag: 'Sommeil & Anti-Fatigue',
    badge: 'Approuvé par les pharmaciens',
    image: '/glycimax.png',
    benefits: ['Sommeil profond réparateur', 'Réduit le stress et l\'anxiété', 'Relaxation musculaire (anti-crampes)'],
    price: '349',
    originalPrice: '449',
    discount: '-22% d\'Économie'
  },
  appeto: {
    id: 'appeto',
    eyebrow: 'Appétit & Tonus Général',
    title: 'Éveillez Sereinement l\'Appétit',
    titleAccent: 'De Toute la Famille',
    subtitle: 'Sirop Fortifiant Naturel aux Extraits de Plantes',
    desc: 'Une formule douce à base de Fenugrec, Gingembre et Gentiane enrichie en Vitamines C & B pour redonner l\'envie de manger et fortifier le corps naturellement.',
    tag: 'Stimulation de l\'Appétit',
    badge: 'Formule 100% Naturelle',
    image: '/appeto-cutout.png',
    benefits: ['Stimule l\'appétit sainement', 'Favorise une bonne digestion', 'Renforce les défenses naturelles'],
    price: '259',
    originalPrice: '359',
    discount: '-27% d\'Économie'
  }
} as const;

type ProductKey = keyof typeof productData;

export default function Hero({
  onSelectProduct,
}: {
  onSelectProduct?: (productId: string, qty: number) => void;
}) {
  const [activeTab, setActiveTab] = useState<ProductKey>('glycimax');
  const current = productData[activeTab];

  const handleOrder = () => {
    // Generate prefilled WhatsApp order message directly
    const message = `Bonjour Health Power ! Je souhaite commander la cure de "${current.title} ${current.titleAccent}" (${current.subtitle}) au prix spécial de ${current.price} DHS. Pouvez-vous confirmer ma commande ?`;
    openWhatsApp(message);
  };

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('produits');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center bg-gradient-to-b from-[#0A2518] via-[#123824] to-[#0A2518] text-white pt-28 pb-20 border-b border-brand-border/10 overflow-hidden animate-fadeIn"
      aria-label="Présentation des compléments alimentaires Health Power"
    >
      {/* Subtle background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-3xl pointer-events-none z-0 opacity-40"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: Content (Stacks first on mobile) ─────────────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 text-center lg:text-left">
            
            {/* 1. Rating / Social Proof (text-sm is 14px on mobile) */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <span className="flex text-brand-gold" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </span>
              <span className="text-sm font-bold text-white/80 font-sans tracking-wide">
                4.9/5 par plus de 5,200 clients au Maroc
              </span>
            </div>

            {/* Product Switcher Tabs */}
            <div className="inline-flex p-1 bg-white/5 rounded-2xl mb-8 self-center lg:self-start border border-white/10">
              {(['glycimax', 'appeto'] as ProductKey[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-gold outline-none ${
                    activeTab === tab
                      ? 'bg-brand-green text-white shadow-sm border border-white/10 font-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                  aria-pressed={activeTab === tab}
                >
                  {tab === 'glycimax' ? 'Glycimax Magnésium' : 'Appeto+ Sirop'}
                </button>
              ))}
            </div>

            {/* 2. Small Benefit Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-black uppercase tracking-widest text-brand-gold bg-brand-gold/10 border border-brand-gold/20 font-sans">
                <ShieldCheck size={14} className="text-brand-gold shrink-0" aria-hidden="true" />
                {current.eyebrow}
              </span>
            </div>

            {/* 3. Main Headline (Single h1) */}
            <h1 className="mb-4 max-w-xl mx-auto lg:mx-0 leading-tight">
              <span className="block font-serif font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {current.title}
              </span>
              <span className="block font-serif font-black text-brand-gold-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-1.5">
                {current.titleAccent}
              </span>
            </h1>

            {/* 4. Short Subheadline */}
            <p className="text-sm font-bold uppercase tracking-widest text-white/55 mb-6 font-sans">
              {current.subtitle}
            </p>

            {/* Description (text-sm is 14px on mobile) */}
            <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-sans">
              {current.desc}
            </p>

            {/* 5. Benefit Chips */}
            <div className="grid sm:grid-cols-2 gap-3.5 mb-8 max-w-xl mx-auto lg:mx-0">
              {current.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-5.5 h-5.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold shrink-0" aria-hidden="true">
                    <Zap size={11} fill="currentColor" />
                  </div>
                  <span className="text-sm font-bold text-white/95 font-sans">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* 6. Price / Offer Conversion Block (Subtle dark transparent, no bright card) */}
            <div className="bg-[#071E12]/50 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl max-w-xl mx-auto lg:mx-0 backdrop-blur-sm">
              
              {/* Badges row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-4">
                <span className="px-3 py-1 rounded-md text-sm font-black uppercase tracking-wider bg-red-500/15 text-red-300 border border-red-500/25">
                  🔥 Offre active : {current.discount}
                </span>
                <span className="px-3 py-1 rounded-md text-sm font-black uppercase tracking-wider bg-brand-gold/15 text-brand-gold-light border border-brand-gold/25">
                  ⏳ Stock Limité
                </span>
              </div>

              {/* Price details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-white/5 pb-4 text-center sm:text-left">
                <div>
                  <span className="text-sm uppercase tracking-widest text-white/40 font-bold block mb-1 font-sans">
                    Option Recommandée (2 Boîtes)
                  </span>
                  <div className="flex items-baseline justify-center sm:justify-start gap-2">
                    <span className="text-3xl font-serif font-black text-white">
                      {current.price}
                    </span>
                    <span className="text-sm font-bold text-white/70">
                      DHS
                    </span>
                    <span className="text-sm line-through text-white/35 ml-2">
                      {current.originalPrice} DHS
                    </span>
                  </div>
                </div>
                
                <span className="text-sm text-brand-gold-light font-bold uppercase tracking-wider bg-white/5 border border-white/15 px-3 py-1.5 rounded-lg inline-block self-center">
                  Livraison Gratuite 🚚
                </span>
              </div>

              {/* CTAs (Primary and Secondary) */}
              <div className="flex flex-col sm:flex-row gap-3">
                <PrimaryCTA
                  onClick={handleOrder}
                  theme="whatsapp"
                  icon={<MessageCircle size={18} aria-hidden="true" />}
                  className="flex-grow py-4 text-base font-black text-sm"
                  ariaLabel={`Commander le pack ${activeTab} par WhatsApp`}
                >
                  Commander via WhatsApp
                </PrimaryCTA>

                <button
                  onClick={scrollToProducts}
                  className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl border-2 border-white/20 text-white hover:border-brand-gold hover:text-brand-gold hover:bg-white/5 transition-all duration-200 font-sans font-bold text-sm select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-gold outline-none"
                  aria-label="Faire défiler vers la liste des packs produits"
                >
                  Voir les produits
                </button>
              </div>

              {/* Reassurance line */}
              <div className="mt-4 pt-3 border-t border-white/5 text-center sm:text-left">
                <p className="text-sm text-white/50 font-sans font-medium flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" aria-hidden="true"></span>
                  🇲🇦 Expédition Gratuite · Paiement Cash à la Livraison
                </p>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Product Visual (Stacks second on mobile, subordinate to CTA) ────────────────────── */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-2">
            <div className="relative w-full max-w-[400px] sm:max-w-[450px] lg:max-w-full mx-auto">
              
              {/* Flexible container easily swappable with 3D render component */}
              <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] flex items-center justify-center">
                
                {/* Visual backdrop glow */}
                <div
                  className="absolute inset-0 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none -z-10"
                  aria-hidden="true"
                />

                {/* exactly 3 meaningful trust badges */}
                <div className="absolute top-4 left-0 z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 shadow-md max-w-[140px] pointer-events-none select-none">
                  <div className="text-brand-gold-light text-sm font-black uppercase tracking-wider mb-0.5">Certifié</div>
                  <div className="text-white/95 font-sans text-sm font-semibold">ONSSA Maroc 🇲🇦</div>
                </div>

                <div className="absolute bottom-6 right-2 z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 shadow-md max-w-[140px] pointer-events-none select-none">
                  <div className="text-brand-gold-light text-sm font-black uppercase tracking-wider mb-0.5">Livraison</div>
                  <div className="text-white/95 font-sans text-sm font-semibold">Gratuite & Express 🚚</div>
                </div>

                <div className="absolute bottom-6 left-2 z-10 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-3 shadow-md max-w-[140px] pointer-events-none select-none">
                  <div className="text-brand-gold-light text-sm font-black uppercase tracking-wider mb-0.5">Paiement</div>
                  <div className="text-white/95 font-sans text-sm font-semibold">À la Livraison 🤝</div>
                </div>

                {/* Product cutout visual */}
                <div className="anti-gravity-product flex items-center justify-center w-full h-full">
                  <img
                    src={current.image}
                    alt={`Pack ${current.subtitle}`}
                    className="object-contain w-full h-full select-none"
                    style={{
                      filter: `brightness(1.04) contrast(1.02) drop-shadow(0px 20px 40px rgba(0,0,0,0.35))`,
                      imageRendering: 'high-quality',
                    }}
                  />
                </div>
              </div>

              {/* Soft shadow base shadow disc */}
              <div
                className="mx-auto w-[60%] h-4 bg-brand-dark/20 rounded-full blur-md mt-[-10px] pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
