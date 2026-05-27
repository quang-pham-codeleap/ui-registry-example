import { cn } from '@/lib/utils';
import type React from 'react';
import type ISidebarItemIconProps from './ISidebarItemIconProps';

/**
 * Renders an icon for a sidebar item.
 * Accepts an Icon component via `children`.
 *
 * @example
 * <SidebarItemIcon><Icon name="home" /></SidebarItemIcon>
 * <SidebarItemIcon><Folder /></SidebarItemIcon>
 */
const SidebarItemIcon: React.FC<ISidebarItemIconProps> = ({ className, children }) => {
  if (!children) {
    return null;
  }

  return <span className={cn('order-[-1]', 'size-4', 'shrink-0', 'flex', 'items-center', 'justify-center', className)}>{children}</span>;
};

SidebarItemIcon.displayName = 'SidebarItemIcon';

export default SidebarItemIcon;
