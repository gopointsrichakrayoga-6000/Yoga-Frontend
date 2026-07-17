import React from 'react';
import { ArchBadge } from './ArchBadge';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignClasses = {
    center: 'text-center items-center mx-auto',
    left: 'text-left items-start',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={`flex flex-col max-w-3xl ${alignClasses[align]} ${className}`}>
      {badge && (
        <div className="mb-4 animate-fade-in">
          <ArchBadge variant="gold">{badge}</ArchBadge>
        </div>
      )}

      {title && (
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-royal-950 tracking-tight leading-[1.14]">
          {title}
        </h2>
      )}

      {/* Lotus-Petal & Temple Arch Silhouette Divider */}
      <div className="flex items-center justify-center space-x-3 my-5 opacity-90 select-none">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-terracotta-400 to-gold-500" />
        <div className="flex items-center space-x-1 text-gold-600 text-xs font-serif">
          <span>॥</span>
          <span className="text-sm">ॐ</span>
          <span>॥</span>
        </div>
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent via-terracotta-400 to-gold-500" />
      </div>

      {subtitle && (
        <p className="text-base sm:text-lg text-royal-900/80 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
