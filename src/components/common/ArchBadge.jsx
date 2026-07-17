import React from 'react';

export const ArchBadge = ({ children, className = '', variant = 'gold' }) => {
  const variants = {
    gold: 'bg-gold-500/15 text-royal-950 border border-gold-500/40 shadow-sm',
    royal: 'bg-royal-900 text-cream-50 border border-royal-700 shadow-sm',
    cream: 'bg-cream-200/80 text-royal-900 border border-royal-900/15',
    terracotta: 'bg-terracotta-500/15 text-royal-950 border border-terracotta-500/40 shadow-sm',
  };

  return (
    <span
      className={`inline-flex items-center px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest rounded-lg ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
