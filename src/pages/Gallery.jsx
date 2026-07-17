import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Camera, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { CategoryFilter } from '../components/gallery/CategoryFilter';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { Lightbox } from '../components/gallery/Lightbox';
import { mediaService } from '../services/mediaService';
import { useAuth } from '../context/AuthContext';

export const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [activeCategory, setActiveCategory] = useState(() => {
    const catParam = searchParams.get('category');
    return catParam ? Number(catParam) : null;
  });
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoListForLightbox, setPhotoListForLightbox] = useState([]);

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

  const loadPhotos = async (category, pageNumber, reset = false) => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        // Authenticated: fetch full paginated items
        const response = await mediaService.getFullMedia('PHOTO', category, pageNumber, 12);
        if (reset) {
          setPhotos(response.content || []);
          setPhotoListForLightbox(response.content || []);
        } else {
          setPhotos((prev) => [...prev, ...response.content]);
          setPhotoListForLightbox((prev) => [...prev, ...response.content]);
        }
        setHasMore(!response.last);
      } else {
        // Unauthenticated: fetch public preview (limit 6 + LoginPromptCard cutoff)
        const response = await mediaService.getPreviewMedia('PHOTO', category);
        setPhotos(response.content || []);
        setPhotoListForLightbox(response.content || []);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to fetch photographs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    loadPhotos(activeCategory, 0, true);
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
    loadPhotos(activeCategory, nextPage, false);
  };

  const handleOpenLightbox = (photo, list) => {
    setSelectedPhoto(photo);
    setPhotoListForLightbox(list);
  };

  return (
    <div className="bg-paper-grain min-h-screen pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <SectionHeading
          badge="Photographic Archive"
          title="Living Shala Documentation"
          subtitle={
            isAuthenticated
              ? 'You are viewing our complete high-definition sanctuary collection with full member privileges.'
              : 'Explore our open public preview. Sign in to your sanctuary account to unlock the full 150+ high-definition photographic records.'
          }
          align="center"
        />

        {/* Category Tabs */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Gallery Masonry Grid */}
        <GalleryGrid
          photos={photos}
          onOpenLightbox={handleOpenLightbox}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          loading={loading}
        />

        {/* Lightbox */}
        {selectedPhoto && (
          <Lightbox
            currentPhoto={selectedPhoto}
            photoList={photoListForLightbox}
            onClose={() => setSelectedPhoto(null)}
            onNavigate={(photo) => setSelectedPhoto(photo)}
          />
        )}
      </div>
    </div>
  );
};
