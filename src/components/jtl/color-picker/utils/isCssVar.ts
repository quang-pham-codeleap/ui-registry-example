/**
 * Returns true when `color` is a CSS variable reference (e.g. `var(--border)`).
 * These palette tokens are not hex values and must be excluded from hex validation.
 */
export default function isCssVar(color: string | undefined): boolean {
  return !!color?.startsWith('var(');
}
