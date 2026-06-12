import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight, RotateCcw, ShieldAlert, Check } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
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

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Quel est votre objectif de santé principal ?",
      options: [
        { text: "🌿 Retrouver de l'énergie, calmer le stress & mieux dormir", points: { glycimax: 3, appeto: 0, pack: 1 } },
        { text: "🍽️ Stimuler mon appétit et fortifier mon organisme", points: { glycimax: 0, appeto: 3, pack: 1 } },
        { text: "⚡ Les deux (Fatigue accumulée + manque d'appétit)", points: { glycimax: 1, appeto: 1, pack: 4 } }
      ]
    },
    {
      id: 2,
      question: "Pour qui est destiné ce complément alimentaire ?",
      options: [
        { text: "👨 Un adulte ou adolescent (+12 ans)", points: { glycimax: 2, appeto: 1, pack: 2 } },
        { text: "👶 Un enfant de moins de 12 ans", points: { glycimax: 0, appeto: 3, pack: 0 } } // Appeto syrup is ideal for kids
      ]
    },
    {
      id: 3,
      question: "Ressentez-vous d'autres inconforts au quotidien ?",
      options: [
        { text: "💤 Oui (Anxiété, crampes musculaires, sommeil agité)", points: { glycimax: 3, appeto: 0, pack: 1 } },
        { text: "🍽️ Oui (Digestion difficile, fatigue après repas)", points: { glycimax: 0, appeto: 3, pack: 1 } },
        { text: "❌ Non, aucun de ces symptômes en particulier", points: { glycimax: 1, appeto: 1, pack: 0 } }
      ]
    }
  ];

  const handleAnswer = (points: Record<string, number>) => {
    // Accumulate points
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
    // Determine winner based on accumulated score
    let winner = 'glycimax';
    let maxScore = -1;

    // We do a final check of scores
    const finalScores = { ...scores };
    
    // Find highest score
    Object.keys(finalScores).forEach(key => {
      if (finalScores[key] > maxScore) {
        maxScore = finalScores[key];
        winner = key;
      }
    });

    // Generate recommendation data
    let recProduct = {
      id: "glycimax",
      name: "Pack Glycimax Magnésium (2 Boîtes)",
      qty: 2,
      desc: "Idéal pour calmer votre système nerveux, réduire la fatigue intellectuelle/physique et restaurer un sommeil de qualité.",
      price: 349
    };

    if (winner === 'appeto') {
      recProduct = {
        id: "appeto",
        name: "Pack Appeto+ Sirop (2 Boîtes)",
        qty: 2,
        desc: "Notre sirop naturel fortifiant, parfait pour ouvrir l'appétit et redonner de l'énergie à l'organisme.",
        price: 259
      };
    } else if (winner === 'pack') {
      recProduct = {
        id: "glycimax-appeto",
        name: "Pack Vitalité Duo (Glycimax + Appeto+)",
        qty: 3, // Combined offer
        desc: "L'association parfaite pour traiter à la fois la fatigue nerveuse et stimuler l'organisme en profondeur.",
        price: 329 // Specially discounted pack price
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
      // Map combined pack to appeto/glycimax selection
      if (recommendation.id === "glycimax-appeto") {
        onRecommend("glycimax", 3); // 3 represents the combined special offer
      } else {
        onRecommend(recommendation.id, recommendation.qty);
      }
      
      // Smooth scroll to order form
      const orderForm = document.getElementById("form-commande");
      if (orderForm) {
        orderForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-20 bg-brand-beige border-b border-brand-border/30 relative z-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Frame */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-border/40 shadow-xl shadow-brand-dark/5 relative overflow-hidden">
          
          {/* Subtle nature details */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-xl pointer-events-none"></div>

          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key="quiz-body"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* Steps indicator */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 text-brand-green">
                    <HelpCircle size={18} />
                    <span className="font-sans font-bold text-xs uppercase tracking-wider">Conseiller Intelligent</span>
                  </div>
                  <span className="text-xs text-brand-dark/50 font-bold font-sans">
                    Question {currentStep + 1} sur {questions.length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-brand-beige rounded-full mb-8 overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-green rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Question title */}
                <h3 className="text-xl md:text-2xl font-serif font-black text-brand-dark mb-8 leading-tight">
                  {questions[currentStep].question}
                </h3>

                {/* Options List */}
                <div className="space-y-4">
                  {questions[currentStep].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.015, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(option.points)}
                      className="w-full p-5 text-left border border-brand-border/50 hover:border-brand-green hover:bg-brand-green/5 rounded-2xl font-sans text-sm font-semibold text-brand-dark transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span>{option.text}</span>
                      <ChevronRight size={16} className="text-brand-dark/30 group-hover:text-brand-green group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="quiz-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="text-center"
              >
                {/* Result stamp */}
                <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={28} />
                </div>

                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold bg-brand-dark text-brand-beige px-4 py-1.5 rounded-full mb-3 inline-block">
                  Recommandation Personnalisée
                </span>

                <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-dark mb-3">
                  {recommendation?.name}
                </h3>

                <p className="text-sm text-brand-dark/70 max-w-lg mx-auto mb-6 leading-relaxed font-sans font-light">
                  {recommendation?.desc}
                </p>

                {/* Special Voucher Tag */}
                <div className="inline-flex items-center gap-2 p-3 bg-brand-green/10 rounded-2xl border border-brand-green/20 mb-8 max-w-sm mx-auto">
                  <ShieldAlert size={16} className="text-brand-green flex-shrink-0" />
                  <span className="text-xs text-brand-dark font-sans font-bold text-left">
                    🎉 Offre spéciale : Livraison Gratuite + Cadeau surprise inclus pour cette cure !
                  </span>
                </div>

                {/* Price Display */}
                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-bold block">Tarif Exclusif</span>
                  <span className="text-3xl font-serif font-black text-brand-dark">{recommendation?.price} DHS</span>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={selectRecommendation}
                    className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-full shadow-lg shadow-[#25D366]/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer shimmer-btn"
                  >
                    Commander ce Pack Recommandé
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="w-full sm:w-auto px-6 py-4 border border-brand-border text-brand-dark/60 hover:text-brand-dark hover:border-brand-dark font-bold rounded-full transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw size={14} /> Recommencer le test
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
