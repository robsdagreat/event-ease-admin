import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Special } from '../../types/special';

interface SpecialFormProps {
  special?: Partial<Special>;
  onSubmit: (data: Partial<Special>) => void;
}

export const SpecialForm: React.FC<SpecialFormProps> = ({ special, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Title"
        defaultValue={special?.title}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        defaultValue={special?.description}
        margin="normal"
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" color="primary">
        {special ? 'Update' : 'Create'} Special
      </Button>
    </Box>
  );
};

export default SpecialForm;
