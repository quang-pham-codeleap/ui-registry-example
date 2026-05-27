import { LucideIconName } from '../../../icon/IIconProps';
import { IconSize } from '../../../icon';

/**
 * Props for the InputGroupTooltip component
 * Wraps Tooltip component for hover/focus guidance within InputGroup
 */
export default interface IInputGroupTooltipProps {
  /**
   * The tooltip content to display
   */
  content: string;

  /**
   * Name of the icon to use as trigger
   * @default 'Info'
   */
  icon?: LucideIconName;

  /**
   * Size of the icon in pixels
   * @default 16
   */
  iconSize?: IconSize;

  /**
   * The preferred side of the trigger to render the tooltip
   */
  side?: 'right' | 'left' | 'top' | 'bottom';

  /**
   * The preferred alignment against the trigger
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';

  /**
   * The distance in pixels from the trigger
   * @default 4
   */
  sideOffset?: number;

  /**
   * Optional delay duration in ms for showing the tooltip
   * @default 0
   */
  delayDuration?: number;
}
