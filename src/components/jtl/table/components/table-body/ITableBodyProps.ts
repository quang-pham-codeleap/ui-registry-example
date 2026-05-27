import React from 'react';
import { ITableRowProps } from '../table-row';

export default interface ITableBodyProps<T extends object> extends Omit<ITableRowProps<T>, 'record' | 'rowIndex'> {
  /**
   * Data source for the table body
   */
  dataSource: T[];

  /**
   * Content to display when the table body is empty
   */
  emptyStateContent: React.ReactNode;

  /**
   * Height of the table
   */
  height?: number;
}
