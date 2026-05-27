/**
 * Internal props for a single color swatch button.
 * Extracted to allow proper useCallback wrapping per project conventions.
 */
export default interface IColorSwatchProps {
  /** The hex color this swatch represents (e.g. "#2563eb"). */
  color: string;
  /** Whether this swatch is the currently selected color. */
  isActive: boolean;
  /** Called when the swatch button is clicked. */
  onSwatchClick: (color: string) => void;
}
