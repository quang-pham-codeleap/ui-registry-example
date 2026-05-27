import React from 'react';
import { CustomIconName } from '../types';

/**
 * Props for the CustomIcon component
 */
export default interface ICustomIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Name of the icon to display
   */
  name: CustomIconName;

  /**
   * Size of the icon in pixels
   * @default 24
   */
  size?: number;

  /**
   * Additional class names to apply to the icon
   */
  className?: string;

  /**
   * Color of the icon
   * @default 'currentColor'
   */
  color?: string;
}
