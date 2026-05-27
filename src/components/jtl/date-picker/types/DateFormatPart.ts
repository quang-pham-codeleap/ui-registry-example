import DatePart from './DatePart';

/**
 * Type for date format parts (day, month, year)
 * Example:
 *  dd / MM / yyyy ->
 *  [
 *    { length: 2, separator: ' / ', type: 'd' },
 *    { length: 2, separator: ' / ', type: 'm' },
 *    { length: 4, separator: '', type: 'y' },
 *  ]
 */
type DateFormatPart = { length: number; separator: string; type: DatePart };

export default DateFormatPart;
