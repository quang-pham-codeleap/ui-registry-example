import { RowsSelectionMenuItem } from '../../types';
import { ITableColumnProps } from '../../../table';
import { Row } from '@tanstack/react-table';
import React from 'react';

/**
 * Props for the DataTableBody component
 */
export default interface IDataTableBodyProps<T extends object> {
  /**
   * Rows from TanStack Table
   */
  rows: Row<T>[];

  /**
   * Whether to show column separators
   */
  hasColumnSeparator?: boolean;

  /**
   * Callback function to be called when a row is clicked
   */
  onRowClick?: (record: T) => void;

  /**
   * Row action menu
   */
  rowActions?: RowsSelectionMenuItem<T>[];

  /**
   * Ref for the table container
   */
  tableContainerRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Column sizing id from TanStack Table
   */
  columnSizingId: string | false;

  /**
   * Column sizing info from TanStack Table
   */
  columnSizingDeltaOffset: number | null;

  /**
   * Column sizing info from AutoResize
   */
  columnSize?: Record<string, number>;

  /**
   * Selected columns
   */
  selectedColumns?: ITableColumnProps<T>[];
}
