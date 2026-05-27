import React, { memo, useCallback, useMemo } from 'react';
import { TableRow } from '../../../table/components/TablePrimitive';
import { areRowPropsEqual } from '../../../table/utils';
import { DataTableCell } from '../data-table-cell';
import { cn } from '@/lib/utils';
import IDataTableRowProps from './IDataTableRowProps';
import { DEFAULT_ROW_HEIGHT } from '../../constants/tableDefaults';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useDataTableStaticContext } from '../../hooks';

/**
 * Memoized table row component for virtualized rendering
 */
const DataTableRow = <T extends object>({
  dataIndex,
  measureElement,
  rowStartPosition,
  row,
  columnSizingId,
  columnSizingDeltaOffset,
  columnSize,
  isSelected,
  cellEdit,
}: IDataTableRowProps<T>) => {
  const { rowHeight = DEFAULT_ROW_HEIGHT, hasColumnSeparator, onRowClick, columnOrder, columns } = useDataTableStaticContext<T>();
  // Memoize row data to prevent unnecessary re-renders
  const { original, getVisibleCells } = row;

  // Get visible cells for the row
  // Guard against undefined during HMR when row object might be stale
  const cells = getVisibleCells();

  // Handle row click event.
  const handleClickRow = useCallback(() => {
    onRowClick?.(original);
  }, [onRowClick, original]);

  // Handle keyboard events on the focused row.
  // Enter / Space activate the row (same as clicking it).
  // Tab / Shift+Tab are left to the browser default so focus moves naturally
  // through interactive elements inside the row, then to the next row.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTableRowElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // Only handle when the row <tr> itself is focused, not a child element.
        // Without this guard, keydown events from child interactive elements
        // (checkboxes, buttons) bubble up here and e.preventDefault() would
        // cancel their native keyboard behavior (e.g. Enter toggling a checkbox).
        if (e.target !== e.currentTarget) return;

        // Prevent page scroll on Space; prevent form submission on Enter
        e.preventDefault();
        onRowClick?.(original);
      }
    },
    [onRowClick, original],
  );

  // Memoize cells props to prevent unnecessary re-renders
  // Create stable cell props objects that only change when actual values change
  const cellsProps = useMemo(() => {
    return cells.map(cell => ({
      hasColumnSeparator,
      cell,
      cellsLength: cells.length,
      isSelected,
      columnSizingId: columnSizingId === cell.column.id ? columnSizingId : (false as string | false),
      columnSizingDeltaOffset: columnSizingId === cell.column.id ? columnSizingDeltaOffset : null,
      handleClickRow,
      columnSizeNumber: columnSize?.[cell.column.id],
      record: original,
      rowIndex: dataIndex,
      cellEdit,
      columns,
    }));
  }, [
    cells,
    hasColumnSeparator,
    isSelected,
    columnSizingId,
    columnSizingDeltaOffset,
    handleClickRow,
    columnSize,
    cellEdit,
    dataIndex,
    original,
    columns,
  ]);

  const rowStyle = useMemo(
    () => ({
      height: rowHeight,
      top: rowStartPosition,
    }),
    [rowHeight, rowStartPosition],
  );

  return (
    <TableRow
      data-index={dataIndex}
      ref={measureElement}
      // tabIndex={0} makes the row focusable via keyboard (Tab key).
      // This is the entry point for keyboard navigation: Tab → row gets focus,
      // then Tab again moves into the row's interactive elements (checkbox, buttons).
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        'hover:bg-[var(--muted)] w-full flex absolute',
        'focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-inset focus:z-10',
      )}
      style={rowStyle}
    >
      <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
        {cellsProps.map(cellProps => {
          return <DataTableCell key={`data-table-cell-${cellProps.cell.id}`} {...cellProps} />;
        })}
      </SortableContext>
    </TableRow>
  );
};

export default memo(DataTableRow, areRowPropsEqual) as <T extends object>(props: IDataTableRowProps<T>) => React.JSX.Element;
