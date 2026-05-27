import { Text } from '../../../text';
import { Tooltip } from '../../../tooltip';
import { cn } from '@/lib/utils';
import type React from 'react';
import { useSidebarContext } from '../../context';
import { SidebarRow } from '../sidebar-row';
import type ISidebarItemProps from './ISidebarItemProps';

/**
 * Leaf sidebar item. Navigates on click, no expand/collapse.
 * When sidebar is collapsed, shows icon only with tooltip on hover.
 */
const SidebarItem: React.FC<ISidebarItemProps> = ({ label, isActive = false, unsavedChanges = false, onClick, as, asProps, className, children }) => {
  const { collapsed } = useSidebarContext();

  const itemElement = (
    <SidebarRow
      isActive={isActive}
      as={as}
      asProps={asProps}
      onClick={onClick}
      collapsed={collapsed}
      aria-label={collapsed ? label : undefined}
      className={className}
    >
      {!collapsed && (
        <>
          {unsavedChanges && (
            <span aria-label="Unsaved changes" className={cn('size-2', 'shrink-0', 'rounded-full', 'bg-[var(--warning-text)]', 'order-first')} />
          )}
          <span className={cn('flex-1', 'min-w-0', 'flex', 'items-center', 'gap-1.5', 'text-left')}>
            <Text type="small" truncate>
              {label}
            </Text>
          </span>
        </>
      )}
      {children}
    </SidebarRow>
  );

  if (collapsed) {
    return (
      <li>
        <Tooltip content={label} side="right" asChild>
          {itemElement}
        </Tooltip>
      </li>
    );
  }

  return <li>{itemElement}</li>;
};

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
