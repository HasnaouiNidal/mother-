import { Truck, MessageCircle, ShieldCheck, Leaf } from 'lucide-react';

const badges = [
  {
    icon: <ShieldCheck size={18} className="text-brand-gold" />,
    title: 'Paiement à la livraison',
    sub: 'Vous payez après réception',
  },
  {
    icon: <Truck size={18} className="text-brand-green" />,
    title: 'Livraison partout au Maroc',
    sub: '24h–48h ouvrables',
  },
  {
    icon: <MessageCircle size={18} className="text-whatsapp-green" />,
    title: 'Conseil WhatsApp',
    sub: 'Avant chaque commande',
  },
  {
    icon: <Leaf size={18} className="text-brand-gold" />,
    title: 'Compléments naturels',
    sub: 'Sélectionnés avec soin',
  },
];

export default function TrustBar() {
  return (
    <section
      className="py-5 bg-white border-b border-brand-border/40 relative z-20"
      aria-label="Nos garanties"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-brand-border/30">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-3 justify-center lg:justify-center px-4 py-2"
            >
              <div className="shrink-0">{badge.icon}</div>
              <div>
                <p className="text-xs font-black text-brand-dark leading-tight">{badge.title}</p>
                <p className="text-[11px] text-brand-muted font-medium">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
