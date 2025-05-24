import React from 'react';
import { Box, Typography } from '@mui/material';
import { EventList } from '../components/events/EventList';

export const Events: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Events Management
      </Typography>
      <EventList />
    </Box>
  );
};

export default Events;