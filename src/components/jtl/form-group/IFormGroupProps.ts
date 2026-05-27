import React from 'react';
import { FormGroupColumn } from './types';
import { Column } from '../grid/types';

/**
 * Interface for FormGroup component props
 */
export default interface IFormGroupProps {
  /**
   * The label text to display for the form group
   */
  label: string;
  /**
   * The content to be wrapped by the form group
   */
  children: React.ReactNode;

  /**
   * The number of columns for the grid layout.
   * Supports both legacy number format (1-12) and responsive Column object.
   *
   * **Legacy format (number):**
   * `columns={2}` — Creates a 2-column grid on large screens, 1 column on mobile.
   *
   * **Responsive format (object):**
   * `columns={{ xs: 1, sm: 2, lg: 3 }}` — Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns.
   *
   * @default { xs: 1, lg: 2 }
   */
  columns?: FormGroupColumn | Column;
}
