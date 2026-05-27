import DatePart from './DatePart';

/**
 * Type for date format parts (day, month, year)
 * Example:
 *  20 / 11 / 2025 ->
 *  [
 *    { type: 'd', value: '20', separator: ' / ' },
 *    { type: 'm', value: '11', separator: ' / ' },
 *    { type: 'y', value: '2025', separator: '' },
 *  ]
 */
type ParsedDateValuePart = { type: DatePart; value: string; separator: string };

export default ParsedDateValuePart;
