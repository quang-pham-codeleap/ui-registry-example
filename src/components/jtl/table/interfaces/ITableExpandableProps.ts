import React from 'react';

/**
 * Props interface for the expandable row configuration
 */
export default interface ITableExpandableProps<T> {
  /**
   * Function to render the expanded row content
   * @param record - The data record for the row
   * @returns React node to display in the expanded row
   */
  expandedRowRender: (record: T) => React.ReactNode;

  /**
   * Function to determine if a row can be expanded. If not provided, all rows are expandable.
   * @param record - The data record for the row
   * @returns True if the row can be expanded, false otherwise
   */
  expandableCondition?: (record: T) => boolean;
}
