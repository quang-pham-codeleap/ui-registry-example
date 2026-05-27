import React from 'react';

/**
 * Props for the ColorPicker component.
 *
 * A standalone color selection widget that combines:
 *   - A 24-color swatch grid (8 base colors × 3 shades each).
 *   - A hex color input row with a live-preview swatch and native OS color picker.
 *
 * Tabs (e.g. "Text" / "Background") are intentionally NOT part of this component;
 * the parent is responsible for rendering tabs and passing the correct `value`/`onChange`
 * for each tab's active color.
 */
export default interface IColorPickerProps {
  /**
   * The currently selected color as a hex string with "#" prefix (e.g. "#2563eb").
   *
   * When provided, the matching swatch (if any) is highlighted and the text input is pre-filled.
   * CSS variable tokens are not supported for this prop — use hex values only.
   */
  value?: string;

  /**
   * Ordered list of color tokens to display as swatches.
   *
   * Each entry may be either:
   *   - A CSS variable token (e.g. `var(--color-primary-500)`), or
   *   - A hex color string with "#" prefix (e.g. "#2563eb").
   *
   * Defaults to the built-in 24-color palette (8 base colors × 3 shades), which
   * is defined using CSS variables (e.g. `var(--color-...)`).
   */
  palette?: string[];

  /** Called when the user selects a color via a swatch click or the hex input. Receives the hex string with "#" prefix. */
  onChange: (color: string) => void;

  /** Optional header content to render above the color picker */
  header?: React.ReactNode;
}
