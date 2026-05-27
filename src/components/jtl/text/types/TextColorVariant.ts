/**
 * Text color variants
 */
export const textColorVariants = {
  default: 'text-[var(--foreground)]',
  primary: 'text-[var(--primary-foreground)]',
  muted: 'text-[var(--muted-foreground)]',
  success: 'text-[var(--success-text)]',
  danger: 'text-[var(--danger-text)]',
  warning: 'text-[var(--warning-text)]',
  info: 'text-[var(--info-text)]',
};

/**
 * Available color values for the Text component
 */
export const TextColorVariants = Object.keys(textColorVariants) as TextColorVariant[];

/**
 * Type of text color
 */
type TextColorVariant = keyof typeof textColorVariants;

export default TextColorVariant;
