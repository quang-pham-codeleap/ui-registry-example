import isCssVar from './isCssVar';

/**
 * Normalises a 6-digit hex color value for use in hex-only contexts such as `<input type="color">`.
 * Returns the hex value unchanged if it looks valid, or falls back to `#000000` for invalid input (including CSS variables).
 */
export default function normalisedHex(hex: string | undefined): string {
  if (!hex || isCssVar(hex)) return '#000000';
  // A valid color picker value is "#" followed by exactly 6 hex characters.
  return /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : '#000000';
}
