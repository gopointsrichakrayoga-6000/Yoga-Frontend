import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Film, Sparkles, MapPin, ArrowRight, Sun, Trees, BookOpen, Compass } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import { mediaService } from '../services/mediaService';
import { useAuth } from '../context/AuthContext';
import { Lightbox } from '../components/gallery/Lightbox';

export const Home = () => {
  const [categories, setCategories] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const cats = await mediaService.getCategories();
        setCategories(cats);

        const previewResponse = await mediaService.getPreviewMedia('PHOTO');
        setPreviewPhotos(previewResponse.content || []);
      } catch (err) {
        console.error('Failed to load sanctuary home data:', err);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="overflow-hidden bg-paper-grain text-royal-950 font-sans">
      {/* Editorial Asymmetric Hero Section */}
      <section className="relative pt-32 sm:pt-36 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 border-b border-terracotta-500/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center animate-fade-in">
          {/* LEFT COLUMN: Editorial Typography & Pill CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Badge/Tag above headline */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#F5F7FA] border border-terracotta-500/20 text-royal-900 text-xs font-bold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-500 shrink-0" />
              <span>SACRED GROVE & TRADITIONAL VEDIC SHALA</span>
            </div>

            {/* Large Serif Headline with Devotional Emphasis */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-normal tracking-tight text-royal-950 leading-[1.08]">
              Where ancient silence meets <span className="font-medium text-royal-900">contemplative</span> stillness.
            </h1>

            {/* Supporting Muted Paragraph */}
            <p className="text-base sm:text-lg text-gray-600 font-normal max-w-xl leading-relaxed">
              A private visual repository documenting our daily dawn shala discipline, classical Vastu architecture, and Upanishadic discourses inside the protected Nilgiri forest sanctuary.
            </p>

            {/* Two Pill-Shaped CTA Buttons Side by Side */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-5">
              <Button
                to="/gallery"
                variant="primary"
                className="rounded-full px-7 py-4 text-sm font-semibold inline-flex items-center space-x-2.5 shadow-md hover:shadow-lg transition-all"
              >
                <span>Explore Photographic Archive</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Button>
              <Button
                to="/videos"
                variant="outline"
                className="rounded-full px-7 py-4 text-sm font-semibold transition-all inline-flex items-center space-x-2 shadow-sm"
              >
                <Film className="w-4 h-4 text-royal-800" />
                <span>Watch Discourse Recordings</span>
              </Button>
            </div>

            {/* Minimal Subtitle Pacing */}
            <div className="pt-6 border-t border-gray-100 flex items-center space-x-6 text-xs text-gray-500 font-medium uppercase tracking-wider">
              <span>108 Acres Forest Grove</span>
              <span>•</span>
              <span>5:30 AM Daily Shala</span>
              <span>•</span>
              <span>Parampara Lineage</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Large Rounded Photo Card with Floating Corner Label */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Rounded-Corner Photo Card */}
              <div className="relative rounded-xl overflow-hidden shadow-warm-lg aspect-3/4 bg-gray-900 border border-terracotta-500/20">
                <img
                  src="https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1000&q=80"
                  alt="Traditional Stone Mandapam at Sri Chakra Yoga"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating White Label Card Overlapping Image Edge */}
              <div className="absolute -bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-md px-5 py-4 rounded-lg shadow-warm-sm border border-terracotta-500/20 flex items-center space-x-3.5 z-10">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border border-royal-900/15 bg-white shrink-0">
                  <img src="/logo.png" alt="Sri Chakra Yoga Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
                    SRI CHAKRA YOGA PARAMPARA
                  </div>
                  <div className="font-display text-base font-semibold text-royal-950 mt-0.5">
                    The Stone Mandapam Shala
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Philosophy Section: Alternating Layout (Image Left / Text Right) */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Image Left Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-warm-md aspect-4/5 bg-gray-900 border border-terracotta-500/20">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/54/Early-morning-meditation-session-rishikesh-yogpeeth.jpg"
                alt="Teak Shala Dawn Practice"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Label Card */}
            <div className="absolute -bottom-5 right-6 left-6 sm:left-auto bg-white/95 backdrop-blur-md px-5 py-4 rounded-lg shadow-warm-sm border border-terracotta-500/20 flex items-center space-x-3.5 z-10">
              <div className="w-10 h-10 rounded-full bg-royal-900 text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/30">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  DAWN PRACTICE
                </div>
                <div className="font-display text-base font-semibold text-royal-950 mt-0.5">
                  5:30 AM Classical Alignment
                </div>
              </div>
            </div>
          </div>

          {/* Text Right Column */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-royal-900 bg-[#F5F7FA] px-4 py-1.5 rounded-full border border-terracotta-500/20 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-gold-500" />
              <span>PHILOSOPHICAL LINEAGE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-royal-950 font-normal leading-[1.12]">
              Where structural posture meets <span className="font-medium text-royal-900">Upanishadic stillness.</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-terracotta-500 to-gold-500 rounded-full" />
            <div className="space-y-4 text-base text-gray-600 font-normal leading-relaxed">
              <p>
                Unlike commercial wellness studios, Sri Chakra Yoga operates in harmony with traditional ashram discipline. Our architectural centerpiece—the Vastu-designed Burma teak mandapam—was constructed to honor natural acoustics and foster quiet inner alignment during morning meditation.
              </p>
              <p>
                This repository grants initiated students and seekers access to our photographic records and unlisted discourse streams, preserving teachings shared beneath the Bodhi canopy without digital noise.
              </p>
            </div>
            <div className="pt-4">
              <Button
                to="/about"
                variant="primary"
                className="rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center space-x-2.5 transition-all shadow-sm"
              >
                <span>Discover Sanctuary History</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Thematic Collections Section */}
      <section className="py-24 bg-dawn-gradient border-y border-terracotta-500/20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl">
            <div className="inline-block px-3.5 py-1 rounded-full bg-white text-royal-900 text-xs font-bold uppercase tracking-widest border border-terracotta-500/20 mb-3 shadow-sm">
              THEMATIC ARCHIVES
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-royal-950 font-normal">
              Explore Our <span className="font-medium text-royal-900">Sanctuary Collections</span>
            </h2>
            <p className="text-gray-700 text-base mt-3">
              Photographic documentation organized by sadhana discipline, Vastu architectural heritage, and satsang discourses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => {
              const bgImages = [
                'https://upload.wikimedia.org/wikipedia/commons/2/29/Yoga_Teacher_Training_in_India.jpg',
                'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=800&q=80',
                'https://upload.wikimedia.org/wikipedia/commons/8/8b/A_Deeya_Diya_oil_lamp_with_a_swastika_sign%2C_Hinduism_Varanasi_India.jpg',
                'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
              ];
              return (
                <div
                  key={cat.id}
                  className="group rounded-xl bg-white border border-terracotta-500/25 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-gray-900">
                    <img
                      src={bgImages[idx % bgImages.length]}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/95 text-royal-900 text-[10px] font-bold uppercase tracking-wider mb-2 shadow-sm">
                        {cat.mediaCount || 0} Records
                      </span>
                      <h3 className="font-display text-xl text-white font-normal leading-snug">
                        {cat.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-gray-600 font-normal leading-relaxed line-clamp-3">
                      {cat.description || 'Collection of photographs and discourse recordings.'}
                    </p>
                    <div className="pt-3 border-t border-gray-100">
                      <Link
                        to={`/gallery?category=${cat.id}`}
                        className="text-xs font-semibold text-royal-900 group-hover:text-royal-800 flex items-center justify-between transition-colors"
                      >
                        <span>View Collection</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gold-500" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Preview Highlights Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#F5F7FA] text-royal-900 text-xs font-bold uppercase tracking-widest border border-terracotta-500/20 mb-3 shadow-sm">
              RECENT VISUAL RECORDS
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-royal-950 font-normal">
              Preview <span className="font-medium text-royal-900">Highlights</span>
            </h2>
            <p className="text-gray-700 text-base mt-3">
              A curated glimpse of classical asana sequences, morning Vedic chanting, and architectural stone mandapams.
            </p>
          </div>
          <Button
            to="/gallery"
            variant="primary"
            className="rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center space-x-2 shadow-sm self-start md:self-auto shrink-0"
          >
            <span>View All Photographs ({isAuthenticated ? 'Full Archive' : 'Public Preview'})</span>
            <ArrowRight className="w-4 h-4 text-gold-400" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[260px]">
          {previewPhotos.slice(0, 6).map((photo, idx) => {
            const isFeatured = idx === 0;
            const isWide = idx === 3;
            const colSpan = isFeatured ? 'md:col-span-2 md:row-span-2' : isWide ? 'md:col-span-2' : 'md:col-span-1';

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative rounded-xl overflow-hidden bg-gray-900 shadow-warm-sm hover:shadow-warm-md border border-terracotta-500/20 cursor-pointer ${colSpan} transition-all duration-300`}
              >
                <img
                  src={photo.thumbnailUrl || photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-bold uppercase text-gold-400 tracking-widest">
                    {photo.categoryName}
                  </span>
                  <h4 className={`font-display text-white font-normal mt-1 ${isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                    {photo.title}
                  </h4>
                  <p className="text-xs text-gray-200 font-light mt-1 line-clamp-2">
                    {photo.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <Lightbox
          currentPhoto={selectedPhoto}
          photoList={previewPhotos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={(photo) => setSelectedPhoto(photo)}
        />
      )}
    </div>
  );
};
