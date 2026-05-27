/**
 * Validates whether a font size value is safe to use in inline styles.
 * Accepts numeric values with valid CSS units, plain numbers, and CSS variables.
 *
 * @param size - The font size value to validate
 * @returns True if the font size is a valid format, false otherwise
 *
 * @example
 * isValidFontSize('14'); // true - plain number
 * isValidFontSize('14px'); // true - with px unit
 * isValidFontSize('1.5rem'); // true - with rem unit
 * isValidFontSize('var(--typography-base-sizes-small-font-size)'); // true - CSS variable
 * isValidFontSize('14px; background: red'); // false - CSS injection attempt
 */
export default function isValidFontSize(size: string): boolean {
  if (!size || typeof size !== 'string') return false;

  const trimmedSize = size.trim();

  // Allow CSS variables (var(--variable-name))
  const cssVarPattern = /^var\(--[a-zA-Z0-9-_]+\)$/;
  if (cssVarPattern.test(trimmedSize)) return true;

  // Allow plain numbers (will be converted to px)
  const plainNumberPattern = /^\d+(\.\d+)?$/;
  if (plainNumberPattern.test(trimmedSize)) return true;

  // Allow numbers with valid CSS units (px, rem, em, pt, %, vh, vw, vmin, vmax)
  const numberWithUnitPattern = /^\d+(\.\d+)?(px|rem|em|pt|%|vh|vw|vmin|vmax)$/;
  if (numberWithUnitPattern.test(trimmedSize)) return true;

  return false;
}
