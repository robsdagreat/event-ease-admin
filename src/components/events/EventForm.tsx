import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { EventFormData } from '../../types/event';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../../services/events';
import { venueService } from '../../services/venues';
import { Venue } from '../../types/venue';

interface EventFormProps {
  open: boolean;
  onClose: () => void;
  eventId?: number;
}

export const EventForm: React.FC<EventFormProps> = ({ open, onClose, eventId }) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<EventFormData>();

  const { data: venues = [] } = useQuery({
    queryKey: ['venues'],
    queryFn: venueService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: eventService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      onClose();
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: EventFormData }) =>
      eventService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      onClose();
      reset();
    },
  });

  const onSubmit = (data: EventFormData) => {
    if (eventId) {
      updateMutation.mutate({ id: eventId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{eventId ? 'Edit Event' : 'Create Event'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Title"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="venue_id"
              control={control}
              rules={{ required: 'Venue is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label="Venue"
                  error={!!error}
                  helperText={error?.message}
                >
                  {venues.map((venue: Venue) => (
  <MenuItem key={venue.id} value={venue.id}>
    {venue.name}
  </MenuItem>
))}
                </TextField>
              )}
            />

            <Controller
              name="type"
              control={control}
              rules={{ required: 'Type is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label="Type"
                  error={!!error}
                  helperText={error?.message}
                >
                  <MenuItem value="concert">Concert</MenuItem>
                  <MenuItem value="conference">Conference</MenuItem>
                  <MenuItem value="exhibition">Exhibition</MenuItem>
                  <MenuItem value="workshop">Workshop</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="status"
              control={control}
              rules={{ required: 'Status is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label="Status"
                  error={!!error}
                  helperText={error?.message}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="start_date"
              control={control}
              rules={{ required: 'Start date is required' }}
              render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                  label="Start Date"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString())}
                />
              )}
            />

            <Controller
              name="end_date"
              control={control}
              rules={{ required: 'End date is required' }}
              render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                  label="End Date"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date?.toISOString())}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {eventId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};