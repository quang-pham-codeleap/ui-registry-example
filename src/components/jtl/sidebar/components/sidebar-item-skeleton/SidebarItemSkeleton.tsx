import { cn } from '@/lib/utils';
import type React from 'react';
import type ISidebarItemSkeletonProps from './ISidebarItemSkeletonProps';

/**
 * Loading skeleton placeholder for a sidebar item.
 */
const SidebarItemSkeleton: React.FC<ISidebarItemSkeletonProps> = ({ className }) => (
  <li className={cn('flex', 'items-center', 'gap-2', 'h-8', 'px-2', className)}>
    <div className={cn('h-3', 'flex-1', 'rounded-[var(--border-radius-md)]', 'bg-[var(--skeleton)]', 'animate-pulse', className)} />
  </li>
);

SidebarItemSkeleton.displayName = 'SidebarItemSkeleton';

export default SidebarItemSkeleton;
