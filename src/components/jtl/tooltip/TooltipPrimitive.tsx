import React from 'react';
import { Provider, Root, Trigger, Content, Portal } from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

const TooltipProvider = Provider;

const Tooltip = Root;

const TooltipTrigger = Trigger;

const TooltipContent: React.FC<React.ComponentPropsWithRef<typeof Content>> = ({ ref, className, sideOffset = 4, ...props }) => (
  <Portal>
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50',
        'overflow-hidden',
        'rounded-[var(--border-radius-md)]',
        'border-[var(--border)]',
        'bg-[var(--popover)]',
        'px-3',
        'py-1.5',
        'text-[var(--popover-foreground)]',
        'text-(length:--typography-base-sizes-small-font-size)',
        'font-normal',
        'leading-[var(--typography-base-sizes-small-line-height)]',
        'animate-in',
        'fade-in-0',
        'zoom-in-95',
        'data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0',
        'data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        'shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.10),_0px_2px_4px_-1px_rgba(0,0,0,0.06)]',
        className,
      )}
      {...props}
    />
  </Portal>
);
TooltipContent.displayName = Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
