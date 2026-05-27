import { cn } from '@/lib/utils';
import type React from 'react';
import { forwardRef, useCallback } from 'react';
import type ISidebarRowProps from './ISidebarRowProps';

/**
 * Internal shared row component for sidebar items.
 * Handles element rendering, keyboard interaction, and active styling.
 * Used by SidebarItem and SidebarMenuTrigger — not exported to consumers.
 */
const SidebarRow = forwardRef<HTMLElement, ISidebarRowProps>(
  ({ isActive = false, as, asProps, onClick, collapsed = false, 'aria-expanded': ariaExpanded, className, children, ...rest }, ref) => {
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.currentTarget.click();
      }
    }, []);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        onClick?.(e);
      },
      [onClick],
    );

    const Component = as ?? 'div';
    const componentProps = as
      ? { ...asProps, onClick: handleClick }
      : { role: 'button' as const, tabIndex: 0, onClick: handleClick, onKeyDown: handleKeyDown };

    return (
      <Component
        ref={ref}
        {...rest}
        {...componentProps}
        data-active={isActive}
        aria-expanded={ariaExpanded}
        className={cn(
          'group/sidebar-item',
          'flex',
          'w-full',
          'items-center',
          'gap-2',
          'h-8',
          'rounded-[var(--border-radius-md)]',
          'px-2',
          'text-[length:var(--typography-base-sizes-small-font-size)]',
          'text-[var(--sidebar-foreground)]',
          'transition-colors',
          'hover:bg-[var(--sidebar-accent)]',
          'focus-visible:outline-1',
          'focus-visible:outline-[var(--sidebar-ring)]',
          'cursor-pointer',
          collapsed && 'justify-center',
          isActive && [
            'bg-[var(--sidebar-active)]',
            'text-[var(--sidebar-accent-foreground)]',
            'shadow-[0px_1px_3px_0px_var(--shadow-10),0px_1px_2px_0px_var(--shadow-5)]',
          ],
          className,
        )}
      >
        {children}
      </Component>
    );
  },
);

SidebarRow.displayName = 'SidebarRow';

export default SidebarRow;
