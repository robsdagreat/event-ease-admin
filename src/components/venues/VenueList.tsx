import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { venueService } from '../../services/venues';
import AddIcon from '@mui/icons-material/Add';
import { Venue } from '../../types/venue';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'capacity', headerName: 'Capacity', width: 130 },
  { field: 'address', headerName: 'Address', width: 300 },
];

export const VenueList: React.FC = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });

  const { data: venues, isLoading } = useQuery<Venue[]>({
    queryKey: ['venues'],
    queryFn: venueService.getAll,
  });

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Venues</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* Handle add venue */}}
        >
          Add Venue
        </Button>
      </Box>
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={venues || []}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          loading={isLoading}
        />
      </Paper>
    </Box>
  );
};