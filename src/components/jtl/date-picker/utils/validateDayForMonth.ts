import { getDaysInMonth } from '@/utils';
import { ParsedDateValuePart } from '../types';

/**
 * Validates day for the specific month/year.
 * Adjusts the day value in-place if it exceeds the max days in that month.
 *
 * Example:
 *  parsedValues:
 *    [
 *      { type: 'd', value: '31', separator: ' / ' },
 *      { type: 'm', value: '02', separator: ' / ' },
 *      { type: 'y', value: '2025', separator: '' },
 *    ]
 *  February 2025 has 28 days, so the function updates day to '28':
 *    { type: 'd', value: '28', separator: ' / ' }
 */
export default function validateDayForMonth(parsedValues: ParsedDateValuePart[]): void {
  // Find the parsed parts for day, month and year
  const dayPart = parsedValues.find(p => p.type === 'd');
  const monthPart = parsedValues.find(p => p.type === 'm');
  const yearPart = parsedValues.find(p => p.type === 'y');

  // Only validate if we have complete day and month values (both 2 digits)
  if (!dayPart || !monthPart || dayPart.value.length !== 2 || monthPart.value.length !== 2) {
    return;
  }

  const day = parseInt(dayPart.value, 10);
  const month = parseInt(monthPart.value, 10);

  // Use current year if the year part is missing or not complete yet
  const year = yearPart?.value.length === 4 ? parseInt(yearPart.value, 10) : new Date().getFullYear();

  // Cap the day at the max days for the given month/year
  const maxDays = getDaysInMonth(month, year);
  if (day > maxDays) {
    // Mutate the day part so other code sees the corrected value
    dayPart.value = maxDays.toString().padStart(2, '0');
  }
}
