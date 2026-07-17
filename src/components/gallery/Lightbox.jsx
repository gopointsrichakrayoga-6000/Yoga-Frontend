import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Lightbox = ({ currentPhoto, photoList, onClose, onNavigate }) => {
  if (!currentPhoto || !photoList || photoList.length === 0) return null;

  const currentIndex = photoList.findIndex((p) => p.id === currentPhoto.id);
  const total = photoList.length;

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + total) % total;
    onNavigate(photoList[prevIndex]);
  }, [currentIndex, total, photoList, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % total;
    onNavigate(photoList[nextIndex]);
  }, [currentIndex, total, photoList, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-royal-950/95 backdrop-blur-md animate-fade-in">
      {/* Top Controls Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-b from-royal-950 via-royal-950/80 to-transparent">
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500 text-royal-950">
            {currentPhoto.categoryName || 'Sanctuary Photo'}
          </span>
          <span className="text-xs font-medium text-cream-200/80">
            {currentIndex + 1} of {total}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-royal-900/80 hover:bg-gold-500 hover:text-royal-950 text-cream-100 transition-colors border border-royal-700/50"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Area */}
      <div className="relative z-10 w-full h-full max-w-6xl max-h-[82vh] mx-auto px-4 sm:px-16 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center max-h-[70vh] w-full">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300 border border-royal-800/40 select-none"
          />
        </div>

        {/* Caption */}
        <div className="mt-6 text-center max-w-2xl px-4 animate-fade-in">
          <h3 className="font-display text-2xl sm:text-3xl text-cream-50 font-normal">
            {currentPhoto.title}
          </h3>
          {currentPhoto.description && (
            <p className="text-sm text-cream-200/80 font-light mt-2 leading-relaxed">
              {currentPhoto.description}
            </p>
          )}
          <div className="text-[11px] text-gold-400 font-semibold mt-3 uppercase tracking-wider">
            Uploaded by {currentPhoto.uploadedByName || 'Sanctuary Sevak'}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-4 sm:left-6 z-20 p-3.5 rounded-full bg-royal-900/80 hover:bg-gold-500 hover:text-royal-950 text-cream-100 transition-all duration-200 border border-royal-700/50 focus:outline-none"
        aria-label="Previous Photograph"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 sm:right-6 z-20 p-3.5 rounded-full bg-royal-900/80 hover:bg-gold-500 hover:text-royal-950 text-cream-100 transition-all duration-200 border border-royal-700/50 focus:outline-none"
        aria-label="Next Photograph"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute inset-0 z-0" onClick={onClose} aria-hidden="true" />
    </div>
  );
};
