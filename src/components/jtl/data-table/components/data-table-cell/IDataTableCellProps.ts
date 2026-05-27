import { Cell } from '@tanstack/react-table';
import { ITableColumnProps } from '../../../table';
import { CellEditHandler } from '../../types';

/**
 * Props for the DataTableCell component
 */
export default interface IDataTableCellProps<T extends object> {
  /**
   * Whether to show separator between columns
   */
  hasColumnSeparator?: boolean;

  /**
   * Cell data from tanstack table
   */
  cell: Cell<T, unknown>;

  /**
   * Total number of cells in the row
   */
  cellsLength: number;

  /**
   * Whether the row is selected
   */
  isSelected?: boolean;

  /**
   * Column sizing info from TanStack Table
   */
  columnSizingId: string | false;

  /**
   * Column sizing info from TanStack Table
   */
  columnSizingDeltaOffset: number | null;

  /**
   * Row click handler
   */
  handleClickRow?: () => void;

  /**
   * Column size number from AutoResize
   */
  columnSizeNumber?: number;

  /**
   * The original data record for the row
   */
  record: T;

  /**
   * The index of the row in the data
   */
  rowIndex: number;

  /**
   * Cell edit handler (passed as prop to avoid context re-renders)
   */
  cellEdit?: CellEditHandler<T>;

  /**
   * Column definitions (passed as prop to avoid context re-renders)
   */
  columns?: ITableColumnProps<T>[];
}
