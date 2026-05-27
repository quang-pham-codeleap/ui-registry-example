import { useCallback, useEffect, useMemo } from 'react';
import { calculateColumnMaxWidth } from '../utils';
import { UseDataTableResizing } from '../types';

/**
 * Custom hook to manage column resizing logic for DataTable
 * Handles auto-resize functionality and column width calculations
 * @param props - Configuration and table state for resizing
 * @returns resizing utilities and callbacks
 */
export default function useDataTableResizing<T extends object>({
  setColumnSizing,
  columnResize,
  columnAction,
  columnSizingState,
  columnInitialSize,
  allLeafColumns,
  rows,
}: UseDataTableResizing<T>) {
  // Trigger column resize callback when column is resized
  useEffect(() => {
    columnResize?.onResize?.({ ...columnInitialSize, ...columnSizingState } as Record<keyof T, number>);
  }, [columnResize, columnSizingState, columnInitialSize]);

  /**
   * Calculate column max width based on column action
   * We only calculate it when column action is enabled due to calculateColumnMaxWidth is expensive
   * Otherwise, return column initial size
   */
  const columnMaxWidth = useMemo(
    () => (columnAction?.enabled ? calculateColumnMaxWidth(allLeafColumns, rows) : columnInitialSize),
    [allLeafColumns, rows, columnAction?.enabled, columnInitialSize],
  );

  /**
   * Auto resize all columns to their optimal width
   */
  const handleAutoResizeAll = useCallback(() => {
    setColumnSizing({ ...columnSizingState, ...columnMaxWidth });
  }, [setColumnSizing, columnSizingState, columnMaxWidth]);

  /**
   * Auto resize a specific column to its optimal width
   * @param columnKey - The key of the column to resize
   */
  const handleAutoResize = useCallback(
    (columnKey: keyof T) => {
      setColumnSizing({ ...columnSizingState, [columnKey]: columnMaxWidth[columnKey] });
    },
    [setColumnSizing, columnSizingState, columnMaxWidth],
  );

  return {
    // Column width calculations
    columnMaxWidth,
    // Resize callbacks
    handleAutoResize,
    handleAutoResizeAll,
  };
}
