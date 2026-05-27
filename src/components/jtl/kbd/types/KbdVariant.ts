/**
 * Visual style variants for the Kbd component.
 */
export const kbdVariants = {
  default: ['bg-[var(--muted)]', 'text-[var(--muted-foreground)]'],
  secondary: ['bg-[var(--primary)]', 'text-[var(--primary-foreground)]'],
};

/**
 * Type of Kbd variant based on the kbdVariants object
 */
type KbdVariant = keyof typeof kbdVariants;

export default KbdVariant;
