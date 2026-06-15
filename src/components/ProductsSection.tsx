import { useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import ProductCard, { ProductType } from './ui/ProductCard';
import { openWhatsApp } from '../lib/utils';

export default function ProductsSection({ 
  onSelectProduct 
}: { 
  onSelectProduct?: (productId: string, qty: number) => void 
}) {
  const products: ProductType[] = [
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
        "Aide à la relaxation musculaire (anti-crampes)"
      ],
      usage: "Prendre 2 gélules par jour avec un grand verre d'eau, de préférence le soir 30 minutes avant le coucher.",
      ingredients: "Bisglycinate de Magnésium pur (400mg), Vitamine B6 bioactive (1.4mg)."
    },
    {
      id: "appeto",
      name: "Appeto+",
      subtitle: "Sirop Fortifiant Naturel",
      image: "/appeto-cutout.png",
      tag: "Stimulation de l'Appétit",
      badge: "100% Plantes & Vitamines",
      description: "Une formule douce à base d'extraits naturels de plantes marocaines et de vitamines essentielles pour stimuler l'appétit sainement et fortifier l'organisme des petits et grands.",
      price1: 149,
      price2: 259, // Save 39
      price3: 349, // Save 98
      benefits: [
        "Stimule l'appétit de façon 100% naturelle",
        "Favorise une digestion saine et légère",
        "Enrichi en Vitamines C, B1, B6 et B12"
      ],
      usage: "Enfants : 1 cuillère à café 2 fois/jour. Adultes : 1 cuillère à soupe 2 fois/jour avant les repas.",
      ingredients: "Extraits concentrés de Fenugrec, Gentiane, Gingembre, complexe Vitamines B & C."
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
    if (qty === 2) return "2 Boîtes (Pack Économie)";
    return "3 Boîtes (Pack Famille - 2+1 Gratuite)";
  };

  const getPackPrice = (product: ProductType, qty: number) => {
    if (qty === 1) return product.price1;
    if (qty === 2) return product.price2;
    return product.price3;
  };

  const handleOrder = (product: ProductType) => {
    const qty = selectedPack[product.id];
    const price = getPackPrice(product, qty);
    const label = getPackLabel(qty);
    
    // Construct prefilled WhatsApp order message
    const message = `Bonjour Health Power ! Je souhaite commander le produit "${product.name}" (${product.subtitle}) - ${label} pour un total de ${price} DHS. Pouvez-vous valider ma livraison ? 🇲🇦`;
    
    // Sync to checkout form if required
    if (onSelectProduct) {
      onSelectProduct(product.id, qty);
    }
    
    openWhatsApp(message);
  };

  return (
    <section id="produits" className="py-24 bg-brand-beige-light relative border-y border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header using primitives */}
        <SectionHeader
          tagline="Nos Compléments Phares"
          title="Des Solutions Naturelles Pour Votre Vitalité"
          description="Formulations de haute qualité, certifiées ONSSA, conçues pour apporter des résultats concrets à votre bien-être quotidien."
          className="mb-20"
        />

        {/* Product Grid (items-stretch forces equal height on desktop cards) */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={`product-${product.id}`}
              product={product}
              selectedQty={selectedPack[product.id]}
              onQtyChange={(qty) => setSelectedPack(prev => ({ ...prev, [product.id]: qty }))}
              activeTab={activeTab[product.id]}
              onTabChange={(tab) => setActiveTab(prev => ({ ...prev, [product.id]: tab }))}
              onOrder={() => handleOrder(product)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
