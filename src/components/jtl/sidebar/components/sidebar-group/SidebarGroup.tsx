import { cn } from '@/lib/utils';
import type React from 'react';
import type ISidebarGroupProps from './ISidebarGroupProps';

/**
 * Groups sidebar items together with an optional divider.
 */
const SidebarGroup: React.FC<ISidebarGroupProps> = ({ hasDivider = false, className, children }) => (
  <div className={cn('flex', 'flex-col', 'gap-1', 'px-2', 'pb-2', hasDivider ? 'pt-0' : 'pt-2', className)}>
    {hasDivider && <div className="mb-2 border-t border-[var(--border)]" aria-hidden="true" />}
    {children}
  </div>
);

SidebarGroup.displayName = 'SidebarGroup';

export default SidebarGroup;
