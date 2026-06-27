import { Star, MessageCircle, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';
import { useState } from 'react';

const reviews = [
  {
    name: 'Khadija M.',
    city: 'Casablanca',
    product: 'Glycimax Magnésium',
    problemBefore: 'J\'avais des nuits difficiles à cause du stress.',
    advisorExperience: 'J\'ai parlé avec la conseillère avant de commander. Elle m\'a expliqué le produit, comment le prendre et combien de temps il faut.',
    deliveryExperience: 'La livraison s\'est faite en 24h. J\'ai payé à la réception, très simple.',
    rating: 5,
    initials: 'KM',
  },
  {
    name: 'Youssef T.',
    city: 'Rabat',
    product: 'Appeto+ Sirop',
    problemBefore: 'Mon fils n\'avait pas d\'appétit depuis plusieurs semaines.',
    advisorExperience: 'La conseillère m\'a rassuré sur la composition naturelle du sirop et m\'a donné les instructions d\'utilisation clairement.',
    deliveryExperience: 'Livraison sur Rabat en 24h. Paiement à la réception uniquement, aucun risque.',
    rating: 5,
    initials: 'YT',
  },
  {
    name: 'Amina B.',
    city: 'Marrakech',
    product: 'Glycimax Magnésium',
    problemBefore: 'Je me réveillais fatiguée chaque matin malgré des heures de sommeil correctes.',
    advisorExperience: 'La conseillère a été disponible et patiente. Elle m\'a expliqué que le magnésium aide à la qualité du sommeil, pas juste à dormir plus longtemps.',
    deliveryExperience: 'Emballage soigné, livraison rapide. J\'ai payé cash à la livraison comme promis.',
    rating: 5,
    initials: 'AB',
  },
  {
    name: 'Rachid A.',
    city: 'Tanger',
    product: 'Glycimax + Appeto+',
    problemBefore: 'Fatigue en fin de journée et manque d\'appétit depuis un moment.',
    advisorExperience: 'La conseillère m\'a suggéré les deux produits ensemble. Elle m\'a bien expliqué les bienfaits de chacun et les a adaptés à ma situation.',
    deliveryExperience: 'Livraison sur Tanger en 48h. Paiement à la réception, sans problème.',
    rating: 5,
    initials: 'RA',
  },
  {
    name: 'Fatima-Zahra K.',
    city: 'Fès',
    product: 'Glycimax Magnésium',
    problemBefore: 'Crampes nocturnes et fatigue matinale constante.',
    advisorExperience: 'Très bonne conseillère. Elle répond vite et donne des informations claires. Pas de pression pour acheter.',
    deliveryExperience: 'Reçu en 48h. J\'ai payé au livreur, parfait.',
    rating: 5,
    initials: 'FK',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleNext = () => setCurrentIndex((p) => (p + 1) % reviews.length);
  const handlePrev = () => setCurrentIndex((p) => (p - 1 + reviews.length) % reviews.length);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
  };

  const review = reviews[currentIndex];

  return (
    <section
      id="temoignages"
      className="py-12 sm:py-16 lg:py-24 bg-brand-beige border-b border-brand-border/30 relative z-20"
      aria-label="Témoignages clients"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-4 py-1.5 rounded-full mb-4">
            Témoignages
          </span>
          <h2 className="font-serif font-black text-brand-dark text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-brand-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Des histoires vraies : le problème d'avant, l'expérience avec la conseillère, et la commande.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="max-w-3xl mx-auto mb-14"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            key={currentIndex}
            className="bg-white rounded-3xl border border-brand-border/40 shadow-xl overflow-hidden animate-fadeIn"
          >
            {/* Product tag */}
            <div className="bg-brand-green px-6 py-3 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-brand-gold">
                {review.product}
              </span>
              <div className="flex gap-1 text-brand-gold" aria-label={`${review.rating} étoiles`}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" stroke="none" aria-hidden="true" />
                ))}
              </div>
            </div>

            <div className="p-7 sm:p-10 space-y-5">
              {/* Problem before */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-1.5">Avant :</p>
                <p className="text-sm text-brand-dark/80 leading-relaxed font-light italic">
                  "{review.problemBefore}"
                </p>
              </div>

              {/* Advisor experience */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-green mb-1.5">Expérience avec la conseillère :</p>
                <p className="text-sm text-brand-dark/85 leading-relaxed font-medium">
                  "{review.advisorExperience}"
                </p>
              </div>

              {/* Delivery/payment */}
              <div className="flex items-start gap-2 bg-brand-beige rounded-xl p-3 border border-brand-border/30">
                <span className="text-sm" aria-hidden="true">🚚</span>
                <p className="text-xs text-brand-dark/70 leading-relaxed font-medium italic">
                  {review.deliveryExperience}
                </p>
              </div>

              {/* Reviewer */}
              <div className="flex items-center gap-3.5 border-t border-brand-border/30 pt-5">
                <div className="w-11 h-11 rounded-xl bg-brand-green text-brand-gold flex items-center justify-center font-black text-sm shadow-sm" aria-hidden="true">
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-dark flex items-center gap-2">
                    {review.name}
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full border border-brand-green/20">
                      <Check size={9} className="stroke-[2.5]" aria-hidden="true" /> Achat Vérifié
                    </span>
                  </h4>
                  <p className="text-[11px] text-brand-muted font-semibold tracking-wider uppercase">
                    {review.city}, Maroc 🇲🇦
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-7">
            <button
              onClick={handlePrev}
              aria-label="Témoignage précédent"
              className="w-11 h-11 rounded-full border border-brand-border/60 bg-white text-brand-dark flex items-center justify-center shadow-sm hover:bg-brand-beige hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green outline-none"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Sélecteur de témoignage">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={currentIndex === i}
                  aria-label={`Voir le témoignage ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green outline-none ${
                    currentIndex === i ? 'bg-brand-green w-6' : 'bg-brand-muted/30 hover:bg-brand-muted/60 w-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Témoignage suivant"
              className="w-11 h-11 rounded-full border border-brand-border/60 bg-white text-brand-dark flex items-center justify-center shadow-sm hover:bg-brand-beige hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green outline-none"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Action banner */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-brand-border/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
          <div>
            <span className="text-[10px] uppercase tracking-widest text-brand-green font-black block mb-1">Rejoignez nos clients</span>
            <h3 className="font-serif font-black text-brand-dark text-xl sm:text-2xl mb-1">
              Prêt à commencer votre bien-être ?
            </h3>
            <p className="text-sm text-brand-muted font-light">
              Parlez avec notre conseillère avant de commander — aucun engagement.
            </p>
          </div>
          <button
            id="testimonials-whatsapp-cta"
            onClick={() => openWhatsApp('Bonjour, j\'ai vu les témoignages et je voudrais commander. Pouvez-vous me conseiller ?')}
            className="inline-flex items-center gap-2.5 bg-whatsapp-green hover:bg-whatsapp-hover text-white font-black text-sm px-7 py-4 rounded-xl transition-all shadow-md shadow-whatsapp-green/20 shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-whatsapp-green outline-none min-h-[52px]"
            aria-label="Discuter avec un conseiller sur WhatsApp"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Discuter sur WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
}
