/**
 * Parameters for building cell CSS classes.
 *
 * Used by the buildCellClasses function to determine
 * which CSS classes should be applied to a table cell.
 */
type CellClassParam = {
  /** Whether the border should be visible */
  isBorderVisible: boolean | undefined;
  /** Whether this is the selection checkbox column */
  isSelectionColumn: boolean;
  /** Whether the row is currently selected */
  isSelected: boolean | undefined;
  /** Whether this is the action buttons column */
  isActionColumn: boolean;
};

export default CellClassParam;
