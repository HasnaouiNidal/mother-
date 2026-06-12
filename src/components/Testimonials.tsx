import { Star, MessageCircle, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Khadija M.",
      city: "Casablanca",
      product: "Glycimax Magnésium",
      text: "Je souffrais d'insomnies à cause du stress. Depuis que je prends Glycimax, je dors d'un sommeil profond sans interruption et je me réveille en pleine forme. La livraison sur Casa a été faite le lendemain !",
      rating: 5,
      avatar: "KM",
      color: "from-emerald-400 to-teal-500"
    },
    {
      name: "Youssef T.",
      city: "Rabat",
      product: "Appeto+ Sirop",
      text: "Mon fils de 6 ans manquait cruellement d'appétit. Ce sirop naturel a fait des miracles en seulement une semaine. Il mange avec plaisir maintenant. J'apprécie le fait de payer directement le livreur.",
      rating: 5,
      avatar: "YT",
      color: "from-amber-400 to-orange-500"
    },
    {
      name: "Amina B.",
      city: "Marrakech",
      product: "Glycimax Magnésium",
      text: "Le service client sur WhatsApp est exceptionnel. Ils prennent le temps de vous conseiller. Ce magnésium glycinate est très doux pour l'estomac, aucun reflux contrairement aux marques de pharmacie.",
      rating: 5,
      avatar: "AB",
      color: "from-pink-400 to-rose-500"
    },
    {
      name: "Rachid A.",
      city: "Tanger",
      product: "Glycimax + Appeto+",
      text: "J'ai commandé le pack vitalité. Je me sens beaucoup moins fatigué en fin de journée et ma digestion s'est stabilisée. Livraison rapide en 48h à Tanger. Service au top !",
      rating: 5,
      avatar: "RA",
      color: "from-blue-400 to-indigo-500"
    },
    {
      name: "Fatima-Zahra K.",
      city: "Fès",
      product: "Glycimax Magnésium",
      text: "Excellent produit et emballage très propre. Je recommande vivement pour tous ceux qui souffrent de crampes musculaires nocturnes et de fatigue chronique.",
      rating: 5,
      avatar: "FK",
      color: "from-purple-400 to-fuchsia-500"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="temoignages" className="py-24 bg-brand-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-widest text-brand-green font-bold bg-brand-green/5 border border-brand-green/10 px-4 py-1.5 rounded-full">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-dark mt-4 mb-4 leading-tight">
            Ce que disent nos clients
          </h2>
          <p className="text-base sm:text-lg text-brand-dark/70 font-sans font-light">
            Rejoignez des milliers de Marocains qui ont transformé leur bien-être avec nos produits.
          </p>
        </div>

        {/* Carousel Slider */}
        <div className="relative max-w-3xl mx-auto mb-16 px-4">
          
          <div className="relative min-h-[300px] md:min-h-[260px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-brand-dark text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/5 relative overflow-hidden"
              >
                {/* Visual quote mark decoration */}
                <div className="absolute -top-10 -right-4 font-serif text-[180px] font-black text-white/5 leading-none pointer-events-none select-none">
                  “
                </div>

                {/* Stars and Product Tag */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex gap-1 text-brand-gold">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  <span className="bg-white/10 text-brand-gold text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full font-bold">
                    Acheté : {reviews[currentIndex].product}
                  </span>
                </div>

                {/* Testimonial body */}
                <p className="text-sm md:text-base text-white/85 leading-relaxed font-sans font-light italic mb-6">
                  "{reviews[currentIndex].text}"
                </p>

                {/* Reviewer Details */}
                <div className="flex items-center gap-3.5 border-t border-white/10 pt-5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${reviews[currentIndex].color} flex items-center justify-center font-bold text-sm text-white shadow-md shadow-black/10`}>
                    {reviews[currentIndex].avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      {reviews[currentIndex].name}
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-brand-green bg-[#DCF8C6]/20 px-2 py-0.5 rounded-full border border-brand-green/20">
                        <Check size={9} /> Achat Vérifié
                      </span>
                    </h4>
                    <p className="text-[10px] text-white/60 font-semibold tracking-wider uppercase mt-0.5">
                      {reviews[currentIndex].city}, Maroc
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-brand-border/40 bg-white text-brand-dark flex items-center justify-center shadow-sm hover:bg-brand-beige transition-colors duration-200 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i ? 'bg-brand-green w-6' : 'bg-brand-border/60 hover:bg-brand-border'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-brand-border/40 bg-white text-brand-dark flex items-center justify-center shadow-sm hover:bg-brand-beige transition-colors duration-200 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

        {/* Action Banner */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-brand-border/40 shadow-xl shadow-brand-dark/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold block mb-1">
              Garantie de Confiance
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-black text-brand-dark mb-2">
              Prêt à booster votre bien-être ?
            </h3>
            <p className="text-sm text-brand-dark/60 font-sans font-light">
              Des milliers de commandes livrées avec soin partout au Maroc. Plus de 98% de satisfaction client.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openWhatsApp("Bonjour, je souhaite commander après avoir vu les avis clients !")}
            className="w-full md:w-auto px-10 py-4.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-full shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2 flex-shrink-0 shimmer-btn cursor-pointer"
          >
            <MessageCircle size={22} />
            Discuter sur WhatsApp
          </motion.button>
        </div>

      </div>
    </section>
  );
}
