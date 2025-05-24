import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { venueService } from '../services/venues';
import { Venue, VenueFormData } from '../types/venue';

export const useVenues = () => {
  const queryClient = useQueryClient();

  const { data: venues = [], isLoading } = useQuery<Venue[]>({
    queryKey: ['venues'],
    queryFn: venueService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: VenueFormData) => venueService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: VenueFormData }) =>
      venueService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: venueService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['venues'] });
    },
  });

  return {
    venues,
    isLoading,
    createVenue: createMutation.mutate,
    updateVenue: updateMutation.mutate,
    deleteVenue: deleteMutation.mutate,
  };
};
