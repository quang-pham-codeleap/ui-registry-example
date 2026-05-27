import { cn } from '@/lib/utils';
import type React from 'react';
import { useSidebarContext } from '../../context';
import type ISidebarHeaderProps from './ISidebarHeaderProps';

/**
 * Free slot at the top of the sidebar.
 * Hidden when the sidebar is collapsed.
 */
const SidebarHeader: React.FC<ISidebarHeaderProps> = ({ className, children }) => {
  const { collapsed } = useSidebarContext();

  if (collapsed) {
    return null;
  }

  return <div className={cn('shrink-0', 'p-2', className)}>{children}</div>;
};

SidebarHeader.displayName = 'SidebarHeader';

export default SidebarHeader;
