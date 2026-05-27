import React, { useId } from 'react';
import { Box } from '../../../box';
import { Text } from '../../../text';
import { cn } from '@/lib';
import IColorHexInputProps from './IColorHexInputProps';

/**
 * Hex-code input row.
 *
 * Contains three interactive elements:
 *   1. A live-preview swatch — clicking it opens the OS-level native color picker.
 *      A visually-hidden <input type="color"> is linked via a <label> so the
 *      visible swatch receives the click.
 *   2. A "#"-prefixed text field that accepts exactly 6 hex characters.
 *
 * The native color input ref is managed internally — no parent needs to open
 * the picker programmatically at this time.
 */
const ColorHexInput: React.FC<IColorHexInputProps> = ({ previewHex, hexInput, onColorPickerInput, onHexChange, onHexKeyDown }) => {
  const colorInputId = useId();

  return (
    <Box className="flex items-center gap-2 rounded-[var(--border-radius-md)] border border-[var(--border)] px-2 py-1">
      {/* Live preview swatch — clicking opens the native browser color picker.
          The <label> renders the visible colored rectangle; clicking it forwards the
          click to the visually-hidden <input type="color"> via htmlFor/id linkage. */}
      <label
        htmlFor={colorInputId}
        className={cn(
          // Match the swatch dimensions and shape.
          'h-5 w-5',
          'border border-[var(--border)] shrink-0',
          'cursor-pointer',
          // Focus ring appears when the hidden input receives keyboard focus.
          'focus-within:ring-1 focus-within:ring-[var(--highlight)]',
          'rounded-full',
        )}
        style={{ backgroundColor: previewHex }}
      >
        {/* Native color input — visually hidden but accessible via keyboard. */}
        <input
          id={colorInputId}
          type="color"
          value={previewHex}
          onChange={onColorPickerInput}
          aria-label="Farbpicker öffnen"
          className={cn(
            // Visually hide: keep element in flow but paint it invisible.
            'absolute opacity-0 pointer-events-none',
            'h-0 w-0',
            'focus:outline-none',
          )}
        />
      </label>

      {/* "#" prefix label */}
      <Text type="muted">#</Text>

      {/* Hex text input — 6-char max, hex-only.
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
          'text-[var(--foreground)]',
          'placeholder-[var(--muted-foreground)]',
          // Remove the default outline and replace with a visible focus ring (WCAG 2.4.7 — Focus Visible).
          'focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] focus-visible:rounded-sm',
        )}
      />
    </Box>
  );
};

ColorHexInput.displayName = 'ColorHexInput';

export default ColorHexInput;
