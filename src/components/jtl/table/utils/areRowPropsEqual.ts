import IRowComparisonProps from './types/IRowComparisonProps';

/**
 * Custom comparison function for memo to prevent unnecessary row re-renders
 * Compares row props to determine if a re-render is needed
 *
 * @param prevProps - Previous row props
 * @param nextProps - Next row props
 * @returns true if props are equal (skip re-render), false otherwise
 */
export default function areRowPropsEqual<T extends object>(prevProps: IRowComparisonProps<T>, nextProps: IRowComparisonProps<T>): boolean {
  // Compare primitive props first (fast checks)
  if (
    prevProps.dataIndex !== nextProps.dataIndex ||
    prevProps.rowStartPosition !== nextProps.rowStartPosition ||
    prevProps.columnSizingId !== nextProps.columnSizingId ||
    prevProps.columnSizingDeltaOffset !== nextProps.columnSizingDeltaOffset ||
    prevProps.isSelected !== nextProps.isSelected ||
    prevProps.rowHeight !== nextProps.rowHeight ||
    prevProps.hasColumnSeparator !== nextProps.hasColumnSeparator
  ) {
    return false;
  }

  // Skip comparing callback/object props that come from context
  // (onRowClick, cellEdit, columns) - these should be stable references from parent

  // Compare row identity
  if (prevProps.row.id !== nextProps.row.id) {
    return false;
  }

  // Compare row data by checking if original data changed
  const prevOriginal = prevProps.row.original;
  const nextOriginal = nextProps.row.original;
  if (prevOriginal !== nextOriginal) {
    // Shallow compare each property value
    const prevKeys = Object.keys(prevOriginal) as (keyof T)[];
    const nextKeys = Object.keys(nextOriginal) as (keyof T)[];
    if (prevKeys.length !== nextKeys.length) return false;
    for (const key of prevKeys) {
      if (prevOriginal[key] !== nextOriginal[key]) return false;
    }
  }

  // Compare column identity key — catches add/remove, reorder, and column swap
  if (prevProps.columnKey !== nextProps.columnKey) {
    return false;
  }

  // Compare columnSize object
  if (prevProps.columnSize !== nextProps.columnSize) {
    if (!prevProps.columnSize || !nextProps.columnSize) return false;
    const prevSizeKeys = Object.keys(prevProps.columnSize);
    const nextSizeKeys = Object.keys(nextProps.columnSize);
    if (prevSizeKeys.length !== nextSizeKeys.length) return false;
    for (const key of prevSizeKeys) {
      if (prevProps.columnSize[key] !== nextProps.columnSize[key]) return false;
    }
  }

  return true;
}
