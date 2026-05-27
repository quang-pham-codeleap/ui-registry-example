import { Tooltip } from '../../../tooltip';
import { cn } from '@/lib/utils';
import type React from 'react';
import { Children, isValidElement, useCallback, useMemo, useState } from 'react';
import { SidebarMenuContext, useSidebarContext } from '../../context';
import { SidebarCollapsedPopover } from '../sidebar-collapsed-popover';
import type ISidebarMenuProps from './ISidebarMenuProps';

/**
 * Expandable parent sidebar item.
 * Wraps a SidebarMenuTrigger and child items.
 * Provides expand/collapse state via SidebarMenuContext.
 * When sidebar is collapsed, shows icon only with tooltip or popover on hover.
 */
const SidebarMenu: React.FC<ISidebarMenuProps> = ({ defaultOpen = false, open: controlledOpen, onOpenChange, children }) => {
  const { collapsed } = useSidebarContext();

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = useCallback(() => {
    const next = !isOpen;

    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  }, [isOpen, isControlled, onOpenChange]);

  // Separate SidebarMenuTrigger from child items
  let triggerElement: React.ReactNode = null;
  const menuChildren: React.ReactNode[] = [];

  Children.forEach(children, child => {
    if (isValidElement(child) && (child.type as React.FC)?.displayName === 'SidebarMenuTrigger') {
      triggerElement = child;
    } else {
      menuChildren.push(child);
    }
  });

  const canExpand = menuChildren.length > 0;

  const menuContextValue = useMemo(() => ({ isOpen, canExpand, toggle: handleToggle }), [isOpen, canExpand, handleToggle]);

  // Read label from trigger's props for collapsed tooltip/popover
  const label =
    triggerElement !== null && isValidElement(triggerElement) ? ((triggerElement as React.ReactElement<{ label?: string }>).props.label ?? '') : '';

  // Collapsed mode
  if (collapsed) {
    return (
      <SidebarMenuContext.Provider value={menuContextValue}>
        {menuChildren.length > 0 ? (
          <SidebarCollapsedPopover label={label} menuChildren={menuChildren}>
            <li>{triggerElement}</li>
          </SidebarCollapsedPopover>
        ) : (
          <li>
            <Tooltip content={label} side="right" asChild>
              {triggerElement}
            </Tooltip>
          </li>
        )}
      </SidebarMenuContext.Provider>
    );
  }

  return (
    <SidebarMenuContext.Provider value={menuContextValue}>
      <li>
        {triggerElement}

        {/* Children container with indentation + border-l */}
        {isOpen && menuChildren.length > 0 && (
          <ul className={cn('flex', 'flex-col', 'gap-1', 'border-l', 'border-[var(--sidebar-border)]', 'ml-3', 'pl-2', 'py-0.5')}>{menuChildren}</ul>
        )}
      </li>
    </SidebarMenuContext.Provider>
  );
};

SidebarMenu.displayName = 'SidebarMenu';

export default SidebarMenu;
