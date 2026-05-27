import { useCallback, useMemo } from 'react';
import { CellEditHandler, CellEditValue } from '../../../types';
import { ITableColumnProps } from '../../../../table';
import { resolveEditableConfig, extractCellValue } from '../utils';
import { ResolvedEditableConfig } from '../types';

/**
 * Parameters for the useCellEditable hook.
 */
interface UseCellEditableParams<T extends object> {
  /** Cell edit handler containing the onSave callback */
  cellEdit: CellEditHandler<T> | undefined;
  /** Column definitions array */
  columns: ITableColumnProps<T>[] | undefined;
  /** The unique identifier for this column */
  columnId: string;
  /** The data record for the current row */
  record: T;
  /** The index of the current row */
  rowIndex: number;
  /** Whether this is the selection checkbox column */
  isSelectionColumn: boolean;
  /** Whether this is the action buttons column */
  isActionColumn: boolean;
}

/**
 * Return type for the useCellEditable hook.
 */
interface UseCellEditableReturn {
  /** The resolved editable configuration, or null if not editable */
  editableConfig: ResolvedEditableConfig;
  /** Whether this cell is editable */
  isCellEditable: boolean;
  /** The current cell value as a string */
  cellValue: string;
  /** Callback to save the cell value */
  handleCellSave: (newValue: CellEditValue) => void;
}

/**
 * Hook to handle cell editability logic.
 *
 * Encapsulates all editable-related state and handlers.
 * Follows Single Responsibility Principle by only handling edit-related concerns.
 *
 * @template T - The type of the data record (must extend object)
 * @param params - Parameters for editability handling
 * @returns Object containing editable state and handlers
 *
 * @example
 * ```tsx
 * const {
 *   editableConfig,
 *   isCellEditable,
 *   cellValue,
 *   handleCellSave,
 * } = useCellEditable({
 *   cellEdit: { onSave: handleSave },
 *   columns: columnDefinitions,
 *   columnId: 'name',
 *   record: { id: 1, name: 'John' },
 *   rowIndex: 0,
 *   isSelectionColumn: false,
 *   isActionColumn: false,
 * });
 * ```
 */
export default function useCellEditable<T extends object>(params: UseCellEditableParams<T>): UseCellEditableReturn {
  const { cellEdit, columns, columnId, record, rowIndex, isSelectionColumn, isActionColumn } = params;

  // Find matching column definition
  const columnDef = useMemo(() => columns?.find(col => col.key === columnId), [columns, columnId]);

  // Resolve editable configuration
  const editableConfig = useMemo(
    () =>
      resolveEditableConfig({
        cellEdit,
        isSelectionColumn,
        isActionColumn,
        columnDef,
        record,
        rowIndex,
      }),
    [cellEdit, isSelectionColumn, isActionColumn, columnDef, record, rowIndex],
  );

  // Extract cell value for editing
  const cellValue = useMemo(() => extractCellValue(record, columnId as keyof T), [record, columnId]);

  // Create save handler
  const handleCellSave = useCallback(
    (newValue: CellEditValue) => {
      cellEdit?.onSave(columnId as keyof T, record, newValue, rowIndex);
    },
    [cellEdit, columnId, record, rowIndex],
  );

  return {
    editableConfig,
    isCellEditable: editableConfig !== null,
    cellValue,
    handleCellSave,
  };
}
