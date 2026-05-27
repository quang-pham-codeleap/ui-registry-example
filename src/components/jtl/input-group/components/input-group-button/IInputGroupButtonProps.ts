import { IconType } from '../../../icon';
import { ButtonVariant } from '../../../button/types';

/**
 * Props for the InputGroupButton component
 * Wraps Button component with auto-adjusting size/style logic to match input height
 */
export default interface IInputGroupButtonProps {
  /**
   * The label to display on the button
   */
  label?: string;

  /**
   * Optional icon to display in the button
   */
  icon?: IconType;

  /**
   * Position of the icon relative to the label
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';

  /**
   * Button variant style
   * @default 'default'
   */
  variant?: ButtonVariant;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button is in loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Click event handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
