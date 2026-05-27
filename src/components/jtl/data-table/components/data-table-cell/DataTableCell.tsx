import React, { memo } from 'react';
import { TableCell } from '../../../table/components/TablePrimitive';
import { cn } from '@/lib/utils';
import { areCellPropsEqual } from '../../../table/utils';
import IDataTableCellProps from './IDataTableCellProps';
import { useDataTableCell } from './hooks';

/**
 * Memoized table cell component for efficient rendering
 */
export const DataTableCell = <T extends object>({
  hasColumnSeparator,
  cell,
  cellsLength,
  isSelected,
  columnSizingId,
  columnSizingDeltaOffset,
  handleClickRow,
  columnSizeNumber,
  record,
  rowIndex,
  cellEdit,
  columns,
}: IDataTableCellProps<T>) => {
  // Use custom hook to keep logic out of the component and make it easier to read
  const { cellClasses, newStyle, canResize, handleClick, handleResize, renderCellContent, setNodeRef, isResizing } = useDataTableCell<T>({
    hasColumnSeparator,
    cell,
    cellsLength,
    isSelected,
    columnSizingId,
    columnSizingDeltaOffset,
    handleClickRow,
    columnSizeNumber,
    record,
    rowIndex,
    cellEdit,
    columns,
  });

  return (
    <TableCell className={cellClasses} style={newStyle} onClick={handleClick} ref={setNodeRef}>
      {renderCellContent()}
      {canResize && (
        <div
          aria-label="Resize pointer"
          {...{
            onMouseDown: handleResize,
            onTouchStart: handleResize,
            className: cn('absolute flex items-center justify-center top-0 -right-1 h-full w-[8px] cursor-col-resize'),
          }}
        >
          <div className={cn('w-[1px] h-full bg-[var(--border)]', isResizing && 'w-[1px] bg-[var(--foreground)]')} />
        </div>
      )}
    </TableCell>
  );
};

// Export with proper type casting for the component
export default memo(DataTableCell, areCellPropsEqual) as <T extends object>(props: IDataTableCellProps<T>) => React.JSX.Element;
