import { formatDateInput } from '../../date-picker';
import { parseDate } from '@/utils';
import { DateFormatPart } from '../../date-picker/types';
import { RANGE_SEPARATOR } from '../constants';

/**
 * Validate and auto-swap dates if from > to.
 * Returns the formatted input string with validated/swapped dates.
 */
export default function validateAndSwapDates(inputValue: string, dateFormat: string, formatPart: DateFormatPart[]): string {
  if (!inputValue) {
    return '';
  }

  const parts = inputValue.split(RANGE_SEPARATOR);
  const fromPart = parts[0]?.trim() || '';
  const toPart = parts[1]?.trim() || '';

  // Validate and fix both date parts
  const validatedFrom = fromPart ? formatDateInput(fromPart, formatPart) : '';
  const validatedTo = toPart ? formatDateInput(toPart, formatPart) : '';

  // Parse validated dates
  const parsedFrom = validatedFrom.length === dateFormat.length ? parseDate(validatedFrom, dateFormat) : null;
  const parsedTo = validatedTo.length === dateFormat.length ? parseDate(validatedTo, dateFormat) : null;

  // Auto-swap if from > to
  if (parsedFrom && parsedTo && parsedFrom > parsedTo) {
    return `${validatedTo}${RANGE_SEPARATOR}${validatedFrom}`;
  }
  if (validatedFrom && validatedTo) {
    return `${validatedFrom}${RANGE_SEPARATOR}${validatedTo}`;
  }
  if (validatedFrom) {
    return validatedFrom;
  }
  return '';
}
