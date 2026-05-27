import { DateFormatPart, DatePart } from '../types';

/**
 * Parses a date format string into structured parts with type info.
 *
 * Example:
 *  dateFormat: "dd / MM / yyyy"
 *  result:
 *    [
 *      { length: 2, separator: ' / ', type: 'd' },
 *      { length: 2, separator: ' / ', type: 'm' },
 *      { length: 4, separator: '', type: 'y' },
 *    ]
 */
export default function parseFormatParts(dateFormat: string): DateFormatPart[] {
  const formatParts: DateFormatPart[] = [];
  let currentPart = '';
  let currentSeparator = '';

  // Walk through the format string and group token characters + separators
  for (let i = 0; i < dateFormat.length; i++) {
    const char = dateFormat[i];

    // Date token characters (d, M, y, Y)
    if (/[dMyY]/.test(char)) {
      // If we previously collected separators, attach them to the
      // last part as its separator before starting a new token group
      if (currentSeparator && formatParts.length > 0) {
        formatParts[formatParts.length - 1].separator = currentSeparator;
        currentSeparator = '';
      }

      // Build up the current token group (e.g. "dd", "MM", "yyyy")
      currentPart += char;
    } else {
      // Non-token characters are treated as separators (spaces, '/', '-')
      if (currentPart) {
        // We just finished a token group; push a new DateFormatPart
        formatParts.push({
          length: currentPart.length,
          separator: '',
          // Use the first character of the token to determine type: d/m/y
          type: currentPart[0].toLowerCase() as DatePart,
        });
        currentPart = '';
      }

      // Accumulate separator characters until we hit the next token
      currentSeparator += char;
    }
  }

  // Handle a trailing token group at the end of the format string
  if (currentPart) {
    formatParts.push({
      length: currentPart.length,
      separator: '',
      type: currentPart[0].toLowerCase() as DatePart,
    });
  }

  return formatParts;
}
