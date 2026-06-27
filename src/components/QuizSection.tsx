import { useState } from 'react';
import { ChevronRight, RotateCcw, CheckCircle2, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';

interface QuizProps {
  onRecommend: (productId: string, qty: number) => void;
}

type Answer = string;

const questions = [
  {
    id: 1,
    question: 'Quel est votre objectif principal ?',
    options: [
      { text: 'Mieux dormir / réduire le stress', product: 'glycimax', emoji: '😴' },
      { text: 'Retrouver de l\'énergie', product: 'glycimax', emoji: '⚡' },
      { text: 'Stimuler l\'appétit', product: 'appeto', emoji: '🍽️' },
      { text: 'Je ne sais pas, je veux un conseil', product: 'conseil', emoji: '💬' },
    ],
  },
  {
    id: 2,
    question: 'Depuis combien de temps ressentez-vous ce besoin ?',
    options: [
      { text: 'Quelques jours', product: null, emoji: '📅' },
      { text: 'Quelques semaines', product: null, emoji: '🗓️' },
      { text: 'Plus d\'un mois', product: null, emoji: '⏳' },
    ],
  },
  {
    id: 3,
    question: 'Vous préférez quoi ?',
    options: [
      { text: 'Commander directement', product: null, emoji: '🛍️' },
      { text: 'Parler avec la conseillère', product: null, emoji: '💬' },
      { text: 'Recevoir une recommandation', product: null, emoji: '✅' },
    ],
  },
];

const products: Record<string, { id: string; name: string; desc: string; price: string; image: string }> = {
  glycimax: {
    id: 'glycimax',
    name: 'Glycimax Magnésium',
    desc: 'Magnésium bisglycinate + Vitamine B6 pour soutenir le sommeil, réduire la fatigue et contribuer au bon fonctionnement du système nerveux.',
    price: '349',
    image: '/glycimax-premium.png',
  },
  appeto: {
    id: 'appeto',
    name: 'Appeto+ Sirop',
    desc: 'Sirop fortifiant naturel aux extraits de plantes pour aider à stimuler l\'appétit et soutenir la vitalité au quotidien.',
    price: '259',
    image: '/appeto.png',
  },
  conseil: {
    id: 'glycimax',
    name: 'Conseil personnalisé',
    desc: 'Parfait ! Notre conseillère vous guidera directement sur WhatsApp pour vous orienter vers le produit le plus adapté à votre situation.',
    price: '',
    image: '/glycimax-premium.png',
  },
};

export default function QuizSection({ onRecommend }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [recommendedProduct, setRecommendedProduct] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option: { text: string; product: string | null }) => {
    const newAnswers = [...answers, option.text];
    setAnswers(newAnswers);

    if (step === 0 && option.product) {
      setRecommendedProduct(option.product);
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Show result
      const finalProduct = recommendedProduct ?? 'glycimax';
      if (finalProduct !== 'conseil') {
        onRecommend(finalProduct, 2);
      }
      setFinished(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setRecommendedProduct(null);
    setFinished(false);
  };

  const sendToWhatsApp = () => {
    const prod = products[recommendedProduct ?? 'glycimax'];
    const mainNeed = answers[0] ?? 'non précisé';
    const duration = answers[1] ?? 'non précisé';
    const preference = answers[2] ?? 'non précisé';
    const message =
      `Bonjour Health Power Maroc, j'ai fait le quiz sur votre site.\n\n` +
      `Mon besoin principal est : ${mainNeed}\n` +
      `Depuis : ${duration}\n` +
      `Je préfère : ${preference}\n\n` +
      `Produit recommandé : ${prod.name}\n\n` +
      `Pouvez-vous me conseiller le produit adapté ? Merci !`;
    openWhatsApp(message);
  };

  const scrollToProduct = () => {
    const finalProduct = recommendedProduct ?? 'glycimax';
    const anchor = finalProduct === 'appeto' ? 'product-appeto' : 'product-glycimax';
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const rec = products[recommendedProduct ?? 'glycimax'];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <section
      id="quiz"
      className="py-12 sm:py-16 lg:py-24 bg-white border-b border-brand-border/30 relative z-20"
      aria-label="Quiz de recommandation produit"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-green bg-brand-green/5 border border-brand-green/15 px-4 py-1.5 rounded-full mb-4">
            Quiz rapide
          </span>
          <h2 className="font-serif font-black text-brand-dark text-3xl sm:text-4xl leading-tight mb-3">
            Répondez à 3 questions et trouvez le produit adapté
          </h2>
          <p className="text-brand-muted text-sm font-light">
            Moins de 30 secondes. Résultat envoyé sur WhatsApp.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-brand-border/40 rounded-3xl shadow-xl overflow-hidden">

          {!finished ? (
            <div>
              {/* Progress bar */}
              <div className="h-1.5 bg-brand-beige" aria-hidden="true">
                <div
                  className="h-full bg-brand-green rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="p-7 sm:p-10">
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-brand-green">
                    Question {step + 1} sur {questions.length}
                  </span>
                  <div className="flex gap-1.5">
                    {questions.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${i <= step ? 'bg-brand-green' : 'bg-brand-border'}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-serif font-black text-brand-dark text-xl sm:text-2xl mb-7 leading-snug">
                  {questions[step].question}
                </h3>

                {/* Options */}
                <div className="space-y-3" role="group" aria-label={`Options pour la question ${step + 1}`}>
                  {questions[step].options.map((option) => (
                    <button
                      key={option.text}
                      type="button"
                      onClick={() => handleAnswer(option)}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl border border-brand-border/50 bg-brand-beige/30 hover:border-brand-green hover:bg-brand-green/5 text-left transition-all duration-150 group cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green outline-none min-h-[56px]"
                    >
                      <span className="text-2xl shrink-0 select-none" aria-hidden="true">{option.emoji}</span>
                      <span className="text-sm sm:text-base font-bold text-brand-dark flex-grow leading-snug">
                        {option.text}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-brand-muted/40 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-7 sm:p-10">
              {/* Result */}
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={30} aria-hidden="true" />
                </div>

                <span className="inline-block text-xs font-black uppercase tracking-widest bg-brand-dark text-brand-gold px-5 py-1.5 rounded-full mb-5">
                  Recommandation personnalisée
                </span>

                {/* Product preview */}
                <div className="flex items-center justify-center gap-5 mb-5 p-5 bg-brand-beige rounded-2xl border border-brand-border/40">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-16 h-16 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-wider text-brand-muted mb-1">Produit recommandé</p>
                    <h4 className="font-serif font-black text-brand-dark text-xl">{rec.name}</h4>
                    {rec.price && (
                      <p className="text-brand-green font-bold text-sm mt-0.5">
                        À partir de <span className="font-black">{rec.price} DHS</span>
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-brand-muted text-sm leading-relaxed mb-7 max-w-md mx-auto font-light">
                  {rec.desc}
                </p>

                {/* Trust strip */}
                <div className="flex items-center justify-center gap-2 bg-brand-green/5 border border-brand-green/10 rounded-xl p-3 mb-7 max-w-xs mx-auto">
                  <span className="text-brand-gold text-sm">🚚</span>
                  <span className="text-xs font-bold text-brand-dark">Livraison gratuite + paiement à la réception</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    id="quiz-result-whatsapp-cta"
                    onClick={sendToWhatsApp}
                    className="shimmer-btn inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-black text-sm text-white shadow-lg min-h-[52px] cursor-pointer focus-visible:ring-2 focus-visible:ring-whatsapp-green outline-none"
                    aria-label="Envoyer mon résultat sur WhatsApp"
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                    Envoyer mon résultat sur WhatsApp
                  </button>

                  {recommendedProduct !== 'conseil' && (
                    <button
                      onClick={scrollToProduct}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-brand-border/50 text-brand-dark font-bold text-sm hover:border-brand-green hover:text-brand-green transition-all min-h-[52px] cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green outline-none"
                      aria-label="Voir la fiche du produit recommandé"
                    >
                      Voir le produit
                    </button>
                  )}
                </div>

                {/* Restart */}
                <button
                  onClick={reset}
                  className="mt-5 inline-flex items-center gap-2 text-xs text-brand-muted hover:text-brand-dark font-bold py-2 px-4 focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg outline-none cursor-pointer"
                  aria-label="Recommencer le quiz"
                >
                  <RotateCcw size={13} aria-hidden="true" />
                  Recommencer le quiz
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
