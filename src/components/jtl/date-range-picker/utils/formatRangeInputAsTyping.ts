import { DateFormatPart } from '../../date-picker/types';
import { applyFormatFromParts } from '../../date-picker/utils';

/**
 * Formats input string to match date range format pattern as user types
 * Extracts numeric characters and progressively formats them as "from - to"
 * @example
 * formatRangeInputAsTyping("0112202508122025", "dd / MM / yyyy") -> "01 / 12 / 2025 - 08 / 12 / 2025"
 * formatRangeInputAsTyping("01122025", "dd / MM / yyyy") -> "01 / 12 / 2025"
 * formatRangeInputAsTyping("011220250812", "dd / MM / yyyy") -> "01 / 12 / 2025 - 08 / 12"
 */
export default function formatRangeInputAsTyping(value: string, formatParts: DateFormatPart[]): string {
  // Extract only numeric characters
  const numbers = value.replace(/\D/g, '');

  if (!numbers) return '';

  // Calculate total digits for one date
  const dateDigits = formatParts.reduce((sum, part) => sum + part.length, 0);

  // Range separator
  const rangeSeparator = ' - ';

  // First date always uses the first `dateDigits` characters (or fewer if still typing)
  const firstDateNumbers = numbers.slice(0, dateDigits);
  const firstFormatted = applyFormatFromParts(firstDateNumbers, formatParts);

  // If user has not finished typing the first date yet, just return its progressive format
  if (firstDateNumbers.length < dateDigits || numbers.length <= dateDigits) {
    return firstFormatted;
  }

  // Remaining digits belong to the second date
  const secondDateNumbers = numbers.slice(dateDigits);
  const secondFormatted = applyFormatFromParts(secondDateNumbers, formatParts);

  // If there is nothing meaningful for the second date yet, return only the first
  if (!secondFormatted) {
    return firstFormatted;
  }

  // Combine formatted from/to parts with range separator
  return `${firstFormatted}${rangeSeparator}${secondFormatted}`;
}
