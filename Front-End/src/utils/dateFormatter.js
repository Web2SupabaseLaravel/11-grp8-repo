import moment from 'moment';

/**
 * Format a date string into a user-friendly format
 * @param {string} dateString - ISO date string to format
 * @param {boolean} includeTime - Whether to include the time in the formatted string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, includeTime = true) => {
  if (!dateString) return 'N/A';
  
  const date = moment(dateString);
  
  if (!date.isValid()) {
    return 'Invalid date';
  }
  
  // If date is today
  if (date.isSame(moment(), 'day')) {
    return includeTime ? `Today at ${date.format('h:mm A')}` : 'Today';
  }
  
  // If date is yesterday
  if (date.isSame(moment().subtract(1, 'day'), 'day')) {
    return includeTime ? `Yesterday at ${date.format('h:mm A')}` : 'Yesterday';
  }
  
  // If date is within the last week
  if (date.isAfter(moment().subtract(7, 'days'))) {
    return includeTime ? `${date.format('dddd')} at ${date.format('h:mm A')}` : date.format('dddd');
  }
  
  // Otherwise, show the full date
  return includeTime
    ? date.format('MMM D, YYYY [at] h:mm A')
    : date.format('MMM D, YYYY');
};

/**
 * Get a relative time string (e.g. "2 hours ago")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time string
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = moment(dateString);
  
  if (!date.isValid()) {
    return 'Invalid date';
  }
  
  return date.fromNow();
}; 