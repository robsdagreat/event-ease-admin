import React from 'react';
import { Box, Typography } from '@mui/material';
import { SpecialList } from '../components/specials/SpecialList';

export const Specials: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Specials Management
      </Typography>
      <SpecialList />
    </Box>
  );
};

export default Specials;