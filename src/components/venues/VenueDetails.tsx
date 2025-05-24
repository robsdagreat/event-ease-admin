import React from 'react';
import { Box, Typography } from '@mui/material';
import { Venue } from '../../types/venue';

interface VenueDetailsProps {
  venue: Venue;
}

export const VenueDetails: React.FC<VenueDetailsProps> = ({ venue }) => {
  return (
    <Box>
      <Typography variant="h5">{venue.name}</Typography>
      <Typography variant="body1">{venue.address}</Typography>
    </Box>
  );
};

export default VenueDetails;
