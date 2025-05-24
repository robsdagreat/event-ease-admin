import { useState } from 'react';
import { useApiError } from './useApiError';

export const useFormSubmit = <T, R>(
  submitFn: (data: T) => Promise<R>,
  onSuccess?: (data: R) => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { error, handleError, clearError } = useApiError();

  const handleSubmit = async (data: T) => {
    try {
      setIsSubmitting(true);
      clearError();
      const result = await submitFn(data);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    error,
  };
};