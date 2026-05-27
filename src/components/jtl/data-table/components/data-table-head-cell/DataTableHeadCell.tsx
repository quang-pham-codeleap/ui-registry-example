import { memo } from 'react';
import IDataTableHeadCellProps from './IDataTableHeadCellProps';
import { TableHead } from '../../../table/components/TablePrimitive';
import { cn } from '@/lib';
import { useDataTableHeadCell } from './hooks';
import { TableHeadContent } from '../table-head-content';
import { TableHeadResizer } from '../table-head-resizer';

/**
 * DataTableHeadCell component for rendering the table head cell
 */
const DataTableHeadCellInner = <T extends object>(props: IDataTableHeadCellProps<T>) => {
  const { state, style, handlers, dndProps } = useDataTableHeadCell(props);

  const {
    column,
    columnAlign,
    headerDef,
    headerContext,
    isSelectionColumn,
    isActionColumn,
    isSorting,
    isBorderVisible,
    canResize,
    clickable,
    sorting,
    columnActionEnabled,
    draggableEnabled,
    colSpan,
    isResizing,
  } = state;

  const { setNodeRef, handleHeaderClick, handleResize, handleResizeClick } = handlers;
  const { draggableAttributes, draggableListeners } = dndProps;

  return (
    <TableHead
      scope="col"
      colSpan={colSpan}
      style={style}
      className={cn(
        'flex items-center px-4 justify-between relative gap-2',
        'h-12',
        columnAlign && `justify-${columnAlign}`,
        isBorderVisible && 'border-r border-[var(--border)]',
        isSelectionColumn && 'border-r-0 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        clickable && 'cursor-pointer hover:bg-[var(--muted)] transition-colors',
        draggableEnabled && 'cursor-move',
      )}
      onClick={handleHeaderClick}
      ref={setNodeRef}
      {...(draggableEnabled ? { ...draggableAttributes, ...draggableListeners } : {})}
    >
      <TableHeadContent
        headerDef={headerDef}
        headerContext={headerContext}
        isSelectionColumn={isSelectionColumn}
        isActionColumn={isActionColumn}
        isSorting={isSorting}
        sorting={sorting}
        columnAlign={columnAlign}
        column={column}
        columnActionEnabled={columnActionEnabled}
      />
      {canResize && <TableHeadResizer onMouseDown={handleResize} onTouchStart={handleResize} onClick={handleResizeClick} isResizing={isResizing} />}
    </TableHead>
  );
};

const DataTableHeadCell = memo(DataTableHeadCellInner) as unknown as typeof DataTableHeadCellInner;

export default DataTableHeadCell;
