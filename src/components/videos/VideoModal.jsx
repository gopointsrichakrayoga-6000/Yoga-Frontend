import React, { useEffect } from 'react';
import { X, Film } from 'lucide-react';

export const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  const isDirectVideo = (url) => {
    if (!url) return false;
    return url.includes('/uploads/') || /\.(mp4|webm|mov|avi|mkv)$/i.test(url);
  };

  const getYoutubeId = (url) => {
    if (!url) return '';
    if (url.includes('v=')) return url.split('v=')[1]?.split('&')[0];
    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1]?.split('?')[0];
    return url;
  };

  const videoId = getYoutubeId(video.url);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-royal-950/90 backdrop-blur-md p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-royal-950 rounded-3xl overflow-hidden shadow-2xl border border-royal-700/60 flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-royal-800/60 bg-royal-900/40">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500 text-royal-950 flex items-center space-x-1.5">
              <Film className="w-3.5 h-3.5" />
              <span>{video.categoryName || 'Discourse Recording'}</span>
            </span>
            <span className="text-sm font-display font-medium text-cream-50 truncate max-w-md">
              {video.title}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-royal-800 text-cream-100 hover:bg-gold-500 hover:text-royal-950 transition-colors"
            aria-label="Close Video Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded Video Frame or HTML5 Video Player */}
        <div className="relative aspect-video w-full bg-black">
          {isDirectVideo(video.url) ? (
            <video
              controls
              autoPlay
              className="absolute inset-0 w-full h-full object-contain bg-black"
            >
              <source src={video.url} />
              Your browser does not support HTML5 video playback.
            </video>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
        </div>

        {/* Description Footer */}
        {video.description && (
          <div className="p-6 bg-royal-900/30 text-cream-200/90 text-sm font-light leading-relaxed">
            {video.description}
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-[-1]" onClick={onClose} aria-hidden="true" />
    </div>
  );
};
