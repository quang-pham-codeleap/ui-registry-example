import FilterableColumn from '../../types/FilterableColumn';

/**
 * Props for the DataTableMoreFilter component.
 * This component provides a popover for selecting which filter columns to display.
 * @template T - The type of the data object
 */
export default interface IDataTableMoreFilterProps<T> {
  /**
   * All available filterable columns defined by the user via filter.filterableColumns.
   * These are the columns that users can choose to activate as filters.
   */
  filterableColumns: FilterableColumn<T>[];

  /**
   * The currently selected filterable column keys.
   * These columns have their filter inputs displayed in the table toolbar.
   */
  selectedKeys: (keyof T)[];

  /**
   * Callback function invoked when the user changes the column selection.
   * @param keys - The new array of selected column keys
   */
  onSelectionChange: (keys: (keyof T)[]) => void;
}
