import { cn } from '@/lib/utils';
import type React from 'react';
import type ISidebarGroupActionsProps from './ISidebarGroupActionsProps';

/**
 * Container for group action buttons (add, search, more).
 */
const SidebarGroupActions: React.FC<ISidebarGroupActionsProps> = ({ className, children }) => (
  <div className={cn('flex', 'items-center', 'gap-2', className)}>{children}</div>
);

SidebarGroupActions.displayName = 'SidebarGroupActions';

export default SidebarGroupActions;
