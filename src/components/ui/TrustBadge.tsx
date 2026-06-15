import React from 'react';

interface TrustBadgeProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export default function TrustBadge({
  icon,
  title,
  description,
  className = '',
}: TrustBadgeProps) {
  return (
    <div className={`flex flex-col items-center text-center p-6 bg-brand-beige-light border border-brand-border/40 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-green/5 text-brand-green border border-brand-green/10 mb-4" aria-hidden="true">
        {icon}
      </div>
      <h3 className="font-sans font-bold text-sm sm:text-base text-brand-dark">
        {title}
      </h3>
      {description && (
        <p className="mt-2 font-sans font-light text-xs sm:text-sm text-brand-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
