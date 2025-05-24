import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../services/events';
import { Event, EventFormData } from '../types/event';

export const useEvent = (id: number) => {
  const queryClient = useQueryClient();

  const { data: event, isLoading } = useQuery<Event>({
    queryKey: ['event', id],
    queryFn: () => eventService.getById(id),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (data: EventFormData) => eventService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => eventService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    event,
    isLoading,
    updateEvent: updateMutation.mutate,
    deleteEvent: deleteMutation.mutate,
  };
}; 