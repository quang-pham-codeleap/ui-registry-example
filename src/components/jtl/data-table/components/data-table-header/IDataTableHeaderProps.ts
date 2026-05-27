import { ITableColumnProps } from '../../../table';
import { HeaderGroup } from '@tanstack/react-table';

/**
 * Props for the DataTableHeader component
 */
export default interface IDataTableHeaderProps<T extends object> {
  /**
   * Header groups from TanStack Table
   */
  headerGroups: HeaderGroup<T>[];

  /**
   * Original column definitions
   */
  selectedColumns: ITableColumnProps<T>[];

  /**
   * Whether to show column separators
   */
  hasColumnSeparator?: boolean;

  /**
   * Column sizing ID from TanStack Table
   */
  columnSizingId: string | false;

  /**
   * Column sizing delta offset from TanStack Table
   */
  columnSizingDeltaOffset: number | null;
}
