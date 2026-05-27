import React from 'react';
import IComboBoxTriggerProps from './IComboBoxTriggerProps';
import { buttonShapes, buttonSizes, buttonVariants } from '../../../button/types';
import { cn } from '@/lib';
import { IconExtend } from '../../../icon/components';

/**
 * A customizable input trigger for the ComboBox component.
 * Provides a text input field with optional prefix/suffix icons and keyboard shortcut indicator.
 */
const ComboBoxTrigger: React.FC<IComboBoxTriggerProps> = ({ children, className, disabled, isLoading, ...props }) => {
  /**
   * Common variant styles for the Button component
   */
  const commonVariants = {
    base: 'relative w-full flex items-center justify-between text-[length:var(--typography-base-sizes-small-font-size)] font-normal leading-[var(--typography-base-sizes-small-line-height)] transition-colors [&_svg]:shrink-0',
    rounded: 'rounded-[var(--border-radius-default)]',
    states: {
      default:
        'hover:cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--ring-offset)]',
      disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
      loading: 'disabled:opacity-50 disabled:cursor-progress',
    },
  };

  return (
    <button
      className={cn(
        commonVariants.base,
        commonVariants.rounded,
        commonVariants.states.default,
        buttonVariants.outline,
        buttonShapes.default,
        buttonSizes.default.base,
        disabled && commonVariants.states.disabled,
        isLoading && commonVariants.states.loading,
        'hover:bg-transparent',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
      <IconExtend icon="ChevronsUpDown" size={16} />
    </button>
  );
};

export default ComboBoxTrigger;
