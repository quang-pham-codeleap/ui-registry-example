import React from 'react';
import { cn } from '@/lib/utils';
import ISeparatorProps from './ISeparatorProps';

/**
 * A separator component that provides visual separation between elements
 * @param props {@link ISeparatorProps} - Props for the Separator component
 * @returns The rendered Separator component
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <Separator />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Vertical separator
 * function App() {
 *   return (
 *     <Separator orientation="vertical" />
 *   );
 * }
 * ```
 */
const Separator: React.FC<ISeparatorProps & React.RefAttributes<HTMLDivElement>> = ({ ref, orientation = 'horizontal' }) => {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn('shrink-0 bg-[var(--border)]', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]')}
    />
  );
};

Separator.displayName = 'Separator';

export default Separator;
