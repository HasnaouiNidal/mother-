import { useState } from 'react';
import ProductCard, { ProductType } from './ui/ProductCard';
import { openWhatsApp } from '../lib/utils';

const products: ProductType[] = [
  {
    id: 'glycimax',
    name: 'Glycimax Magnésium',
    subtitle: 'Magnésium bisglycinate + Vitamine B6',
    image: '/glycimax.png',
    tag: 'Sommeil & Relaxation',
    badge: 'Sélection conseillère',
    description:
      "Aide à réduire la fatigue, contribue au fonctionnement normal du système nerveux et soutient la relaxation musculaire. Formule haute tolérance digestive.",
    price1: 199,
    price2: 349,
    price3: 479,
    benefits: [
      'Aide à réduire la fatigue physique et mentale',
      'Contribue au fonctionnement normal du système nerveux',
      'Soutient la relaxation musculaire naturelle',
    ],
    usage:
      "2 gélules par jour avec un grand verre d'eau, de préférence le soir avant le coucher. Cure de 1 à 3 mois conseillée.",
    ingredients:
      'Bisglycinate de Magnésium (400mg), Vitamine B6 (1.4mg), Cellulose microcristalline.',
  },
  {
    id: 'appeto',
    name: 'Appeto+',
    subtitle: 'Sirop fortifiant naturel aux extraits de plantes',
    image: '/appeto-cutout.png',
    tag: "Appétit & Vitalité",
    badge: 'Formule naturelle',
    description:
      "Aide à stimuler l'appétit naturellement et soutient la vitalité quotidienne. Formule à base d'extraits de plantes et enrichie en vitamines.",
    price1: 149,
    price2: 259,
    price3: 349,
    benefits: [
      "Aide à stimuler l'appétit naturellement",
      'Soutient la vitalité et le tonus quotidien',
      "Formule à base d'extraits naturels de plantes",
    ],
    usage:
      'Enfants : 1 cuillère à café 2x/jour avant les repas. Adultes : 1 cuillère à soupe 2x/jour avant les repas.',
    ingredients:
      'Extraits de Fenugrec, Gentiane, Gingembre, Complexe Vitamines B1, B6, B12 et C.',
  },
];

export default function ProductsSection({
  onSelectProduct,
}: {
  onSelectProduct?: (productId: string, qty: number) => void;
}) {
  const [selectedPack, setSelectedPack] = useState<Record<string, number>>({
    glycimax: 2,
    appeto: 2,
  });
  const [activeTab, setActiveTab] = useState<
    Record<string, 'benefits' | 'usage' | 'ingredients'>
  >({
    glycimax: 'benefits',
    appeto: 'benefits',
  });

  const getPackLabel = (qty: number) => {
    if (qty === 1) return "1 Boîte — Cure d'essai";
    if (qty === 2) return '2 Boîtes — Pack Économie';
    return '3 Boîtes — Pack Famille (2+1 offerte)';
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
    const message = `Bonjour Health Power Maroc ! Je voudrais commander :\n\nProduit : ${product.name} (${product.subtitle})\nPack : ${label}\nTotal : ${price} DHS\n\nPouvez-vous confirmer et me donner les détails de livraison ? Merci !`;
    if (onSelectProduct) onSelectProduct(product.id, qty);
    openWhatsApp(message);
  };

  return (
    <section
      id="produits"
      className="py-12 sm:py-16 lg:py-24 bg-brand-beige border-y border-brand-border/40 relative z-20"
      aria-label="Nos solutions naturelles"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-green bg-brand-green/5 border border-brand-green/15 px-4 py-1.5 rounded-full mb-4">
            Nos produits
          </span>
          <h2 className="font-serif font-black text-brand-dark text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Nos solutions naturelles
          </h2>
          <p className="text-brand-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Deux produits complémentaires, sélectionnés avec soin par notre conseillère pour répondre aux besoins les plus fréquents.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={`product-${product.id}`}
              product={product}
              selectedQty={selectedPack[product.id]}
              onQtyChange={(qty) =>
                setSelectedPack((prev) => ({ ...prev, [product.id]: qty }))
              }
              activeTab={activeTab[product.id]}
              onTabChange={(tab) =>
                setActiveTab((prev) => ({ ...prev, [product.id]: tab }))
              }
              onOrder={() => handleOrder(product)}
            />
          ))}
        </div>

        {/* Legal disclaimer */}
        <div className="mt-10 text-center max-w-2xl mx-auto">
          <p className="text-xs text-brand-muted/60 font-light italic border border-brand-border/30 rounded-xl px-5 py-3 bg-white inline-block">
            ⚠️ Ces produits sont des compléments alimentaires et ne remplacent pas un avis médical. Consultez un professionnel de santé en cas de doute.
          </p>
        </div>

      </div>
    </section>
  );
}
