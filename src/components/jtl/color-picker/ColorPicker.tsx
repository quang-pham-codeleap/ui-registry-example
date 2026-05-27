import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '../box';
import { ColorHexInput } from './components/color-hex-input';
import { ColorSwatchGrid } from './components/color-swatch-grid';
import { DEFAULT_COLOR_PALETTE, HEX_PATTERN } from './constants';
import IColorPickerProps from './IColorPickerProps';
import { isCssVar, normalisedHex, resolveCssVarToHex } from './utils';

/**
 * ColorPicker — standalone color selection widget.
 *
 * Combines a 24-color swatch grid (8 base colors × 3 shades) and a hex color
 * input row (live-preview swatch + text field + native OS picker).
 *
 * The parent element is responsible for managing multiple color modes and passing the
 * correct `value`/`onChange` pair for each mode.
 *
 * @example
 * // Basic usage
 * <ColorPicker value={color} onChange={setColor} />
 *
 * @example
 * // With a custom palette
 * <ColorPicker palette={myPalette} value={color} onChange={setColor} />
 */
const ColorPicker: React.FC<IColorPickerProps> = ({ value, palette = DEFAULT_COLOR_PALETTE, onChange, header }) => {
  /**
   * Local hex input state (without "#").
   * Initialised from `value` prop; updated both on prop change and on user typing.
   * We cannot use a pure derived value here because the user's in-progress
   * typing (e.g. "3b82f") must be preserved between keystrokes independently
   * of the committed `value` prop — so a useEffect sync is the correct pattern.
   */
  const [hexInput, setHexInput] = useState<string>(() => {
    // value is always a hex string with "#" prefix (or undefined).
    return value ? value.replace('#', '') : '';
  });

  // Sync local hex input when the controlled `value` prop changes externally
  // (e.g. parent switches between Text and Background tabs, or a palette swatch is clicked).
  useEffect(() => {
    setHexInput(value ? value.replace('#', '') : '');
  }, [value]);

  /**
   * Called continuously while the OS color picker panel is open.
   * Updates the local hex input so the preview swatch refreshes in real time.
   */
  const handleColorPickerInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace('#', '');
    setHexInput(raw);
  }, []);

  /** Called on every keystroke in the hex text field. Strips non-hex characters. */
  const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitised = e.target.value.replace(/[^0-9a-fA-F]/g, '');
    setHexInput(sanitised);
  }, []);

  /**
   * Keyboard shortcut handler for the hex text field.
   * Enter → apply the typed hex value.
   */
  const handleHexKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (HEX_PATTERN.test(hexInput)) {
          onChange(`#${hexInput}`);
        } else {
          setHexInput('');
        }
      }
    },
    [hexInput, onChange],
  );

  const onSwatchClick = useCallback(
    (color: string) => {
      // Plain hex value — strip the leading '#' for the input field.
      setHexInput(color.replace('#', ''));
      onChange(color);
    },
    [onChange],
  );
  /**
   * Derive the preview hex color for the native picker and swatch.
   * Falls back to "#000000" for incomplete or invalid input to avoid
   * browser console warnings about invalid <input type="color"> values.
   */
  const previewHex = HEX_PATTERN.test(hexInput) ? `#${hexInput}` : normalisedHex(value);

  /**
   * Resolve CSS variable tokens to their actual hex value so the input field
   */
  const paleteHex = palette.map(color => {
    if (isCssVar(color)) {
      const resolved = resolveCssVarToHex(color);
      return resolved || color;
    }
    return color;
  });

  /**
   * Pass the value directly as the active swatch color.
   * value is guaranteed to be a hex string or undefined.
   */
  const valueHex = useMemo(() => value ?? '', [value]);

  return (
    <Box className="flex flex-col gap-3 p-4 border border-[var(--border)] rounded-[var(--border-radius-md)]">
      {/* Header slot */}
      {header}

      {/* 8-column swatch grid — passes onChange directly; no passthrough needed */}
      <ColorSwatchGrid palette={paleteHex} activeColor={valueHex} onSwatchClick={onSwatchClick} />

      {/* Hex color input row */}
      <ColorHexInput
        previewHex={previewHex}
        hexInput={hexInput}
        onColorPickerInput={handleColorPickerInput}
        onHexChange={handleHexChange}
        onHexKeyDown={handleHexKeyDown}
      />
    </Box>
  );
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
