import React from 'react';
import { cn } from '@/lib/utils';
import { Icon, iconAnimations, LucideIconName } from '../icon';
import { styledIconVariants, styledIconSizes } from './types';
import IStyledIconProps from './IStyledIconProps';

/**
 * StyledIcon component provides a visually styled wrapper around the Icon component.
 * It adds background colors, sizing, and styling based on the selected variant.
 *
 * @component
 *
 * @param props {@link IStyledIconProps} - The component props
 *
 * @example
 * // Basic usage
 * <StyledIcon name="Check" />
 *
 * @example
 * // With different variant
 * <StyledIcon name="AlertCircle" variant="danger" />
 *
 * @example
 * // With custom size
 * <StyledIcon name="ArrowRight" size="lg" />
 *
 * @example
 * // With animation
 * <StyledIcon name="Loader" animation="spin" />
 *
 * @returns {JSX.Element} StyledIcon component
 */
const StyledIcon: React.FC<IStyledIconProps> = ({ variant = 'primary', size = 'default', icon, animation }) => {
  if (typeof icon === 'string') {
    return (
      <div
        className={cn(
          'flex items-center justify-center flex-shrink-0',
          'rounded-[var(--border-radius-md)]',
          styledIconVariants[variant],
          styledIconSizes[size],
        )}
      >
        <Icon name={icon as LucideIconName} animation={animation} />
      </div>
    );
  }
  return (
    <div className={cn('flex items-center justify-center', 'rounded-[var(--border-radius-md)]', styledIconVariants[variant], styledIconSizes[size])}>
      <div className={cn(animation && iconAnimations[animation])}>{icon}</div>
    </div>
  );
};

export default StyledIcon;
