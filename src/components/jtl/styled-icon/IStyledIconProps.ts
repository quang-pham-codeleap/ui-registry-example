import { IconAnimation, IconType } from '../icon';
import { StyledIconSize, StyledIconVariant } from './types';

/**
 * Props for the StyledIcon component
 */
export default interface IStyledIconProps {
  /**
   * The variant of the icon
   * @default 'primary'
   */
  variant?: StyledIconVariant;

  /**
   * The size of the icon
   * @default 'default'
   */
  size?: StyledIconSize;

  /**
   * The name of the icon
   */
  icon: IconType;

  /**
   * The animation of the icon
   */
  animation?: IconAnimation;
}
