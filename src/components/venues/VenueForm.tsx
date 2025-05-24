import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Venue } from '../../types/venue';

interface VenueFormProps {
  venue?: Partial<Venue>;
  onSubmit: (data: Partial<Venue>) => void;
}

export const VenueForm: React.FC<VenueFormProps> = ({ venue, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Name"
        defaultValue={venue?.name}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Address"
        defaultValue={venue?.address}
        margin="normal"
        multiline
        rows={2}
      />
      <Button type="submit" variant="contained" color="primary">
        {venue ? 'Update' : 'Create'} Venue
      </Button>
    </Box>
  );
};

export default VenueForm;
