import { format } from 'date-fns';
import { RANGE_SEPARATOR } from '../constants';

/**
 * Format a range string from two dates.
 * Auto-swaps if startDate > endDate.
 */
export default function formatRangeString(startDate: Date, endDate: Date | null, dateFormat: string): string {
  if (!endDate) {
    return format(startDate, dateFormat);
  }

  // Auto-swap if start > end
  if (startDate > endDate) {
    return `${format(endDate, dateFormat)}${RANGE_SEPARATOR}${format(startDate, dateFormat)}`;
  }
  return `${format(startDate, dateFormat)}${RANGE_SEPARATOR}${format(endDate, dateFormat)}`;
}
