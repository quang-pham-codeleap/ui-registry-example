import React, { useCallback, useState } from 'react';
import { Table } from '../../../table/components/TablePrimitive';
import IDataTableContainerProps from './IDataTableContainerProps';
import { ScrollArea } from '../../../scroll-area';
import { TableLoader } from '../../../table/components';
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import { DEFAULT_ROW_HEIGHT, DEFAULT_TABLE_HEIGHT, TABLE_HEADER_HEIGHT } from '../../constants/tableDefaults';
import { useDataTableStaticContext } from '../../hooks';

/**
 * DataTableContainer component for wrapping the table with proper styling and container
 */
const DataTableContainer: React.FC<IDataTableContainerProps> = ({
  containerRef,
  children,
  onScrollEnd,
  isLoading,
  rowLength = 0,
  rowHeight = DEFAULT_ROW_HEIGHT,
}) => {
  const { tableHeight = DEFAULT_TABLE_HEIGHT, autoHeight, setColumnOrder } = useDataTableStaticContext();

  // Whether the table should expand to fill available space in its parent
  const isAutoHeight = tableHeight === 'auto';

  const [calculatedHeight, setCalculatedHeight] = useState(isAutoHeight ? 0 : tableHeight);

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));
  /**
   * Handle scroll events to detect when user has reached the end of the table
   * Triggers onScrollEnd callback when the user is within 10px of the bottom
   */
  const handleScrollEnd = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (!onScrollEnd) return;

      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

      // Check if the user has scrolled to the end (with a small threshold)
      // The threshold helps ensure the callback triggers slightly before reaching the absolute bottom
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isAtBottom) {
        onScrollEnd();
      }
    },
    [onScrollEnd],
  );

  /**
   * Handle table ref to calculate the height of the table.
   * Resizes the table container to fit the table height.
   * Skipped in auto-height mode where the height comes from ResizeObserver context,
   * avoiding unnecessary state updates and re-renders.
   */
  const handleTableRef = useCallback(
    (node: HTMLTableElement | null) => {
      if (isAutoHeight || !node) return;

      const newHeight = node.getBoundingClientRect().height;
      if (newHeight !== calculatedHeight) {
        setCalculatedHeight(newHeight);
      }
    },
    [calculatedHeight, isAutoHeight],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
        setColumnOrder?.((columnOrder: string[]) => {
          const oldIndex = columnOrder.indexOf(active.id as string);
          const newIndex = columnOrder.indexOf(over.id as string);
          return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
        });
      }
    },
    [setColumnOrder],
  );

  // In auto mode, use the ResizeObserver-computed height from context.
  // autoHeight is always a number when tableHeight="auto" (lazy-initialized in useAutoTableHeight),
  // but we add a DEFAULT_TABLE_HEIGHT fallback defensively in case it's still undefined during SSR or edge cases.
  // In fixed mode, calculate a capped pixel height as before.
  const fixedTableHeight = typeof tableHeight === 'number' ? tableHeight : DEFAULT_TABLE_HEIGHT;
  const scrollAreaHeight = isAutoHeight
    ? (autoHeight ?? DEFAULT_TABLE_HEIGHT)
    : Math.min(rowLength ? rowHeight * rowLength + TABLE_HEADER_HEIGHT : calculatedHeight, fixedTableHeight);

  return (
    <DndContext collisionDetection={closestCenter} modifiers={[restrictToHorizontalAxis]} onDragEnd={handleDragEnd} sensors={sensors}>
      <ScrollArea
        ref={containerRef}
        className="border border-[var(--border)] rounded-[var(--border-radius-default)] relative"
        style={{ height: scrollAreaHeight }}
        onScroll={handleScrollEnd}
      >
        <Table ref={handleTableRef} className="grid">
          {children}
        </Table>
        {isLoading && <TableLoader />}
      </ScrollArea>
    </DndContext>
  );
};

export default DataTableContainer;
