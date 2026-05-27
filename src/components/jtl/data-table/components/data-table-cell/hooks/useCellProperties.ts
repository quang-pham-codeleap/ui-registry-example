import { useMemo } from 'react';
import { Cell } from '@tanstack/react-table';

/**
 * Hook to extract and memoize cell properties from TanStack Table cell object.
 *
 * Follows Single Responsibility Principle by only handling cell property extraction.
 * Memoizes the extraction to prevent unnecessary recalculations on re-renders.
 *
 * @template T - The type of the data record
 * @param cell - The TanStack Table cell object
 * @returns Memoized cell properties including columnId, getters, and render function
 *
 * @example
 * ```tsx
 * const {
 *   columnId,
 *   getIndex,
 *   getCanResize,
 *   getSize,
 *   cellRender,
 *   getContext,
 * } = useCellProperties(cell);
 * ```
 */
export default function useCellProperties<T>(cell: Cell<T, unknown>) {
  return useMemo(() => {
    const {
      column: { id: columnId, getIndex, getCanResize, getSize, columnDef },
      getContext,
    } = cell;

    return {
      /** The unique identifier for this column */
      columnId,
      /** Function to get the column index */
      getIndex,
      /** Function to check if the column can be resized */
      getCanResize,
      /** Function to get the current column size */
      getSize,
      /** The cell render function from column definition */
      cellRender: columnDef.cell,
      /** Function to get the cell context for rendering */
      getContext,
    };
  }, [cell]);
}
