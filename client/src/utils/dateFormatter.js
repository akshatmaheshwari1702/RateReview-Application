import { format, parseISO } from 'date-fns';

/**
 * Format date to display format
 * @param {string | Date} date - Date to format
 * @param {string} formatStr - Format string (default: 'dd-MM-yyyy, HH:mm')
 * @returns {string} Formatted date string
 */
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

/**
 * Format date for display (simple format)
 * @param {string | Date} date - Date to format
 * @returns {string} Formatted date string (DD-MM-YYYY)
 */
export const formatSimpleDate = (date) => {
  return formatDate(date, 'dd-MM-yyyy');
};

/**
 * Format date for input fields
 * @param {string | Date} date - Date to format
 * @returns {string} Formatted date string (YYYY-MM-DD)
 */
export const formatDateForInput = (date) => {
  return formatDate(date, 'yyyy-MM-dd');
};
