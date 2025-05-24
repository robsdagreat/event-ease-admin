export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  EVENTS: '/events',
  VENUES: '/venues',
  SPECIALS: '/specials',
} as const;

export const STATUS_COLORS = {
  active: '#2e7d32',
  inactive: '#ed6c02',
  pending: '#1976d2',
} as const;
