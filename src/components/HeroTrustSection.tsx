import React from 'react';
import { MessageCircle, Award, ShieldCheck, ChevronRight, Star } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';

/* ─── Floating badge data ──────────────────────────────────────────────────── */
const floatingBadges = [
  {
    id: 'name',
    position: 'top-5 left-2 sm:-left-6 lg:-left-6',
    icon: <Star size={14} className="text-brand-gold shrink-0" />,
    label: 'Votre conseillère',
    value: 'Latifa Aqallal',
  },
  {
    id: 'exp',
    position: 'top-1/2 -translate-y-1/2 right-2 sm:-right-6 lg:-right-6',
    icon: <Award size={14} className="text-brand-green shrink-0" />,
    label: 'Expérience',
    value: '20+ ans en pharmacie',
  },
  {
    id: 'paiement',
    position: 'bottom-6 right-3 sm:right-6 lg:right-6',
    icon: <ShieldCheck size={14} className="text-brand-gold shrink-0" />,
    label: 'Paiement',
    value: 'Paiement à la livraison',
  },
];

/* ─── Trust bullet data ────────────────────────────────────────────────────── */
const trustBullets = [
  { icon: '✨', text: 'Plus de 20 ans d\'expérience en pharmacie' },
  { icon: '💬', text: 'Conseils personnalisés avant commande' },
  { icon: '🇲🇦', text: 'Livraison partout au Maroc' },
  { icon: '🤝', text: 'Paiement uniquement à la livraison' },
];

/* ─── Component ────────────────────────────────────────────────────────────── */
export default function HeroTrustSection() {

  const scrollToSolutions = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('vos-besoins')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    openWhatsApp(
      "Bonjour Latifa ! Je souhaite bénéficier d'un conseil personnalisé pour choisir mes compléments alimentaires. Pouvez-vous m'aider ?"
    );
  };

  return (
    <section
      id="accueil"
      className="relative w-full bg-[#FAF7EF] text-[#1F2421] overflow-hidden pt-20 lg:pt-24 pb-12 lg:pb-16"
      aria-label="Latifa Aqallal — Conseillère Health Power Maroc"
    >
      {/* Top contrast strip behind transparent navbar so white text is readable at top of page */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#1F2421]/80 via-[#1F2421]/30 to-transparent pointer-events-none z-20" aria-hidden="true" />

      {/* ── Background Organic Shapes ─────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Large sage bleed top-right behind Latifa */}
        <div
          className="absolute -top-32 -right-32 w-[55vw] h-[55vw] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #AFC8B220 0%, transparent 70%)' }}
        />
        {/* Warm gold bloom bottom-left */}
        <div
          className="absolute -bottom-24 -left-24 w-[40vw] h-[40vw] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #C9A44C15 0%, transparent 70%)' }}
        />
        {/* Botanical leaf line — subtle, top-left area */}
        <svg
          className="absolute top-24 left-[3%] w-52 h-52 opacity-[0.06]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#1F5C43"
          strokeWidth="0.6"
        >
          <path d="M5,95 Q30,50 75,10" />
          <path d="M5,95 Q55,70 75,10" />
          <path d="M25,65 Q42,52 58,38" />
          <path d="M15,80 Q30,68 46,54" />
        </svg>
        {/* Small leaf hint right edge */}
        <svg
          className="absolute bottom-36 right-[2%] w-32 h-32 opacity-[0.06] rotate-45"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#C9A44C"
          strokeWidth="0.6"
        >
          <path d="M50,5 Q80,30 75,65 Q50,90 25,65 Q20,30 50,5Z" />
        </svg>
      </div>

      {/* ── Main Grid ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4 sm:pt-6">

          {/* ═══════════════════════════════════════════════════════════════
              LEFT — Text content (~58% width on desktop)
              Mobile order: badge → h1 → subtitle → CTAs → [Latifa image] → bullets
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left py-4 sm:py-6 order-1">

            {/* 1. Trust badge */}
            <div className="flex justify-center lg:justify-start mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white border border-[#E8DDC8] text-[#1F5C43] shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#1F5C43] shrink-0" aria-hidden="true" />
                Conseil humain • 20+ ans d'expérience • Paiement à la livraison
              </span>
            </div>

            {/* 2. Headline */}
            <h1 className="font-serif font-black leading-[1.1] mb-5">
              <span className="block text-[#1F2421] text-4xl sm:text-5xl lg:text-5xl xl:text-6xl">
                Votre bien-être commence
              </span>
              <span className="block text-[#1F5C43] text-3xl sm:text-4xl lg:text-4xl xl:text-5xl mt-2">
                avec Latifa Aqallal
              </span>
            </h1>

            {/* 3. Subtitle */}
            <p className="text-[#5C6B61] text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 font-light">
              Chez Health Power Maroc, vous n'achetez pas au hasard. Latifa vous accompagne avec son expérience en pharmacie pour choisir le complément adapté à votre besoin, simplement et en toute confiance.
            </p>

            {/* 4. CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-4">
              <button
                id="hero-whatsapp-latifa"
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#1EBE57] transition-all duration-200 shadow-lg shadow-[#25D366]/25 hover:scale-[1.02] active:scale-[0.98] min-h-[52px] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D366] outline-none"
                aria-label="Parler avec Latifa Aqallal sur WhatsApp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Parler avec Latifa sur WhatsApp
              </button>

              <button
                id="hero-discover-cta"
                onClick={scrollToSolutions}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border-2 border-[#1F5C43] text-[#1F5C43] bg-white hover:bg-[#1F5C43]/5 text-sm font-bold transition-all duration-200 min-h-[52px] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1F5C43] outline-none"
                aria-label="Découvrir les solutions naturelles de Latifa"
              >
                Découvrir les solutions
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            </div>

            {/* Micro-trust line */}
            <p className="text-xs text-[#5C6B61]/70 font-medium text-center lg:text-left mb-10">
              Réponse rapide&nbsp;•&nbsp;Sans paiement en ligne&nbsp;•&nbsp;Confirmation avant expédition
            </p>

            {/* 6. Trust bullets — Desktop only (mobile version rendered after the image) */}
            <div className="hidden lg:grid grid-cols-2 gap-3 max-w-lg">
              {trustBullets.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-[#E8DDC8] shadow-sm"
                >
                  <span className="text-base shrink-0 select-none" aria-hidden="true">{b.icon}</span>
                  <span className="text-xs font-semibold text-[#1F2421] leading-snug">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT — Latifa large portrait container (~42% width on desktop)
          ════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center order-2 lg:order-last mt-6 lg:mt-0 w-full">
            <div className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] mx-auto lg:ml-auto">
              
              {/* Soft abstract background shape behind the image container */}
              <div
                className="absolute -inset-4 sm:-inset-6 rounded-[48px] opacity-70 blur-2xl pointer-events-none transition-all duration-500"
                style={{
                  background: 'radial-gradient(circle at 70% 30%, #AFC8B250 0%, #E8DDC860 45%, #C9A44C20 100%)',
                }}
                aria-hidden="true"
              />

              {/* Floating badges */}
              {floatingBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`absolute ${badge.position} z-30 bg-white/95 backdrop-blur-md border border-[#E8DDC8]/80 rounded-2xl px-3.5 py-2.5 shadow-xl shadow-[#1F5C43]/5 flex items-center gap-2.5 select-none pointer-events-none transition-transform duration-300 hover:scale-105`}
                >
                  {badge.icon}
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-[#5C6B61] leading-none">{badge.label}</p>
                    <p className="text-[11px] font-extrabold text-[#1F2421] mt-0.5 leading-tight">{badge.value}</p>
                  </div>
                </div>
              ))}

              {/* Main Rounded Image Container */}
              <div className="relative z-20 w-full aspect-[4/5] max-h-[760px] bg-gradient-to-b from-white via-[#FAF7EF] to-[#E8DDC8]/50 rounded-[32px] p-2.5 sm:p-3 shadow-2xl shadow-[#1F5C43]/15 border border-[#E8DDC8]/80 ring-1 ring-white/90 overflow-hidden flex items-end justify-center">
                
                {/* Inner frame */}
                <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#FAF7EF] flex items-end justify-center shadow-inner">
                  <img
                    src="/images/latifa-aqallal-hero.png"
                    alt="Latifa Aqallal — Conseillère bien-être et pharmacie, Health Power Maroc"
                    className="w-full h-full object-cover object-[center_10%] select-none transition-transform duration-700 hover:scale-[1.02]"
                    onError={(e) => {
                      const img = e.currentTarget;
                      img.style.display = 'none';
                      const fb = img.nextElementSibling as HTMLElement;
                      if (fb) fb.style.display = 'flex';
                    }}
                  />

                  {/* ── Fallback placeholder — large, person-shaped ── */}
                  <div
                    className="hidden w-full h-full flex-col items-center justify-end bg-gradient-to-b from-[#AFC8B220] via-[#E8DDC830] to-[#E8DDC860] p-6"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                  >
                    {/* Silhouette of a professional woman */}
                    <svg
                      viewBox="0 0 200 320"
                      fill="none"
                      className="w-[55%] max-w-[260px] mb-0"
                      aria-hidden="true"
                    >
                      {/* Head */}
                      <ellipse cx="100" cy="60" rx="36" ry="42" fill="#AFC8B260" />
                      {/* Hair suggestion */}
                      <ellipse cx="100" cy="38" rx="38" ry="28" fill="#1F5C4315" />
                      {/* Neck */}
                      <rect x="88" y="98" width="24" height="22" rx="6" fill="#AFC8B240" />
                      {/* Shoulders / body */}
                      <path d="M30,135 Q60,118 100,120 Q140,118 170,135 L175,320 H25 Z" fill="#1F5C4318" />
                      {/* Collar hint */}
                      <path d="M78,120 Q100,140 122,120" stroke="#1F5C4330" strokeWidth="2" fill="none" />
                    </svg>

                    {/* Text label */}
                    <div className="text-center pb-6 px-4">
                      <p className="text-sm font-bold text-[#1F5C43]">Latifa Aqallal</p>
                      <p className="text-xs text-[#5C6B61] mt-1">Conseillère Health Power Maroc</p>
                      <p className="text-[10px] text-[#5C6B61]/60 mt-2">20+ ans d'expérience en pharmacie</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile trust bullets (below the Latifa image) ─────────────────── */}
      <div className="lg:hidden relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-2 gap-3">
          {trustBullets.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-[#E8DDC8] shadow-sm text-left"
            >
              <span className="text-base shrink-0 select-none" aria-hidden="true">{b.icon}</span>
              <span className="text-xs font-semibold text-[#1F2421] leading-snug">{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Transition accent line ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full border-t border-[#E8DDC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A44C] animate-pulse" aria-hidden="true" />
          <p className="text-xs sm:text-sm font-bold tracking-widest text-[#1F5C43] uppercase">
            Une approche humaine avant le choix du produit
          </p>
        </div>
      </div>

    </section>
  );
}
