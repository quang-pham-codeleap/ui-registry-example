import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';

type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  orientation?: 'vertical' | 'horizontal' | 'both';
};

const ScrollArea: React.FC<ScrollAreaProps> = ({ ref, className, children, orientation = 'both', onScroll, ...props }) => {
  return (
    <ScrollAreaPrimitive.Root className={cn('relative overflow-hidden', className)} {...props}>
      <ScrollAreaPrimitive.Viewport ref={ref} className="h-full w-full rounded-[inherit]" onScroll={onScroll}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      {['vertical', 'both'].includes(orientation) && <ScrollBar orientation="vertical" />}
      {['horizontal', 'both'].includes(orientation) && <ScrollBar orientation="horizontal" />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
};

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar: React.FC<React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>> = ({
  ref,
  className,
  orientation = 'vertical',
  ...props
}) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      'z-[1]',
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-[var(--border)]" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
