import React from 'react';
import { Box } from '../../../box';
import { Button } from '../../../button';
import { cn } from '@/lib';
import IHtmlEditorHexColorInputProps from './IHtmlEditorHexColorInputProps';
import { Text } from '../../../text';

/**
 * Hex-code input row.
 *
 * Contains three interactive elements:
 *   1. A live-preview swatch — clicking it opens the OS-level native colour
 *      picker.  A visually-hidden <input type="color"> is linked via a
 *      <label> so the visible swatch receives the click.
 *   2. A "#"-prefixed text field that accepts exactly 6 hex characters.
 *   3. A "+" button that applies the currently typed hex value.
 */
const HtmlEditorHexColorInput: React.FC<IHtmlEditorHexColorInputProps> = ({
  previewHex,
  colorInputRef,
  hexInput,
  onColorPickerInput,
  onHexChange,
  onHexApply,
  onHexKeyDown,
}) => {
  return (
    <Box className="flex items-center gap-2 rounded-[var(--border-radius-md)] border border-[var(--border)] px-2 py-1">
      {/* Live preview swatch – clicking opens the native browser color picker panel.
          The <label> renders the visible colored rectangle; clicking it forwards the
          click to the visually-hidden <input type="color"> via htmlFor/id linkage.
          The input itself is positioned off-screen so no browser-default chrome is
          visible, while still being reachable by keyboard (screen-reader-only pattern). */}
      <label
        htmlFor="html-editor-color-picker"
        className={cn(
          // Match the existing swatch dimensions and shape exactly.
          'h-5 w-5',
          'border border-[var(--border)] shrink-0',
          'cursor-pointer',
          // Focus ring appears when the hidden input inside receives keyboard focus.
          'focus-within:ring-2 focus-within:ring-[var(--primary)]',
          'rounded-full',
        )}
        style={{ backgroundColor: previewHex }}
      >
        {/* Native color input – visually hidden but accessible via keyboard. */}
        <input
          id="html-editor-color-picker"
          ref={colorInputRef}
          type="color"
          value={previewHex}
          onChange={onColorPickerInput}
          aria-label="Farbpicker öffnen"
          className={cn(
            // Visually hide: keep element in flow but paint it invisible.
            'absolute opacity-0 pointer-events-none',
            'h-0 w-0',
            // Focus ring is shown on the parent <label> via :focus-within.
            'focus:outline-none',
          )}
        />
      </label>

      {/* "#" prefix label */}
      <Text type="muted">#</Text>

      {/* Hex text input – 6-char max, hex-only.
          onKeyDown enables Enter → apply and Escape → close shortcuts from the parent. */}
      <input
        type="text"
        value={hexInput}
        onChange={onHexChange}
        onKeyDown={onHexKeyDown}
        maxLength={6}
        placeholder="000000"
        aria-label="Hex-Farbcode eingeben"
        className={cn(
          'flex-1 min-w-0 bg-transparent',
          'text-[var(--typography-base-sizes-default-font-size)]',
          'text-[var(--muted-foreground)]',
          'placeholder-[var(--muted-foreground)]',
          'focus:outline-none',
        )}
      />

      {/* "+" apply button – fires the hex color to the editor */}
      <Button variant="ghost" onClick={onHexApply} aria-label="Hex-Farbe anwenden" icon="PlusCircle" iconPosition="right" size="iconSm" />
    </Box>
  );
};

HtmlEditorHexColorInput.displayName = 'HtmlEditorHexColorInput';

export default HtmlEditorHexColorInput;
