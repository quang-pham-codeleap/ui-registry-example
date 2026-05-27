export const COMMAND_DEFAULT_LOADING_LABEL = 'Loading...';
export const COMMAND_NO_RESULTS_MESSAGE = (inputValue: string) => `No results found for "${inputValue}".`;
export const COMMAND_DELAY_DEFAULT = 300;
export const BOX_SHADOW_STYLE = '0 4px 6px -1px var(--shadow-10, rgba(0, 0, 0, 0.10)), 0 2px 4px -1px var(--shadow-5, rgba(0, 0, 0, 0.05))';
export const COMMAND_VARIANT = {
  SIMPLE: 'simple',
  DETAILED: 'detailed',
  CARD: 'card',
  CHECKBOX: 'checkbox',
} as const;

/**
 * Keys that should always be allowed regardless of input type.
 * Includes navigation, editing, and cmdk keyboard shortcut keys.
 */
export const ALWAYS_ALLOWED_KEYS = new Set([
  'Backspace',
  'Delete',
  'Tab',
  'Enter',
  'Escape',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
]);

/**
 * Regex to validate a single character as numeric input.
 * Allows: digits, minus sign, and decimal point.
 */
export const NUMERIC_CHAR_PATTERN = /^[\d.\\-]$/;
