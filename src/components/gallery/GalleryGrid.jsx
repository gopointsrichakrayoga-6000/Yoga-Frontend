import React from 'react';
import { Maximize2, Sparkles, ArrowDown } from 'lucide-react';
import { LoginPromptCard } from './LoginPromptCard';
import { useAuth } from '../../context/AuthContext';

export const GalleryGrid = ({ photos, onOpenLightbox, hasMore, onLoadMore, loading }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Masonry Columns */}
      <div className="masonry-grid-2 lg:masonry-grid-3">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => onOpenLightbox && onOpenLightbox(photo, photos)}
            className="masonry-item group relative rounded-xl overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 border border-terracotta-500/25 bg-gray-900 cursor-pointer animate-fade-in"
          >
            <div className="relative overflow-hidden">
              <img
                src={photo.thumbnailUrl || photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Floating White Corner Label Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-lg shadow-warm-sm border border-terracotta-500/20 flex items-center justify-between z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase bg-[#F5F7FA] text-royal-900 border border-terracotta-500/20 mb-1">
                    {photo.categoryName || 'Ashram Archive'}
                  </span>
                  <h4 className="font-display text-lg text-royal-950 font-normal leading-snug">
                    {photo.title}
                  </h4>
                  {photo.description && (
                    <p className="text-xs text-gray-700 font-normal mt-0.5 line-clamp-1">
                      {photo.description}
                    </p>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-royal-900 text-white flex items-center justify-center shrink-0 ml-2 border border-gold-500/30">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* If user is logged out, render LoginPromptCard inside the masonry grid right after preview items */}
        {!isAuthenticated && photos.length > 0 && (
          <LoginPromptCard totalRemaining={150} mediaType="photographs" />
        )}
      </div>

      {/* Paginated Load More Button when logged in and items remain */}
      {isAuthenticated && hasMore && (
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loading}
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-royal-900 text-white text-sm font-semibold hover:bg-royal-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>{loading ? 'Loading Archive Photographs...' : 'Load More Archive Photographs'}</span>
            {!loading && <ArrowDown className="w-4 h-4 text-gold-400" />}
          </button>
        </div>
      )}

      {/* Empty State */}
      {photos.length === 0 && !loading && (
        <div className="text-center py-20 bg-cream-50 rounded-3xl border border-royal-800/10 p-8 max-w-xl mx-auto">
          <p className="font-display text-2xl text-royal-900 font-normal">
            No archive photographs found in this category right now.
          </p>
          <p className="text-sm text-royal-900/60 font-light mt-2">
            Please select another category or sign in to explore protected records.
          </p>
        </div>
      )}
    </div>
  );
};
