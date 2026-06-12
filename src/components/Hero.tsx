import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ShieldCheck, Truck, Star, Info, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';

interface Hotspot {
  id: string;
  x: number; // percentage left
  y: number; // percentage top
  title: string;
  desc: string;
}

export default function Hero({ onSelectProduct }: { onSelectProduct?: (productId: string, qty: number) => void }) {
  const [activeTab, setActiveTab] = useState<'glycimax' | 'appeto'>('glycimax');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Mouse tilt offsets for 3D parallax
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);
    // Subtle rotation values
    setTilt({
      rotateX: -y / 15,
      rotateY: x / 15
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setActiveHotspot(null);
  };

  const handleOrder = () => {
    if (onSelectProduct) {
      onSelectProduct(activeTab, 2); // default to pack of 2
      const form = document.getElementById("form-commande");
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Product specific content configurations
  const productData = {
    glycimax: {
      title: "Glycimax Magnésium",
      subtitle: "Bisglycinate de Magnésium + B6",
      tagline: "Restaurez votre sommeil & énergie",
      desc: "La forme de magnésium la plus assimilable pour apaiser votre système nerveux, éliminer le fatigue physique ou mentale et retrouver un sommeil réparateur profond sans aucun inconfort d'estomac.",
      tag: "Sommeil & Anti-Fatigue",
      badge: "Recommandé par les experts",
      colorClass: "text-[#2C5E3B]",
      glowColor: "shadow-brand-green/30",
      accentBg: "bg-brand-green/10 text-brand-green border-brand-green/20",
      bgLogoColor: "text-brand-green/5",
      image: "/glycimax.png",
      hotspots: [
        { id: "g-label", x: 42, y: 55, title: "Magnésium Bisglycinate", desc: "Formule hautement digestible et assimilable à 95% par l'organisme sans effet laxatif." },
        { id: "g-cap", x: 50, y: 22, title: "Capsule HPMC Végétale", desc: "Zéro gélatine animale, faite de cellulose de pin certifiée Halal/Vegan." }
      ]
    },
    appeto: {
      title: "Appeto+ Sirop",
      subtitle: "Sirop Fortifiant Naturel",
      tagline: "Stimulez l'appétit naturellement",
      desc: "Une formule douce à base d'extraits naturels de plantes marocaines et de vitamines essentielles pour ouvrir sainement l'appétit et fortifier toute la famille (adultes et enfants).",
      tag: "Stimulation de l'Appétit",
      badge: "100% Plantes & Vitamines",
      colorClass: "text-[#C8A261]",
      glowColor: "shadow-brand-gold/30",
      accentBg: "bg-brand-gold/10 text-brand-dark border-brand-gold/20",
      bgLogoColor: "text-brand-gold/5",
      image: "/appeto.png",
      hotspots: [
        { id: "a-label", x: 45, y: 52, title: "Plantes Actives", desc: "Synergie de Fenugrec et de Gingembre pour ouvrir l'appétit de façon progressive et saine." },
        { id: "a-vit", x: 55, y: 68, title: "Complexe Vitaminique", desc: "Riche en Vitamines C, B1, B6 et B12 pour stimuler le tonus général." }
      ]
    }
  };

  const current = productData[activeTab];

  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-brand-beige min-h-[680px] flex items-center">
      
      {/* Ambient Radial background lights */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl transform -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl transform translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: DYNAMIC DETAILS */}
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Product Tag */}
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 uppercase tracking-wider text-[10px] sm:text-xs font-bold border ${current.accentBg}`}>
                  <ShieldCheck size={14} />
                  <span>{current.tag} • {current.badge}</span>
                </div>
                
                {/* Big Elegant Titles */}
                <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-serif font-black text-brand-dark leading-tight mb-2">
                  {current.title}
                </h1>
                <p className="text-brand-green font-bold text-sm tracking-widest uppercase mb-6">
                  {current.subtitle}
                </p>
                
                {/* Description */}
                <p className="text-base sm:text-lg text-brand-dark/70 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
                  {current.desc}
                  <span className="block mt-4 font-semibold text-brand-green">
                    🇲🇦 Expédition gratuite & paiement cash à domicile partout au Maroc.
                  </span>
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOrder}
                    className="w-full sm:w-auto px-10 py-4.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-full shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-3 text-base shimmer-btn cursor-pointer"
                  >
                    <MessageCircle size={20} />
                    Commander {activeTab === 'glycimax' ? 'Glycimax' : 'Appeto+'}
                  </motion.button>
                  
                  <div className="flex items-center gap-1.5 text-brand-gold bg-white px-4 py-2.5 rounded-full border border-brand-border/30 shadow-sm text-xs font-semibold">
                    <span className="flex text-brand-gold">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" stroke="none" />)}
                    </span>
                    <span className="text-brand-dark/80 ml-1">4.9/5 (5k+ Commandes)</span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
            
            {/* Quick trust flags */}
            <div className="mt-10 pt-6 border-t border-brand-border/30 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-widest text-brand-dark/50 font-sans">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-brand-gold" />
                <span>Livraison Offerte 24/48h</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-gold" />
                <span>Paiement à la Réception</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: POPPI-STYLE 3D FLOATING PRODUCT HERO */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[500px] h-[460px] md:h-[520px] flex items-center justify-center pointer-events-auto"
              style={{ perspective: "1200px" }}
            >
              
              {/* Massive background overlay typography (Depth Parallax) */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
                <motion.span 
                  style={{
                    rotateX: tilt.rotateX * 0.4,
                    rotateY: tilt.rotateY * 0.4,
                    translateZ: -80
                  }}
                  animate={{ scale: [0.95, 1.02, 0.95] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                  className="font-sans font-black text-[13vw] lg:text-[7vw] leading-none uppercase text-brand-dark/[0.03] tracking-tighter"
                >
                  {activeTab}
                </motion.span>
              </div>

              {/* 3D Parallax Bottle Container */}
              <motion.div
                style={{
                  rotateX: tilt.rotateX,
                  rotateY: tilt.rotateY,
                  transformStyle: "preserve-3d",
                  translateZ: 0
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="relative w-[320px] h-[460px] flex items-center justify-center rounded-3xl"
              >
                
                {/* Floating active bottle */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.6, rotate: -10, y: 50 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: 0, 
                      y: [0, -14, 0],
                      translateZ: 40
                    }}
                    exit={{ opacity: 0, scale: 0.6, rotate: 10, y: -50 }}
                    transition={{ 
                      y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                      opacity: { duration: 0.35 },
                      scale: { type: "spring", stiffness: 200, damping: 20 }
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-full h-full relative"
                  >
                    
                    {/* Bottle Image - truly transparent PNG floating natively */}
                    <img 
                      src={current.image} 
                      alt={`${current.title} Bottle`} 
                      className="w-full h-full object-contain pointer-events-none"
                    />

                    {/* Floating 3D layered ingredients around active bottle */}
                    {/* Element 1: Leaf in front */}
                    <motion.div 
                      style={{ transform: "translate3d(-30px, -20px, 70px) rotate(15deg)" }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="absolute top-10 -left-12 w-10 h-10 text-brand-green/35 pointer-events-none select-none"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.26,15.49 6.36,9.32 15.37,7.32C17,7 18,6 18,6C18,6 19,7 17.5,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.07 19.22,15.96 17.95,17.4C16,13.68 12.87,11.23 9.07,10.07C10.74,7.44 13.56,5.43 17,4.42C15.54,4.15 14,4 12,4M5.6,8.2C7,9 8.24,10 9.24,11.2C6.93,12.79 5.23,15.06 4.35,17.75C4.12,16 4,14.07 4.23,12.03C4.46,10.05 4.96,9.08 5.6,8.2Z" />
                      </svg>
                    </motion.div>

                    {/* Element 2: Drop in front */}
                    <motion.div 
                      style={{ transform: "translate3d(40px, 30px, 60px)" }}
                      animate={{ y: [0, 8, 0], scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                      className={`absolute bottom-12 -right-10 w-6 h-6 pointer-events-none select-none text-xl`}
                    >
                      {activeTab === 'glycimax' ? '🔹' : '🔸'}
                    </motion.div>

                    {/* Element 3: Leaf behind */}
                    <motion.div 
                      style={{ transform: "translate3d(30px, -40px, -30px) rotate(-25deg)" }}
                      animate={{ y: [0, -12, 0] }}
                      transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                      className="absolute top-4 -right-12 w-8 h-8 text-brand-green/20 pointer-events-none select-none"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.26,15.49 6.36,9.32 15.37,7.32C17,7 18,6 18,6C18,6 19,7 17.5,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.07 19.22,15.96 17.95,17.4C16,13.68 12.87,11.23 9.07,10.07C10.74,7.44 13.56,5.43 17,4.42C15.54,4.15 14,4 12,4M5.6,8.2C7,9 8.24,10 9.24,11.2C6.93,12.79 5.23,15.06 4.35,17.75C4.12,16 4,14.07 4.23,12.03C4.46,10.05 4.96,9.08 5.6,8.2Z" />
                      </svg>
                    </motion.div>

                    {/* Element 4: Sparkle/Drop behind */}
                    <motion.div 
                      style={{ transform: "translate3d(-20px, 40px, -40px)" }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                      className="absolute bottom-8 -left-8 w-5 h-5 bg-brand-gold/20 rounded-full blur-[1px] pointer-events-none select-none"
                    />

                    {/* Interactive spots overlay inside the floating bottle space */}
                    {current.hotspots.map((spot) => (
                      <div
                        key={spot.id}
                        style={{
                          position: 'absolute',
                          left: `${spot.x}%`,
                          top: `${spot.y}%`,
                          transform: 'translate3d(-50%, -50%, 40px)',
                          zIndex: 30
                        }}
                      >
                        <button
                          onMouseEnter={() => setActiveHotspot(spot.id)}
                          className={`w-6.5 h-6.5 rounded-full flex items-center justify-center relative cursor-pointer focus:outline-none transition-all duration-300 bg-brand-dark text-white border border-white/20`}
                        >
                          <span className="absolute inset-0 rounded-full bg-brand-gold opacity-60 animate-ping"></span>
                          <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
                        </button>
                      </div>
                    ))}

                  </motion.div>
                </AnimatePresence>

              </motion.div>

              {/* DYNAMIC HOTSPOT GLASS CARD TOOLTIP */}
              <div className="absolute bottom-[-15px] left-2 right-2 z-40 h-[95px]">
                <AnimatePresence mode="wait">
                  {activeHotspot && (
                    <motion.div
                      key={activeHotspot}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.95 }}
                      className="w-full glass-panel p-4 rounded-2xl border border-brand-border/40 shadow-lg flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0 font-bold text-xs">
                        🌱
                      </div>
                      <div className="flex-grow pr-2">
                        <h5 className="font-serif font-bold text-xs text-brand-dark">
                          {current.hotspots.find(h => h.id === activeHotspot)?.title}
                        </h5>
                        <p className="text-[10px] sm:text-xs text-brand-dark/75 leading-relaxed font-sans font-light mt-0.5">
                          {current.hotspots.find(h => h.id === activeHotspot)?.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* PRODUCT SWITCHER SLIDER TABS (Like Poppi Can Switcher list) */}
            <div className="flex items-center gap-3.5 mt-8 bg-white/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-brand-border/30 shadow-xs">
              <button
                onClick={() => { setActiveTab('glycimax'); setActiveHotspot(null); }}
                className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'glycimax' 
                    ? 'bg-brand-green text-white shadow-md' 
                    : 'text-brand-dark/50 hover:text-brand-dark'
                }`}
              >
                Glycimax
              </button>
              <button
                onClick={() => { setActiveTab('appeto'); setActiveHotspot(null); }}
                className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === 'appeto' 
                    ? 'bg-brand-gold text-brand-dark shadow-md' 
                    : 'text-brand-dark/50 hover:text-brand-dark'
                }`}
              >
                Appeto+
              </button>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
