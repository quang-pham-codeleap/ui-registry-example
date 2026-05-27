import RowsSelectionMenuItem from './RowsSelectionMenuItem';

type RowsSelectionHandler<T> = {
  /**
   * If true, adds a checkbox column to enable row selection.
   * @type {boolean}
   */
  enabled: boolean;
  /**
   * An array of actions (e.g., "Delete", "Export") to display when rows are selected.
   * @type {RowsSelectionMenuItem<T>[]}
   */
  menuItems: RowsSelectionMenuItem<T>[];

  /**
   * Callback function triggered when row selection changes.
   * Called whenever users select or deselect rows using checkboxes.
   * @param selectedRecords - Array of currently selected row data objects
   */
  onSelect?: (selectedRecords: T[]) => void;
};

export default RowsSelectionHandler;
