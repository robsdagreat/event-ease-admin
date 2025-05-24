import React from 'react';
import { Box, Typography } from '@mui/material';
import { Special } from '../../types/special';

interface SpecialDetailsProps {
  special: Special;
}

export const SpecialDetails: React.FC<SpecialDetailsProps> = ({ special }) => {
  return (
    <Box>
      <Typography variant="h5">{special.title}</Typography>
      <Typography variant="body1">{special.description}</Typography>
    </Box>
  );
};

export default SpecialDetails;
