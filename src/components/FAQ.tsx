import { useState } from 'react';
import { ChevronDown, Search, MessageSquareHelper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, openWhatsApp } from '../lib/utils';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: "Comment puis-je payer ma commande ?",
      a: "Le paiement est 100% sécurisé et se fait uniquement à la livraison (En espèces). Vous ne payez rien sur internet. Vous donnez l'argent au livreur uniquement après avoir reçu votre colis entre vos mains."
    },
    {
      q: "Quels sont les délais de livraison ?",
      a: "Nous livrons partout au Maroc. À Casablanca et Rabat, la livraison se fait en 24h. Pour les autres villes (Marrakech, Fès, Tanger, Agadir, Oujda, etc.), comptez entre 24h et 48h ouvrables chez vous."
    },
    {
      q: "Vos compléments sont-ils autorisés et naturels ?",
      a: "Absolument. Nos produits comme Glycimax et Appeto+ sont formulés à partir d'ingrédients 100% naturels de première qualité. Ils respectent scrupuleusement les normes de sécurité en vigueur et sont sans danger pour la santé."
    },
    {
      q: "Puis-je combiner Glycimax et Appeto+ ?",
      a: "Oui, tout à fait. Glycimax (Magnésium Bisglycinate) agit sur la fatigue et le système nerveux pour vous détendre, tandis que Appeto+ stimule l'appétit de manière saine. Ils sont complémentaires et peuvent être pris ensemble au cours de la même journée."
    },
    {
      q: "Comment se déroule la commande ?",
      a: "C'est extrêmement simple ! Cliquez sur n'importe quel bouton 'Commander' sur ce site. Cela vous redirigera sur WhatsApp avec un message pré-rempli. Vous n'avez qu'à envoyer le message, et notre conseiller prendra votre adresse pour lancer l'expédition."
    },
    {
      q: "Y a-t-il des frais de livraison cachés ?",
      a: "Non, aucun ! La livraison est entièrement gratuite partout au Maroc pour tous nos packs de compléments. Vous ne payez que le prix affiché sur le site."
    }
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-white border-b border-brand-border/30 relative z-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold bg-brand-gold/10 border border-brand-gold/20 px-4 py-1.5 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-dark mt-4 mb-4 leading-tight">
            Questions Fréquentes
          </h2>
          <p className="text-base text-brand-dark/70 font-sans font-light">
            Une question ? Trouvez rapidement votre réponse ci-dessous ou contactez-nous directement.
          </p>
        </div>

        {/* Real-time Search Box */}
        <div className="relative mb-8 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={16} className="text-brand-dark/40" />
          </div>
          <input 
            type="text" 
            placeholder="Rechercher une question (ex: livraison, paiement...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-brand-beige/50 border border-brand-border/40 rounded-full font-sans text-xs sm:text-sm text-brand-dark focus:outline-none focus:border-brand-green focus:bg-white transition-all shadow-inner"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 min-h-[150px]">
          <AnimatePresence initial={false}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const globalIdx = faqs.findIndex(f => f.q === faq.q);
                const isCurrentOpen = openIndex === globalIdx;

                return (
                  <motion.div 
                    key={faq.q}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "border rounded-2xl overflow-hidden transition-all duration-300",
                      isCurrentOpen 
                        ? "border-brand-green bg-brand-beige-light/70 shadow-sm" 
                        : "border-brand-border/40 bg-white hover:border-brand-border"
                    )}
                  >
                    <button
                      className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none cursor-pointer group"
                      onClick={() => setOpenIndex(isCurrentOpen ? null : globalIdx)}
                    >
                      <span className="font-sans font-bold text-sm md:text-base text-brand-dark pr-4 group-hover:text-brand-green transition-colors">
                        {faq.q}
                      </span>
                      <ChevronDown 
                        className={cn(
                          "text-brand-gold transition-transform duration-300 flex-shrink-0",
                          isCurrentOpen ? "rotate-180 text-brand-green" : ""
                        )} 
                        size={18} 
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isCurrentOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 text-brand-dark/75 leading-relaxed text-xs sm:text-sm font-sans font-light border-t border-brand-border/10 pt-2">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-brand-dark/50 text-sm font-sans"
              >
                Aucune réponse ne correspond à votre recherche.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* WhatsApp redirection footer */}
        <div className="mt-12 text-center p-6 bg-brand-beige-light rounded-2xl border border-brand-border/30">
          <p className="text-xs sm:text-sm text-brand-dark/75 font-sans font-medium mb-3">
            Vous avez une autre question spécifique ou besoin d'un conseil personnalisé ?
          </p>
          <button
            onClick={() => openWhatsApp("Salam, j'ai une question concernant vos compléments alimentaires...")}
            className="inline-flex items-center gap-2 text-xs font-black text-brand-green hover:text-brand-green-light border border-brand-green/20 hover:border-brand-green px-4 py-2 rounded-full bg-white transition-all shadow-sm cursor-pointer"
          >
            Posez-la sur WhatsApp Directement
          </button>
        </div>

      </div>
    </section>
  );
}
