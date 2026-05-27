import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { CustomIconName as CustomIconNameEnum } from './custom-icon';
import type { IconAnimation, IconSize } from './types';

/** Props for Lucide icons with proper ref handling */
type OriginLucideProps = Omit<LucideProps, 'ref' | 'absoluteStrokeWidth' | 'strokeWidth'> & React.RefAttributes<SVGSVGElement>;

/** Type for Lucide icon components with proper ref forwarding */
export type LucideIcon = React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;

/**
 * Valid Lucide icon names without the 'Icon' suffix
 * Example: 'CheckCircle', 'AlertTriangle'
 */
type BaseLucideIconName = keyof {
  [K in keyof typeof LucideIcons as K extends `${infer Name extends `${Uppercase<string>}${string}`}Icon` ? Name : never]: (typeof LucideIcons)[K];
};

/**
 * Extract custom icon names from the CustomIconName enum
 */
type CustomIconName = keyof typeof CustomIconNameEnum;

/**
 * Combined type for all available icon names
 * Includes both Lucide icons and custom icons
 */
export type LucideIconName = BaseLucideIconName | CustomIconName;

/**
 * Props for the Icon component
 * @extends OriginLucideProps - Includes all Lucide icon props
 */
export default interface IIconProps extends OriginLucideProps {
  /** Name of the icon to render (either Lucide or custom) */
  name: LucideIconName;

  /** Animation variant for the icon */
  animation?: IconAnimation;

  /** Size of the icon */
  size?: IconSize;
}
