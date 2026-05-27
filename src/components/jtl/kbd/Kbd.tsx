import React from 'react';
import { cn } from '@/lib/utils';
import IKbdProps from './IKbdProps';
import { kbdVariants } from './types';

/**
 * Kbd component for displaying a single keyboard key.
 * Uses the native `<kbd>` element for screen reader semantics.
 *
 * @param props {@link IKbdProps} - The component props
 *
 * @example
 * <Kbd>Ctrl</Kbd>
 *
 * @example
 * <Kbd variant="secondary">Enter</Kbd>
 *
 * @example
 * // For symbol keys, provide aria-label for screen reader accessibility:
 * <Kbd aria-label="Command">⌘</Kbd>
 */
const Kbd: React.FC<IKbdProps & React.RefAttributes<HTMLElement>> = ({ variant = 'default', children, ref, className, ...props }) => {
  return (
    <kbd
      ref={ref}
      className={cn([
        'inline-flex',
        'min-w-5',
        'items-center',
        'justify-center',
        'px-1',
        'py-1',
        'rounded-[var(--border-radius-default)]',
        'text-[length:var(--typography-base-sizes-extra-small-font-size)]',
        'font-[number:var(--font-weight-semibold)]',
        'uppercase',
        ...kbdVariants[variant],
        className,
      ])}
      {...props}
    >
      {children}
    </kbd>
  );
};

Kbd.displayName = 'Kbd';

export default Kbd;
