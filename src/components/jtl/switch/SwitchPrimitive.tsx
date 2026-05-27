import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';
import { ISwitchButtonProps } from './interfaces';

/**
 * Atomic Switch component that handles the core switch functionality
 */
const SwitchButton: React.FC<ISwitchButtonProps> = ({ ref, ...props }) => {
  const { value, onChange, disabled, ...rest } = props;

  return (
    <Switch.Root
      ref={ref}
      className={cn(
        'group',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-200 ease-in-out',
        'focus:outline-none focus-visible:ring focus-visible:ring-[var(--ring)]',
        'bg-[var(--input)]',
        'data-[state=checked]:bg-[var(--primary)]',
        disabled && 'cursor-not-allowed opacity-70',
      )}
      disabled={disabled}
      checked={value}
      onCheckedChange={onChange}
      {...rest}
    >
      <Switch.Thumb
        className={cn(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full',
          'bg-[var(--background)]',
          'transition duration-200 ease-in-out',
          'translate-x-0 data-[state=checked]:translate-x-5',
        )}
      />
    </Switch.Root>
  );
};

SwitchButton.displayName = 'SwitchButton';

export { SwitchButton };
