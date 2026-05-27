import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useMemo } from 'react';
import { TableBody } from '../../../table/components/TablePrimitive';
import IDataTableBodyProps from './IDataTableBodyProps';
import DataTableRow from '../data-table-row/DataTableRow';
import { useDataTableStaticContext } from '../../hooks';
import { DEFAULT_ROW_HEIGHT } from '../../constants/tableDefaults';

/**
 * DataTableBody component for rendering the table body with virtualization
 */
const DataTableBody = <T extends object>({
  rows,
  tableContainerRef,
  columnSizingId = false,
  columnSizingDeltaOffset = null,
  columnSize,
  selectedColumns,
}: IDataTableBodyProps<T>) => {
  const { rowHeight = DEFAULT_ROW_HEIGHT, hasColumnSeparator, onRowClick, cellEdit } = useDataTableStaticContext<T>();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => rowHeight,
    overscan: 5, // Number of rows to render above and below the visible area
    measureElement:
      typeof window !== 'undefined' && !/Firefox/i.test(navigator.userAgent) ? element => element?.getBoundingClientRect().height : undefined,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  // Stable memo-buster key derived from visible column keys in order.
  // Detects add/remove, identity changes, and column reordering.
  const columnKey = useMemo(() => selectedColumns?.map(c => c.key).join(',') ?? '', [selectedColumns]);

  // Callback function to measure the height of each row
  const measureElement = useCallback(
    (node: HTMLElement | null) => {
      rowVirtualizer.measureElement(node);
    },
    [rowVirtualizer],
  );

  const tableHeight = useMemo(() => {
    if (!rows.length) return 0;
    return rowVirtualizer.getTotalSize();
  }, [rows.length, rowVirtualizer]);

  return (
    <TableBody
      className="bg-[var(--background)] divide-y divide-[var(--border)] grid relative [&_tr:last-child]:border-b"
      style={{ height: `${tableHeight}px` }}
    >
      {virtualItems.map(virtualRow => {
        const row = rows[virtualRow.index];
        return row ? (
          <DataTableRow
            key={row.id}
            dataIndex={virtualRow.index}
            measureElement={measureElement}
            rowStartPosition={virtualRow.start}
            row={row}
            isSelected={row.getIsSelected()}
            columnSizingId={columnSizingId}
            columnSizingDeltaOffset={columnSizingDeltaOffset}
            columnSize={columnSize}
            rowHeight={rowHeight}
            hasColumnSeparator={hasColumnSeparator}
            onRowClick={onRowClick}
            cellEdit={cellEdit}
            columnKey={columnKey}
          />
        ) : null;
      })}
    </TableBody>
  );
};

export default DataTableBody;
