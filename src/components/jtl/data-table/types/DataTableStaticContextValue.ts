import React from 'react';
import { ITableColumnProps } from '../../table';
import { ColumnActionHandler, DraggableHandler, RowsSelectionHandler, SortingState, TableSize, CellEditHandler } from './index';
import { TableStyle } from '../../table/types';

/**
 * Data Table Static Context Value interface
 * Contains shared state and callbacks to eliminate props drilling
 */
type DataTableStaticContextValue<T extends object> = {
  // Configuration props
  hasColumnSeparator?: boolean;
  size?: TableSize;
  tableHeight?: number | 'auto';
  /** Computed pixel height for auto-height mode (from ResizeObserver) */
  autoHeight?: number;
  rowHeight?: number;
  rowKey?: keyof T;
  styles?: TableStyle;

  // Row actions
  rowsSelection?: RowsSelectionHandler<T>;

  // Original columns for reference
  columns: ITableColumnProps<T>[];

  // Column actions dropdown
  columnAction?: ColumnActionHandler;

  // Sorting
  sorting?: SortingState;
  setSorting?: (sorting: SortingState | undefined) => void;

  // Auto Resize
  handleAutoResize?: (columnKey: keyof T) => void;
  handleAutoResizeAll?: () => void;

  // Column order
  columnOrder: string[];
  setColumnOrder?: React.Dispatch<React.SetStateAction<string[]>>;

  // Column draggable
  draggable?: DraggableHandler;

  // Cell edit handler
  cellEdit?: CellEditHandler<T>;

  // Callbacks
  onRowClick?: (record: T) => void;
  onHeaderClick?: (headerTitle: string, column: ITableColumnProps<T>) => void;
};

export default DataTableStaticContextValue;
