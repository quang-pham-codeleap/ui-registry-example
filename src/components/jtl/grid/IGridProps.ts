import React from 'react';
import { Column } from './types';

/**
 * Props for the Grid component
 */
export default interface IGridProps {
  /**
   * Number of columns for different breakpoints
   */
  columns?: Column;

  /**
   * Children elements
   */
  children?: React.ReactNode;
}
