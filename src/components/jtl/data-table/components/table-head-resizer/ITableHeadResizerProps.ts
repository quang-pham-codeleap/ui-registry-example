import React from 'react';

/**
 * Props for the table head resizer component
 */
export default interface ITableHeadResizerProps {
  /**
   * On mouse down handler
   */
  onMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
  /**
   * On touch start handler
   */
  onTouchStart: (e: React.MouseEvent | React.TouchEvent) => void;
  /**
   * On click handler
   */
  onClick: (e: React.MouseEvent) => void;
  /**
   * Whether the column is resizing
   */
  isResizing: boolean;
}
