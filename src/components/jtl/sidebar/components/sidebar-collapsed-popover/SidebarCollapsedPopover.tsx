import { cn } from '@/lib/utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SidebarContext, useSidebarContext } from '../../context';
import type ISidebarCollapsedPopoverProps from './ISidebarCollapsedPopoverProps';

/**
 * Popover shown when hovering a SidebarMenu in collapsed mode.
 * Displays the parent label and renders composed child elements in expanded form.
 * Overrides SidebarContext inside the popover so children render as if sidebar is expanded.
 */
const SidebarCollapsedPopover: React.FC<ISidebarCollapsedPopoverProps> = ({ label, menuChildren, children, className }) => {
  const { onCollapsedChange } = useSidebarContext();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Override context so children inside the popover render in expanded mode
  const popoverContextValue = useMemo(() => ({ collapsed: false, onCollapsedChange }), [onCollapsedChange]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setOpen(true), 200);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setOpen(false), 100);
  }, []);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}
        </div>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="right"
          sideOffset={8}
          align="start"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onOpenAutoFocus={e => e.preventDefault()}
          onCloseAutoFocus={e => e.preventDefault()}
          className={cn(
            'z-50',
            'min-w-[180px]',
            'rounded-[var(--border-radius-lg)]',
            'bg-[var(--background)]',
            'p-2',
            'shadow-[0px_4px_12px_0px_var(--shadow-10)]',
            'border',
            'border-[var(--border)]',
            'animate-in',
            'fade-in-0',
            'zoom-in-95',
            className,
          )}
        >
          {/* Parent label */}
          <div
            className={cn('px-2', 'py-1', 'font-medium', 'text-[length:var(--typography-base-sizes-small-font-size)]', 'text-[var(--foreground)]')}
          >
            {label}
          </div>

          {/* Override collapsed=false so children render in expanded form. */}
          <SidebarContext.Provider value={popoverContextValue}>
            <ul className={cn('flex', 'flex-col', 'border-l', 'border-[var(--border)]', 'ml-2', 'mt-1', 'pl-2', 'py-0.5')}>{menuChildren}</ul>
          </SidebarContext.Provider>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

SidebarCollapsedPopover.displayName = 'SidebarCollapsedPopover';

export default SidebarCollapsedPopover;
