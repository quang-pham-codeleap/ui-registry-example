/**
 * Represents table information extracted from the editor.
 */
type SelectedTableData = {
  /**
   * Whether the table has a header row.
   */
  hasHeaderRow?: boolean;

  /**
   * Whether the table has a header column.
   */
  hasHeaderColumn?: boolean;

  /**
   * Number of rows in the table.
   */
  rowCount?: number;

  /**
   * Number of columns in the table.
   */
  colCount?: number;
};

export default SelectedTableData;
