import React from 'react';

export const AshramLogo = ({ className = '', variant = 'dark' }) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-royal-950' : 'text-cream-50';
  const subtextColor = isDark ? 'text-royal-800/70' : 'text-gold-400';

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Circular Logo Mark */}
      <div className="relative shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-md border border-royal-900/15 bg-white">
        <img
          src="/logo.png"
          alt="Sri Chakra Yoga Circular Logo"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Brand Wordmark & Location Subtitle */}
      <div className="flex flex-col justify-center">
        <div className={`font-display text-lg sm:text-xl font-bold uppercase tracking-wider leading-none ${textColor}`}>
          Sri Chakra <span className="font-normal capitalize italic text-royal-800">Yoga</span>
        </div>
        <div className={`text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-semibold mt-1 ${subtextColor}`}>
          NILGIRI FOOTHILLS • PALAKKAD
        </div>
      </div>
    </div>
  );
};
