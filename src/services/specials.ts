import api from './api';
import { Special, SpecialFormData } from '../types/special';

export const specialService = {
  getAll: async () => {
    const response = await api.get<Special[]>('/specials');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Special>(`/specials/${id}`);
    return response.data;
  },

  create: async (data: SpecialFormData) => {
    const response = await api.post<Special>('/specials', data);
    return response.data;
  },

  update: async (id: number, data: SpecialFormData) => {
    const response = await api.put<Special>(`/specials/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/specials/${id}`);
  },

  search: async (query: string) => {
    const response = await api.get<Special[]>(`/specials/search?q=${query}`);
    return response.data;
  },
};