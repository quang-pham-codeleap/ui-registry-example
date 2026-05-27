import { cn } from '@/lib/utils';
import type React from 'react';
import { useMemo } from 'react';
import { SidebarContext } from './context';
import { useSidebarCollapse } from './hooks';
import type ISidebarProps from './ISidebarProps';

/**
 * Sidebar root container.
 * Provides collapse/expand context to all children.
 * Supports both controlled and uncontrolled collapsed state.
 *
 * @example
 * ```tsx
 * <Sidebar defaultCollapsed={false}>
 *   <SidebarToggle />
 *   <SidebarGroup>...</SidebarGroup>
 * </Sidebar>
 * ```
 */
const Sidebar: React.FC<ISidebarProps> = ({
  collapsed: controlledCollapsed,
  defaultCollapsed,
  onCollapsedChange: onCollapsedChangeProp,
  width = '240px',
  collapsedWidth = '48px',
  className,
  children,
}) => {
  const { collapsed, onCollapsedChange } = useSidebarCollapse({
    collapsed: controlledCollapsed,
    defaultCollapsed,
    onCollapsedChange: onCollapsedChangeProp,
  });

  const contextValue = useMemo(() => ({ collapsed, onCollapsedChange }), [collapsed, onCollapsedChange]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <aside
        data-collapsed={collapsed}
        className={cn(
          'group/sidebar',
          'relative',
          'flex',
          'h-full',
          'flex-col',
          'overflow-visible',
          'bg-[var(--sidebar)]',
          'border-r',
          'border-[var(--border)]',
          'transition-[width]',
          'duration-200',
          'ease-in-out',
          className,
        )}
        style={{ width: collapsed ? collapsedWidth : width }}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
