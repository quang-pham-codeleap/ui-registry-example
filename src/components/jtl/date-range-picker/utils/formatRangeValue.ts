import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { RANGE_SEPARATOR } from '../constants';

/**
 * Format a DateRange value to a combined input string.
 * E.g., { from: Date, to: Date } => "01/12/2025 - 08/12/2025"
 */
export default function formatRangeValue(value: DateRange | undefined, dateFormat: string): string {
  if (value?.from && value?.to) {
    return `${format(value.from, dateFormat)}${RANGE_SEPARATOR}${format(value.to, dateFormat)}`;
  }
  if (value?.from) {
    return format(value.from, dateFormat);
  }
  return '';
}
