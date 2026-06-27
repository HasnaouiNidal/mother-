import { useState } from 'react';
import { MessageCircle, ChevronDown } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';

const faqCategories = [
  {
    category: 'Paiement',
    emoji: '💰',
    items: [
      {
        q: 'Comment puis-je payer ma commande ?',
        a: 'Le paiement se fait uniquement en espèces à la livraison (COD). Vous remettez le montant directement au livreur après avoir reçu et vérifié votre colis. Aucun paiement en ligne n\'est demandé.',
      },
      {
        q: 'Y a-t-il un paiement en ligne ?',
        a: 'Non, absolument pas. Nous ne demandons aucun paiement en ligne, aucun virement et aucun dépôt à l\'avance. Vous payez seulement quand le livreur arrive chez vous.',
      },
    ],
  },
  {
    category: 'Livraison',
    emoji: '🚚',
    items: [
      {
        q: 'Quels sont les délais de livraison ?',
        a: 'La livraison prend 24h pour Casablanca et Rabat, et 24h à 48h ouvrables pour le reste des villes du Maroc.',
      },
      {
        q: 'Livrez-vous partout au Maroc ?',
        a: 'Oui, nous livrons dans toutes les villes du Maroc : Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Oujda, Tétouan, et partout ailleurs.',
      },
    ],
  },
  {
    category: 'Produit',
    emoji: '🌿',
    items: [
      {
        q: 'Comment choisir entre Glycimax et Appeto+ ?',
        a: 'Glycimax est recommandé pour les besoins de sommeil, de relaxation et de fatigue nerveuse. Appeto+ est recommandé pour stimuler l\'appétit et soutenir la vitalité. En cas de doute, notre conseillère vous oriente gratuitement sur WhatsApp.',
      },
      {
        q: 'Puis-je prendre les deux produits en même temps ?',
        a: 'Oui, les deux produits sont complémentaires. Glycimax agit sur le système nerveux et la détente, tandis qu\'Appeto+ soutient l\'appétit et la vitalité. Consultez notre conseillère avant de combiner les deux.',
      },
      {
        q: 'Ces produits remplacent-ils un médicament ?',
        a: 'Non. Glycimax et Appeto+ sont des compléments alimentaires, pas des médicaments. Ils ne remplacent pas un avis ou traitement médical. En cas de condition médicale, consultez votre médecin avant utilisation.',
      },
    ],
  },
  {
    category: 'Commande',
    emoji: '📦',
    items: [
      {
        q: 'Comment confirmer ma commande ?',
        a: 'Vous pouvez commander via le formulaire de la page ou directement sur WhatsApp. Notre conseillère vous contacte pour confirmer les détails avant l\'expédition. Vous ne recevez rien sans confirmation.',
      },
      {
        q: 'Puis-je parler avec une conseillère avant d\'acheter ?',
        a: 'Oui, c\'est même recommandé ! Cliquez sur le bouton WhatsApp, expliquez votre besoin, et notre conseillère vous oriente sans pression et sans engagement.',
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-brand-border/40 rounded-2xl overflow-hidden bg-white transition-shadow hover:shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-inset outline-none"
      >
        <span className="text-sm font-bold text-brand-dark leading-snug">{question}</span>
        <ChevronDown
          size={16}
          className={`text-brand-muted shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-brand-border/30">
          <p className="text-sm text-brand-muted leading-relaxed font-light pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    'Comment puis-je payer ma commande ?'
  );

  return (
    <section
      id="faq"
      className="py-12 sm:py-16 lg:py-24 bg-white border-b border-brand-border/30 relative z-20"
      aria-label="Foire aux questions"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-green bg-brand-green/5 border border-brand-green/15 px-4 py-1.5 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="font-serif font-black text-brand-dark text-3xl sm:text-4xl leading-tight mb-4">
            Questions fréquentes
          </h2>
          <p className="text-brand-muted text-sm max-w-lg mx-auto leading-relaxed font-light">
            Trouvez rapidement votre réponse. Si votre question n'est pas là, écrivez-nous sur WhatsApp.
          </p>
        </div>

        {/* Accordion categories */}
        <div className="space-y-8">
          {faqCategories.map((cat) => (
            <div key={cat.category}>
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-green border-l-4 border-brand-gold pl-3 mb-4">
                <span aria-hidden="true">{cat.emoji}</span>
                {cat.category}
              </h3>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <AccordionItem
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                    isOpen={openQuestion === item.q}
                    onToggle={() =>
                      setOpenQuestion(openQuestion === item.q ? null : item.q)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legal disclaimer */}
        <p className="text-xs text-brand-muted/60 font-light italic text-center mt-10 border-t border-brand-border/30 pt-6">
          Ces produits sont des compléments alimentaires et ne remplacent pas un avis médical professionnel.
        </p>

        {/* WhatsApp fallback */}
        <div className="mt-8 text-center p-6 bg-brand-beige rounded-2xl border border-brand-border/40">
          <p className="text-sm text-brand-dark font-bold mb-4">
            Vous avez une question précise ?
          </p>
          <button
            id="faq-whatsapp-cta"
            onClick={() => openWhatsApp('Bonjour, j\'ai une question avant de commander...')}
            className="inline-flex items-center gap-2.5 bg-whatsapp-green hover:bg-whatsapp-hover text-white font-black text-sm px-6 py-3.5 rounded-xl transition-all shadow-md shadow-whatsapp-green/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-whatsapp-green outline-none min-h-[48px]"
            aria-label="Poser une question sur WhatsApp"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Parler à la conseillère sur WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
}
