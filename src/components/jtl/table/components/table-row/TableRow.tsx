import React, { useCallback, useMemo } from 'react';
import { TableRow as TableRowPrimitive, TableCell } from '../TablePrimitive';
import ITableRowProps from './ITableRowProps';
import { cn } from '@/lib/utils';
import { Button } from '../../../button';
import { columnAligns, tableSizes } from '../../types';
import { getNestedValue, getColumnSizeStyles } from '../../utils';
import PathsToString from '../../types/PathsToString';
import { Text } from '../../../text';
import { Icon } from '../../../icon';
import { Box } from '../../../box';

/**
 * TableRow component
 * @param props {@link ITableRowProps} - The props for the TableRow component.
 * @returns A table row component.
 */
const TableRow = <T extends object>({
  columns,
  hasColumnSeparator = false,
  size = 'sm',
  onRowClick,
  expandable,
  record,
  rowIndex,
}: ITableRowProps<T>) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleRowExpansion = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  /**
   * Check if a row is expandable
   * @param record - The data record to check
   * @returns True if the row can be expanded
   */
  const canExpand = useMemo(() => {
    if (!expandable) return false;
    return expandable.expandableCondition ? expandable.expandableCondition(record) : true;
  }, [expandable, record]);

  const handleRowClick = useCallback(() => {
    onRowClick?.(record);
  }, [onRowClick, record]);

  return (
    <>
      <TableRowPrimitive className="hover:bg-[var(--muted)]" onClick={handleRowClick}>
        {/* Expand/collapse column (only if expandable is configured) */}
        {expandable && (
          <TableCell className={cn('text-center px-1.5')} key={`jtl-table-row-${rowIndex}-expandable`}>
            {canExpand && (
              <Button
                size="iconXs"
                onClick={handleRowExpansion}
                variant="ghost"
                aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                icon={
                  <Icon
                    name="ChevronDown"
                    size={16}
                    className={`text-[var(--foreground-muted)] transition-transform duration-200 ease-in-out ${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                }
              />
            )}
          </TableCell>
        )}

        {/* Data columns */}
        {columns.map((column, colIndex) => {
          const sizeStyle = getColumnSizeStyles(column);

          return (
            <TableCell
              key={`jtl-table-row-${rowIndex}-cell-${colIndex}`}
              style={sizeStyle}
              className={cn(
                tableSizes[size],
                hasColumnSeparator && colIndex !== columns.length - 1 && 'border-r border-[var(--border)]',
                column.align && columnAligns[column.align],
                expandable && colIndex === 0 && 'pl-0',
              )}
            >
              {column.render ? (
                column.render(getNestedValue<T, PathsToString<T, Required<T>>>(record, column.dataIndex), record, rowIndex)
              ) : (
                <Text truncate align={column.align}>
                  {String(getNestedValue<T, PathsToString<T, Required<T>>>(record, column.dataIndex) ?? '')}
                </Text>
              )}
            </TableCell>
          );
        })}
      </TableRowPrimitive>

      {/* Expanded row */}
      {expandable && isExpanded && canExpand && (
        <TableRowPrimitive key={`jtl-table-row-${rowIndex}-expanded`}>
          <TableCell
            colSpan={columns.length + 1} // +1 for the expand/collapse column
            className={cn(tableSizes[size], 'border-t-0')}
          >
            <Box>{expandable.expandedRowRender(record)}</Box>
          </TableCell>
        </TableRowPrimitive>
      )}
    </>
  );
};

export default TableRow;
