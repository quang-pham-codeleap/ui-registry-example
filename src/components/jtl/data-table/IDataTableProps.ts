import React from 'react';
import { ITableColumnProps } from '../table/interfaces';
import {
  CellEditHandler,
  ColumnActionHandler,
  ColumnResizeHandler,
  ColumnSelectorHandler,
  DatePickerHandler,
  DraggableHandler,
  FilterHandler,
  GlobalSearchHandler,
  RowActionHandler,
  RowsSelectionHandler,
  TableSize,
} from './types';
import { HeaderStyle, TableToolbarConfig } from '../table/types';

/**
 * Props for the DataTable component
 */
export default interface IDataTableProps<T extends object, M extends 'single' | 'range' = 'range'> {
  // =========================================================================
  // Core Data
  // =========================================================================

  /**
   * Data to display in the table
   */
  dataSource: T[];

  /**
   * Column definitions for the table
   */
  columns: ITableColumnProps<T>[];

  /**
   * Key of the row object to be used as the unique identifier for each row
   */
  rowKey?: keyof T;

  // =========================================================================
  // Display & Styling
  // =========================================================================

  /**
   * Toolbar configuration using the standardized AppHeader component.
   * Top actions (search, filter, date picker, column selector) are auto-composed.
   * Why "toolbar"? Avoids confusion with the table's <thead> (column headers).
   */
  toolbar?: TableToolbarConfig;

  /**
   * @deprecated Use `toolbar.title` instead.
   * Legacy alias for the AppHeader title rendered above the table when `toolbar` is not provided.
   */
  title?: string;

  /**
   * @deprecated Use `toolbar.subtitle` instead.
   * Legacy alias for the AppHeader description rendered above the table when `toolbar` is not provided.
   */
  description?: string;

  /**
   * Sets the density and spacing of the table
   * @type {TableSize}
   */
  size?: TableSize;

  /**
   * Controls the height of the table body.
   * - `number`: A fixed pixel height, enabling vertical scrolling.
   * - `'auto'`: The table expands to fill the available vertical space
   *   of its parent container. The parent must provide a bounded height
   *   constraint — explicit `height`, `max-height`, or a flex/grid layout
   *   with a constrained ancestor. Falls back to 70% viewport height with
   *   a dev warning when no bounded ancestor is found.
   */
  tableHeight?: number | 'auto';

  /**
   * If true, displays a vertical separator line between columns.
   */
  hasColumnSeparator?: boolean;

  /**
   * Style for the table header
   */
  headerStyle?: HeaderStyle;

  // =========================================================================
  // State Management
  // =========================================================================

  /**
   * If true, the table will display a loading indicator.
   */
  isLoading?: boolean;

  /**
   * Custom content to display when the `dataSource` is empty.
   */
  emptyContent?: React.ReactNode;

  /**
   * Optional Handler to enable the Draggable Feature.
   * When enabled, users can drag and drop columns to reorder them.
   *
   * @param enabled Whether drag and drop is enabled
   * @param value Current column order (controlled)
   * @param onChange Event that fires when the column order changes
   */
  draggable?: DraggableHandler;

  // =========================================================================
  // Feature: Global Search
  // =========================================================================

  /**
   * Props for the global search feature
   * @param enabled If true, enables the global search feature
   * @param placeholder Placeholder text for the search input
   * @param onChange Callback fired when the search text changes
   * @param value Optional controlled value for the search input
   * @param isSearching Status of searching (loading state)
   * @param searchIcon Custom search icon
   */
  globalSearch?: GlobalSearchHandler;

  // =========================================================================
  // Feature: Column Selector
  // =========================================================================

  /**
   * Optional Handler to enable the Column Selector Feature.
   * When enabled, a button is displayed on the left and above the table which allows the users to select which columns are visible.
   *
   * @param enabled Whether column selection is enabled
   * @param value Selected columns (controlled)
   * @param onChange Event that fires when the selected columns change
   */
  columnSelector?: ColumnSelectorHandler<T>;

  // =========================================================================
  // Feature: Column Action
  // =========================================================================

  /**
   * Optional Handler to enable the Column Action Feature.
   * This feature adds a dropdown menu to each column header with actions like sort, hide, resize, etc.
   * For more information about each action, refer to the `ColumnActionHandler` type.
   *
   * @param enabled If true, shows a dropdown menu on each column header with actions like sort, hide, etc
   * @param onClick Callback when an action is triggered from a column header's dropdown menu
   * When the resize action is triggered, the callback is called with the action type and the column key
   * Beside that, onResize callback in columnResize prop is called as well
   */
  columnAction?: ColumnActionHandler;

  // =========================================================================
  // Feature: Rows Selection
  // =========================================================================

  /**
   * Optional handler to enable the Rows Selection Feature.
   * The feature is the set of menu items that is enabled when one or more rows are selected.
   * This set of menu items is displayed as Floating Pills on top of the DataTable.
   * When enabled, the first Column is replaced with Checkbox.
   *
   * @param enabled If true, adds a checkbox column to enable row selection.
   * @param menuItems An array of menu items (e.g., "Delete", "Export") to display when rows are selected.
   * @param onSelect Callback function to be called when row selection changes
   */
  rowsSelection?: RowsSelectionHandler<T>;

  // =========================================================================
  // Feature: Row Action
  // =========================================================================

  /**
   * Optional Handler to enable the Row Action Feature.
   * The feature is the set of actions that can be performed on individual rows.
   * When enabled, each row will have a dropdown menu at the end of each row with actions defined in the Handler
   *
   * @param enabled If true, shows a dropdown menu on each row with actions like delete, export, etc
   * @param menuItems An array of dropdown menu items to display when row action is triggered.
   */
  rowAction?: RowActionHandler<T>;

  // =========================================================================
  // Feature: Column Resize
  // =========================================================================

  /**
   * Optional Handler to enable the Column Resize Feature
   * @param enabled If true, enables the column resize feature
   * @param onResize Callback triggered when the column size changes. Otherwise, when AutoResize and AutoResize All actions in columnAction are triggered, this callback is called as well
   */
  columnResize?: ColumnResizeHandler<T>;

  // =========================================================================
  // Feature: Filter Input
  // =========================================================================

  /**
   * Optional Handler to enable the Filter Input Feature.
   * When enabled, the filter input field will be displayed on the table top action bar
   * @param enabled If true, shows a filter input field on the table top action bar
   * @param condition The current filter conditions applied to the table
   * @param onChange Callback fired when the filter conditions are changed by the user
   * @param filterableColumns An array of columns that are filterable and their configuration
   * @param presets The presets of the filter input
   * @param onSavePreset Callback fired when the user saves a preset
   *
   * @example
   * ```tsx
   * const filter: FilterHandler<T> = {
   *   enabled: true,
   *   condition: [
   *    {
   *      columnKey: 'columnKey',
   *      value: ['option1'],
   *      operator: 'eq',
   *    },
   *   ],
   *   onChange: (value) => {},
   *   filterableColumns: [
   *    {
   *      columnKey: 'columnKey',
   *      options: ['option1', 'option2'],
   *    }
   *   ],
   * };
   * ```
   */
  filter?: FilterHandler<T>;

  // =========================================================================
  // Feature: Date Picker
  // =========================================================================
  /**
   * Optional Handler to enable the Date Picker Feature.
   * When enabled, the date picker will be displayed on the table top action bar
   * @param enabled If true, shows a date picker on the table top action bar
   * @param onChange Callback fired when the date picker value changes
   */
  datePicker?: DatePickerHandler<M>;

  // =========================================================================
  // Advanced Optional Callbacks
  // =========================================================================

  /**
   * Callback function to be called when a row is clicked
   */
  onRowClick?: (record: T) => void;

  /**
   * Callback function to be called when a header is clicked
   * @param headerTitle - The title of the clicked header
   * @param column - The full column object
   */
  onHeaderClick?: (headerTitle: string, column: ITableColumnProps<T>) => void;

  /**
   * Callback function to be called when user scrolls to the end of the table
   * Useful for implementing infinite scroll or "load more" functionality
   */
  onScrollEnd?: () => void;

  // =========================================================================
  // Feature: Cell Edit
  // =========================================================================

  /**
   * Optional Handler to enable the Cell Edit Feature.
   * When provided, hovering over editable cells shows an edit icon. Clicking the icon allows inline editing.
   * The value is saved when clicking outside or pressing Enter.
   *
   * Cell editability is controlled at the column level via the `editable` property in column definitions.
   *
   * @param onSave Callback when a cell value is saved
   *
   * @example
   * ```tsx
   * // Define columns with editable property
   * const columns = [
   *   { dataIndex: 'name', title: 'Name', key: 'name', editable: true },
   *   { dataIndex: 'status', title: 'Status', key: 'status', editable: (record) => record.status !== 'locked' },
   * ];
   *
   * const cellEdit: CellEditHandler<T> = {
   *   onSave: (columnKey, record, newValue, rowIndex) => {
   *     console.log(`Saving ${columnKey}: ${newValue}`);
   *   },
   * };
   * ```
   */
  cellEdit?: CellEditHandler<T>;
}
