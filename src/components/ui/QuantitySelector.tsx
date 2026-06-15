import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  ariaLabel?: string;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  className = '',
  ariaLabel = 'Quantité',
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={`inline-flex items-center border border-brand-border rounded-xl bg-brand-beige-light p-1 shadow-sm ${className}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label={`Diminuer la quantité de ${ariaLabel}`}
        className="w-11 h-11 flex items-center justify-center rounded-lg text-brand-dark hover:bg-brand-border/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1 outline-none"
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      
      <span
        aria-live="polite"
        className="px-4 font-sans font-bold text-base text-brand-dark min-w-[32px] text-center select-none"
      >
        {value}
      </span>
      
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label={`Augmenter la quantité de ${ariaLabel}`}
        className="w-11 h-11 flex items-center justify-center rounded-lg text-brand-dark hover:bg-brand-border/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1 outline-none"
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
