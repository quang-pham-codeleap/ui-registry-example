/**
 * Apply formatting to the numeric input using the prepared format parts
 * @param numbers The numeric input string
 * @param formatParts The format parts prepared by parseFormat
 * @returns The formatted string
 *
 * @example
 * ```tsx
 * const formatted = applyFormatFromParts("12345678", [{ length: 2, separator: ' / ' }, { length: 2, separator: ' / ' }, { length: 4, separator: '' }]);
 * console.log(formatted); // "12 / 34 / 5678"
 * ```
 */
export default function applyFormatFromParts(numbers: string, formatParts: { length: number; separator: string }[]): string {
  let result = '';
  let numIndex = 0;

  // Iterate over each format part (e.g. day, month, year)
  for (let i = 0; i < formatParts.length; i++) {
    const part = formatParts[i];

    // Take as many digits as this part expects (up to part.length)
    const partNumbers = numbers.slice(numIndex, numIndex + part.length);

    // If there are no more digits, stop formatting
    if (!partNumbers) break;

    // Append the digits for this part
    result += partNumbers;
    numIndex += partNumbers.length;

    // Add separator if:
    // - this part is fully filled (user typed enough digits), and
    // - there are still more digits to format, and
    // - this part has a non-empty separator
    if (partNumbers.length === part.length && numIndex < numbers.length && part.separator) {
      result += part.separator;
    }

    // If the user has not finished typing this part yet (partial input),
    // stop here so we do not show the next separator prematurely.
    if (partNumbers.length < part.length) break;
  }

  return result;
}
