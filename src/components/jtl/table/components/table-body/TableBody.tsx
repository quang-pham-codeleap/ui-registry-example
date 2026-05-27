import { cn } from '@/lib/utils';
import { TableBody as TableBodyPrimitive, TableCell, TableRow as TableRowPrimitive } from '../TablePrimitive';
import { tableSizes } from '../../types';
import ITableBodyProps from './ITableBodyProps';
import { TableRow } from '../table-row';

const TableBody = <T extends object>({
  dataSource,
  columns,
  emptyStateContent,
  hasColumnSeparator,
  size = 'sm',
  onRowClick,
  expandable,
}: ITableBodyProps<T>) => {
  if (dataSource.length === 0) {
    return (
      <TableBodyPrimitive>
        <TableRowPrimitive>
          <TableCell colSpan={columns.length + (expandable ? 1 : 0)} className={cn(tableSizes[size], 'text-center py-6 ')}>
            {emptyStateContent}
          </TableCell>
        </TableRowPrimitive>
      </TableBodyPrimitive>
    );
  }

  return (
    <TableBodyPrimitive>
      {dataSource.map((record, index) => {
        return (
          <TableRow
            key={`jtl-table-row-${index}`}
            columns={columns}
            hasColumnSeparator={hasColumnSeparator}
            size={size}
            onRowClick={onRowClick}
            expandable={expandable}
            record={record}
            rowIndex={index}
          />
        );
      })}
    </TableBodyPrimitive>
  );
};

export default TableBody;
