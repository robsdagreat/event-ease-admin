import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { authService } from './auth';
import { API_BASE_URL } from '../utils/constants';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Extend the InternalAxiosRequestConfig type to include _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // This is important for CSRF and cookies
});

// Add a request interceptor to handle CSRF token
api.interceptors.request.use(async (config) => {
  // Get CSRF cookie before making the request
  await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
  return config;
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sanctum_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for handling token refresh and errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    
    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        await authService.refreshToken();
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;