import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';
import SectionHeader from './ui/SectionHeader';
import AccordionItem from './ui/AccordionItem';

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>("Comment puis-je payer ma commande ?");

  const faqCategories = [
    {
      category: "1. Paiement",
      items: [
        {
          q: "Comment puis-je payer ma commande ?",
          a: "Le paiement se fait uniquement en espèces à la livraison. Vous ne payez rien en ligne et remettez le montant directement au livreur après réception."
        },
        {
          q: "Y a-t-il des frais de livraison cachés ?",
          a: "Non, aucun. La livraison est entièrement gratuite partout au Maroc. Vous ne payez que le prix exact affiché sur le site."
        }
      ]
    },
    {
      category: "2. Livraison",
      items: [
        {
          q: "Quels sont vos délais de livraison ?",
          a: "La livraison se fait en 24h à Casablanca et Rabat, et en 24h à 48h ouvrables pour le reste des villes du Maroc."
        }
      ]
    },
    {
      category: "3. Produit",
      items: [
        {
          q: "Vos compléments sont-ils autorisés et naturels ?",
          a: "Absolument. Glycimax et Appeto+ sont formulés à base d'ingrédients 100% naturels et sûrs, respectant rigoureusement les normes de traçabilité marocaines."
        },
        {
          q: "Puis-je combiner Glycimax et Appeto+ ?",
          a: "Oui, ils sont complémentaires. Glycimax (Magnésium) aide à réguler la fatigue et le stress, tandis que Appeto+ soutient l'appétit de façon saine."
        }
      ]
    },
    {
      category: "4. Commande",
      items: [
        {
          q: "Comment se déroule le processus de commande ?",
          a: "Il suffit de cliquer sur un bouton de commande pour ouvrir une conversation WhatsApp pré-remplie. Un conseiller valide vos détails pour lancer l'envoi."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 md:py-28 bg-white border-b border-brand-border/30 relative z-20" aria-label="Foire aux questions">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header using SectionHeader primitive */}
        <SectionHeader
          tagline="FAQ"
          title="Questions Fréquentes"
          description="Une question ? Trouvez rapidement votre réponse ci-dessous classée par priorité d'achat."
          className="mb-14 sm:mb-16"
        />

        {/* Categorized FAQ Accordion List */}
        <div className="space-y-8 sm:space-y-10" role="presentation">
          {faqCategories.map((catData) => (
            <div key={catData.category} className="space-y-3 sm:space-y-4">
              <h3 className="text-sm sm:text-base font-sans font-black text-brand-green border-l-4 border-brand-gold pl-3 mb-2 uppercase tracking-widest">
                {catData.category}
              </h3>
              <div className="space-y-3">
                {catData.items.map((faq) => (
                  <AccordionItem
                    key={faq.q}
                    id={faq.q}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openQuestion === faq.q}
                    onToggle={() => setOpenQuestion(openQuestion === faq.q ? null : faq.q)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp redirection footer */}
        <div className="mt-14 sm:mt-16 text-center p-6 sm:p-8 bg-brand-beige rounded-2xl border border-brand-border/40 max-w-2xl mx-auto shadow-xs">
          <p className="text-sm text-brand-dark font-sans font-bold mb-4">
            Vous avez une question précise ?
          </p>
          <button
            onClick={() => openWhatsApp("Bonjour, j'ai une question spécifique à propos de vos compléments...")}
            className="inline-flex items-center gap-2 text-sm font-black text-white hover:bg-whatsapp-hover bg-whatsapp-green px-6 py-3 rounded-xl transition-all shadow-md shadow-whatsapp-green/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-whatsapp-green outline-none min-h-[44px]"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>Parler à un conseiller sur WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
}
