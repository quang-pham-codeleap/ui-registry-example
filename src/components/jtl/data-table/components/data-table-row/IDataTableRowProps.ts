import { Row } from '@tanstack/react-table';
import { CellEditHandler } from '../../types';

/**
 * Props for the DataTableRow component
 */
export default interface IDataTableRowProps<T extends object> {
  /**
   * Index of the row in the data array
   */
  dataIndex: number;

  /**
   * Function to measure element size for virtualization
   */
  measureElement: (element: HTMLElement | null) => void;

  /**
   * Starting position for virtualized row
   */
  rowStartPosition: number;

  /**
   * Row data from tanstack table
   */
  row: Row<T>;

  /**
   * Column sizing id from TanStack Table
   */
  columnSizingId: string | false;

  /**
   * Column sizing info from TanStack Table
   */
  columnSizingDeltaOffset: number | null;

  /**
   * Column size info from AutoResize
   */
  columnSize?: Record<string, number>;

  /**
   * Row selection state
   */
  isSelected: boolean;

  /**
   * Row height
   */
  rowHeight?: number;

  /**
   * Whether to show separator between columns
   */
  hasColumnSeparator?: boolean;

  /**
   * Row click handler
   */
  onRowClick?: (record: T) => void;

  /**
   * Cell edit handler (passed as prop to avoid context re-renders)
   */
  cellEdit?: CellEditHandler<T>;

  /**
   * Stable string key derived from visible column keys in order.
   * Passed through to areRowPropsEqual so rows re-render when columns are
   * added, removed, reordered, or swapped
   */
  columnKey: string;
}
