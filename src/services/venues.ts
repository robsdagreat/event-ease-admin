import api from './api';
import { Venue, VenueFormData } from '../types/venue';

export const venueService = {
  getAll: async () => {
    const response = await api.get<Venue[]>('/venues');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Venue>(`/venues/${id}`);
    return response.data;
  },

  create: async (data: VenueFormData) => {
    const response = await api.post<Venue>('/venues', data);
    return response.data;
  },

  update: async (id: number, data: VenueFormData) => {
    const response = await api.put<Venue>(`/venues/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/venues/${id}`);
  },

  search: async (query: string) => {
    const response = await api.get<Venue[]>(`/venues/search?q=${query}`);
    return response.data;
  },
};