import React from 'react';
import { LayoutSectionVariant } from './types';

/**
 * Interface for Section component props
 */
export default interface ILayoutSectionProps {
  /**
   * The content to be rendered within the section
   */
  children?: React.ReactNode;

  /**
   * The variant style to apply to the section
   * - `fullWidth`: Takes up 100% of the available width
   * - `oneHalf`: Takes up approximately half of the container width (28.125rem)
   * - `oneThird`: Takes up approximately one third of the container width (15rem)
   */
  variant?: LayoutSectionVariant;
}
