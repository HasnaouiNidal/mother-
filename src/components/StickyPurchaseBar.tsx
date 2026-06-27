import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../lib/utils';

export default function StickyPurchaseBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[300] md:hidden bg-white/98 backdrop-blur-md border-t border-brand-border/40 shadow-xl px-4 py-3.5 flex items-center justify-between gap-3 select-none"
      style={{ paddingBottom: 'calc(0.875rem + env(safe-area-inset-bottom))' }}
    >
      {/* Left: advisor indicator */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="relative w-9 h-9 rounded-xl bg-brand-green flex items-center justify-center shadow-sm">
          <span className="text-sm" aria-hidden="true">💬</span>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-whatsapp-green rounded-full border-2 border-white" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-brand-green leading-none">Conseillère disponible</p>
          <p className="text-xs font-bold text-brand-dark mt-0.5 leading-none">Besoin d'un conseil ?</p>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <button
        id="sticky-bar-whatsapp-cta"
        onClick={() => openWhatsApp('Bonjour Health Power Maroc ! J\'ai besoin d\'un conseil avant de commander.')}
        className="flex items-center gap-2 bg-whatsapp-green text-white font-black text-xs px-5 py-3 rounded-xl shadow-md min-h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-whatsapp-green outline-none flex-shrink-0"
        aria-label="Contacter la conseillère sur WhatsApp"
      >
        <MessageCircle size={15} aria-hidden="true" />
        WhatsApp
      </button>
    </div>
  );
}
