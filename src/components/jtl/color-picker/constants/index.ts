/**
 * Default color palette for the ColorPicker — 24 design-system tokens.
 *
 * Values are CSS variable references so swatches automatically adapt to
 * light/dark mode and any future token changes. Order matches the Figma
 * "Selection colors" design spec (top → bottom, left → right).
 *
 * Semantic tokens (`--*`) resolve via the active theme.
 * Raw tailwind tokens (`--tailwind-colors-*`) are theme-independent.
 * Custom tokens (`--custom-colors-*`) are JTL-specific brand colors.
 */
export const DEFAULT_COLOR_PALETTE: string[] = [
  'var(--tailwind-colors-base-black)', // base/black
  'var(--tailwind-colors-violet-700)', // violet/700
  'var(--tailwind-colors-indigo-700)', // indigo/700
  'var(--tailwind-colors-blue-700)', // blue/700
  'var(--tailwind-colors-green-700)', // green/700
  'var(--tailwind-colors-yellow-500)', // yellow/500
  'var(--tailwind-colors-orange-600)', // orange/600
  'var(--tailwind-colors-red-700)', // red/700

  'var(--tailwind-colors-gray-400)', // gray/400
  'var(--tailwind-colors-violet-500)', // violet/500
  'var(--tailwind-colors-indigo-500)', // indigo/500
  'var(--custom-colors-jtl-sky-500)', // jtl-sky/500
  'var(--tailwind-colors-emerald-500)', // emerald/500
  'var(--tailwind-colors-yellow-300)', // yellow/300
  'var(--tailwind-colors-orange-500)', // orange/500
  'var(--tailwind-colors-red-500)', // red/500

  'var(--tailwind-colors-base-white)', // base/white
  'var(--tailwind-colors-violet-300)', // violet/300
  'var(--tailwind-colors-indigo-300)', // indigo/300
  'var(--tailwind-colors-blue-300)', // blue/300
  'var(--tailwind-colors-green-300)', // green/300
  'var(--tailwind-colors-yellow-200)', // yellow/200
  'var(--tailwind-colors-orange-200)', // orange/200
  'var(--tailwind-colors-red-200)', // red/200
];

/** Regex for a valid 6-character hex color string (without "#"). */
export const HEX_PATTERN = /^[0-9a-fA-F]{6}$/;
