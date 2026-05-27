import { CommandItem } from '../../command/types';
import { FilterInputMode } from './FilterInputMode';
import { FilterValueType } from './FilterValueType';

/**
 * Date column variant — used when valueType is FilterValueType.DATE.
 * Only exposes columnKey and valueType; mode and options are not applicable
 * because date filtering uses a built-in DatePicker / DateRangePicker UI.
 */
type FilterableDateColumn<T> = {
  /** The key of the field in the data object */
  columnKey: keyof T;
  /**
   * Must be FilterValueType.DATE to use this variant.
   * Narrows the type so that mode and options are hidden from IDE suggestions.
   */
  valueType: FilterValueType.DATE;
};

/**
 * Non-date column variant — used for STRING, NUMBER, and BOOLEAN value types.
 * Exposes all filter configuration props including mode and options.
 */
type FilterableNonDateColumn<T> = {
  /** The key of the field in the data object */
  columnKey: keyof T;
  /**
   * The input mode for this field (optional, defaults to text)
   */
  mode?: FilterInputMode;
  /**
   * Command items for select/multi-select modes (optional)
   */
  options?: CommandItem[];
  /**
   * The data type of the column value.
   * Determines which filter operators are available:
   * - STRING: eq, neq, contains, startsWith, endsWith, in
   * - NUMBER: eq, neq, gt, gte, lt, lte, in
   * - BOOLEAN: eq, neq
   * Omit or use any value except FilterValueType.DATE to use this variant.
   * @default FilterValueType.STRING
   */
  valueType?: Exclude<FilterValueType, FilterValueType.DATE>;
};

/**
 * Discriminated union for filter field definition.
 * TypeScript automatically narrows to the correct variant based on valueType:
 * - valueType: FilterValueType.DATE → only columnKey and valueType are available
 * - any other valueType (or omitted) → columnKey, mode, options, and valueType are available
 *
 * @example Date column — mode and options are hidden by TypeScript:
 * ```ts
 * { columnKey: 'orderDate', valueType: FilterValueType.DATE }
 * ```
 *
 * @example Non-date column — full props available:
 * ```ts
 * { columnKey: 'name', mode: FilterInputMode.MULTI, options: [...], valueType: FilterValueType.STRING }
 * ```
 */
type FilterableColumn<T> = FilterableDateColumn<T> | FilterableNonDateColumn<T>;

export default FilterableColumn;
