import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { flexRender } from '@tanstack/react-table';
import IDataTableCellProps from '../IDataTableCellProps';
import { EditableCell } from '../../editable-cell';

import useCellProperties from './useCellProperties';
import useCellStateFlags from './useCellStateFlags';
import useCellEditable from './useCellEditable';
import useCellDragAndDrop from './useCellDragAndDrop';
import { buildCellClasses, calculateCellWidth } from '../utils';

/**
 * Custom hook to encapsulate DataTable cell logic.
 *
 * @template T - The type of the data record
 * @param props - The cell properties from the parent component
 * @returns Object containing cell styles, handlers, and render functions
 *
 * @example
 * ```tsx
 * const {
 *   cellClasses,
 *   newStyle,
 *   canResize,
 *   isResizing,
 *   handleClick,
 *   handleResize,
 *   renderCellContent,
 *   setNodeRef,
 * } = useDataTableCell(props);
 * ```
 */
export default function useDataTableCell<T extends object>(props: IDataTableCellProps<T>) {
  const {
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
  } = props;

  // Extract cell properties (SRP: property extraction)
  const { columnId, getIndex, getCanResize, getSize, cellRender, getContext } = useCellProperties(cell);

  // Get cell context for rendering
  const cellContext = useMemo(() => getContext(), [getContext]);
  const colIndex = getIndex();

  // Calculate state flags (SRP: state calculation)
  const stateFlags = useCellStateFlags({
    columnId,
    colIndex,
    cellsLength,
    hasColumnSeparator,
    columnSizingId,
    getCanResize,
  });

  const { isSelectionColumn, isActionColumn, isResizing, canResize, isBorderVisible } = stateFlags;

  // Handle editability (SRP: edit handling)
  const { editableConfig, isCellEditable, cellValue, handleCellSave } = useCellEditable({
    cellEdit,
    columns,
    columnId,
    record,
    rowIndex,
    isSelectionColumn,
    isActionColumn,
  });

  // Handle drag and drop (SRP: DnD handling)
  const { isDragging, setNodeRef, transformStyle } = useCellDragAndDrop(columnId);

  // Track resize state with ref (prevents stale closure issues)
  const isResizingRef = useRef(false);

  useEffect(() => {
    isResizingRef.current = isResizing;
  }, [isResizing]);

  // Calculate cell classes (memoized for performance)
  const cellClasses = useMemo(
    () =>
      buildCellClasses({
        isBorderVisible,
        isSelectionColumn,
        isSelected,
        isActionColumn,
      }),
    [isBorderVisible, isSelectionColumn, isSelected, isActionColumn],
  );

  // Calculate cell width (memoized for performance)
  const width = useMemo(
    () =>
      calculateCellWidth({
        isSelectionColumn,
        isActionColumn,
        isResizing,
        getSize,
        columnSizingDeltaOffset,
        columnSizeNumber,
      }),
    [isSelectionColumn, isActionColumn, isResizing, getSize, columnSizingDeltaOffset, columnSizeNumber],
  );

  /**
   * Handles cell click events.
   * Prevents click during resize operations to avoid unintended row selection.
   */
  const handleClick = useCallback(() => {
    if (!isResizingRef.current && handleClickRow) {
      handleClickRow();
    }
  }, [handleClickRow]);

  /**
   * Handles column resize events.
   * Prevents event propagation and delegates to TanStack Table resize handler.
   */
  const handleResize = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const headers = cellContext.table.getHeaderGroups()[0].headers;
      headers[colIndex].getResizeHandler()(e);
    },
    [cellContext.table, colIndex],
  );

  /**
   * Renders cell content with optional editable wrapper.
   * Conditionally wraps content in EditableCell component when editing is enabled.
   */
  const renderCellContent = useCallback(() => {
    const content = cellRender ? flexRender(cellRender, cellContext) : null;

    // Wrap in editable cell if configured
    if (isCellEditable && editableConfig) {
      return React.createElement(EditableCell, {
        value: cellValue,
        isEditable: isCellEditable,
        editorType: editableConfig.type,
        dateFormat: editableConfig.dateFormat,
        onSave: handleCellSave,
        children: content,
      });
    }

    return content;
  }, [cellRender, cellContext, isCellEditable, editableConfig, cellValue, handleCellSave]);

  // Build final cell style object
  const newStyle: React.CSSProperties = useMemo(
    () => ({
      transform: transformStyle,
      opacity: isDragging ? 0.8 : 1,
      position: 'relative',
      transition: 'width transform 0.2s ease-in-out',
      zIndex: isDragging ? 1 : 0,
      width,
    }),
    [transformStyle, isDragging, width],
  );

  return {
    cellClasses,
    newStyle,
    canResize,
    isResizing,
    handleClick,
    handleResize,
    renderCellContent,
    setNodeRef,
  };
}
