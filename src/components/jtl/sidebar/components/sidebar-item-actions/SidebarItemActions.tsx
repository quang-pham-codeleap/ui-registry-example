import { cn } from '@/lib/utils';
import type React from 'react';
import { useCallback } from 'react';
import { useSidebarContext } from '../../context';
import type ISidebarItemActionsProps from './ISidebarItemActionsProps';

/**
 * Container for item-level action buttons.
 * Hidden by default, shown on parent item hover.
 * Hidden when the sidebar is collapsed.
 * Stops click propagation to prevent triggering the parent item's onClick.
 */
const SidebarItemActions: React.FC<ISidebarItemActionsProps> = ({ className, children }) => {
  const { collapsed } = useSidebarContext();

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (collapsed) {
    return null;
  }

  return (
    <div
      role="presentation"
      onClick={handleClick}
      className={cn('ml-auto', 'flex', 'items-center', 'opacity-0', 'group-hover/sidebar-item:opacity-100', 'transition-opacity', className)}
    >
      {children}
    </div>
  );
};

SidebarItemActions.displayName = 'SidebarItemActions';

export default SidebarItemActions;
