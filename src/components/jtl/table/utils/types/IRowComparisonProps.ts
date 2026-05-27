/**
 * Props interface for row comparison
 */
type IRowComparisonProps<T extends object> = {
  /**
   * Index of the row in the data array
   */
  dataIndex: number;
  /**
   * Starting position for virtualized row
   */
  rowStartPosition: number;
  /**
   * Column sizing id from TanStack Table
   */
  columnSizingId: string | false;
  /**
   * Column sizing info from TanStack Table
   */
  columnSizingDeltaOffset: number | null;
  /**
   * Row selection state
   */
  isSelected?: boolean;
  /**
   * Row height
   */
  rowHeight?: number;
  /**
   * Whether to show separator between columns
   */
  hasColumnSeparator?: boolean;
  /**
   * Row data from tanstack table
   */
  row: {
    id: string;
    original: T;
  };
  /**
   * Column size info from AutoResize
   */
  columnSize?: Record<string, number>;
  /**
   * Stable string key encoding visible column identity and order.
   * Used to bust memo when a column is added, removed, reordered, or swapped
   * via the column selector.
   */
  columnKey?: string;
};

export default IRowComparisonProps;
