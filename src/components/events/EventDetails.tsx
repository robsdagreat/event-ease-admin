import React from 'react';
import { Box, Typography } from '@mui/material';
import { Event } from '../../types/event';

interface EventDetailsProps {
  event: Event;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <Box>
      <Typography variant="h5">{event.title}</Typography>
      <Typography variant="body1">{event.description}</Typography>
    </Box>
  );
};

export default EventDetails;
