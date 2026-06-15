import React from 'react';

interface SectionHeaderProps {
  tagline?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionHeader({
  tagline,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  
  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {tagline && (
        <span className="text-[11px] uppercase tracking-widest text-brand-gold font-bold bg-brand-green/5 border border-brand-green/10 px-3 py-1 rounded-full mb-4 inline-block font-sans">
          {tagline}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-brand-green leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm sm:text-base text-brand-muted font-sans font-light leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
