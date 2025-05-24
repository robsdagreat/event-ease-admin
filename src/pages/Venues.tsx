import React from 'react';
import { Box, Typography } from '@mui/material';
import { VenueList } from '../components/venues/VenueList';

export const Venues: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Venues Management
      </Typography>
      <VenueList />
    </Box>
  );
};

export default Venues;