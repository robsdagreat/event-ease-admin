import api from './api';
import { Event, EventFormData } from '../types/event';

export const eventService = {
  getAll: async () => {
    const response = await api.get<Event[]>('/events');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  },

  create: async (data: EventFormData) => {
    const response = await api.post<Event>('/events', data);
    return response.data;
  },

  update: async (id: number, data: EventFormData) => {
    const response = await api.put<Event>(`/events/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/events/${id}`);
  },

  search: async (query: string) => {
    const response = await api.get<Event[]>(`/events/search?q=${query}`);
    return response.data;
  },
};