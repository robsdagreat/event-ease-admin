import { useState } from 'react';

export const useApiError = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: any) => {
    if (error.response?.data?.message) {
      setError(error.response.data.message);
    } else {
      setError('An unexpected error occurred');
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError };
};