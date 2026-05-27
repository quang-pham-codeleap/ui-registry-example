import React from 'react';
import { LinkTarget } from './types';
import { IconType } from '../icon';

export default interface ILinkProps {
  /**
   * The URL to link to
   */
  url: string;

  /**
   * The target of the link (NOTE: if "_blank", it's external and shows an icon)
   */
  target?: LinkTarget;

  /**
   * Applies a single-color (monochrome) style to link color
   */
  isMonochrome?: boolean;

  /**
   * The text decoration underline from the link
   */
  hasUnderline?: boolean;

  /**
   * Callback function triggered when the link is clicked
   */
  onClick?: () => void;

  /**
   * Optional ID for the link
   */
  id?: string;

  /**
   * Optional icon displayed on the right side
   */
  icon?: IconType;

  /**
   * Children content
   */
  children: React.ReactNode;

  /**
   * Icon position
   */
  iconPosition?: 'left' | 'right';

  /**
   * When true, truncates overflowing text with an ellipsis and shows the full
   * content in a tooltip on hover. The link is also width-constrained
   * (`max-w-full` / `min-w-0`) so it can shrink inside flex/grid parents.
   * Defaults to `false`.
   */
  truncate?: boolean;
}
