import React, { useState, useEffect } from 'react';
import { X, Upload, Film, Camera, AlertCircle, FileVideo, FileImage, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { adminService } from '../../services/adminService';

export const MediaUploadModal = ({ isOpen, onClose, onSave, categories, editingItem = null }) => {
  const [type, setType] = useState('PHOTO');
  const [uploadMode, setUploadMode] = useState('FILE'); // 'FILE' (Direct File Upload) or 'URL' (Cloud/YouTube Link)
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');

  useEffect(() => {
    if (editingItem) {
      setType(editingItem.type || 'PHOTO');
      setUploadMode('URL');
      setSelectedFile(null);
      setTitle(editingItem.title || '');
      setDescription(editingItem.description || '');
      setUrl(editingItem.url || '');
      setThumbnailUrl(editingItem.thumbnailUrl || '');
      setCategoryId(editingItem.categoryId || (categories[0]?.id || ''));
    } else {
      setType('PHOTO');
      setUploadMode('FILE');
      setSelectedFile(null);
      setTitle('');
      setDescription('');
      setUrl('');
      setThumbnailUrl('');
      setCategoryId(categories[0]?.id || '');
    }
    setError('');
    setUploadProgressText('');
  }, [editingItem, categories, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === 'VIDEO' && file.size > 300 * 1024 * 1024) {
        setError('Video exceeds maximum allowed size before compression (300 MB cap). Please select a smaller video.');
        setSelectedFile(null);
        e.target.value = null;
        return;
      }
      if (type === 'PHOTO' && file.size > 20 * 1024 * 1024) {
        setError('Photo exceeds maximum allowed size before compression (20 MB cap). Please select a smaller photo.');
        setSelectedFile(null);
        e.target.value = null;
        return;
      }
      setError('');
      setSelectedFile(file);
      if (!title) {
        // Auto-fill title with clean filename without extension
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !categoryId) {
      setError('Please provide a Title and select a Category.');
      return;
    }

    if (uploadMode === 'FILE' && !selectedFile && !url) {
      setError('Please select a video or image file from your computer.');
      return;
    }

    if (uploadMode === 'URL' && !url.trim()) {
      setError('Please provide the media link or YouTube ID.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      let finalUrl = url.trim();
      let finalThumbUrl = thumbnailUrl.trim() || null;

      if (uploadMode === 'FILE' && selectedFile) {
        setUploadProgressText(`Uploading & compressing ${type.toLowerCase()} server-side... This may take up to a minute depending on file size...`);
        const uploadRes = await adminService.uploadFile(selectedFile);
        finalUrl = uploadRes.url;
        if (uploadRes.thumbnailUrl && !finalThumbUrl) {
          finalThumbUrl = uploadRes.thumbnailUrl;
        }
      }

      setUploadProgressText('Saving media record to database...');
      await onSave({
        type,
        title: title.trim(),
        description: description.trim(),
        url: finalUrl,
        thumbnailUrl: finalThumbUrl,
        categoryId: Number(categoryId),
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to upload and save media record.');
    } finally {
      setSaving(false);
      setUploadProgressText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-royal-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FDFCFB] rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col font-sans">
        {/* Header */}
        <div className="p-6 bg-royal-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-gold-500 text-royal-950">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-normal">
                {editingItem ? 'Update Sanctuary Record' : 'Add Media to Archive'}
              </h3>
              <p className="text-xs text-gray-300 font-light">
                Directly upload video/photo files from device or paste YouTube links
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-royal-800 text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[75vh]">
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {uploadProgressText && (
            <div className="p-4 rounded-2xl bg-royal-900 text-gold-400 text-xs flex items-center space-x-3 font-semibold animate-pulse">
              <div className="w-4 h-4 rounded-full border-2 border-gold-400 border-t-transparent animate-spin shrink-0" />
              <span>{uploadProgressText}</span>
            </div>
          )}

          {/* Media Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
              1. Select Media Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setType('PHOTO');
                  setSelectedFile(null);
                }}
                className={`p-3.5 rounded-2xl border font-semibold text-sm flex items-center justify-center space-x-2.5 transition-all ${
                  type === 'PHOTO'
                    ? 'bg-royal-900 text-white border-royal-900 shadow-md'
                    : 'bg-[#F5F7FA] text-royal-900 border-gray-200 hover:border-royal-900'
                }`}
              >
                <Camera className="w-4 h-4 text-gold-500" />
                <span>Photograph</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('VIDEO');
                  setSelectedFile(null);
                }}
                className={`p-3.5 rounded-2xl border font-semibold text-sm flex items-center justify-center space-x-2.5 transition-all ${
                  type === 'VIDEO'
                    ? 'bg-royal-900 text-white border-royal-900 shadow-md'
                    : 'bg-[#F5F7FA] text-royal-900 border-gray-200 hover:border-royal-900'
                }`}
              >
                <Film className="w-4 h-4 text-gold-500" />
                <span>Video Discourse</span>
              </button>
            </div>
          </div>

          {/* Upload Mode Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
              2. Upload Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUploadMode('FILE')}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                  uploadMode === 'FILE'
                    ? 'bg-gold-500/20 border-gold-500 text-royal-950 font-bold'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Upload className="w-3.5 h-3.5 text-gold-600" />
                <span>Direct File Upload (From Computer)</span>
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('URL')}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                  uploadMode === 'URL'
                    ? 'bg-gold-500/20 border-gold-500 text-royal-950 font-bold'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-gold-600" />
                <span>YouTube Link / External URL</span>
              </button>
            </div>
          </div>

          {/* Upload Box / URL Input */}
          {uploadMode === 'FILE' ? (
            <div className="border-2 border-dashed border-gray-300 rounded-[1.75rem] p-6 text-center hover:border-royal-900 transition-all bg-[#F8F7F4]/60">
              <input
                type="file"
                id="mediaFileInput"
                accept={type === 'PHOTO' ? 'image/*,.jpg,.jpeg,.png,.webp' : 'video/*,.mp4,.mov,.webm,.avi'}
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="mediaFileInput"
                className="cursor-pointer flex flex-col items-center justify-center space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-royal-900 text-gold-400 flex items-center justify-center shadow-md">
                  {type === 'PHOTO' ? <FileImage className="w-7 h-7" /> : <FileVideo className="w-7 h-7" />}
                </div>
                <div>
                  <div className="font-display text-lg text-royal-950 font-medium">
                    {selectedFile
                      ? selectedFile.name
                      : `Click to choose ${type === 'PHOTO' ? 'image' : 'video (.mp4/.mov)'} file from device`}
                  </div>
                  <div className="text-xs text-gray-500 font-light mt-1">
                    {selectedFile
                      ? `Size: ${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for instant upload`
                      : 'Opens your file manager / folders directly'}
                  </div>
                </div>
                {selectedFile && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>File Selected</span>
                  </span>
                )}
              </label>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
                {type === 'PHOTO' ? 'Image URL *' : 'YouTube Video ID or Embed Link *'}
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={
                  type === 'PHOTO'
                    ? 'https://example.com/photo.jpg'
                    : 'e.g., jfKfPfyJRdk or https://youtu.be/jfKfPfyJRdk'
                }
                className="w-full px-4 py-3 rounded-xl bg-[#F5F7FA] border border-gray-300 text-royal-950 text-sm focus:outline-none focus:border-royal-900 transition-all font-mono text-xs"
              />
            </div>
          )}

          {/* Title & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Surya Namaskar at Dawn"
                className="w-full px-4 py-3 rounded-xl bg-[#F5F7FA] border border-gray-300 text-royal-950 text-sm focus:outline-none focus:border-royal-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
                Category *
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F7FA] border border-gray-300 text-royal-950 text-sm focus:outline-none focus:border-royal-900 transition-all"
              >
                <option value="" disabled>Select category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Thumbnail for Videos */}
          {type === 'VIDEO' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
                Custom Thumbnail URL (Optional)
              </label>
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="Leave blank to use automatic video preview"
                className="w-full px-4 py-3 rounded-xl bg-[#F5F7FA] border border-gray-300 text-royal-950 text-sm focus:outline-none focus:border-royal-900 transition-all text-xs"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-950 mb-2">
              Archival Note & Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide background context on the practice, lineage discourse, or architectural focus..."
              className="w-full px-4 py-3 rounded-xl bg-[#F5F7FA] border border-gray-300 text-royal-950 text-sm focus:outline-none focus:border-royal-900 transition-all"
            />
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-end space-x-3">
            <Button variant="ghost" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? 'Uploading & Saving...' : editingItem ? 'Save Updates' : 'Publish to Archive'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
