import React from 'react';
import { DropdownMenuItem } from '../../../dropdown/DropdownPrimitives';
import { JTLDropdownMenuIcon } from '../jtl-dropdown-menu-icon';
import { JTLDropdownMenuShortcut } from '../jtl-dropdown-menu-shortcut';
import IJTLDropdownDefaultMenuItemProps from './IJTLDropdownDefaultMenuItemProps';
/**
 * Default menu item component
 */
const JTLDropdownDefaultMenuItem = React.memo(({ label, icon, shortcut, isDisabled, onClick }: IJTLDropdownDefaultMenuItemProps) => (
  <DropdownMenuItem onClick={isDisabled ? undefined : onClick} disabled={isDisabled}>
    <JTLDropdownMenuIcon icon={icon} />
    {label}
    <JTLDropdownMenuShortcut shortcut={shortcut} />
  </DropdownMenuItem>
));

JTLDropdownDefaultMenuItem.displayName = 'JTLDropdownDefaultMenuItem';

export default JTLDropdownDefaultMenuItem;
