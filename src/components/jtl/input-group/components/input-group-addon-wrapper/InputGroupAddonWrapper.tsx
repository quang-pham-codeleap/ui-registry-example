import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { inputGroupSizes, inputGroupSideBorderRadius } from '../../types';
import { useInputGroupContext, useInputGroupAddonContext } from '../../hooks';
import IInputGroupAddonWrapperProps from './IInputGroupAddonWrapperProps';

/**
 * Shared wrapper component for InputGroup addon elements
 * Handles common styling logic for positioning addon components within the input group
 * Used by InputGroupIcon, InputGroupBadge, InputGroupTooltip, etc.
 *
 * @param props {@link IInputGroupAddonWrapperProps} - Props for the wrapper
 * @returns The rendered wrapper with consistent styling
 */
const InputGroupAddonWrapper: React.FC<IInputGroupAddonWrapperProps> = ({ children, className }) => {
  /**
   * Get context values from parent InputGroup and InputGroupAddon
   */
  const { size } = useInputGroupContext();
  const { inline, side } = useInputGroupAddonContext();

  /**
   * Compute styles based on size and side
   */
  const sizeStyles = useMemo(() => inputGroupSizes[size], [size]);
  const sideStyles = useMemo(() => inputGroupSideBorderRadius[side], [side]);

  /**
   * Container styles for positioning the addon within the input group
   */
  const containerStyles = cn(
    'flex items-center justify-center',
    'bg-[var(--background)]',
    'border border-[var(--input)]',
    !inline && sizeStyles.height,
    !inline && 'px-3',
    side === 'left' ? 'border-r-0' : 'border-l-0',
    sideStyles.borderRadius,
    inline && 'border-0 p-0',
    className,
  );

  return <div className={containerStyles}>{children}</div>;
};

InputGroupAddonWrapper.displayName = 'InputGroupAddonWrapper';

export default InputGroupAddonWrapper;
