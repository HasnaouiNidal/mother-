import { CheckCircle2, MessageCircle, Info, Flame, Droplet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openWhatsApp } from '../lib/utils';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  tag: string;
  badge?: string;
  description: string;
  price1: number;
  price2: number;
  price3: number;
  benefits: string[];
  usage: string;
  ingredients: string;
}

export default function ProductsSection({ onSelectProduct }: { onSelectProduct?: (productId: string, qty: number) => void }) {
  const products: Product[] = [
    {
      id: "glycimax",
      name: "Glycimax",
      subtitle: "Magnésium Bisglycinate + B6",
      image: "/glycimax.png",
      tag: "Sommeil & Anti-Fatigue",
      badge: "Recommandé par les experts",
      description: "La forme de magnésium la plus assimilable pour apaiser votre système nerveux, éliminer le stress et retrouver un sommeil réparateur profond sans aucun trouble intestinal.",
      price1: 199,
      price2: 349, // Save 49
      price3: 479, // Save 118
      benefits: [
        "Réduit la fatigue physique et nerveuse",
        "Améliore significativement le sommeil",
        "Aide à la relaxation musculaire (anti-crampes)",
        "Haute biodisponibilité (sans effet laxatif)"
      ],
      usage: "Prendre 2 gélules par jour avec un grand verre d'eau, de préférence le soir 30 minutes avant le coucher. Cure conseillée de 1 à 2 mois.",
      ingredients: "Magnésium Bisglycinate pur (400mg), Vitamine B6 bioactive (1.4mg), enveloppe végétale naturelle (HPMC)."
    },
    {
      id: "appeto",
      name: "Appeto+",
      subtitle: "Sirop Fortifiant Naturel",
      image: "/appeto.png",
      tag: "Stimulation de l'Appétit",
      badge: "100% Plantes & Vitamines",
      description: "Une formule douce à base d'extraits naturels de plantes marocaines et de vitamines essentielles pour stimuler l'appétit sainement et fortifier l'organisme des petits et grands.",
      price1: 149,
      price2: 259, // Save 39
      price3: 349, // Save 98
      benefits: [
        "Stimule l'appétit de façon 100% naturelle",
        "Favorise une digestion saine et légère",
        "Enrichi en Vitamines C, B1, B6 et B12",
        "Goût agréable de fruits rouges (idéal pour enfants)"
      ],
      usage: "Enfants (3-12 ans) : 1 cuillère à café 2 fois par jour avant les repas. Adultes : 1 cuillère à soupe 2 fois par jour avant les repas.",
      ingredients: "Extraits concentrés de Fenugrec, Gentiane, Gingembre, sirop d'agave bio, complexe vitaminique B & C."
    }
  ];

  // Track state for selected option per product (1: 1 bottle, 2: 2 bottles, 3: 3 bottles)
  const [selectedPack, setSelectedPack] = useState<Record<string, number>>({
    glycimax: 2, // Default to Economical 2 bottles
    appeto: 2
  });

  // Track active info tab per product ('benefits', 'usage', 'ingredients')
  const [activeTab, setActiveTab] = useState<Record<string, 'benefits' | 'usage' | 'ingredients'>>({
    glycimax: 'benefits',
    appeto: 'benefits'
  });

  const getPackLabel = (qty: number) => {
    if (qty === 1) return "1 Boîte (Cure d'essai)";
    if (qty === 2) return "2 Boîtes (Pack Économie) - 50% de Réduction sur la 2ème";
    return "3 Boîtes (Pack Famille) - Achetez 2 + 1 GRATUITE";
  };

  const getPackPrice = (product: Product, qty: number) => {
    if (qty === 1) return product.price1;
    if (qty === 2) return product.price2;
    return product.price3;
  };

  const handleOrder = (product: Product) => {
    const qty = selectedPack[product.id];
    if (onSelectProduct) {
      onSelectProduct(product.id, qty);
      const orderForm = document.getElementById("form-commande");
      if (orderForm) {
        orderForm.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const price = getPackPrice(product, qty);
      const label = getPackLabel(qty);
      const message = `Bonjour Health Power ! Je souhaite commander le "${product.name}" - ${label} pour un total de ${price} DHS. Pouvez-vous valider ma livraison ?`;
      openWhatsApp(message);
    }
  };

  return (
    <section id="produits" className="py-24 bg-brand-beige-light relative border-y border-brand-border/40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/10 text-brand-dark font-bold text-xs rounded-full mb-4 uppercase tracking-widest border border-brand-gold/20">
            <Flame size={12} className="text-brand-gold" />
            <span>Nos Produits Phares</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-dark mb-4 leading-tight">
            Des Solutions Naturelles <br />pour Votre Vitalité
          </h2>
          <p className="text-base sm:text-lg text-brand-dark/70 font-sans font-light">
            Formulations de haute qualité, certifiées, conçues pour apporter des résultats durables à votre bien-être.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {products.map((product, idx) => {
            const currentQty = selectedPack[product.id];
            const currentPrice = getPackPrice(product, currentQty);
            const activeProductTab = activeTab[product.id];

            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
                className="bg-white rounded-3xl overflow-hidden border border-brand-border/40 shadow-xl shadow-brand-dark/5 flex flex-col h-full group"
              >
                
                {/* Image Section */}
                <div className="relative h-72 bg-[#FAF8F5] overflow-hidden border-b border-brand-border/30">
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <span className="bg-brand-dark text-white px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {product.tag}
                    </span>
                    {product.badge && (
                      <span className="bg-brand-gold text-brand-dark px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <Droplet size={10} /> {product.badge}
                      </span>
                    )}
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette shade overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  
                  {/* Title and subtitle */}
                  <div className="mb-5">
                    <h3 className="text-2xl md:text-3xl font-serif font-black text-brand-dark mb-1">{product.name}</h3>
                    <p className="text-brand-green font-bold text-sm tracking-wide uppercase">{product.subtitle}</p>
                  </div>
                  
                  {/* Main Description */}
                  <p className="text-sm text-brand-dark/70 mb-6 leading-relaxed font-sans font-light">
                    {product.description}
                  </p>

                  {/* Dynamic Info Tabs (Benefits vs Usage vs Ingredients) */}
                  <div className="mb-6">
                    <div className="flex border-b border-brand-border/50 gap-2 mb-4">
                      {([
                        { key: 'benefits', label: 'Bienfaits' },
                        { key: 'usage', label: 'Usage' },
                        { key: 'ingredients', label: 'Composition' }
                      ] as const).map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(prev => ({ ...prev, [product.id]: tab.key }))}
                          className={`pb-2 px-3 text-xs font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                            activeProductTab === tab.key 
                              ? 'text-brand-green font-black' 
                              : 'text-brand-dark/40 hover:text-brand-dark'
                          }`}
                        >
                          {tab.label}
                          {activeProductTab === tab.key && (
                            <motion.span 
                              layoutId={`active_tab_bar_${product.id}`}
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" 
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="min-h-[140px] bg-brand-beige-light/40 rounded-2xl p-5 border border-brand-border/30">
                      <AnimatePresence mode="wait">
                        {activeProductTab === 'benefits' && (
                          <motion.div
                            key="benefits"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-2.5"
                          >
                            {product.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-start gap-2.5">
                                <CheckCircle2 className="text-brand-gold flex-shrink-0 mt-0.5" size={14} />
                                <span className="text-xs text-brand-dark/80 font-medium font-sans">{benefit}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}

                        {activeProductTab === 'usage' && (
                          <motion.div
                            key="usage"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-brand-dark/80 leading-relaxed font-sans font-light flex gap-2"
                          >
                            <Info size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
                            <p>{product.usage}</p>
                          </motion.div>
                        )}

                        {activeProductTab === 'ingredients' && (
                          <motion.div
                            key="ingredients"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-brand-dark/80 leading-relaxed font-sans font-light"
                          >
                            <p className="font-semibold text-brand-dark mb-1">Ingrédients actifs par dose :</p>
                            <p className="italic">{product.ingredients}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Volume Discount Pack Selector */}
                  <div className="mb-6 bg-brand-beige/50 border border-brand-border/40 rounded-2xl p-4">
                    <p className="text-[10px] uppercase tracking-widest text-brand-dark/50 font-bold mb-3">
                      🚀 Sélectionnez votre offre :
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { qty: 1, label: "1 Boîte", save: "Standard" },
                        { qty: 2, label: "2 Boîtes", save: "Pack Économie", bestSeller: true },
                        { qty: 3, label: "3 Boîtes", save: "2+1 Gratuite" }
                      ].map((pack) => (
                        <button
                          key={pack.qty}
                          onClick={() => setSelectedPack(prev => ({ ...prev, [product.id]: pack.qty }))}
                          className={`p-2.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-between cursor-pointer relative ${
                            currentQty === pack.qty 
                              ? 'border-brand-green bg-brand-green/5 shadow-md shadow-brand-green/5' 
                              : 'border-brand-border/40 hover:border-brand-border bg-white'
                          }`}
                        >
                          {pack.bestSeller && (
                            <span className="absolute -top-2 px-1.5 py-0.5 bg-brand-gold text-white text-[7px] font-bold uppercase rounded-md tracking-wider">
                              POPULAIRE
                            </span>
                          )}
                          <span className="text-[11px] font-black text-brand-dark">{pack.label}</span>
                          <span className={`text-[8px] mt-1 font-semibold block px-1.5 py-0.5 rounded-full ${
                            pack.qty === 2 ? 'bg-brand-green/10 text-brand-green' : pack.qty === 3 ? 'bg-brand-gold/10 text-brand-dark' : 'bg-brand-dark/5 text-brand-dark/50'
                          }`}>
                            {pack.save}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Call To Action */}
                  <div className="mt-auto pt-6 border-t border-brand-border/30 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-brand-dark/50 font-bold block mb-0.5">
                        Prix à la livraison
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl md:text-3xl font-serif font-black text-brand-dark">{currentPrice}</span>
                        <span className="text-xs font-bold text-brand-dark/70">DHS</span>
                      </div>
                      {currentQty > 1 && (
                        <span className="text-[10px] font-bold text-brand-green block mt-1">
                          🎉 Vous économisez {(product.price1 * currentQty) - currentPrice} DHS !
                        </span>
                      )}
                    </div>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOrder(product)}
                      className="px-6 py-4.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-full shadow-lg shadow-[#25D366]/20 transition-all flex items-center gap-2 text-sm shimmer-btn cursor-pointer"
                    >
                      Commander <MessageCircle size={18} />
                    </motion.button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
