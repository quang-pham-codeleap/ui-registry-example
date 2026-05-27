import { TableHeader as TableHeaderPrimitive, TableRow, TableHead } from '../TablePrimitive';
import { cn } from '@/lib/utils';
import ITableHeaderProps from './ITableHeaderProps';
import { Text } from '../../../text';
import { useTableStyles } from '../../hooks';
import { getColumnSizeStyles } from '../../utils';

/**
 * TableHeader component
 * @param props {@link ITableHeaderProps} - The props for the TableHeader component.
 * @returns A table header component.
 */
const TableHeader = <T extends object>({ columns, hasColumnSeparator, hasExpandableRows }: ITableHeaderProps<T>) => {
  /**
   * Get header style from context
   */
  const headerStyle = useTableStyles({ backgroundColor: 'var(--background)' }, 'header');

  /**
   * Get text style from context
   */
  const headerTextProps = useTableStyles({ color: 'muted' }, 'headerText');

  return (
    <TableHeaderPrimitive className="sticky top-0 bg-[var(--background)] shadow-[0_1px_0_0_var(--border)] z-[1]">
      <TableRow style={headerStyle}>
        {/* Empty header cell for expand/collapse column */}
        {hasExpandableRows && (
          <TableHead className={cn('text-[var(--muted-foreground)] h-12 p-0', 'w-10 max-w-10')}>
            {/* Empty header for expand/collapse column */}
          </TableHead>
        )}

        {/* Data column headers */}
        {columns.map((column, index) => {
          const sizeStyle = getColumnSizeStyles(column);

          return (
            <TableHead
              key={`jtl-table-header-${column.key}-${index}`}
              style={sizeStyle}
              className={cn(
                'text-[var(--muted-foreground)] h-12',
                hasColumnSeparator && index !== columns.length - 1 && 'border-r border-[var(--border)]',
                hasExpandableRows && index === 0 && 'pl-0',
              )}
            >
              <Text type="muted" weight="medium" align={column.align} {...headerTextProps}>
                {column.title}
              </Text>
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeaderPrimitive>
  );
};

export default TableHeader;
