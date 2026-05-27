import React from 'react';

/**
 * Props for the Pagination component
 */
export default interface IPaginationProps {
  /**
   * Total number of items
   */
  total: number;

  /**
   * Current page number
   */
  page: number;

  /**
   * A callback function triggered when the page number is changed.
   * @param page The new page number selected by the user.
   */
  pageSize?: number;

  /**
   * Callback function to handle page change
   * @param page The new page number selected by the user.
   */
  onPageChange: (page: number) => void;

  /**
   * Optional custom text for the 'Previous' page button.
   * @default 'Zurück'
   */
  previousText?: string;

  /**
   * Optional custom text for the 'Next' page button.
   * @default 'Weiter'
   */
  nextText?: string;

  /**
   * An optional callback to render a custom element displaying the total count.
   * @param total The total number of items available.
   * @returns A React.ReactNode to be rendered.
   * @example (total) => `Total ${total} items`
   */
  showTotal?: (total: number) => React.ReactNode;
}
