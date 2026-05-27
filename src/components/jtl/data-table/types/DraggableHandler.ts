/**
 * Props for the Draggable Handler
 * Enables drag and drop column reordering functionality
 */
type DraggableHandler = {
  /**
   * Whether the drag and drop is enabled
   */
  enabled: boolean;

  /**
   * The current column order as an array of column IDs
   */
  value?: string[];

  /**
   * The callback function when the column order changes
   * @param value - The new column order
   */
  onChange?: (value: string[]) => void;
};

export default DraggableHandler;
