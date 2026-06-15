import React from 'react';

interface PrimaryCTAProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit';
  theme?: 'whatsapp' | 'brand';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  ariaLabel?: string;
}

export default function PrimaryCTA({
  children,
  onClick,
  type = 'button',
  theme = 'whatsapp',
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  ariaLabel,
}: PrimaryCTAProps) {
  const isWhatsApp = theme === 'whatsapp';
  
  // Base styles: height >= 44px, transition-normal, focus states
  const baseStyles = "relative inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl font-sans text-sm sm:text-base font-black transition-[background-color,transform,box-shadow] duration-200 select-none text-white focus-visible:ring-2 focus-visible:ring-offset-2 outline-none w-full sm:w-auto active:scale-98";
  
  const themeStyles = isWhatsApp
    ? "bg-whatsapp-green hover:bg-whatsapp-hover shadow-md shadow-whatsapp-green/20 focus-visible:ring-whatsapp-green"
    : "bg-brand-green hover:bg-brand-green-hover shadow-md shadow-brand-green/20 focus-visible:ring-brand-green";
    
  const disabledStyles = (disabled || isLoading)
    ? "opacity-60 cursor-not-allowed pointer-events-none active:scale-100 shadow-none"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      className={`${baseStyles} ${themeStyles} ${disabledStyles} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Envoi en cours...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2 w-full">
          {icon && iconPosition === 'left' && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
        </span>
      )}
    </button>
  );
}
