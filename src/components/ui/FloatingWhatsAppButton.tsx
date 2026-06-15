import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  onClick: () => void;
  ariaLabel?: string;
  badgeCount?: number;
  className?: string;
}

export default function FloatingWhatsAppButton({
  onClick,
  ariaLabel = "Discuter avec un conseiller sur WhatsApp",
  badgeCount,
  className = "",
}: FloatingWhatsAppButtonProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer Pulse Ring: subtle pulse exactly once on load */}
      <span 
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-[ping_1.5s_ease-in-out_1] pointer-events-none" 
        style={{ zIndex: -1 }}
      ></span>

      {/* Badge dot */}
      {badgeCount !== undefined && badgeCount > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-red-600 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-md border-2 border-white"
          role="status"
        >
          {badgeCount}
        </span>
      )}

      {/* Mobile: Compact circular button (touch footprint >= 44px) */}
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className="md:hidden w-14 h-14 bg-[#25D366] hover:bg-[#1eaf53] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      >
        <MessageCircle size={28} aria-hidden="true" />
      </button>

      {/* Desktop: Pill showing icon + short label */}
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className="hidden md:flex items-center gap-2 px-5 py-3.5 bg-[#25D366] hover:bg-[#1eaf53] text-white rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] font-sans font-black text-sm select-none"
      >
        <MessageCircle size={20} className="stroke-[2.5]" aria-hidden="true" />
        <span>Conseiller en ligne</span>
      </button>
    </div>
  );
}

