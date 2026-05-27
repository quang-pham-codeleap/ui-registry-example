import { memo } from 'react';
import { cn } from '@/lib';
import ITableHeadResizerProps from './ITableHeadResizerProps';

const TableHeadResizer = ({ onMouseDown, onTouchStart, onClick, isResizing }: ITableHeadResizerProps) => {
  return (
    <div
      data-resizer="true"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onClick={onClick}
      className={cn('absolute flex items-center justify-center top-0 -right-1 h-full w-[8px] cursor-col-resize')}
    >
      <div className={cn('w-[1px] h-full bg-[var(--border)]', isResizing && 'w-[1px] bg-[var(--foreground)]')} />
    </div>
  );
};

export default memo(TableHeadResizer);
