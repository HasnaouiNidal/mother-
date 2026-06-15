import { Star, MessageCircle, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeader from './ui/SectionHeader';
import PrimaryCTA from './ui/PrimaryCTA';

const reviews = [
  {
    name: "Khadija M.",
    city: "Casablanca",
    product: "Glycimax Magnésium",
    text: "Je souffrais d'insomnies à cause du stress. Depuis que je prends Glycimax, je dors d'un sommeil plus profond et je me réveille bien reposée. La livraison sur Casablanca s'est faite en 24h !",
    rating: 5,
    avatar: "KM",
    color: "bg-brand-green text-brand-gold"
  },
  {
    name: "Youssef T.",
    city: "Rabat",
    product: "Appeto+ Sirop",
    text: "Mon fils de 6 ans avait du mal à finir ses assiettes. Avec Appeto+, son appétit s'est amélioré progressivement après une semaine. Il mange plus facilement. Très pratique de payer à la livraison.",
    rating: 5,
    avatar: "YT",
    color: "bg-brand-green text-brand-gold"
  },
  {
    name: "Amina B.",
    city: "Marrakech",
    product: "Glycimax Magnésium",
    text: "Le service client sur WhatsApp est très réactif. Ils prennent le temps de bien conseiller. Ce magnésium est bien toléré par l'estomac, aucun inconfort digestif constaté.",
    rating: 5,
    avatar: "AB",
    color: "bg-brand-green text-brand-gold"
  },
  {
    name: "Rachid A.",
    city: "Tanger",
    product: "Glycimax + Appeto+",
    text: "J'ai pris le pack Glycimax + Appeto+. Je ressens un regain d'énergie en fin de journée et mon transit est plus régulier. La livraison sur Tanger a pris 48 heures.",
    rating: 5,
    avatar: "RA",
    color: "bg-brand-green text-brand-gold"
  },
  {
    name: "Fatima-Zahra K.",
    city: "Fès",
    product: "Glycimax Magnésium",
    text: "Excellent produit et emballage soigné. Très efficace pour réduire mes crampes nocturnes et la fatigue du matin.",
    rating: 5,
    avatar: "FK",
    color: "bg-brand-green text-brand-gold"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipe support state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <section id="temoignages" className="py-24 bg-brand-beige overflow-hidden" aria-label="Témoignages clients">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header using SectionHeader primitive */}
        <SectionHeader
          tagline="Témoignages"
          title="Ce que disent nos clients"
          description="Rejoignez des milliers de Marocains qui ont transformé leur bien-être avec nos compléments alimentaires."
          className="mb-16"
        />

        {/* Carousel Slider with touch swipe controls */}
        <div 
          className="relative max-w-3xl mx-auto mb-16 px-4 select-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          
          <div className="relative min-h-[300px] md:min-h-[260px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                className="w-full bg-white text-brand-dark p-8 md:p-10 rounded-3xl shadow-md border border-brand-border/60 relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
                aria-label={`Témoignage de ${reviews[currentIndex].name} de ${reviews[currentIndex].city}. Produit : ${reviews[currentIndex].product}. Utilisez les touches fléchées gauche et droite pour naviguer.`}
              >
                {/* Visual quote mark decoration */}
                <div className="absolute -top-10 -right-4 font-serif text-[180px] font-black text-brand-green/5 leading-none pointer-events-none select-none" aria-hidden="true">
                  “
                </div>

                {/* Stars and Product Tag */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex gap-1 text-brand-gold" aria-label="Évaluation de 5 étoiles">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" stroke="none" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="bg-brand-beige border border-brand-border/60 text-brand-green text-[10px] sm:text-xs uppercase tracking-wider px-3.5 py-1 rounded-full font-bold">
                    Produit : {reviews[currentIndex].product}
                  </span>
                </div>

                {/* Testimonial body */}
                <p className="text-sm sm:text-base text-brand-dark/90 leading-relaxed font-sans font-light italic mb-6">
                  "{reviews[currentIndex].text}"
                </p>

                {/* Reviewer Details */}
                <div className="flex items-center gap-3.5 border-t border-brand-border/40 pt-5">
                  <div className={`w-11 h-11 rounded-xl ${reviews[currentIndex].color} flex items-center justify-center font-bold text-sm shadow-sm`} aria-hidden="true">
                    {reviews[currentIndex].avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-brand-dark flex flex-wrap items-center gap-2">
                      {reviews[currentIndex].name}
                      <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-brand-green bg-[#DCF8C6]/30 px-2 py-0.5 rounded-full border border-brand-green/20">
                        <Check size={10} className="stroke-[2.5]" aria-hidden="true" /> Achat Vérifié
                      </span>
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-brand-muted font-semibold tracking-wider uppercase mt-0.5">
                      {reviews[currentIndex].city}, Maroc
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button 
              onClick={handlePrev}
              aria-label="Témoignage précédent"
              className="w-11 h-11 rounded-full border border-brand-border/60 bg-white text-brand-dark flex items-center justify-center shadow-xs hover:bg-brand-beige hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green outline-none"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            
            <div className="flex items-center gap-2" role="tablist" aria-label="Sélecteur de témoignage">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={currentIndex === i}
                  aria-label={`Voir le témoignage numéro ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green outline-none ${
                    currentIndex === i ? 'bg-brand-green w-6' : 'bg-brand-muted/40 hover:bg-brand-muted/70 w-2.5'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              aria-label="Témoignage suivant"
              className="w-11 h-11 rounded-full border border-brand-border/60 bg-white text-brand-dark flex items-center justify-center shadow-xs hover:bg-brand-beige hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green outline-none"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>

        </div>

        {/* Action Banner */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-brand-border/40 shadow-xl shadow-brand-dark/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-brand-green font-bold block mb-1">
              Garantie de Confiance
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-black text-brand-dark mb-2">
              Prêt à booster votre bien-être ?
            </h3>
            <p className="text-sm text-brand-muted font-sans font-light">
              Des milliers de commandes livrées avec soin partout au Maroc. Plus de 98% de satisfaction client.
            </p>
          </div>
          
          <PrimaryCTA
            onClick={() => openWhatsApp("Bonjour, je souhaite commander après avoir vu les avis clients !")}
            theme="whatsapp"
            icon={<MessageCircle size={22} aria-hidden="true" />}
            className="w-full md:w-auto px-8 py-4 shrink-0 text-base"
            ariaLabel="Discuter avec un conseiller sur WhatsApp"
          >
            Discuter sur WhatsApp
          </PrimaryCTA>
        </div>

      </div>
    </section>
  );
}
