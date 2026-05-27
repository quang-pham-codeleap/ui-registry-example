import getNestedValue from './getNestedValue';
import ICellComparisonProps from './types/ICellComparisonProps';

/**
 * Custom comparison function for memo to prevent unnecessary cell re-renders
 * Compares cell props to determine if a re-render is needed
 *
 * @param prevProps - Previous cell props
 * @param nextProps - Next cell props
 * @returns true if props are equal (skip re-render), false otherwise
 */
export default function areCellPropsEqual<T extends object>(prevProps: ICellComparisonProps<T>, nextProps: ICellComparisonProps<T>): boolean {
  // Compare primitive props first (fast checks)
  if (
    prevProps.hasColumnSeparator !== nextProps.hasColumnSeparator ||
    prevProps.cellsLength !== nextProps.cellsLength ||
    prevProps.isSelected !== nextProps.isSelected ||
    prevProps.columnSizingId !== nextProps.columnSizingId ||
    prevProps.columnSizingDeltaOffset !== nextProps.columnSizingDeltaOffset ||
    prevProps.columnSizeNumber !== nextProps.columnSizeNumber ||
    prevProps.rowIndex !== nextProps.rowIndex
  ) {
    return false;
  }

  // Compare cell identity (column id and row id)
  if (prevProps.cell.id !== nextProps.cell.id || prevProps.cell.column.id !== nextProps.cell.column.id) {
    return false;
  }

  // Compare the actual cell value from record (most important for editable cells)
  // Use dataIndex from column definition for nested paths like 'address.city.region.name'
  // cell.column.id is the 'key' (e.g., 'region'), not the dataIndex path
  const columnId = prevProps.cell.column.id;
  const columnDef = prevProps.columns?.find(col => col.key === columnId);
  const dataPath = columnDef?.dataIndex ?? columnId;

  const prevValue = getNestedValue(prevProps.record, dataPath as string);
  const nextValue = getNestedValue(nextProps.record, dataPath as string);
  if (prevValue !== nextValue) {
    return false;
  }

  return true;
}
