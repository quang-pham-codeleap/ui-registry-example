import { TableHeader, TableRow } from '../../../table/components/TablePrimitive';
import IDataTableHeaderProps from './IDataTableHeaderProps';
import { DataTableHeadCell } from '../data-table-head-cell';
import { useDataTableStaticContext, useDataTableStyles } from '../../hooks';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

/**
 * DataTableHeader component for rendering the table header
 */
const DataTableHeader = <T extends object>({ headerGroups, columnSizingId, columnSizingDeltaOffset, selectedColumns }: IDataTableHeaderProps<T>) => {
  const { hasColumnSeparator, onHeaderClick, columnOrder, styles } = useDataTableStaticContext<T>();

  /**
   * Get header style from context
   */
  const headerStyle = useDataTableStyles({ backgroundColor: 'var(--background)' }, 'header', styles);

  return (
    <TableHeader className="grid sticky top-0 z-1 bg-[var(--background)] border-b border-[var(--border)]">
      {headerGroups.map(headerGroup => (
        <TableRow key={`data-table-header-group-${headerGroup.id}`} className="flex w-full" style={headerStyle}>
          <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
            {headerGroup.headers.map(header => (
              <DataTableHeadCell
                key={`data-table-head-cell-${header.id}`}
                header={header}
                columnSizingId={columnSizingId}
                columnSizingDeltaOffset={columnSizingDeltaOffset}
                hasColumnSeparator={hasColumnSeparator}
                onHeaderClick={onHeaderClick}
                cellsLength={headerGroup.headers.length}
                selectedColumns={selectedColumns}
              />
            ))}
          </SortableContext>
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default DataTableHeader;
