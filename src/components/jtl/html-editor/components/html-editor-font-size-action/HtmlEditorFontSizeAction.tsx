import React, { useMemo } from 'react';
import { JTLDropdown, DropdownItem } from '../../../jtl-dropdown';
import type { IJTLDropdownMenuItemProps } from '../../../jtl-dropdown';
import { ToggleGroupItem } from '../../../toggle-group';
import IHtmlEditorFontSizeActionProps from './IHtmlEditorFontSizeActionProps';
import { DEFAULT_FONT_SIZE, FONT_SIZES } from '../../constants';
import { Tooltip } from '../../../tooltip';

/**
 * Font size toolbar action. Opens a dropdown with a scrollable list
 * of predefined sizes. The currently active size is marked with a
 * Check icon. Uses JTLDropdown for consistent dropdown behaviour.
 */
const HtmlEditorFontSizeAction: React.FC<IHtmlEditorFontSizeActionProps> = ({ onAction, selectedFontSize }) => {
  /**
   * Derives the trigger-button label from the currently active size.
   * Falls back to the default (14px) when no size is selected.
   */
  const triggerLabel = useMemo(() => `${selectedFontSize ?? DEFAULT_FONT_SIZE}px`, [selectedFontSize]);

  /**
   * Maps each predefined font size to a JTLDropdown menu item.
   * The currently active size receives a Check icon for visual feedback.
   * Dropdown closes automatically after selection (handled by JTLDropdown).
   */
  const menuItems: IJTLDropdownMenuItemProps[] = useMemo(
    () =>
      FONT_SIZES.map(size => ({
        type: DropdownItem.Checkbox,
        label: `${size}`,
        isSelected: selectedFontSize === size,
        // Dispatch typed action with numeric size — no string encoding needed.
        onClick: () => onAction('fontSize', { size }),
      })),
    [selectedFontSize, onAction],
  );

  return (
    <JTLDropdown menuItems={menuItems} position="center">
      {/* Toolbar trigger button – displays the current size, e.g. "14px" */}
      <Tooltip content="Schriftgröße" asChild>
        <ToggleGroupItem value="fontSize" label={triggerLabel} aria-label="Schriftgröße" />
      </Tooltip>
    </JTLDropdown>
  );
};

HtmlEditorFontSizeAction.displayName = 'HtmlEditorFontSizeAction';

export default HtmlEditorFontSizeAction;
