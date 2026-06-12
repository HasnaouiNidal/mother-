import { MessageCircle, Send, CheckCircle, Package } from 'lucide-react';
import { motion } from 'motion/react';
import { openWhatsApp } from '../lib/utils';

export default function BenefitsSection() {
  const steps = [
    {
      num: "01",
      icon: Send,
      title: "Contactez-nous",
      desc: "Cliquez sur l'un de nos boutons WhatsApp. Un message pré-rempli s'ouvre, vous n'avez plus qu'à l'envoyer !"
    },
    {
      num: "02",
      icon: CheckCircle,
      title: "Confirmation Facile",
      desc: "Notre conseiller amical répond immédiatement pour confirmer les détails de votre commande et votre adresse de livraison."
    },
    {
      num: "03",
      icon: Package,
      title: "Recevez & Payez",
      desc: "Le livreur apporte le colis chez vous sous 24/48h. Vous vérifiez le colis et payez en espèces à ce moment précis."
    }
  ];

  return (
    <section id="bienfaits" className="py-24 bg-brand-dark text-white border-y border-brand-border/10 relative overflow-hidden z-20">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
            Processus Simple
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black mt-4 mb-4 leading-tight">
            Commander chez nous <br />est un Jeu d'Enfant
          </h2>
          <p className="text-brand-gold/80 text-base sm:text-lg font-sans font-light">
            Pas besoin de carte bancaire ou d'inscription compliquée. Nous privilégions la confiance.
          </p>
        </div>

        {/* Steps Pipeline Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-gold/10 via-brand-gold/40 to-brand-gold/10 -z-0 pointer-events-none"></div>

          {steps.map((step, idx) => {
            const IconComponent = step.icon;

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center p-8 glass-panel-dark rounded-3xl group border border-white/5 hover:border-brand-gold/30 transition-all duration-300"
              >
                {/* Step badge/icon wrap */}
                <div className="relative mb-6">
                  {/* Outer circle */}
                  <div className="w-16 h-16 bg-brand-green text-brand-gold-light rounded-2xl flex items-center justify-center shadow-lg shadow-brand-green/35 group-hover:bg-brand-gold group-hover:text-brand-dark transition-colors duration-500 relative">
                    <IconComponent size={24} className="group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Step absolute index badge */}
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-gold text-brand-dark font-sans font-black text-xs flex items-center justify-center border-2 border-[#0A2518] shadow-md">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-serif font-bold mb-3 tracking-wide text-white group-hover:text-brand-gold transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-xs sm:text-sm font-sans font-light">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Big high trust CTA */}
        <div className="mt-20 text-center">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openWhatsApp("Bonjour, je veux commander et payer à la livraison ! ")}
            className="inline-flex items-center gap-3 px-12 py-5 bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-full shadow-xl shadow-[#25D366]/20 transition-all text-lg shimmer-btn cursor-pointer"
          >
            <MessageCircle size={24} />
            Commandez Maintenant via WhatsApp
          </motion.button>
          <p className="text-xs text-white/40 mt-3 font-sans">
            🛡️ Votre commande est emballée discrètement et livrée en toute sécurité.
          </p>
        </div>

      </div>
    </section>
  );
}
