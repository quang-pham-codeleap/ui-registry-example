import { useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * Return type for the useCellDragAndDrop hook.
 */
interface UseCellDragAndDropReturn {
  /** Whether the cell is currently being dragged */
  isDragging: boolean;
  /** Ref setter for the draggable element */
  setNodeRef: (node: HTMLElement | null) => void;
  /** CSS transform string for positioning during drag */
  transformStyle: string;
}

/**
 * Hook to handle drag and drop functionality for table cells.
 *
 * Wraps the useSortable hook from dnd-kit and provides computed transform styles.
 * Follows Single Responsibility Principle by only handling drag and drop concerns.
 *
 * @param columnId - The column identifier for drag and drop
 * @returns Drag and drop state and handlers
 *
 * @example
 * ```tsx
 * const {
 *   isDragging,
 *   setNodeRef,
 *   transformStyle,
 * } = useCellDragAndDrop('columnName');
 *
 * return (
 *   <div
 *     ref={setNodeRef}
 *     style={{ transform: transformStyle, opacity: isDragging ? 0.8 : 1 }}
 *   >
 *     Cell content
 *   </div>
 * );
 * ```
 */
const useCellDragAndDrop = (columnId: string): UseCellDragAndDropReturn => {
  const { isDragging, setNodeRef, transform } = useSortable({ id: columnId });

  // Calculate CSS transform string from transform object
  const transformStyle = useMemo(() => {
    const { x = 0, y = 0, scaleX = 1, scaleY = 1 } = transform ?? {};
    return CSS.Translate.toString({ x, y, scaleX, scaleY }) ?? '';
  }, [transform]);

  return {
    isDragging,
    setNodeRef,
    transformStyle,
  };
};

export default useCellDragAndDrop;
