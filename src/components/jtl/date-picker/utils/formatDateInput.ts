import { DateFormatPart, ParsedDateValuePart } from '../types';
import validateDayForMonth from './validateDayForMonth';

/**
 * Validates and normalizes a raw date string according to a date format.
 *
 * - Caps day values at 31 (and later at the actual max days in the month)
 * - Caps month values at 12
 * - Ensures the final combination is a valid calendar date
 *
 * Examples:
 *  - "35 / 15 / 2024" + "dd / MM / yyyy"
 *      day: 35  -> 31
 *      month: 15 -> 12
 *      result: "31 / 12 / 2024"
 *
 *  - "31 / 11 / 2025" + "dd / MM / yyyy"
 *      November has 30 days, so 31 -> 30
 *      result: "30 / 11 / 2025"
 *
 *  - "29 / 02 / 2025" + "dd / MM / yyyy"
 *      2025 is not a leap year, February has 28 days
 *      result: "28 / 02 / 2025"
 */
export default function formatDateInput(value: string, formatParts: DateFormatPart[]): string {
  // If there is no input, return it as is
  if (!value) return value;

  // Strip out all non-digit characters from the user input
  const numbers = value.replace(/\D/g, '');
  if (!numbers) return '';

  const parsedValues: ParsedDateValuePart[] = [];
  let numIndex = 0;

  // Extract and validate individual parts (day, month, year) from the digits
  for (const part of formatParts) {
    let partNumbers = numbers.slice(numIndex, numIndex + part.length);
    if (!partNumbers) break;

    // Basic validation: clamp day to 31 and month to 12 at the token level
    if (partNumbers.length === part.length) {
      const numValue = parseInt(partNumbers, 10);
      if (part.type === 'd' && numValue > 31) partNumbers = '31';
      if (part.type === 'm' && numValue > 12) partNumbers = '12';
    }

    // Store the raw (or clamped) part with its separator for later rebuilding
    parsedValues.push({ type: part.type, value: partNumbers, separator: part.separator });
    numIndex += partNumbers.length;

    // Stop if the current part is incomplete (user still typing)
    if (partNumbers.length < part.length) break;
  }

  // Validate the day against the specific month and year (e.g. 31/11 -> 30/11)
  validateDayForMonth(parsedValues);

  // Build the final string by joining each part and adding separators
  return parsedValues
    .map((part, i) => {
      const formatPart = formatParts[i];

      // Only add the separator if:
      // - this is not the last parsed part, and
      // - the current part is fully filled (we have all expected digits)
      const needsSeparator = i < parsedValues.length - 1 && part.value.length === formatPart.length;
      return part.value + (needsSeparator ? part.separator : '');
    })
    .join('');
}
