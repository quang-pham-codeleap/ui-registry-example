import React from 'react';
import { cn } from '@/lib/utils';
import IButtonGroupSeparatorProps from './IButtonGroupSeparatorProps';

/**
 * ButtonGroupSeparator component for adding visual dividers between button groups
 * @param props {@link IButtonGroupSeparatorProps} - The component props
 * @returns The rendered separator component
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button label="Left" />
 *   <ButtonGroupSeparator />
 *   <Button label="Right" />
 * </ButtonGroup>
 * ```
 */
const ButtonGroupSeparator: React.FC<IButtonGroupSeparatorProps> = ({ orientation = 'horizontal', ...props }) => {
  return <div className={cn('bg-[var(--border)]', orientation === 'horizontal' ? 'w-px h-full' : 'h-px w-full')} aria-hidden="true" {...props} />;
};

ButtonGroupSeparator.displayName = 'ButtonGroupSeparator';

export default ButtonGroupSeparator;
