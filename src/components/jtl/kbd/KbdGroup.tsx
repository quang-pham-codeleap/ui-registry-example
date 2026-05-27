import React from 'react';
import { cn } from '@/lib/utils';
import IKbdGroupProps from './IKbdGroupProps';

/**
 * KbdGroup component for displaying multiple keyboard keys together.
 * Wraps `Kbd` elements (and optional separator spans) in a flex row.
 * Place `<span>+</span>` between keys explicitly for a separator — this
 * keeps the API composable, following the same convention as shadcn/ui.
 *
 * @param props {@link IKbdGroupProps} - The component props
 *
 * @example
 * // Keys side by side (no separator)
 * <KbdGroup>
 *   <Kbd>Ctrl</Kbd>
 *   <Kbd>B</Kbd>
 * </KbdGroup>
 *
 * @example
 * // Keys with explicit "+" separator
 * <KbdGroup>
 *   <Kbd>Ctrl</Kbd>
 *   <span aria-hidden="true">+</span>
 *   <Kbd>B</Kbd>
 * </KbdGroup>
 */
const KbdGroup: React.FC<IKbdGroupProps & React.RefAttributes<HTMLSpanElement>> = ({ children, ref, className, ...props }) => {
  return (
    <span role="group" ref={ref} className={cn('inline-flex items-center gap-1', className)} {...props}>
      {children}
    </span>
  );
};

KbdGroup.displayName = 'KbdGroup';

export default KbdGroup;
