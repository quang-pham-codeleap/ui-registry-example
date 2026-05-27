import { DateFormatPart } from '../types';
import applyFormatFromParts from './applyFormatFromParts';

/**
 * Formats input string to match date format pattern as user types
 * Extracts numeric characters and progressively formats them
 * @example
 * formatInputAsTyping("11111111", "dd / MM / yyyy") -> "11 / 11 / 1111"
 * formatInputAsTyping("12", "dd / MM / yyyy") -> "12"
 * formatInputAsTyping("1234", "dd / MM / yyyy") -> "12 / 34"
 */
export default function formatInputAsTyping(value: string, formatParts: DateFormatPart[]): string {
  // Extract only numeric characters
  const numbers = value.replace(/\D/g, '');

  if (!numbers) return '';

  return applyFormatFromParts(numbers, formatParts);
}
