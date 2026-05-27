import { useMemo } from 'react';
import { ACTION_COLUMN_ID, SELECTION_COLUMN_ID } from '../../../constants/tableDefaults';
import { CellStateFlag } from '../types';

/**
 * Parameters for the useCellStateFlags hook.
 */
interface UseCellStateFlagsParams {
  /** The unique identifier for this column */
  columnId: string;
  /** The index of this column */
  colIndex: number;
  /** Total number of cells in the row */
  cellsLength: number;
  /** Whether to show separator between columns */
  hasColumnSeparator: boolean | undefined;
  /** The ID of the column currently being resized, or false if not resizing */
  columnSizingId: string | false;
  /** Function to check if the column can be resized */
  getCanResize: () => boolean;
}

/**
 * Hook to determine cell state flags.
 *
 * Centralizes all state flag calculations for better maintainability.
 * Follows Single Responsibility Principle by only handling state flag computation.
 *
 * @param params - Parameters for state calculation
 * @returns Object containing all cell state flags
 *
 * @example
 * ```tsx
 * const {
 *   isLastColumn,
 *   canResize,
 *   isBorderVisible,
 *   isResizing,
 *   isSelectionColumn,
 *   isActionColumn,
 * } = useCellStateFlags({
 *   columnId: 'name',
 *   colIndex: 1,
 *   cellsLength: 5,
 *   hasColumnSeparator: true,
 *   columnSizingId: false,
 *   getCanResize: () => true,
 * });
 * ```
 */
export default function useCellStateFlags(params: UseCellStateFlagsParams): CellStateFlag {
  const { columnId, colIndex, cellsLength, hasColumnSeparator, columnSizingId, getCanResize } = params;

  return useMemo(() => {
    // Determine column position
    const isLastColumn = colIndex === cellsLength - 1;

    // Determine resize capability
    const canResize = getCanResize() && !isLastColumn;

    // Determine special column types
    const isSelectionColumn = columnId === SELECTION_COLUMN_ID;
    const isActionColumn = columnId === ACTION_COLUMN_ID;

    return {
      isLastColumn,
      canResize,
      isBorderVisible: hasColumnSeparator && !canResize && !isLastColumn,
      isResizing: columnId === columnSizingId,
      isSelectionColumn,
      isActionColumn,
    };
  }, [columnId, colIndex, cellsLength, hasColumnSeparator, columnSizingId, getCanResize]);
}
