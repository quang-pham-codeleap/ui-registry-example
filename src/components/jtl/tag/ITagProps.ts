import { TagVariant, TagSize } from './types';
import { IconType } from '../icon';

/**
 * Props for the Tag component
 */
export default interface ITagProps {
  /**
   * The content to display inside the tag
   */
  label: string;

  /**
   * The visual style variant of the tag
   * @default 'default'
   */
  variant?: TagVariant;

  /**
   * The size of the tag
   * @default 'default'
   */
  size?: TagSize;

  /**
   * Optional icon to display before the tag text
   */
  icon?: IconType;

  /**
   * Whether to show the close button
   * @default true
   */
  closable?: boolean;

  /**
   * Callback function when the close button is clicked
   */
  onClose?: () => void;

  /**
   * Whether the tag is disabled
   * @default false
   */
  disabled?: boolean;
}
