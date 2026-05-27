import { IconType } from '../../../icon';
import { BadgeVariant } from '../../../badge/types';

/**
 * Props for the InputGroupBadge component
 * Wraps Badge component for status cues or counts within InputGroup
 */
export default interface IInputGroupBadgeProps {
  /**
   * The label text to display in the notice badge
   */
  label: string;

  /**
   * Badge variant for visual styling
   * @default 'secondary'
   */
  variant?: BadgeVariant;

  /**
   * Optional icon to display before the label
   */
  icon?: IconType;
}
