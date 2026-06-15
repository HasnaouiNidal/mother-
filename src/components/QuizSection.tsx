import { useState } from 'react';
import { HelpCircle, ChevronRight, RotateCcw, ShieldAlert, Check, Brain, Flame, Sparkles, User, Baby, Moon, Activity, ShoppingBag } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';
import PrimaryCTA from './ui/PrimaryCTA';
import SecondaryCTA from './ui/SecondaryCTA';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    icon: React.ComponentType<any>;
    points: Record<string, number>;
  }[];
}

export default function QuizSection({ onRecommend }: { onRecommend: (productId: string, packQty: number) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    glycimax: 0,
    appeto: 0,
    pack: 0
  });
  const [quizFinished, setQuizFinished] = useState(false);
  const [recommendation, setRecommendation] = useState<{ id: string; name: string; qty: number; desc: string; price: number } | null>(null);

  // Maximum of 3 steps simple quiz
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Quel est votre objectif de santé principal ?",
      options: [
        { text: "Retrouver de l'énergie, calmer le stress & mieux dormir", icon: Brain, points: { glycimax: 3, appeto: 0, pack: 1 } },
        { text: "Stimuler mon appétit et fortifier mon organisme", icon: Flame, points: { glycimax: 0, appeto: 3, pack: 1 } },
        { text: "Les deux (Fatigue accumulée + manque d'appétit)", icon: Sparkles, points: { glycimax: 1, appeto: 1, pack: 4 } }
      ]
    },
    {
      id: 2,
      question: "Pour qui est destiné ce complément alimentaire ?",
      options: [
        { text: "Un adulte ou adolescent (+12 ans)", icon: User, points: { glycimax: 2, appeto: 1, pack: 2 } },
        { text: "Un enfant de moins de 12 ans", icon: Baby, points: { glycimax: 0, appeto: 3, pack: 0 } }
      ]
    },
    {
      id: 3,
      question: "Ressentez-vous d'autres inconforts au quotidien ?",
      options: [
        { text: "Oui (Anxiété, crampes musculaires, sommeil agité)", icon: Moon, points: { glycimax: 3, appeto: 0, pack: 1 } },
        { text: "Oui (Digestion difficile, fatigue après repas)", icon: Activity, points: { glycimax: 0, appeto: 3, pack: 1 } },
        { text: "Non, aucun de ces symptômes en particulier", icon: Check, points: { glycimax: 1, appeto: 1, pack: 0 } }
      ]
    }
  ];

  const handleAnswer = (points: Record<string, number>) => {
    // Accumulate points instantly
    setScores(prev => {
      const nextScores = { ...prev };
      Object.keys(points).forEach(key => {
        nextScores[key] = (nextScores[key] || 0) + points[key];
      });
      return nextScores;
    });

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let winner = 'glycimax';
    let maxScore = -1;

    const finalScores = { ...scores };
    Object.keys(finalScores).forEach(key => {
      if (finalScores[key] > maxScore) {
        maxScore = finalScores[key];
        winner = key;
      }
    });

    // Build recommendations
    let recProduct = {
      id: "glycimax",
      name: "Glycimax Magnésium",
      qty: 2,
      desc: "Notre formule haut de gamme au Bisglycinate de Magnésium et Vitamine B6. Parfait pour calmer votre système nerveux, relaxer vos muscles et restaurer des nuits profondes.",
      price: 349
    };

    if (winner === 'appeto') {
      recProduct = {
        id: "appeto",
        name: "Appeto+ Sirop",
        qty: 2,
        desc: "Notre sirop fortifiant 100% naturel aux extraits de plantes. Idéal pour stimuler l'appétit de façon saine, faciliter la digestion et recharger votre tonus physique.",
        price: 259
      };
    } else if (winner === 'pack') {
      recProduct = {
        id: "glycimax-appeto",
        name: "Pack Vitalité Duo (Glycimax + Appeto+)",
        qty: 3,
        desc: "La synergie complète pour éliminer la fatigue, détendre l'organisme, retrouver l'appétit et fortifier le métabolisme en profondeur.",
        price: 329
      };
    }

    setRecommendation(recProduct);
    setQuizFinished(true);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({ glycimax: 0, appeto: 0, pack: 0 });
    setQuizFinished(false);
    setRecommendation(null);
  };

  const selectRecommendation = () => {
    if (recommendation) {
      let targetId = "produits";
      if (recommendation.id === "glycimax") {
        targetId = "product-glycimax";
      } else if (recommendation.id === "appeto") {
        targetId = "product-appeto";
      }

      // Sync choice to parent state if needed, so it pre-selects in the checkout form
      if (recommendation.id === "glycimax-appeto") {
        onRecommend("glycimax", 3);
      } else {
        onRecommend(recommendation.id, recommendation.qty);
      }

      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWhatsAppOrder = () => {
    if (recommendation) {
      const message = `Bonjour Health Power ! Suite au test du Conseiller Recommendeur, je souhaite commander la solution recommandée : "${recommendation.name}" au tarif spécial de ${recommendation.price} DHS. Pouvez-vous confirmer ma livraison ?`;
      openWhatsApp(message);
    }
  };

  return (
    <section className="py-20 bg-brand-beige border-b border-brand-border/30 relative z-20" aria-label="Recommendeur de compléments intelligent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Frame */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-brand-border/40 shadow-xl shadow-brand-dark/5 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-xl pointer-events-none" aria-hidden="true"></div>

          {!quizFinished ? (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Progress & Steps indicators (Ensures no text below 14px) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-green">
                  <HelpCircle size={18} aria-hidden="true" />
                  <span className="font-sans font-bold text-sm uppercase tracking-wider">Conseiller Intelligent</span>
                </div>
                <span className="text-sm text-brand-muted font-bold font-sans">
                  Question {currentStep + 1} sur {questions.length}
                </span>
              </div>

              {/* Progress bar line wrapper */}
              <div className="w-full h-1.5 bg-brand-beige rounded-full overflow-hidden" aria-hidden="true">
                <div 
                  className="h-full bg-brand-green rounded-full transition-all duration-150"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question title */}
              <h3 className="text-xl sm:text-2xl font-serif font-black text-brand-dark leading-tight">
                {questions[currentStep].question}
              </h3>

              {/* Options List: large tappable cards with icons & arrows */}
              <div className="space-y-3.5 sm:space-y-4" role="group" aria-label={`Options pour la question ${currentStep + 1}`}>
                {questions[currentStep].options.map((option, idx) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAnswer(option.points)}
                      className="w-full p-4 sm:p-5 text-left border border-brand-border/50 hover:border-brand-green hover:bg-brand-green/5 bg-white rounded-2xl transition-all duration-75 flex items-center justify-between group cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1 outline-none min-h-[48px]"
                    >
                      <div className="flex items-center">
                        <div className="w-11 h-11 rounded-full bg-brand-green/5 text-brand-green border border-brand-green/10 flex items-center justify-center shrink-0" aria-hidden="true">
                          <Icon size={20} className="stroke-[2]" />
                        </div>
                        <span className="text-sm sm:text-base font-bold text-brand-dark ml-4 leading-snug">
                          {option.text}
                        </span>
                      </div>
                      <ChevronRight size={16} className="text-brand-muted/40 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all shrink-0 ml-2" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 sm:space-y-8">
              
              {/* Recommendation icon stamp */}
              <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto" aria-hidden="true">
                <Check size={30} className="stroke-[2.5]" />
              </div>

              <div>
                <span className="text-sm uppercase tracking-widest text-brand-gold font-bold bg-brand-dark text-brand-beige px-4 py-1.5 rounded-full mb-3 inline-block">
                  Recommandation Personnalisée
                </span>
                
                <h3 className="text-sm font-sans font-bold text-brand-muted uppercase tracking-wider mt-4">
                  Produit recommandé
                </h3>
                
                <h4 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark mt-1">
                  {recommendation?.name}
                </h4>
              </div>

              <p className="text-sm sm:text-base text-brand-muted max-w-lg mx-auto leading-relaxed font-sans font-light">
                {recommendation?.desc}
              </p>

              {/* Special reassurance strip */}
              <div className="inline-flex items-center gap-2 p-3 bg-brand-green/5 rounded-2xl border border-brand-green/10 max-w-sm mx-auto">
                <ShieldAlert size={16} className="text-brand-green flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-brand-dark font-sans font-bold text-left">
                  Livraison Express Gratuite + Paiement à la réception 🚚
                </span>
              </div>

              {/* Pricing section */}
              <div>
                <span className="text-sm uppercase tracking-widest text-brand-muted font-bold block mb-1">Tarif Exclusif</span>
                <span className="text-2xl sm:text-3xl font-serif font-black text-brand-dark">{recommendation?.price} DHS</span>
              </div>

              {/* Action triggers (Voir le produit & Commander) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <SecondaryCTA
                  onClick={selectRecommendation}
                  theme="outline"
                  className="w-full sm:w-auto px-8 py-4 font-bold text-sm min-h-[48px]"
                  ariaLabel="Voir la fiche détaillée de ce produit recommandé"
                >
                  Voir le produit
                </SecondaryCTA>
                
                <PrimaryCTA
                  onClick={handleWhatsAppOrder}
                  theme="whatsapp"
                  className="w-full sm:w-auto px-8 py-4 font-black text-sm"
                  ariaLabel="Commander ce produit recommandé directement sur WhatsApp"
                >
                  Commander via WhatsApp
                </PrimaryCTA>
              </div>

              {/* Restart quiz */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-dark font-bold py-2 px-4 focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg outline-none"
                  aria-label="Recommencer le questionnaire de recommandation"
                >
                  <RotateCcw size={14} aria-hidden="true" /> Recommencer le test
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
