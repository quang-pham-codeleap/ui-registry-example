import type { BadgeVariant } from './types';
import type { IconType } from '../icon';

/**
 * Props for the Badge component
 */
export default interface IBadgeProps {
  /**
   * The content to display inside the badge
   */
  label: string;

  /**
   * The visual style variant of the badge
   * @default 'default'
   */
  variant?: BadgeVariant;

  /**
   * Optional icon to display before the badge text
   */
  icon?: IconType;
}
