import { cn } from '@/lib/utils';
import type React from 'react';
import { useSidebarContext } from '../../context';
import type ISidebarFooterProps from './ISidebarFooterProps';

/**
 * Free slot at the bottom of the sidebar.
 * Hidden when the sidebar is collapsed.
 */
const SidebarFooter: React.FC<ISidebarFooterProps> = ({ className, children }) => {
  const { collapsed } = useSidebarContext();

  if (collapsed) {
    return null;
  }

  return <div className={cn('shrink-0', 'mt-auto', 'p-2', className)}>{children}</div>;
};

SidebarFooter.displayName = 'SidebarFooter';

export default SidebarFooter;
