import React, { useCallback, useMemo, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../dropdown/DropdownPrimitives';
import { cn } from '@/lib/utils';
import { mapPositionToAlign } from './utils';
import { JTLDropdownMenuItem } from './components';
import IJTLDropdownProps from './IJTLDropdownProps';

/**
 * JTL Dropdown component that provides a flexible dropdown menu
 * @param props - Component props
 * @returns Rendered dropdown component
 */
const JTLDropdown: React.FC<IJTLDropdownProps> = ({ isOpen, defaultOpen = false, position = 'center', onClose, menuItems, children, width }) => {
  // Convert position to Radix UI align prop
  const align = useMemo(() => mapPositionToAlign(position), [position]);

  const isTriggerDisabled = useMemo(() => {
    if (!React.isValidElement<{ disabled?: boolean }>(children)) {
      return false;
    }

    return children.props.disabled === true;
  }, [children]);

  // Internal state for uncontrolled mode
  const [open, setOpen] = useState(defaultOpen);

  // Determine if we're in controlled or uncontrolled mode
  const isControlled = useMemo(() => isOpen !== undefined && onClose !== undefined, [isOpen, onClose]);

  // Create close handler based on mode
  const handleClose = useCallback(() => {
    if (isControlled) {
      onClose?.();
    } else {
      setOpen(false);
    }
  }, [isControlled, onClose]);

  // Determine the open state based on mode
  const openState = isControlled ? isOpen : open;

  // Handle dropdown open/close state changes
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (newOpen && isTriggerDisabled) {
        return;
      }

      if (isControlled) {
        // In controlled mode, call the provided onClose when dropdown is closing
        if (!newOpen) onClose?.();
      } else {
        // In uncontrolled mode, manage our own state
        setOpen(newOpen);
      }
    },
    [isControlled, isTriggerDisabled, onClose],
  );

  // Memoize the menu items to prevent unnecessary re-renders
  const menuItemElements = useMemo(() => {
    return menuItems.map((item, index) => <JTLDropdownMenuItem key={`${item.type}-${item.label}-${index}`} {...item} onClose={handleClose} />);
  }, [menuItems, handleClose]);

  return (
    <DropdownMenu open={openState} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild disabled={isTriggerDisabled}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        loop
        style={{ '--jtl-dropdown-content-width': width } as React.CSSProperties}
        className={cn('w-full', 'rounded-[var(--border-radius-md)] p-1', width && `w-[var(--jtl-dropdown-content-width)]`)}
      >
        {menuItemElements}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

JTLDropdown.displayName = 'JTLDropdown';

export default JTLDropdown;
