/**
 * Represents the state flags for a cell.
 *
 * These flags determine the visual and behavioral state of a table cell.
 */
type CellStateFlag = {
  /** Whether the cell is in the last column position */
  isLastColumn: boolean;
  /** Whether the column can be resized */
  canResize: boolean;
  /** Whether the border should be visible */
  isBorderVisible: boolean | undefined;
  /** Whether the column is currently being resized */
  isResizing: boolean;
  /** Whether this is the selection checkbox column */
  isSelectionColumn: boolean;
  /** Whether this is the action buttons column */
  isActionColumn: boolean;
};

export default CellStateFlag;
