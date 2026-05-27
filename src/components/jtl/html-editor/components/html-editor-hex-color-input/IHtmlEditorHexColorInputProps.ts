import React from 'react';

/**
 * Props for the HtmlEditorHexColorInput sub-component.
 * Renders the hex-code input row: a live-preview swatch that opens the
 * native browser color picker, a "#"-prefixed text field, and an apply button.
 */
export default interface IHtmlEditorHexColorInputProps {
  /** Current hex preview color (with "#" prefix, e.g. "#ff5733"). Drives both the swatch background and the native picker value. */
  previewHex: string;

  /** Ref forwarded to the native <input type="color"> so the parent can attach native event listeners for the OS color-picker panel. */
  colorInputRef: React.RefObject<HTMLInputElement | null>;

  /** The raw 6-character hex string the user has typed (without "#"). */
  hexInput: string;

  /** Called when the native color picker fires its `input` event (continuous preview while the panel is open). */
  onColorPickerInput: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** Called on every keystroke in the hex text field. */
  onHexChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** Called when the user clicks the "+" apply button to commit the typed hex value. */
  onHexApply: () => void;

  /**
   * Called on keydown in the hex text field.
   * Allows parent to handle Enter (apply) and Escape (close) keyboard shortcuts.
   */
  onHexKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
