import React from 'react';
import { cn } from '@/lib/utils';
import ICustomIconProps from './interfaces/ICustomIconProps';
import { getIconComponent } from './utils';
import SVGStringComponent from './components/SVGStringComponent';

/**
 * CustomIcon component that renders SVG icons from the custom icons directory
 * @param props - The component props
 * @returns The rendered icon or null if the icon is not found
 */
const CustomIcon: React.FC<ICustomIconProps & React.RefAttributes<SVGSVGElement>> = ({
  ref,
  name,
  size = 24,
  className,
  color = 'currentColor',
  children,
  ...rest
}) => {
  /**
   * Get the SVG component for the icon
   */
  const IconComponent = getIconComponent(name);

  /**
   * If the icon doesn't exist, return null
   */
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  /**
   * Common props for both SVG and img elements
   */
  const commonProps = {
    width: size,
    height: size,
    className: cn('inline-block', className),
  };

  /**
   * If IconComponent is a string, render SVGStringComponent
   */
  if (typeof IconComponent === 'string') {
    return (
      <SVGStringComponent ref={ref} svgString={IconComponent} name={name} commonProps={commonProps} fill={color} {...rest}>
        {children}
      </SVGStringComponent>
    );
  }

  /**
   * Render SVG component
   */
  return (
    <IconComponent ref={ref} {...commonProps} fill={color} aria-label={name} role="img" {...rest}>
      {children}
    </IconComponent>
  );
};

CustomIcon.displayName = 'CustomIcon';

export default CustomIcon;
