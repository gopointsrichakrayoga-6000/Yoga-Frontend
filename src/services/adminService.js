import api from './api';

export const adminService = {
  async createMedia(data) {
    const response = await api.post('/admin/media', data);
    return response.data;
  },

  async updateMedia(id, data) {
    const response = await api.put(`/admin/media/${id}`, data);
    return response.data;
  },

  async deleteMedia(id) {
    await api.delete(`/admin/media/${id}`);
  },

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/admin/media/upload-file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async createCategory(data) {
    const response = await api.post('/admin/categories', data);
    return response.data;
  },

  async updateCategory(id, data) {
    const response = await api.put(`/admin/categories/${id}`, data);
    return response.data;
  },

  async deleteCategory(id) {
    await api.delete(`/admin/categories/${id}`);
  }
};
