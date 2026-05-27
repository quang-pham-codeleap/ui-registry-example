import React from 'react';
import { Column } from '../../types';

/**
 * Props for the GridCell component
 */
export default interface IGridCellProps {
  /**
   * Number of columns to span for different breakpoints
   */
  columnSpan?: Column;
  /**
   * Children elements
   */
  children?: React.ReactNode;
}
