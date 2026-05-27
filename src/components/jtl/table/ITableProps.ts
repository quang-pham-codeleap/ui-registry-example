import React from 'react';
import { ITableColumnProps, ITableExpandableProps } from './interfaces';
import { HeaderStyle, TableSize, TableToolbarConfig } from './types';

/**
 * Props interface for the Table component
 */
export default interface ITableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Toolbar configuration rendered above the table using AppHeader.
   * Why "toolbar"? Avoids confusion with the table's <thead> (column headers).
   */
  toolbar?: TableToolbarConfig;

  /**
   * @deprecated Use `toolbar.title` instead.
   * Legacy alias for the AppHeader title rendered above the table when `toolbar` is not provided.
   */
  title?: string;

  /**
   * @deprecated Use `toolbar.subtitle` instead.
   * Legacy alias for the AppHeader description rendered above the table when `toolbar` is not provided.
   */
  description?: string;

  /**
   * Array of column configurations
   */
  columns: ITableColumnProps<T>[];

  /**
   * Array of data records to display
   */
  dataSource: T[];

  /**
   * Whether the table is in loading state
   */
  isLoading?: boolean;

  /**
   * Whether to show the table header
   * @default true
   */
  hasHeader?: boolean;

  /**
   * Custom content to display when there are no records
   */
  emptyContent?: React.ReactNode;

  /**
   * Whether to show column separator,
   * in case of 'headerOnly' the header will be shown but the body will not be shown,
   * in case of 'bodyOnly' the body will be shown but the header will not be shown,
   * @default false
   */
  hasColumnSeparator?: boolean | 'headerOnly' | 'bodyOnly';

  /**
   * Size of the table
   */
  size?: TableSize;

  /**
   * Height of the table
   */
  height?: number;

  /**
   * Callback function to be called when a row is clicked
   */
  onRowClick?: (record: T) => void;

  /**
   * Configuration for expandable rows
   */
  expandable?: ITableExpandableProps<T>;

  /**
   * Style for the table header
   */
  headerStyle?: HeaderStyle;
}
