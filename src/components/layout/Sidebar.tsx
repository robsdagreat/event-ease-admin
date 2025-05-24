import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  LocationOn as VenueIcon,
  LocalOffer as SpecialIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Events', icon: <EventIcon />, path: '/events' },
  { text: 'Venues', icon: <VenueIcon />, path: '/venues' },
  { text: 'Specials', icon: <SpecialIcon />, path: '/specials' },
];

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <List>
      {menuItems.map((item) => (
        <ListItemButton
          key={item.text}
          onClick={() => navigate(item.path)}
          selected={location.pathname === item.path}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default Sidebar;