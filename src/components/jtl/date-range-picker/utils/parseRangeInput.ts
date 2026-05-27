import { parseDate } from '@/utils';
import { RANGE_SEPARATOR } from '../constants';

/**
 * Parse from and to dates from a combined range input string.
 * E.g., "01/12/2025 - 08/12/2025" => { from: Date, to: Date }
 */
export default function parseRangeInput(inputValue: string, dateFormat: string): { parsedFromDate: Date | null; parsedToDate: Date | null } {
  if (!inputValue || inputValue === '') {
    return { parsedFromDate: null, parsedToDate: null };
  }

  const parts = inputValue.split(RANGE_SEPARATOR);
  const fromPart = parts[0]?.trim() || '';
  const toPart = parts[1]?.trim() || '';

  return {
    parsedFromDate: fromPart.length === dateFormat.length ? parseDate(fromPart, dateFormat) : null,
    parsedToDate: toPart.length === dateFormat.length ? parseDate(toPart, dateFormat) : null,
  };
}
