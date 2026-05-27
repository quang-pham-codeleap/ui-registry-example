import React from 'react';

/**
 * Props for the ColorHexInput sub-component.
 */
export default interface IColorHexInputProps {
  /** Current hex color for the preview swatch and native picker (with "#" prefix, e.g. "#ff5733"). */
  previewHex: string;

  /** Raw 6-character hex string currently shown in the text field (without "#"). */
  hexInput: string;

  /** Called when the native color picker fires its `input` event (continuous preview while the panel is open). */
  onColorPickerInput: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** Called on every keystroke in the hex text field. */
  onHexChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Called on keydown in the hex text field.
   * Required — the parent always provides an Enter → apply handler.
   */
  onHexKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
