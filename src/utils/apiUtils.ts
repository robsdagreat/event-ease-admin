import { AxiosError } from 'axios';

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      // Handle unauthorized
      window.location.href = '/login';
    }
    return error.response?.data?.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
};

export const createQueryKey = (baseKey: string, params?: Record<string, any>) => {
  if (!params) return [baseKey];
  return [baseKey, params];
};