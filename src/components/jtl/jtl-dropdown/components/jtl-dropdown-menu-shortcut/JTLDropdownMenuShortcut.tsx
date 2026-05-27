import React from 'react';
import { DropdownMenuShortcut } from '../../../dropdown/DropdownPrimitives';
import IJTLDropdownMenuShortcutProps from './IJTLDropdownMenuShortcutProps';

/**
 * Renders a keyboard shortcut
 * @param shortcut - Shortcut text
 * @returns Rendered shortcut component or null
 */
const JTLDropdownMenuShortcut = React.memo(({ shortcut }: IJTLDropdownMenuShortcutProps) => {
  if (!shortcut) {
    return null;
  }
  return <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>;
});

JTLDropdownMenuShortcut.displayName = 'JTLDropdownMenuShortcut';

export default JTLDropdownMenuShortcut;
