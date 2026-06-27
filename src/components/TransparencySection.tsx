import { Package, Star, MessageCircle, ShieldCheck, Leaf, Users, Clock, CheckCircle2 } from 'lucide-react';

const transparencyCards = [
  {
    icon: <Leaf size={22} className="text-brand-green" />,
    title: 'Produits sélectionnés avec soin',
    text: 'Chaque produit est choisi pour sa qualité, ses ingrédients naturels et sa tolérance.',
  },
  {
    icon: <MessageCircle size={22} className="text-whatsapp-green" />,
    title: 'Conseil clair avant commande',
    text: 'Notre conseillère vous explique le produit adapté avant que vous ne décidiez quoi que ce soit.',
  },
  {
    icon: <ShieldCheck size={22} className="text-brand-gold" />,
    title: 'Paiement à la livraison',
    text: 'Vous ne donnez rien en avance. Vous payez en espèces directement au livreur.',
  },
  {
    icon: <Package size={22} className="text-brand-green" />,
    title: 'Stock contrôlé',
    text: 'Nous gérons notre stock avec soin pour garantir des produits frais et disponibles rapidement.',
  },
  {
    icon: <Users size={22} className="text-brand-gold" />,
    title: 'Suivi client sur WhatsApp',
    text: 'Disponible avant, pendant et après la commande pour répondre à toutes vos questions.',
  },
  {
    icon: <Clock size={22} className="text-brand-green" />,
    title: 'Livraison partout au Maroc',
    text: 'Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir et toutes les villes du Royaume.',
  },
];

export default function TransparencySection() {
  return (
    <section
      id="transparence"
      className="py-12 sm:py-16 lg:py-24 bg-brand-beige border-b border-brand-border/30 relative z-20"
      aria-label="Transparence et qualité"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-green bg-brand-green/5 border border-brand-green/15 px-4 py-1.5 rounded-full mb-4">
            Notre engagement
          </span>
          <h2 className="font-serif font-black text-brand-dark text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Transparence & qualité avant tout
          </h2>
          <p className="text-brand-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            Nous privilégions une relation claire avec nos clients : vous comprenez le produit, vous confirmez la commande, puis vous payez uniquement à la livraison.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {transparencyCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-6 border border-brand-border/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-beige flex items-center justify-center mb-4 group-hover:bg-brand-green/5 transition-colors">
                {card.icon}
              </div>
              <h3 className="font-bold text-brand-dark text-sm mb-2">{card.title}</h3>
              <p className="text-brand-muted text-xs leading-relaxed font-light">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <div className="bg-brand-green rounded-2xl px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-white text-center sm:text-left">
            <p className="font-serif font-black text-lg mb-1">Relation transparente avec chaque client</p>
            <p className="text-white/70 text-sm font-light">Vous comprenez. Vous confirmez. Vous payez seulement après réception.</p>
          </div>
          <div className="flex gap-5 shrink-0">
            {['Conseil ✓', 'Confiance ✓', 'Qualité ✓'].map((tag) => (
              <div key={tag} className="flex items-center gap-1.5 text-xs font-black text-brand-gold">
                {tag}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
