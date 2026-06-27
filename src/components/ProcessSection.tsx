import { MessageCircle, Package, CheckCircle2 } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';

const steps = [
  {
    number: '01',
    icon: <MessageCircle size={26} className="text-white" />,
    title: 'Vous envoyez votre demande',
    text: 'Remplissez le formulaire ou écrivez directement sur WhatsApp. Notre conseillère reçoit votre commande instantanément.',
    color: 'bg-brand-green',
  },
  {
    number: '02',
    icon: <CheckCircle2 size={26} className="text-white" />,
    title: 'Notre conseillère confirme avec vous',
    text: 'Elle vous rappelle pour valider le produit, le pack, l\'adresse et la date de livraison. Aucune surprise.',
    color: 'bg-brand-gold',
  },
  {
    number: '03',
    icon: <Package size={26} className="text-white" />,
    title: 'Vous recevez et payez à la livraison',
    text: 'Votre colis arrive en 24h à 48h. Vous vérifiez, vous acceptez, puis vous payez au livreur en espèces.',
    color: 'bg-brand-green',
  },
];

export default function ProcessSection() {
  return (
    <section
      id="comment-commander"
      className="py-12 sm:py-16 lg:py-24 bg-white border-b border-brand-border/30 relative z-20"
      aria-label="Comment se passe la commande"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-green bg-brand-green/5 border border-brand-green/15 px-4 py-1.5 rounded-full mb-4">
            Processus simple
          </span>
          <h2 className="font-serif font-black text-brand-dark text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Commander en moins d'une minute
          </h2>
          <p className="text-brand-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-light">
            Aucun paiement en ligne. Aucune inscription. Juste un message WhatsApp et votre colis arrive chez vous.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-12 left-1/2 -translate-x-1/2 w-[60%] h-0.5 bg-gradient-to-r from-brand-green via-brand-gold to-brand-green opacity-20" aria-hidden="true" />

          <div className="grid sm:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex flex-col items-center text-center group">
                {/* Step circle */}
                <div className={`relative w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-brand-border/40 rounded-full text-[10px] font-black text-brand-dark flex items-center justify-center shadow-sm">
                    {step.number}
                  </span>
                </div>

                {/* Connector dots mobile */}
                {idx < steps.length - 1 && (
                  <div className="sm:hidden flex gap-1 mb-5" aria-hidden="true">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-border" />
                    ))}
                  </div>
                )}

                <h3 className="font-bold text-brand-dark text-base mb-2">{step.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed font-light">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button
            id="process-whatsapp-cta"
            onClick={() => openWhatsApp('Bonjour Health Power Maroc ! Je voudrais passer une commande. Pouvez-vous m\'aider ?')}
            className="inline-flex items-center gap-2.5 bg-whatsapp-green hover:bg-whatsapp-hover text-white font-black text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-whatsapp-green/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-whatsapp-green outline-none min-h-[52px]"
            aria-label="Commander maintenant via WhatsApp"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Commander maintenant via WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
}
