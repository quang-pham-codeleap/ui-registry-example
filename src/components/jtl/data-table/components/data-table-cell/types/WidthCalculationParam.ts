/**
 * Parameters for calculating cell width.
 *
 * Used by the calculateCellWidth function to determine
 * the appropriate width for a table cell based on various factors.
 */
type WidthCalculationParam = {
  /** Whether this is the selection checkbox column */
  isSelectionColumn: boolean;
  /** Whether this is the action buttons column */
  isActionColumn: boolean;
  /** Whether the column is currently being resized */
  isResizing: boolean;
  /** Function to get the current column size */
  getSize: () => number;
  /** The delta offset during resize operation */
  columnSizingDeltaOffset: number | null | undefined;
  /** The column size number from auto-resize calculation */
  columnSizeNumber: number | undefined;
};

export default WidthCalculationParam;
