import { ACTION_COLUMN_SIZE, COLUMN_MIN_SIZE, SELECTION_COLUMN_SIZE } from '../../../constants/tableDefaults';
import { WidthCalculationParam } from '../types';

/**
 * Calculates the cell width based on column type and resize state.
 *
 * Width calculation follows this priority:
 * 1. Selection column → Fixed SELECTION_COLUMN_SIZE
 * 2. Action column → Fixed ACTION_COLUMN_SIZE
 * 3. Resizing → Current size + delta offset
 * 4. Default → Column size or fallback, with minimum constraint
 *
 * @param params - Width calculation parameters
 * @returns The calculated width in pixels
 *
 * @example
 * ```typescript
 * const width = calculateCellWidth({
 *   isSelectionColumn: false,
 *   isActionColumn: false,
 *   isResizing: true,
 *   getSize: () => 100,
 *   columnSizingDeltaOffset: 20,
 *   columnSizeNumber: 150,
 * });
 * // Returns: 120 (100 + 20)
 * ```
 */
export default function calculateCellWidth(params: WidthCalculationParam): number {
  const { isSelectionColumn, isActionColumn, isResizing, getSize, columnSizingDeltaOffset, columnSizeNumber } = params;

  // Fixed width for selection column
  if (isSelectionColumn) {
    return SELECTION_COLUMN_SIZE;
  }

  // Fixed width for action column
  if (isActionColumn) {
    return ACTION_COLUMN_SIZE;
  }

  // Dynamic width during resize
  if (isResizing) {
    const resizeWidth = getSize() + (columnSizingDeltaOffset ?? 0);
    return Math.max(resizeWidth, COLUMN_MIN_SIZE);
  }

  // Default width with minimum constraint
  const baseWidth = getSize() || columnSizeNumber || 0;
  return Math.max(baseWidth, COLUMN_MIN_SIZE);
}
