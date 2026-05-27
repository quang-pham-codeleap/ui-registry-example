import React, { useCallback, useMemo, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDataTableDynamicContext, useDataTableStaticContext } from '../../../hooks';
import { ACTION_COLUMN_ID, ACTION_COLUMN_SIZE, COLUMN_MIN_SIZE, SELECTION_COLUMN_ID, SELECTION_COLUMN_SIZE } from '../../../constants/tableDefaults';
import IDataTableHeadCellProps from '../IDataTableHeadCellProps';

/**
 * Hook to manage the state and logic for a DataTable head cell.
 * Handles column resizing, sorting, drag-and-drop, and derived state calculations.
 */
export default function useDataTableHeadCell<T extends object>(props: IDataTableHeadCellProps<T>) {
  const { header, columnSizingId, columnSizingDeltaOffset, hasColumnSeparator, onHeaderClick, cellsLength, selectedColumns } = props;

  const { columnAction, draggable } = useDataTableStaticContext<T>();
  const { sorting } = useDataTableDynamicContext<T>();

  const {
    id: headerId,
    index: headerIndex,
    colSpan,
    column: {
      columnDef: { header: headerDef },
      getCanResize,
      getSize,
    },
    getContext,
    getResizeHandler,
  } = header;

  // Stable: Find matching column definition
  // We prioritize finding by key (ID), falling back to index if key is missing.
  // This memoization ensures referential stability unless columns layout changes.
  const column = useMemo(
    () => selectedColumns.find(c => c.key === headerId) || selectedColumns[headerIndex],
    [selectedColumns, headerId, headerIndex],
  );

  // Stable: Column metadata
  const { columnAlign, sortable, isSelectionColumn, isActionColumn } = useMemo(
    () => ({
      columnAlign: column?.align,
      sortable: !!column?.sorter,
      isSelectionColumn: headerId === SELECTION_COLUMN_ID,
      isActionColumn: headerId === ACTION_COLUMN_ID,
    }),
    [column, headerId],
  );

  // Stable: Clickable state
  const clickable = useMemo(() => (sortable || !!onHeaderClick) && !isSelectionColumn, [sortable, onHeaderClick, isSelectionColumn]);

  // Dynamic: Width calculation
  // When resizing (columnSizingId matches), we add the deltaOffset to the base size.
  // Otherwise, we simply use the stored size. This enables smooth real-time resizing.
  const width = useMemo(
    () => (columnSizingId === headerId ? getSize() + (columnSizingDeltaOffset || 0) : getSize()),
    [columnSizingId, headerId, getSize, columnSizingDeltaOffset],
  );

  // Stable: Border visibility
  const isBorderVisible = useMemo(
    () => hasColumnSeparator && !getCanResize() && headerIndex !== selectedColumns.length,
    [hasColumnSeparator, getCanResize, headerIndex, selectedColumns.length],
  );

  const {
    attributes: draggableAttributes,
    isDragging,
    listeners: draggableListeners,
    setNodeRef,
    transform,
  } = useSortable({
    id: headerId,
  });

  const headerContext = getContext();
  const canResize = getCanResize() && headerIndex !== cellsLength - 1;
  const isSorting = sorting?.columnKey === headerId;
  const isDraggingRef = useRef(false);

  const isResizing = columnSizingId === headerId;

  const cellWidth = useMemo(() => {
    // Selection and Action columns have fixed, specific sizes
    if (isSelectionColumn) {
      return SELECTION_COLUMN_SIZE;
    }
    if (isActionColumn) {
      return ACTION_COLUMN_SIZE;
    }
    // Standard columns respect the calculated width but enforce a minimum size
    return Math.max(width || 0, COLUMN_MIN_SIZE);
  }, [isSelectionColumn, width, isActionColumn]);

  const handleHeaderClick = useCallback(() => {
    if (isDraggingRef.current) return;

    if (onHeaderClick && column && !isSelectionColumn) {
      const headerTitle = column.title || headerId;
      onHeaderClick(headerTitle, column);
    }
  }, [headerId, column, onHeaderClick, isSelectionColumn]);

  const handleResize = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Set drag flag to prevent triggering sort/click while resizing
      isDraggingRef.current = true;

      // Add global listeners to detect end of resize operation anywhere in the document
      const handleGlobalMouseUp = () => {
        // Reset drag flag after a small delay.
        // This delay is crucial to ensure any pending 'click' events are ignored
        // if they fire immediately after mouseup.
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 100);

        document.removeEventListener('mouseup', handleGlobalMouseUp);
        document.removeEventListener('touchend', handleGlobalMouseUp);
      };

      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchend', handleGlobalMouseUp);

      // Delegate actual resize logic to tanstack table handler
      getResizeHandler()(e);
    },
    [getResizeHandler],
  );

  const handleResizeClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const style: React.CSSProperties = {
    width: cellWidth,
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    zIndex: isDragging ? 1 : 0,
  };

  return {
    state: {
      column,
      columnAlign,
      headerDef,
      headerContext,
      isSelectionColumn,
      isActionColumn,
      isSorting,
      isDragging,
      isBorderVisible,
      canResize,
      clickable,
      sorting,
      columnActionEnabled: columnAction?.enabled,
      draggableEnabled: draggable?.enabled,
      colSpan,
      isResizing,
    },
    style,
    handlers: {
      setNodeRef,
      handleHeaderClick,
      handleResize,
      handleResizeClick,
    },
    dndProps: {
      draggableAttributes,
      draggableListeners,
    },
  };
}
