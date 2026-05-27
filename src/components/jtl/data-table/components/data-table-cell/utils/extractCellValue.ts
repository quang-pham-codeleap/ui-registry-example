/**
 * Extracts the display value from a record for a given column.
 *
 * Handles null and undefined values gracefully by returning an empty string.
 * Converts any non-null value to its string representation.
 *
 * @template T - The type of the data record
 * @param record - The data record
 * @param columnId - The column identifier
 * @returns The string representation of the cell value
 *
 * @example
 * ```typescript
 * const value = extractCellValue({ name: 'John', age: 25 }, 'name');
 * // Returns: 'John'
 *
 * const nullValue = extractCellValue({ name: null }, 'name');
 * // Returns: ''
 * ```
 */
export default function extractCellValue<T>(record: T, columnId: keyof T): string {
  const value = record[columnId];

  if (value === undefined || value === null) {
    return '';
  }

  return String(value);
}
