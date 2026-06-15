import React from 'react';

interface SecondaryCTAProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit';
  theme?: 'outline' | 'beige';
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  ariaLabel?: string;
}

export default function SecondaryCTA({
  children,
  onClick,
  type = 'button',
  theme = 'outline',
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  ariaLabel,
}: SecondaryCTAProps) {
  
  // Base styles: height >= 44px, transition-normal, focus states
  const baseStyles = "relative inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl font-sans text-sm sm:text-base font-bold transition-[background-color,transform,border-color,color] duration-200 select-none focus-visible:ring-2 focus-visible:ring-offset-2 outline-none w-full sm:w-auto active:scale-98";
  
  const themeStyles = theme === 'outline'
    ? "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white focus-visible:ring-brand-green"
    : "bg-brand-beige border border-brand-border text-brand-dark hover:bg-brand-border/30 focus-visible:ring-brand-muted";
    
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none active:scale-100"
    : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${themeStyles} ${disabledStyles} ${className}`}
    >
      <span className="flex items-center justify-center gap-2 w-full">
        {icon && iconPosition === 'left' && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
      </span>
    </button>
  );
}
