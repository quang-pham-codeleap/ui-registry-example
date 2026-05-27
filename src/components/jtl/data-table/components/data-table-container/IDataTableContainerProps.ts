import React from 'react';

/**
 * Props for the DataTableContainer component
 */
export default interface IDataTableContainerProps {
  /**
   * Reference to the container element for virtualization
   */
  containerRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Children elements to render inside the table
   */
  children: React.ReactNode;

  /**
   * Callback fired when the user scrolls to the end of the table content
   */
  onScrollEnd?: () => void;

  /**
   * Whether the table is loading
   */
  isLoading?: boolean;

  /**
   * Number of rows in the table
   */
  rowLength?: number;

  /**
   * Height of each row in the table
   */
  rowHeight?: number;

  /**
   * Callback fired when the user drags and drops a column
   */
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
}
