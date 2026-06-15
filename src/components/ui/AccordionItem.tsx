import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  className = '',
}: AccordionItemProps) {
  const triggerId = `accordion-trigger-${id.replace(/\s+/g, '-').toLowerCase()}`;
  const panelId = `accordion-panel-${id.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-brand-green bg-brand-green/5 shadow-xs'
          : 'border-brand-border/50 bg-white hover:border-brand-green/30 hover:shadow-xs'
      } ${className}`}
    >
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full px-5 sm:px-6 py-4.5 sm:py-5 text-left flex justify-between items-center cursor-pointer group focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 outline-none select-none"
        >
          <span className="font-sans font-bold text-sm sm:text-base text-brand-dark pr-4 group-hover:text-brand-green transition-colors">
            {question}
          </span>
          <ChevronDown
            className={`text-brand-gold transition-transform duration-300 flex-shrink-0 ${
              isOpen ? 'rotate-180 text-brand-green' : ''
            }`}
            size={18}
            aria-hidden="true"
          />
        </button>
      </h3>
      
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-brand-dark/80 leading-relaxed text-sm font-sans font-light border-t border-brand-border/10 pt-4">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

