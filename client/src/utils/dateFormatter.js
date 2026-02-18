import { format, parseISO } from 'date-fns';


export const formatDate = (date, formatStr = 'dd-MM-yyyy, HH:mm') => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};


export const formatSimpleDate = (date) => {
  return formatDate(date, 'dd-MM-yyyy');
};


export const formatDateForInput = (date) => {
  return formatDate(date, 'yyyy-MM-dd');
};
