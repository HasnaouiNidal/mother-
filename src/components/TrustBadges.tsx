import { Truck, ShieldCheck, Leaf, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Leaf,
    title: "100% Organique",
    description: "Formules pures, bio, testées scientifiquement sans additifs chimiques nocifs."
  },
  {
    icon: HeartHandshake,
    title: "Paiement à la Livraison",
    description: "Zéro risque. Vous payez en espèces uniquement quand le colis arrive chez vous."
  },
  {
    icon: Truck,
    title: "Livraison Express",
    description: "Expédition ultra-rapide partout au Maroc. Suivi SMS inclus pour chaque envoi."
  },
  {
    icon: ShieldCheck,
    title: "Qualité Certifiée",
    description: "Ingrédients premium rigoureusement contrôlés pour garantir efficacité et sécurité."
  }
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white relative z-20 border-y border-brand-border/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 12px 30px -10px rgba(10, 37, 24, 0.08)",
                borderColor: "var(--color-brand-gold)" 
              }}
              className="flex items-start gap-4 p-6 bg-brand-beige-light/50 border border-brand-border/30 rounded-2xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                <feature.icon size={22} className="transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-brand-dark text-sm md:text-base mb-1 group-hover:text-brand-green transition-colors">
                  {feature.title}
                </h4>
                <p className="text-xs text-brand-dark/60 leading-relaxed font-sans font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
