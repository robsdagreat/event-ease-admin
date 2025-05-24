import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { specialService } from '../../services/specials';
import AddIcon from '@mui/icons-material/Add';
import { Special } from '../../types/special';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'start_date', headerName: 'Start Date', width: 180 },
  { field: 'end_date', headerName: 'End Date', width: 180 },
];

export const SpecialList: React.FC = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });

  const { data: specials, isLoading } = useQuery<Special[]>({
    queryKey: ['specials'],
    queryFn: specialService.getAll,
  });

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Specials</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* Handle add special */}}
        >
          Add Special
        </Button>
      </Box>
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={specials || []}
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