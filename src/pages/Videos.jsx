import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Film, Sparkles, ArrowDown } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { CategoryFilter } from '../components/gallery/CategoryFilter';
import { VideoCard } from '../components/videos/VideoCard';
import { VideoModal } from '../components/videos/VideoModal';
import { LoginPromptCard } from '../components/gallery/LoginPromptCard';
import { mediaService } from '../services/mediaService';
import { useAuth } from '../context/AuthContext';

export const Videos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState(() => {
    const catParam = searchParams.get('category');
    return catParam ? Number(catParam) : null;
  });
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await mediaService.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const loadVideos = async (category, pageNumber, reset = false) => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        // Authenticated: fetch full paginated discourse videos
        const response = await mediaService.getFullMedia('VIDEO', category, pageNumber, 12);
        if (reset) {
          setVideos(response.content || []);
        } else {
          setVideos((prev) => [...prev, ...response.content]);
        }
        setHasMore(!response.last);
      } else {
        // Unauthenticated: fetch public preview (limit 2 videos + LoginPromptCard cutoff)
        const response = await mediaService.getPreviewMedia('VIDEO', category);
        setVideos(response.content || []);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to fetch discourse videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    loadVideos(activeCategory, 0, true);
  }, [activeCategory, isAuthenticated]);

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadVideos(activeCategory, nextPage, false);
  };

  return (
    <div className="bg-paper-grain min-h-screen pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <SectionHeading
          badge="Discourse Archive"
          title="Philosophical Satsangs & Shala Streams"
          subtitle={
            isAuthenticated
              ? 'Access our complete library of unlisted high-definition discourse recordings and alignment demonstrations.'
              : 'You are viewing our public preview of 2 discourse recordings. Sign in to access all 42+ unlisted practice recordings and evening satsangs.'
          }
          align="center"
        />

        {/* Category Tabs */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onPlay={(v) => setSelectedVideo(v)}
            />
          ))}

          {/* If user is logged out, render LoginPromptCard inside the video grid right after preview items */}
          {!isAuthenticated && videos.length > 0 && (
            <LoginPromptCard totalRemaining={42} mediaType="discourse recordings" />
          )}
        </div>

        {/* Paginated Load More Button when logged in and items remain */}
        {isAuthenticated && hasMore && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loading}
              className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-royal-900 text-white text-sm font-semibold hover:bg-royal-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>{loading ? 'Loading More Streams...' : 'Load More Discourse Recordings'}</span>
              {!loading && <ArrowDown className="w-4 h-4 text-gold-400" />}
            </button>
          </div>
        )}

        {/* Empty State */}
        {videos.length === 0 && !loading && (
          <div className="text-center py-20 bg-white rounded-xl border border-terracotta-500/20 shadow-warm-sm p-8 max-w-xl mx-auto">
            <p className="font-display text-2xl text-royal-950 font-normal">
              No video discourses found in this category right now.
            </p>
            <p className="text-sm text-gray-700 font-normal mt-2">
              Please select another category or sign in to explore protected satsang streams.
            </p>
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </div>
    </div>
  );
};
