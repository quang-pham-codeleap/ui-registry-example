/**
 * Extracts the CSS custom property name from a var() reference.
 *
 * e.g. 'var(--tailwind-colors-blue-700)' → '--tailwind-colors-blue-700'
 * Returns null if the input is not a valid var() expression.
 */
const extractCssVarName = (cssVar: string): string | null => {
  const match = cssVar.match(/^var\((--[^)]+)\)$/);
  return match ? match[1] : null;
};

/**
 * Converts an rgb() or rgba() string to a 6-character hex string.
 *
 * e.g. 'rgb(29, 78, 216)' → '#1d4ed8'
 * Returns null if the string cannot be parsed.
 */
const rgbStringToHex = (rgb: string): string | null => {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;

  const [, r, g, b] = match.map(Number);

  // Guard: valid RGB channels are 0-255.
  if ([r, g, b].some(n => n < 0 || n > 255)) return null;

  return `#${[r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')}`;
};

/**
 * Normalises a raw CSS color string to a 6-character lowercase hex.
 *
 * Handles:
 *   - '#rrggbb' → returned as-is (lowercased)
 *   - '#rgb'    → expanded to '#rrggbb'
 *   - 'rgb(r, g, b)' / 'rgba(r, g, b, a)' → converted to '#rrggbb'
 *
 * Returns null for any unrecognised format.
 */
const normaliseToCssHex = (value: string): string | null => {
  const v = value.trim().toLowerCase();

  // Already a full 6-char hex.
  if (/^#[0-9a-f]{6}$/.test(v)) return v;

  // Long hex 8-char
  if (/^#[0-9a-f]{8}$/.test(v)) return v.slice(0, 7);

  // Short 3-char or 4-char hex → expand each channel.
  if (/^#[0-9a-f]{3}$/.test(v) || /^#[0-9a-f]{4}$/.test(v)) {
    const [, r, g, b] = v;
    return `#${r}${r}${g}${g}${b}${b}`;
  }

  // rgb() / rgba() → convert channels.
  if (v.startsWith('rgb')) return rgbStringToHex(v);

  return null;
};

/**
 * Resolves a CSS variable reference to a 6-character hex string at runtime.
 *
 * Uses `getComputedStyle` on `<html>` to read the token value the browser has
 * already computed. Works for any CSS custom property registered on `:root`.
 *
 * @param cssVar - A CSS var() expression, e.g. 'var(--tailwind-colors-blue-700)'.
 * @returns A '#rrggbb' hex string, or null if the variable cannot be resolved
 *          or its value is not a recognisable color format.
 *
 * @example
 * resolveCssVarToHex('var(--tailwind-colors-blue-700)') // → '#1d4ed8'
 * resolveCssVarToHex('#2563eb')                         // → null (not a var())
 * resolveCssVarToHex('var(--unknown)')                  // → null (not defined)
 */
const resolveCssVarToHex = (cssVar: string): string | null => {
  const varName = extractCssVarName(cssVar);
  if (!varName) return null;

  // Environment guard: in SSR/Node (no window/document/getComputedStyle),
  // we cannot resolve CSS variables, so return null.
  if (typeof window === 'undefined' || typeof document === 'undefined' || typeof getComputedStyle === 'undefined') {
    return null;
  }

  // `getPropertyValue` returns an empty string when the property is undefined.
  const rawValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  if (!rawValue) return null;

  return normaliseToCssHex(rawValue);
};

export default resolveCssVarToHex;
