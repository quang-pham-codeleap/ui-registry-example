import { ITableColumnProps } from '../../../table';
import { Header } from '@tanstack/react-table';

/**
 * DataTableHeadCellProps interface for the DataTableHeadCell component
 */
export default interface IDataTableHeadCellProps<T extends object> {
  /**
   * The header from TanStack Table
   */
  header: Header<T, unknown>;

  /**
   * Selected column definitions
   */
  selectedColumns: ITableColumnProps<T>[];

  /**
   * ID of column being resized
   */
  columnSizingId: string | false;

  /**
   * Delta offset during resize
   */
  columnSizingDeltaOffset: number | null;

  /**
   * Whether to show column separator
   */
  hasColumnSeparator: boolean | undefined;

  /**
   * Header click callback
   */
  onHeaderClick: ((headerTitle: string, column: ITableColumnProps<T>) => void) | undefined;

  /**
   * Total number of cells in the header row
   */
  cellsLength: number;
}
