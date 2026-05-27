import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type React from 'react';
import { useCallback } from 'react';
import { useSidebarContext } from '../../context';
import type ISidebarToggleProps from './ISidebarToggleProps';

/**
 * Toggle button to collapse/expand the sidebar.
 * When expanded: small button at the top-right edge, partially overlapping the border.
 * When collapsed: larger square button centered at the top of the sidebar.
 */
const SidebarToggle: React.FC<ISidebarToggleProps> = ({ className }) => {
  const { collapsed, onCollapsedChange } = useSidebarContext();

  const handleClick = useCallback(() => {
    onCollapsedChange(!collapsed);
  }, [collapsed, onCollapsedChange]);

  const Icon = collapsed ? ChevronRight : ChevronLeft;

  if (collapsed) {
    return (
      <div className="flex justify-center p-2 pb-0">
        <button
          type="button"
          aria-label="Expand sidebar"
          onClick={handleClick}
          className={cn(
            'flex',
            'items-center',
            'justify-center',
            'size-7',
            'rounded-[var(--border-radius-md)]',
            'border',
            'border-[var(--input)]',
            'bg-[var(--background)]',
            'hover:bg-[var(--sidebar-accent)]',
            'transition-colors',
            'cursor-pointer',
            className,
          )}
        >
          <Icon className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label="Collapse sidebar"
      onClick={handleClick}
      className={cn(
        'absolute',
        'right-0',
        'top-3',
        'z-10',
        'translate-x-1/2',
        'flex',
        'items-center',
        'justify-center',
        'size-7',
        'rounded-[var(--border-radius-md)]',
        'border',
        'border-[var(--input)]',
        'bg-[var(--background)]',
        'hover:bg-[var(--sidebar-accent)]',
        'transition-colors',
        'cursor-pointer',
        className,
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

SidebarToggle.displayName = 'SidebarToggle';

export default SidebarToggle;
