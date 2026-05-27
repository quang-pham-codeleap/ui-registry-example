import React from 'react';

/**
 * Props for the DataTableEmpty component
 */
export default interface IDataTableEmptyProps {
  /**
   * Number of columns to span
   */
  colSpan: number;

  /**
   * Content to display when the table is empty
   */
  emptyContent: React.ReactNode;
}
