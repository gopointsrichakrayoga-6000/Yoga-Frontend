import api from './api';

export const mediaService = {
  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  async getPreviewMedia(type = null, categoryId = null) {
    const params = {};
    if (type) params.type = type;
    if (categoryId && categoryId > 0) params.categoryId = categoryId;
    const response = await api.get('/media/preview', { params });
    return response.data;
  },

  async getFullMedia(type = null, categoryId = null, page = 0, size = 12) {
    const params = { page, size };
    if (type) params.type = type;
    if (categoryId && categoryId > 0) params.categoryId = categoryId;
    const response = await api.get('/media', { params });
    return response.data;
  },

  async getMediaById(id) {
    const response = await api.get(`/media/${id}`);
    return response.data;
  }
};
