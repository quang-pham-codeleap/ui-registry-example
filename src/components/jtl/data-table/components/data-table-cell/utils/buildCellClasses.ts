import { cn } from '@/lib/utils';
import { CellClassParam } from '../types';

/**
 * Builds the CSS class string for a cell.
 *
 * Combines base styles with conditional styles based on cell state.
 * Uses the `cn` utility for conditional class merging.
 *
 * @param params - Class building parameters
 * @returns The combined CSS class string
 *
 * @example
 * ```typescript
 * const classes = buildCellClasses({
 *   isBorderVisible: true,
 *   isSelectionColumn: false,
 *   isSelected: true,
 *   isActionColumn: false,
 * });
 * // Returns: 'flex items-center relative px-4 ... border-r ... bg-[var(--info-background)]'
 * ```
 */
export default function buildCellClasses(params: CellClassParam): string {
  const { isBorderVisible, isSelectionColumn, isSelected, isActionColumn } = params;

  return cn(
    // Base styles - always applied
    'flex items-center relative',
    'px-4',
    'py-0 text-[length:var(--typography-base-sizes-small-font-size)] text-[var(--foreground)]',

    // Conditional styles - applied based on cell state
    isBorderVisible && 'border-r border-[var(--border)]',
    isSelectionColumn && 'border-r-0 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
    isSelected && 'bg-[var(--info-background)]',
    isActionColumn && 'px-0 justify-center',
  );
}
