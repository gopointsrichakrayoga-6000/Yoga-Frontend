import React, { useState, useEffect } from 'react';
import { X, FolderPlus, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

export const CategoryManageModal = ({ isOpen, onClose, onSave, editingCategory = null }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || '');
      setDescription(editingCategory.description || '');
    } else {
      setName('');
      setDescription('');
    }
    setError('');
  }, [editingCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await onSave({
        name: name.trim(),
        description: description.trim(),
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save category.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-royal-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg bg-cream-50 rounded-3xl shadow-2xl border border-royal-800/20 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-royal-900 text-cream-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-gold-500 text-royal-950">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-normal">
                {editingCategory ? 'Edit Archive Category' : 'Create New Category'}
              </h3>
              <p className="text-xs text-cream-200/80 font-light">
                Organize sanctuary photographs and discourse streams
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-royal-800 text-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-900 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Daily Shala Practice"
              className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-royal-800/20 text-royal-900 text-sm focus:outline-none focus:border-royal-800 focus:bg-cream-50 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-royal-900 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide context about what records belong under this thematic heading..."
              className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-royal-800/20 text-royal-900 text-sm focus:outline-none focus:border-royal-800 focus:bg-cream-50 transition-all"
            />
          </div>

          <div className="pt-4 border-t border-royal-800/10 flex items-center justify-end space-x-3">
            <Button variant="ghost" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : editingCategory ? 'Save Changes' : 'Create Category'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
