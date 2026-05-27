import React, { useCallback } from 'react';
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '../../../dropdown/DropdownPrimitives';
import { DropdownItem } from '../../types';
import { JTLDropdownDefaultMenuItem } from '../jtl-dropdown-default-menu-item';
import { JTLDropDownSubMenuItem } from '../jtl-dropdown-sub-menu-item';
import IJTLDropdownMenuItemProps from './IJTLDropdownMenuItemProps';

/**
 * Menu item component that renders the appropriate item based on type
 */
const JTLDropdownMenuItem = React.memo((props: IJTLDropdownMenuItemProps) => {
  const { type, label, icon, shortcut, onClick, isDisabled, children, isSelected, onClose } = props;

  // Handle click with optional close (mouse-driven items)
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onClick?.();

      // Close dropdown for items that should close on selection
      if (type !== DropdownItem.SubMenuTrigger && type !== DropdownItem.Label && type !== DropdownItem.Separator && type !== DropdownItem.Checkbox) {
        onClose?.();
      }
    },
    [onClick, onClose, type],
  );

  // Handle checkbox state change — fires for BOTH mouse clicks and keyboard activation
  // (Enter/Space). Radix CheckboxItem fires onCheckedChange on all interaction types,
  // whereas onClick only fires for pointer events. Checkbox items intentionally do NOT
  // close the dropdown so the user can toggle multiple options.
  const handleCheckboxChange = useCallback(() => {
    onClick?.();
  }, [onClick]);

  switch (type) {
    case DropdownItem.Default:
      return <JTLDropdownDefaultMenuItem label={label} icon={icon} shortcut={shortcut} isDisabled={isDisabled} onClick={handleClick} />;

    case DropdownItem.Separator:
      return <DropdownMenuSeparator />;

    case DropdownItem.Label:
      return <DropdownMenuLabel>{label}</DropdownMenuLabel>;

    case DropdownItem.Checkbox:
      return (
        // onCheckedChange is the correct Radix API — fires for both mouse and keyboard activation.
        // onSelect is overridden to prevent the default dismiss behaviour so that the user can
        // toggle multiple checkboxes without the dropdown closing after each interaction.
        <DropdownMenuCheckboxItem checked={isSelected} onCheckedChange={handleCheckboxChange} onSelect={e => e.preventDefault()}>
          {label}
        </DropdownMenuCheckboxItem>
      );

    case DropdownItem.SubMenuTrigger:
      return (
        <JTLDropDownSubMenuItem
          label={label}
          icon={icon}
          shortcut={shortcut}
          isDisabled={isDisabled}
          onClick={handleClick}
          children={children}
          onClose={onClose}
        />
      );

    default:
      return <DropdownMenuItem disabled>{label}</DropdownMenuItem>;
  }
});

JTLDropdownMenuItem.displayName = 'JTLDropdownMenuItem';

export default JTLDropdownMenuItem;
