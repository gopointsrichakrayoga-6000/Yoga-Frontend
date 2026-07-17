import React from 'react';

export const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 my-8">
      <button
        onClick={() => onSelectCategory(null)}
        type="button"
        className={`px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex items-center space-x-2 border select-none ${
          activeCategory === null
            ? 'bg-royal-900 text-white border-royal-900 shadow-md scale-105'
            : 'bg-white text-royal-900 border-gray-200 hover:border-royal-900 hover:bg-gray-50'
        }`}
      >
        {activeCategory === null && <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />}
        <span>All Categories</span>
      </button>

      {categories.map((category) => {
        const isActive = activeCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            type="button"
            className={`px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 flex items-center space-x-2 border select-none ${
              isActive
                ? 'bg-royal-900 text-white border-royal-900 shadow-md scale-105'
                : 'bg-white text-royal-900 border-gray-200 hover:border-royal-900 hover:bg-gray-50'
            }`}
          >
            {isActive && <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />}
            <span>{category.name}</span>
            <span
              className={`ml-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                isActive ? 'bg-gold-500 text-royal-950' : 'bg-[#F5F7FA] text-gray-700'
              }`}
            >
              {category.mediaCount || 0}
            </span>
          </button>
        );
      })}
    </div>
  );
};
