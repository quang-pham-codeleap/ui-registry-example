import React from 'react';
import { DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '../../../dropdown/DropdownPrimitives';
import { cn } from '@/lib/utils';
import IJTLDropDownSubMenuItemProps from './IJTLDropDownSubMenuItemProps';
import { JTLDropdownMenuIcon } from '../jtl-dropdown-menu-icon';
import { JTLDropdownMenuShortcut } from '../jtl-dropdown-menu-shortcut';
import { JTLDropdownMenuItem } from '../jtl-dropdown-menu-item';

/**
 * Submenu item component
 */
const JTLDropDownSubMenuItem = React.memo((props: IJTLDropDownSubMenuItemProps) => {
  const { label, icon, shortcut, isDisabled, onClick, children, onClose } = props;

  // If no children, render as disabled item
  if (!children || children.length === 0) {
    return <DropdownMenuItem disabled>{label}</DropdownMenuItem>;
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger onClick={isDisabled ? undefined : onClick} disabled={isDisabled} className={cn(isDisabled && 'opacity-50')}>
        <JTLDropdownMenuIcon icon={icon} />
        {label}
        <JTLDropdownMenuShortcut shortcut={shortcut} />
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        {children.map((childItem, index) => (
          <JTLDropdownMenuItem key={`${childItem.type}-${childItem.label}-${index}`} {...childItem} onClose={onClose} />
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
});

JTLDropDownSubMenuItem.displayName = 'JTLDropDownSubMenuItem';

export default JTLDropDownSubMenuItem;
