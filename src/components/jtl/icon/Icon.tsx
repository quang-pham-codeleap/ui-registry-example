import React from 'react';
import * as LucideIcons from 'lucide-react';
import type IIconProps from './IIconProps';
import type { LucideIcon, LucideIconName } from './IIconProps';
import { CustomIcon, CustomIconName } from './custom-icon';
import { cn } from '@/lib';
import { iconAnimations } from './types';

/**
 * Gets the icon component name with 'Icon' suffix
 * @param name - Base icon name
 * @returns Icon name with 'Icon' suffix
 */
const getIconComponentName = (name: LucideIconName): string => `${name}Icon`;

/**
 * Type guard to check if a value is a valid Lucide icon component
 * @param component - Value to check
 * @returns True if the value is a Lucide icon component
 */
const isIconComponent = (component: LucideIcon): component is LucideIcon => {
  return !!component && 'displayName' in component && typeof component.displayName === 'string';
};

/**
 * Icon component that renders Lucide or custom icons with optional animations.
 * This component handles both standard Lucide icons and custom SVG icons with consistent props.
 *
 * @component
 *
 * @param props {@link IIconProps} - Icon component props including name and standard Lucide props
 *
 * @example
 * // Basic usage with Lucide icon
 * <Icon name="Check" />
 *
 * @example
 * // With custom size
 * <Icon name="AlertCircle" size={16} />
 *
 * @example
 * // With animation
 * <Icon name="Loader" animation="spin" />
 *
 * @example
 * // With custom icon
 * <Icon name="JTL_Apple" size={24} />
 *
 * @example
 * // With forwarded ref
 * import { useRef } from 'react';
 * const iconRef = useRef(null);
 * <Icon ref={iconRef} name="Check" />
 *
 * @returns {JSX.Element} Icon component
 */
const Icon: React.FC<IIconProps & React.RefAttributes<SVGSVGElement>> = ({ ref, name, animation, size = 20, ...props }) => {
  if (name in CustomIconName) {
    return <CustomIcon name={name as CustomIconName} size={size} className={cn(animation && iconAnimations[animation])} {...props} />;
  }

  const componentName = getIconComponentName(name);
  const IconComponent = LucideIcons[componentName as keyof typeof LucideIcons] as LucideIcon;

  if (!isIconComponent(IconComponent)) {
    console.warn(`Invalid icon name: ${name}`);
    return null;
  }

  return (
    <IconComponent
      ref={ref}
      role="svg"
      size={size}
      strokeWidth={2}
      color="currentColor"
      className={cn(animation && iconAnimations[animation])}
      {...props}
    />
  );
};

Icon.displayName = 'Icon';

export default Icon;
