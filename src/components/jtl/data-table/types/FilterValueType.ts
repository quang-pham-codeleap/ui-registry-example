/**
 * Enum defining the supported column value types for filtering.
 * Used to determine which filter operators are available for each column.
 *
 * @example
 * - STRING: supports eq, neq, contains, startsWith, endsWith, in
 * - NUMBER/DATE: supports eq, neq, gt, gte, lt, lte, in
 * - BOOLEAN: supports eq, neq only
 */
export enum FilterValueType {
  /** String type - supports text-based operators */
  STRING = 'string',
  /** Number type - supports comparison operators */
  NUMBER = 'number',
  /** Boolean type - supports equality operators only */
  BOOLEAN = 'boolean',
  /** Date type - supports comparison operators */
  DATE = 'date',
}

export default FilterValueType;
