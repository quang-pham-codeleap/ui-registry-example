/**
 * Validates whether a color value is safe to use in inline styles.
 * Accepts hex colors (#RGB, #RRGGBB), CSS variables (var(--name)), and named CSS colors.
 *
 * @param color - The color value to validate
 * @returns True if the color is a valid format, false otherwise
 *
 * @example
 * isValidColor('#84cc16'); // true - hex color
 * isValidColor('var(--primary)'); // true - CSS variable
 * isValidColor('red'); // true - named color
 * isValidColor('javascript:alert(1)'); // false - invalid/malicious
 */
export default function isValidColor(color: string): boolean {
  if (!color || typeof color !== 'string') return false;

  const trimmedColor = color.trim();

  // Allow hex colors (#RGB or #RRGGBB)
  const hexPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (hexPattern.test(trimmedColor)) return true;

  // Allow CSS variables (var(--variable-name))
  const cssVarPattern = /^var\(--[a-zA-Z0-9-_]+\)$/;
  if (cssVarPattern.test(trimmedColor)) return true;

  // Allow valid CSS color names (basic set for safety)
  const validColorNames = [
    'transparent',
    'currentcolor',
    'black',
    'white',
    'red',
    'green',
    'blue',
    'yellow',
    'cyan',
    'magenta',
    'gray',
    'grey',
    'silver',
    'maroon',
    'olive',
    'lime',
    'aqua',
    'teal',
    'navy',
    'fuchsia',
    'purple',
    'orange',
    'pink',
    'brown',
    'gold',
  ];
  if (validColorNames.includes(trimmedColor.toLowerCase())) return true;

  return false;
}
