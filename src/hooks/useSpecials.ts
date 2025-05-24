import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { specialService } from '../services/specials';
import { Special, SpecialFormData } from '../types/special';

export const useSpecials = () => {
  const queryClient = useQueryClient();

  const { data: specials = [], isLoading } = useQuery<Special[]>({
    queryKey: ['specials'],
    queryFn: specialService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: SpecialFormData) => specialService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specials'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: SpecialFormData }) =>
      specialService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specials'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: specialService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specials'] });
    },
  });

  return {
    specials,
    isLoading,
    createSpecial: createMutation.mutate,
    updateSpecial: updateMutation.mutate,
    deleteSpecial: deleteMutation.mutate,
  };
};
