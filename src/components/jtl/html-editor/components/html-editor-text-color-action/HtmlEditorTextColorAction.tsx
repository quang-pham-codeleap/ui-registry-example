import React, { useCallback } from 'react';
import { HtmlEditorToolbarPopoverAction } from '../html-editor-toolbar-popover-action';
import { Box } from '../../../box';
import { Icon } from '../../../icon';
import IHtmlEditorTextColorActionProps from './IHtmlEditorTextColorActionProps';
import { Button } from '../../../button';
import { HtmlEditorColorSwatchGrid } from '../html-editor-color-swatch-grid';
import { HtmlEditorHexColorInput } from '../html-editor-hex-color-input';
import { useHtmlEditorTextColor } from '../../hooks';

/**
 * Text-color toolbar action.
 *
 * Opens a popover containing:
 *   1. A tab bar: "Text" (foreground) / "Hintergrund" (background).
 *   2. A grid of preset color swatches with an active-color highlight.
 *   3. A hex-code input row with a live-preview swatch and a "+" apply button.
 *   4. A "Zurücksetzen" (reset) button that removes the active color.
 *
 * All state and interaction logic lives in `useHtmlEditorTextColor`.
 * This component is a pure render shell.
 */
const HtmlEditorTextColorAction: React.FC<IHtmlEditorTextColorActionProps> = ({ onAction, selectedTextColor, selectedBgColor, colorPalette }) => {
  const {
    activeTab,
    palette,
    activeColor,
    previewHex,
    hexInput,
    colorInputRef,
    handleTabChange,
    handleSwatchClick,
    handleHexApply,
    handleReset,
    handleHexChange,
    handleColorPickerInput,
  } = useHtmlEditorTextColor(onAction, selectedTextColor, selectedBgColor, colorPalette);

  /**
   * Handle keyboard shortcuts inside the hex color input.
   * Enter applies the currently typed hex value (same as clicking the "+" button).
   * Escape is handled natively by Radix Popover (closes the popover).
   */
  const handleHexKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        // Prevent default browser behaviour.
        event.preventDefault();
        handleHexApply();
      }
    },
    [handleHexApply],
  );

  return (
    <HtmlEditorToolbarPopoverAction
      action="textColor"
      icon={
        // Icon color reflects the selected text color (via CSS `color` → `selectedTextColor`).
        // div background reflects the selected background color.
        <div className={`border border-[var(--border)] rounded-[var(--border-radius-sm)]`} style={{ backgroundColor: selectedBgColor }}>
          <Icon name="Baseline" size={16} color={selectedTextColor} />
        </div>
      }
      ariaLabel="Textfarbe"
    >
      <Box className="flex flex-col gap-3 p-3">
        {/* Tab bar + preset swatch grid */}
        <HtmlEditorColorSwatchGrid
          activeTab={activeTab}
          activeColor={activeColor}
          palette={palette}
          onTabChange={handleTabChange}
          onSwatchClick={handleSwatchClick}
        />

        {/* Hex code input row with native color picker */}
        <HtmlEditorHexColorInput
          previewHex={previewHex}
          colorInputRef={colorInputRef}
          hexInput={hexInput}
          onColorPickerInput={handleColorPickerInput}
          onHexChange={handleHexChange}
          onHexApply={handleHexApply}
          onHexKeyDown={handleHexKeyDown}
        />

        {/* Reset button – removes the color for the active tab */}
        <Button
          variant="ghost"
          onClick={handleReset}
          aria-label="Farbe zurücksetzen"
          icon={<Icon name="Trash2" size={16} />}
          iconPosition="left"
          label="Zurücksetzen"
        />
      </Box>
    </HtmlEditorToolbarPopoverAction>
  );
};

HtmlEditorTextColorAction.displayName = 'HtmlEditorTextColorAction';

export default HtmlEditorTextColorAction;
