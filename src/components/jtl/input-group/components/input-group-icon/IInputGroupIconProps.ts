import { LucideIconName } from '../../../icon/IIconProps';
import { IconAnimation, IconSize } from '../../../icon/types';

/**
 * Props for the InputGroupIcon component
 * Wraps Icon component for pixel-perfect visual cues within InputGroup
 */
export default interface IInputGroupIconProps {
  /**
   * Name of the icon to render
   */
  name: LucideIconName;

  /**
   * Size of the addon icon
   * @default '16'
   */
  size?: IconSize;

  /**
   * Animation variant for the icon
   */
  animation?: IconAnimation;

  /**
   * Color of the icon (CSS color value or CSS variable)
   * @default 'currentColor'
   */
  color?: string;
}
