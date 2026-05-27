import { useState, useCallback, useRef } from 'react';
import { RowSelectionState } from '@tanstack/react-table';
import { RowsSelectionHandler, SortingState } from '../types';

/**
 * Custom hook to manage table state (selection, sorting)
 * Encapsulates all state-related logic for the DataTable component
 */
export default function useTableState<T extends object>(memoizedData: T[], rowKey?: keyof T, rowsSelection?: RowsSelectionHandler<T>) {
  // selectedRow: TanStack Table's internal selection map — keys are row IDs (string),
  // values are `true`. Used directly by the table instance to highlight checked rows
  // and to compute diffs (added/removed) on each selection change.
  const [selectedRow, setSelectedRow] = useState<RowSelectionState>({});

  // selectedRows: the actual data records that are currently selected.
  // Derived from selectedRow but stored separately so consumers receive typed T[]
  // objects via onSelect without needing to look up rows by ID themselves.
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const [sorting, setSorting] = useState<SortingState | undefined>(undefined);

  // Refs that mirror the two state values above and are updated synchronously
  // inside handleRowSelectionChange. This ensures that if TanStack/React calls
  // the handler multiple times within the same batch (before a re-render),
  // each call reads the latest value rather than a stale render-closure snapshot.
  const selectedRowRef = useRef<RowSelectionState>({});
  const selectedRowsRef = useRef<T[]>([]);

  const resolveRowId = useCallback(
    (item: T, index: number): string => {
      if (!rowKey) return String(index);
      return String(item[rowKey]);
    },
    [rowKey],
  );

  /**
   * Helper function to find data records by their row IDs
   * @param rowIds - Array of row IDs to find
   * @returns Array of found data records (undefined values filtered out)
   */
  const findDataByRowIds = useCallback(
    (rowIds: string[]): T[] => {
      return rowIds
        .map(rowId => memoizedData.find((item, index) => resolveRowId(item, index) === rowId))
        .filter((item): item is T => item !== undefined);
    },
    [memoizedData, resolveRowId],
  );

  /**
   * Helper function to get row IDs that were added to the selection
   * @param prevSelection - Previous selection state
   * @param newSelection - New selection state
   * @returns Array of newly added row IDs
   */
  const getAddedRowIds = useCallback((prevSelection: RowSelectionState, newSelection: RowSelectionState): string[] => {
    return Object.keys(newSelection).filter(rowId => !prevSelection[rowId]);
  }, []);

  /**
   * Helper function to get row IDs that were removed from the selection
   * @param prevSelection - Previous selection state
   * @param newSelection - New selection state
   * @returns Array of removed row IDs
   */
  const getRemovedRowIds = useCallback((prevSelection: RowSelectionState, newSelection: RowSelectionState): string[] => {
    return Object.keys(prevSelection).filter(rowId => !newSelection[rowId]);
  }, []);

  /**
   * Handle row selection change.
   *
   * Reads from refs instead of closure state so that multiple calls within the
   * same React batch each see the latest value — not a stale render snapshot.
   * Refs are updated synchronously before setState, making every subsequent
   * call within the batch use the correct "previous" value.
   *
   * setState is called with plain values (not updater functions) so React
   * Strict Mode has no updater to double-invoke, preventing duplicate onSelect
   * calls and duplicate entries in selectedRows.
   */
  const handleRowSelectionChange = useCallback(
    (updaterOrValue: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
      // Read the latest selection from the ref — always up-to-date even when
      // called multiple times before the next re-render
      const prevRowSelection = selectedRowRef.current;
      const newRowSelection = typeof updaterOrValue === 'function' ? updaterOrValue(prevRowSelection) : updaterOrValue;

      // Compute diffs against the ref value, not the stale closure state
      const addedRowIds = getAddedRowIds(prevRowSelection, newRowSelection);
      const removedRowIds = getRemovedRowIds(prevRowSelection, newRowSelection);

      // Compute the updated rows array as a plain value from the ref
      let updatedRows = selectedRowsRef.current;
      if (addedRowIds.length > 0) {
        updatedRows = [...updatedRows, ...findDataByRowIds(addedRowIds)];
      }
      if (removedRowIds.length > 0) {
        updatedRows = updatedRows.filter(item => {
          if (rowKey) {
            return !removedRowIds.includes(String(item[rowKey]));
          }

          const index = memoizedData.indexOf(item);
          // Keep items that are not in memoizedData (external / stale references)
          if (index < 0) return true;
          return !removedRowIds.includes(resolveRowId(item, index));
        });
      }

      // Update refs synchronously so the next call in the same batch sees
      // the correct "previous" state immediately
      selectedRowRef.current = newRowSelection;
      selectedRowsRef.current = updatedRows;

      // Set both states with plain values (not updater functions) so React
      // Strict Mode has no updater to double-invoke
      setSelectedRow(newRowSelection);
      setSelectedRows(updatedRows);

      // Notify the consumer exactly once per user interaction
      rowsSelection?.onSelect?.(updatedRows);
    },
    [findDataByRowIds, getAddedRowIds, getRemovedRowIds, memoizedData, resolveRowId, rowKey, rowsSelection],
  );

  return {
    // State values
    selectedRow,
    selectedRows,
    sorting,
    // State setters
    setSorting,
    // Event handlers
    handleRowSelectionChange,
  };
}
