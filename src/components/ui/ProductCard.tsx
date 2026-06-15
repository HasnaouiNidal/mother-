import React from 'react';
import { CheckCircle2, MessageCircle, Info, Leaf, ShieldCheck, HeartHandshake } from 'lucide-react';
import PrimaryCTA from './PrimaryCTA';

export interface ProductType {
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

interface ProductCardProps {
  id?: string;
  product: ProductType;
  selectedQty: number;
  onQtyChange: (qty: number) => void;
  activeTab: 'benefits' | 'usage' | 'ingredients';
  onTabChange: (tab: 'benefits' | 'usage' | 'ingredients') => void;
  onOrder: () => void;
  className?: string;
}

function ProductMedia({ product }: { product: ProductType }) {
  const isGlycimax = product.id === 'glycimax';
  
  return (
    <div 
      className={`relative h-[260px] sm:h-[280px] w-full border-b border-brand-border/30 flex items-center justify-center overflow-hidden transition-colors duration-300 ${
        isGlycimax 
          ? 'bg-gradient-to-b from-[#F0F7F4] to-[#E3EDE8]' 
          : 'bg-gradient-to-b from-[#FAF5EC] to-[#F3EAD8]'
      }`}
    >
      
      {/* Top Badges row */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none select-none">
        <span className="bg-brand-dark text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
          {product.tag}
        </span>
        {product.badge && (
          <span className="bg-brand-gold/15 text-brand-dark border border-brand-gold/30 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
            {product.badge}
          </span>
        )}
      </div>

      {/* Highlight Halo / Glow */}
      <div 
        className={`absolute top-1/2 left-1/2 w-52 h-52 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl opacity-60 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none ${
          isGlycimax ? 'bg-emerald-500/20' : 'bg-brand-gold/25'
        }`}
        aria-hidden="true"
      />

      {/* Glycimax Scene: Cool Concentric Astral Auras & Magnesium Nodes */}
      {isGlycimax && (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          {/* Subtle night auras */}
          <div className="absolute top-[28%] left-[28%] w-36 h-36 rounded-full border border-emerald-500/10 opacity-30 group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none" />
          <div className="absolute top-[20%] left-[23%] w-48 h-48 rounded-full border border-emerald-500/5 opacity-20 group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none" />
          
          {/* Magnesium-inspired nodes */}
          <div className="absolute bottom-10 left-8 w-2 h-2 rounded-full bg-emerald-500/25 shadow-sm shadow-emerald-500/20" />
          <div className="absolute bottom-14 left-14 w-1.5 h-1.5 rounded-full bg-emerald-500/15" />
          <div className="absolute bottom-7 left-18 w-1 h-1 rounded-full bg-emerald-500/10" />
          
          {/* Connecting line */}
          <svg className="absolute bottom-7 left-8 w-11 h-8 text-emerald-500/10 stroke-1" fill="none" viewBox="0 0 44 32">
            <path d="M8,12 L32,24 L40,8" stroke="currentColor" strokeDasharray="2 2" />
          </svg>
        </div>
      )}

      {/* Appeto+ Scene: Warm Botanical Leaf Silhouette & Sun Bloom */}
      {!isGlycimax && (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          {/* Faint sun bloom top right */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#E5C158]/10 blur-3xl" />
          
          {/* Botanical leaf silhouette/curve */}
          <svg 
            className="absolute right-4 bottom-4 w-36 h-36 text-[#C89B3C]/10 group-hover:translate-y-0.5 group-hover:scale-102 transition-transform duration-300 motion-reduce:transition-none" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.75"
          >
            <path d="M10,90 Q45,40 90,10 M10,90 Q65,65 90,10" />
            <path d="M50,55 Q65,42 80,25" />
            <path d="M35,68 Q48,56 58,44" />
            <path d="M22,79 Q32,70 42,60" />
          </svg>
        </div>
      )}

      {/* Grounding Soft Shadow */}
      <div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[60%] h-3.5 bg-brand-dark/15 rounded-full blur-md pointer-events-none transition-all duration-300 group-hover:scale-x-95 group-hover:opacity-60 motion-reduce:transition-none"
        aria-hidden="true"
      />

      {/* Large product visual with dynamic hover lift */}
      <img 
        src={product.image} 
        alt={`Flacon de ${product.name} - ${product.subtitle}`}
        className="relative z-10 w-full h-full object-contain p-3 max-h-[220px] sm:max-h-[240px] transition-all duration-300 group-hover:scale-[1.03] group-hover:-translate-y-2.5 motion-reduce:transition-none select-none"
        loading="lazy"
      />
      
      {/* Subtle bottom stage vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/5 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}


export default function ProductCard({
  id,
  product,
  selectedQty,
  onQtyChange,
  activeTab,
  onTabChange,
  onOrder,
  className = '',
}: ProductCardProps) {
  
  const getPackPrice = (qty: number) => {
    return qty === 1 ? product.price1 : qty === 2 ? product.price2 : product.price3;
  };

  const currentPrice = getPackPrice(selectedQty);
  const saving = (product.price1 * selectedQty) - currentPrice;

  // Redesigned short and readable tab contents to avoid overwhelming copy
  const renderTabContent = () => {
    switch (activeTab) {
      case 'benefits':
        return (
          <div className="space-y-2.5" role="tabpanel" id={`panel-${product.id}-benefits`} aria-labelledby={`tab-${product.id}-benefits`}>
            {product.benefits.slice(0, 3).map((benefit, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="text-brand-gold flex-shrink-0 mt-0.5" size={15} aria-hidden="true" />
                <span className="text-sm text-brand-dark/90 font-medium font-sans">{benefit}</span>
              </div>
            ))}
          </div>
        );
      case 'usage':
        return (
          <div className="text-sm text-brand-dark/95 leading-relaxed font-sans font-medium flex gap-2" role="tabpanel" id={`panel-${product.id}-usage`} aria-labelledby={`tab-${product.id}-usage`}>
            <Info size={16} className="text-brand-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p>{product.usage}</p>
          </div>
        );
      case 'ingredients':
        return (
          <div className="text-sm text-brand-dark/90 leading-relaxed font-sans font-light" role="tabpanel" id={`panel-${product.id}-ingredients`} aria-labelledby={`tab-${product.id}-ingredients`}>
            <p className="font-bold text-brand-dark mb-1">Actifs clés :</p>
            <p className="italic font-medium">{product.ingredients}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <article 
      id={id} 
      className={`bg-white rounded-3xl overflow-hidden border border-brand-border/40 shadow-xl shadow-brand-dark/5 flex flex-col h-full group transition-all duration-200 ${className}`}
    >
      
      {/* Premium Product Stage */}
      <ProductMedia product={product} />

      {/* 2. Content Section (Strict hierarchy) */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        
        {/* Product Name */}
        <h3 className="text-2xl sm:text-3xl font-serif font-black text-brand-dark tracking-tight">
          {product.name}
        </h3>
        
        {/* Short Product Type */}
        <p className="text-brand-green-light font-black text-sm tracking-widest uppercase mt-1">
          {product.subtitle}
        </p>
        
        {/* Benefit Summary */}
        <p className="text-sm text-brand-muted mt-3 mb-6 leading-relaxed font-sans font-light">
          {product.description}
        </p>

        {/* 3. Redesigned Tabs (Bienfaits, Usage, Composition) */}
        <div className="mb-6">
          <div className="flex border-b border-brand-border/40 gap-1.5 mb-4" role="tablist" aria-label={`Détails sur ${product.name}`}>
            {([
              { key: 'benefits', label: 'Bienfaits' },
              { key: 'usage', label: 'Usage' },
              { key: 'ingredients', label: 'Composition' }
            ] as const).map((tab) => {
              const isSelected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  id={`tab-${product.id}-${tab.key}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${product.id}-${tab.key}`}
                  onClick={() => onTabChange(tab.key)}
                  className={`pb-2 px-3.5 text-xs font-black uppercase tracking-widest transition-all relative cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1 outline-none ${
                    isSelected 
                      ? 'text-brand-green font-black border-b-2 border-brand-green' 
                      : 'text-brand-muted hover:text-brand-dark'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Block */}
          <div className="min-h-[120px] bg-brand-beige-light/40 rounded-2xl p-5 border border-brand-border/30">
            {renderTabContent()}
          </div>
        </div>

        {/* 4. Redesigned Quantity Selector (1 Boîte, 2 Boîtes, 3 Boîtes) */}
        <div className="mb-6 bg-brand-beige/50 border border-brand-border/40 rounded-2xl p-4 sm:p-5">
          <p className="text-[10px] uppercase tracking-widest text-brand-dark/60 font-black mb-3.5 block font-sans">
            📦 Sélectionnez votre cure :
          </p>
          <div className="grid grid-cols-3 gap-2.5" role="group" aria-label="Nombre de boîtes">
            {[
              { qty: 1, label: "1 Boîte", labelSub: "Standard" },
              { qty: 2, label: "2 Boîtes", labelSub: "Pack Éco", highlight: true },
              { qty: 3, label: "3 Boîtes", labelSub: "2+1 Offerte" }
            ].map((pack) => {
              const isSelected = selectedQty === pack.qty;
              return (
                <button
                  key={pack.qty}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onQtyChange(pack.qty)}
                  className={`relative p-3 rounded-xl border flex flex-col items-center justify-between min-h-[54px] cursor-pointer transition-all duration-150 focus-visible:ring-2 focus-visible:ring-brand-green outline-none ${
                    isSelected 
                      ? 'border-brand-green bg-brand-green/5 ring-1 ring-brand-green shadow-xs' 
                      : 'border-brand-border/40 hover:border-brand-border bg-white'
                  }`}
                >
                  {pack.highlight && (
                    <span className="absolute -top-2 px-1.5 py-0.5 bg-brand-gold text-white text-[8px] font-black uppercase rounded-md tracking-wider">
                      Meilleur Choix
                    </span>
                  )}
                  <span className="text-sm font-black text-brand-dark mt-1">{pack.label}</span>
                  <span className="text-[11px] text-brand-muted font-bold mt-0.5">{pack.labelSub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Price & Consistent CTA (Commander via WhatsApp) */}
        <div className="mt-auto pt-6 border-t border-brand-border/30 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-brand-muted font-bold block mb-1">
              Total à payer
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-serif font-black text-brand-dark">{currentPrice}</span>
              <span className="text-xs font-bold text-brand-dark/70">DHS</span>
            </div>
            {saving > 0 && (
              <span className="text-sm font-bold text-brand-green block mt-1.5">
                🎉 Économisez {saving} DHS !
              </span>
            )}
          </div>
          
          <PrimaryCTA
            onClick={onOrder}
            theme="whatsapp"
            icon={<MessageCircle size={18} aria-hidden="true" />}
            iconPosition="right"
            className="w-auto px-6 py-3.5 shrink-0 text-sm font-black"
            ariaLabel={`Commander le pack ${selectedQty} boîtes de ${product.name} sur WhatsApp`}
          >
            Commander via WhatsApp
          </PrimaryCTA>
        </div>

      </div>
    </article>
  );
}
