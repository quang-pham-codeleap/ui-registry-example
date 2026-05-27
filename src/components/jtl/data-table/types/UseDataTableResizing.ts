import { Column, Row } from '@tanstack/react-table';
import ColumnActionHandler from './ColumnActionHandler';
import ColumnResizeHandler from './ColumnResizeHandler';

/**
 * Type for useDataTableResizing hook
 */
type UseDataTableResizing<T extends object> = {
  // TanStack table methods
  setColumnSizing: (sizing: Record<string, number>) => void;
  // Column configuration
  columnResize?: ColumnResizeHandler<T>;
  columnAction?: ColumnActionHandler;
  // Table state
  columnSizingState: Record<string, number>;
  columnInitialSize: Record<keyof T, number>;
  // Table data
  allLeafColumns: Column<T, unknown>[];
  rows: Row<T>[];
};

export default UseDataTableResizing;
