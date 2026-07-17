import React from 'react';
import { Play, Film } from 'lucide-react';

export const VideoCard = ({ video, onPlay }) => {
  const getThumbnail = () => {
    if (video.thumbnailUrl && (video.thumbnailUrl.startsWith('http') || video.thumbnailUrl.startsWith('/'))) {
      return video.thumbnailUrl;
    }
    if (video.url.includes('/uploads/') || /\.(mp4|webm|mov|avi|mkv)$/i.test(video.url)) {
      return 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=800&q=80';
    }
    const cleanId = video.url.includes('v=')
      ? video.url.split('v=')[1]?.split('&')[0]
      : video.url.includes('youtu.be/')
      ? video.url.split('youtu.be/')[1]?.split('?')[0]
      : video.url;
    return `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`;
  };

  return (
    <div
      onClick={() => onPlay && onPlay(video)}
      className="group relative bg-white rounded-xl overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 border border-terracotta-500/20 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
    >
      {/* Video Thumbnail with Play Button Overlay */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        <img
          src={getThumbnail()}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95"
        />

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/95 text-royal-900 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 fill-royal-900 ml-1" />
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/95 text-royal-900 backdrop-blur-md shadow-sm flex items-center space-x-1.5">
            <Film className="w-3.5 h-3.5 text-gold-500" />
            <span>{video.categoryName || 'Discourse Recording'}</span>
          </span>
        </div>
      </div>

      {/* Video Details */}
      <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h4 className="font-display text-2xl text-royal-950 font-normal leading-snug group-hover:text-royal-800 transition-colors">
            {video.title}
          </h4>
          {video.description && (
            <p className="text-xs text-gray-600 font-light mt-2 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-light">
          <span>Uploaded by <strong className="font-semibold text-royal-950">{video.uploadedByName || 'Sanctuary Sevak'}</strong></span>
          <span className="font-semibold text-royal-900 group-hover:translate-x-1 transition-transform inline-block">Unlisted Stream →</span>
        </div>
      </div>
    </div>
  );
};
