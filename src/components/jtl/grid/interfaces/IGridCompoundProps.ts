import React from 'react';
import { BaseGrid } from '../types';
import { IGridCellProps } from '../components';

/**
 * Define the compound component type
 */
export default interface IGridCompoundProps extends BaseGrid {
  /**
   * The GridCell component
   */
  Cell: React.ForwardRefExoticComponent<IGridCellProps & React.RefAttributes<HTMLDivElement>>;
}
