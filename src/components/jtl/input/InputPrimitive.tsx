import React from 'react';

import { cn } from '@/lib/utils';
import { IAffixContainerProps, IBadgeContainerProps, IInputContainerProps } from './InputPrimitiveProps';

/**
 * The BadgeContainer component displays a badge with a specified text.
 * It is styled with Tailwind CSS classes and supports truncation.
 *
 * @param {IBadgeContainerProps} props - The properties for the badge container.
 * @param {string} props.text - The text to display inside the badge.
 */
const BadgeContainer = ({ text }: IBadgeContainerProps) => (
  <span
    className={cn(
      'px-2.5',
      'py-0.5',
      'gap-1',
      'rounded-[var(--border-radius-full)]',
      'border',
      'border-[transparent]',
      'bg-[var(--secondary)]',
      'text-[var(--secondary-foreground)]',
      'text-[length:var(--typography-base-sizes-extra-small-font-size)]',
      'font-semibold',
      'leading-(--typography-base-sizes-extra-small-line-height)',
      'max-w-[50px]',
      'truncate',
    )}
    title={text}
  >
    {text}
  </span>
);
BadgeContainer.displayName = 'BadgeContainer';

/**
 * The AffixContainer component serves as a container for affixes (prefixes or suffixes) in an input.
 * It adjusts its border radius based on whether it is a suffix.
 *
 * @param {IAffixContainerProps} props - The properties for the affix container.
 * @param {string} props.text - The text to display inside the affix container.
 * @param {boolean} props.isSuffix - Indicates if the affix is a suffix.
 */
const AffixContainer = ({ text, isSuffix }: IAffixContainerProps) => {
  return (
    <div
      className={cn(
        'flex h-10 px-4 flex-col justify-center items-center bg-[var(--input)]',
        isSuffix
          ? 'rounded-[0px var(--border-radius-md) var(--border-radius-md) 0px]'
          : 'rounded-[var(--border-radius-md) 0px 0px var(--border-radius-md)]',
      )}
    >
      {text}
    </div>
  );
};

AffixContainer.displayName = 'AffixContainer';

/**
 * Base styles for input container
 */
const baseStyles = {
  base: `
  relative overflow-hidden flex items-center gap-2
  w-full
  rounded-md
  border border-[var(--input)] bg-[var(--background)]
  px-3
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors duration-200
`,
  default: 'h-10',
  sm: 'h-9',
};

/**
 * The InputContainer component wraps the input element with styling and behavior for focus and error states.
 * It manages focus state and applies styles based on the error prop.
 *
 * @param {IInputContainerProps} props - The properties for the input container.
 * @param {string} props.className - Additional class names to apply to the container.
 * @param {boolean} props.error - Indicates if there is an error state.
 */
const InputContainer: React.FC<IInputContainerProps & React.RefAttributes<HTMLDivElement>> = ({
  ref,
  className,
  error,
  readOnly,
  size = 'default',
  ...props
}) => {
  return (
    <div
      className={cn(
        'relative w-full outline-(length:--border-width-border-1) focus-within:outline-offset-2 outline-transparent rounded-[6px] transition-all transform',
        error ? 'outline-[var(--ring-error)] outline-offset-2' : 'focus-within:outline-[var(--ring)]',
      )}
      data-readonly={readOnly || undefined}
    >
      <div
        ref={ref}
        className={cn(baseStyles.base, baseStyles[size], readOnly && 'border-[var(--border)] bg-[var(--muted)]', className)}
        {...props}
      />
    </div>
  );
};

InputContainer.displayName = 'InputContainer';

/**
 * BaseInput component that provides core input functionality
 */
const BaseInput: React.FC<React.ComponentProps<'input'> & React.RefAttributes<HTMLInputElement>> = ({ ref, className, type, ...props }) => {
  const isFileInput = type === 'file';
  return (
    <input
      type={type}
      className={cn(
        'w-full bg-transparent outline-none',
        !isFileInput && 'border-0 p-0',
        'text-sm text-[var(--foreground)] font-normal',
        'placeholder:text-[var(--muted-foreground)] placeholder:font-normal',
        'disabled:cursor-not-allowed disabled:opacity-50',
        isFileInput && [
          'file:rounded-md',
          'file:border-[var(--input)]',
          'file:bg-[var(--background)]',
          'file:text-sm',
          'file:text-[var(--foreground)]',
          'file:font-normal',
          'file:px-3',
          'file:mt-[1px]',
        ],
        className,
      )}
      ref={ref}
      {...props}
    />
  );
};
BaseInput.displayName = 'BaseInput';

export { BadgeContainer, BaseInput, InputContainer, AffixContainer };
