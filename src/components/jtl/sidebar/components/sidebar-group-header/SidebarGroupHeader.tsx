import { cn } from '@/lib/utils';
import type React from 'react';
import { useSidebarContext } from '../../context';
import type ISidebarGroupHeaderProps from './ISidebarGroupHeaderProps';

/**
 * Container for group label and actions.
 * Hidden when the sidebar is collapsed.
 */
const SidebarGroupHeader: React.FC<ISidebarGroupHeaderProps> = ({ className, children }) => {
  const { collapsed } = useSidebarContext();

  if (collapsed) {
    return null;
  }

  return <div className={cn('flex', 'items-center', 'justify-between', 'px-2', 'py-1', className)}>{children}</div>;
};

SidebarGroupHeader.displayName = 'SidebarGroupHeader';

export default SidebarGroupHeader;
