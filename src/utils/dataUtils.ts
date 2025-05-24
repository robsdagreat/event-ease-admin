import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string, formatString: string = 'PPpp') => {
  try {
    return format(parseISO(dateString), formatString);
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatDateRange = (startDate: string, endDate: string) => {
  return `${formatDate(startDate, 'PP')} - ${formatDate(endDate, 'PP')}`;
};