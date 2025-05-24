import api from './api';
import { LoginCredentials, AuthResponse } from '../types/auth';

const TOKEN_KEY = 'sanctum_token';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    // First, get CSRF cookie
    await api.get('/sanctum/csrf-cookie');
    
    // Then attempt login
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Store the token
    if (response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      delete api.defaults.headers.common['Authorization'];
    }
  },

  getCurrentUser: async () => {
    const response = await api.get<AuthResponse['user']>('/auth/user');
    return response.data;
  },

  refreshToken: async () => {
    try {
      const response = await api.post<{ token: string }>('/auth/refresh');
      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data.token;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },
};