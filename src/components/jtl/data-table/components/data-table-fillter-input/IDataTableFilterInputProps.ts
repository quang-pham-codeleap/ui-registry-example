import { FilterConditionOperator } from '../../deprecated/advanced-filter/types';
import { CommandItem } from '../../../command/types';
import { FilterState, FilterInputMode, FilterValueType } from '../../types';

/**
 * Props for the DataTableFilterInput component
 * @template T - The type of the data object
 */
export default interface IDataTableFilterInputProps<T> {
  /**
   * The key of the column to filter
   */
  columnKey: keyof T;
  /**
   * The options to display in the filter dropdown
   */
  options: CommandItem[];
  /**
   * The current filter operator
   */
  operator?: FilterConditionOperator;
  /**
   * The input mode for this field (optional, defaults to multi)
   * @default multi
   */
  mode: FilterInputMode;
  /**
   * The current filter value
   * @example
   * ```tsx
   * value?: T[keyof T][];
   * ```
   */
  value?: T[keyof T][];
  /**
   * The function to call when the filter value changes
   */
  onChange: (value: FilterState<T>) => void;
  /**
   * The data type of the column value.
   * Determines which filter operators are available.
   * @default FilterValueType.STRING
   */
  valueType?: FilterValueType;
  /**
   * When true, the filter popover is opened automatically on mount.
   * Used when a filter is freshly added via "Weitere Filter" so the user can
   * interact with it immediately without a second click.
   */
  autoOpen?: boolean;
  /**
   * Called once after the auto-open has been applied, so the parent can clear
   * the flag and avoid re-triggering on subsequent renders.
   */
  onAutoOpenComplete?: () => void;
}
