import React, { useState, useEffect } from 'react';
import { Plus, Camera, Film, FolderPlus, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { AdminMediaTable } from '../components/admin/AdminMediaTable';
import { MediaUploadModal } from '../components/admin/MediaUploadModal';
import { CategoryManageModal } from '../components/admin/CategoryManageModal';
import { mediaService } from '../services/mediaService';
import { adminService } from '../services/adminService';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('MEDIA'); // 'MEDIA' or 'CATEGORIES'
  const [mediaList, setMediaList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [cats, mediaRes] = await Promise.all([
        mediaService.getCategories(),
        mediaService.getFullMedia(null, null, 0, 100),
      ]);
      setCategories(cats);
      setMediaList(mediaRes.content || []);
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Media Handlers
  const handleSaveMedia = async (mediaData) => {
    if (editingMedia) {
      await adminService.updateMedia(editingMedia.id, mediaData);
    } else {
      await adminService.createMedia(mediaData);
    }
    await loadDashboardData();
  };

  const handleDeleteMedia = async (id) => {
    try {
      await adminService.deleteMedia(id);
      await loadDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete media item.');
    }
  };

  // Category Handlers
  const handleSaveCategory = async (catData) => {
    if (editingCategory) {
      await adminService.updateCategory(editingCategory.id, catData);
    } else {
      await adminService.createCategory(catData);
    }
    await loadDashboardData();
  };

  const handleDeleteCategory = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this archive category?')) {
        await adminService.deleteCategory(id);
        await loadDashboardData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot delete category containing active media.');
    }
  };

  return (
    <div className="bg-paper-grain min-h-screen pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-terracotta-500/20 pb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F5F7FA] border border-terracotta-500/20 text-royal-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5 text-gold-500" />
              <span>ACHARYA & ADMINISTRATION PANEL</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-royal-950 font-normal">
              Sanctuary Content Management
            </h1>
            <p className="text-sm text-gray-700 font-normal mt-1">
              Manage photographic records, unlisted YouTube discourse streams, and archive categories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={loadDashboardData}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-gray-300 bg-white text-royal-950 text-xs uppercase tracking-wider font-semibold hover:bg-gray-50 transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Records</span>
            </button>
            {activeTab === 'MEDIA' ? (
              <button
                type="button"
                onClick={() => {
                  setEditingMedia(null);
                  setIsMediaModalOpen(true);
                }}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-royal-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-royal-800 transition-all shadow-md"
              >
                <Plus className="w-4 h-4 text-gold-400" />
                <span>Add Media Record</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setEditingCategory(null);
                  setIsCategoryModalOpen(true);
                }}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-royal-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-royal-800 transition-all shadow-md"
              >
                <FolderPlus className="w-4 h-4 text-gold-400" />
                <span>Create Category</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs Switch */}
        <div className="flex items-center space-x-4 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab('MEDIA')}
            className={`pb-4 px-3 font-semibold text-sm transition-all flex items-center space-x-2 border-b-2 select-none ${
              activeTab === 'MEDIA'
                ? 'border-royal-900 text-royal-950'
                : 'border-transparent text-gray-400 hover:text-royal-950'
            }`}
          >
            <Camera className="w-4 h-4 text-gold-500" />
            <span>Media Archive Items ({mediaList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CATEGORIES')}
            className={`pb-4 px-3 font-semibold text-sm transition-all flex items-center space-x-2 border-b-2 select-none ${
              activeTab === 'CATEGORIES'
                ? 'border-royal-900 text-royal-950'
                : 'border-transparent text-gray-400 hover:text-royal-950'
            }`}
          >
            <FolderPlus className="w-4 h-4 text-gold-500" />
            <span>Thematic Categories ({categories.length})</span>
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-20 text-center space-y-4 bg-white rounded-xl border border-terracotta-500/20 shadow-warm-sm p-8">
            <div className="w-10 h-10 rounded-full border-4 border-royal-900 border-t-gold-500 animate-spin mx-auto" />
            <p className="font-display text-lg text-royal-950">Loading Sanctuary Records...</p>
          </div>
        ) : activeTab === 'MEDIA' ? (
          <AdminMediaTable
            mediaList={mediaList}
            onEdit={(item) => {
              setEditingMedia(item);
              setIsMediaModalOpen(true);
            }}
            onDelete={handleDeleteMedia}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl p-7 shadow-warm-sm border border-terracotta-500/25 flex flex-col justify-between space-y-4 hover:shadow-warm-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#F5F7FA] text-royal-900 border border-terracotta-500/20">
                      {cat.mediaCount || 0} Records
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-royal-950 font-normal">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-700 font-normal mt-2 leading-relaxed">
                    {cat.description || 'No description provided for this category.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCategory(cat);
                      setIsCategoryModalOpen(true);
                    }}
                    className="px-4 py-1.5 rounded-full border border-gray-300 text-royal-900 text-xs font-semibold hover:bg-gray-50 transition-all"
                  >
                    Edit Category
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="px-4 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-600 hover:text-white transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        <MediaUploadModal
          isOpen={isMediaModalOpen}
          onClose={() => setIsMediaModalOpen(false)}
          onSave={handleSaveMedia}
          categories={categories}
          editingItem={editingMedia}
        />

        <CategoryManageModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onSave={handleSaveCategory}
          editingCategory={editingCategory}
        />
      </div>
    </div>
  );
};
