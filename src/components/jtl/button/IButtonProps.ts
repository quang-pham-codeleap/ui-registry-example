import React from 'react';
import type { IconType } from '../icon';
import type { ButtonShape, ButtonSize, ButtonVariant } from './types';

/**
 * Button props interface extending the standard HTML button attributes
 * @interface IButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 */
export default interface IButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style' | 'children'> {
  /**
   * The label of the button
   */
  label?: string;

  /**
   * The shape of the button
   */
  shape?: ButtonShape;

  /**
   * The size of the button
   * @default "default"
   */
  size?: ButtonSize;

  /**
   * The visual style variant of the button
   * @default "default"
   */
  variant?: ButtonVariant;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Optional icon element to be rendered inside the button component
   */
  icon?: IconType;

  /**
   * The position of the icon element inside the button component
   */
  iconPosition?: 'left' | 'right';

  /**
   * Event handler for the button click event
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * The text to display inside the badge
   */
  badgeNum?: number;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Optional keyboard shortcut keys to display inside the button after the label.
   * Only shown on buttons with a visible label (not icon-only).
   * @example ['Ctrl', 'B']
   */
  shortcut?: string[];
}
