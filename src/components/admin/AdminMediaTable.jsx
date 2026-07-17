import React from 'react';
import { Edit2, Trash2, Camera, Film, ExternalLink } from 'lucide-react';

export const AdminMediaTable = ({ mediaList, onEdit, onDelete }) => {
  if (!mediaList || mediaList.length === 0) {
    return (
      <div className="text-center py-16 bg-cream-50 rounded-3xl border border-royal-800/10 p-8">
        <p className="font-display text-2xl text-royal-900 font-normal">
          No media records currently found in the ashram repository.
        </p>
        <p className="text-sm text-royal-900/60 mt-2">
          Use the "Add Media Record" button above to upload new photographs or unlisted videos.
        </p>
      </div>
    );
  }

  const getThumbnail = (item) => {
    if (item.thumbnailUrl && item.thumbnailUrl.startsWith('http')) {
      return item.thumbnailUrl;
    }
    if (item.type === 'VIDEO') {
      const cleanId = item.url.includes('v=')
        ? item.url.split('v=')[1]?.split('&')[0]
        : item.url.includes('youtu.be/')
        ? item.url.split('youtu.be/')[1]?.split('?')[0]
        : item.url;
      return `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`;
    }
    return item.url;
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-royal-900 text-white border-b border-royal-800 text-[11px] font-bold uppercase tracking-widest">
              <th className="py-4 px-6">Preview</th>
              <th className="py-4 px-6">Title & Type</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Uploaded By</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-royal-950">
            {mediaList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-4 px-6">
                  <div className="w-20 h-14 rounded-xl overflow-hidden bg-gray-900 relative border border-gray-200 shrink-0">
                    <img
                      src={getThumbnail(item)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-gold-400 text-[9px] font-bold uppercase tracking-wider flex items-center">
                      {item.type === 'PHOTO' ? <Camera className="w-2.5 h-2.5" /> : <Film className="w-2.5 h-2.5" />}
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6 max-w-xs">
                  <div className="font-display text-lg font-medium text-royal-950">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500 font-light truncate mt-0.5">
                    {item.description || 'No description provided.'}
                  </div>
                </td>

                <td className="py-4 px-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#F5F7FA] text-royal-900 border border-royal-900/10">
                    {item.categoryName || 'Uncategorized'}
                  </span>
                </td>

                <td className="py-4 px-6 text-xs text-gray-700 font-medium">
                  {item.uploadedByName && item.uploadedByName !== 'null' ? item.uploadedByName : 'Acharya Desk'}
                </td>

                <td className="py-4 px-6 text-xs text-gray-500">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                </td>

                <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="p-2 rounded-xl bg-[#F8F7F4] hover:bg-royal-900 hover:text-white text-royal-900 transition-all border border-gray-200"
                    title="Edit Record"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${item.title}" from the ashram archive?`)) {
                        onDelete(item.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-700 transition-all border border-red-200"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
