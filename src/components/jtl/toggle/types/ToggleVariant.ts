export const toggleVariants = {
  default: 'bg-transparent',
  outline: 'border border-[var(--input)] bg-[transparent] hover:bg-[var(--muted)] hover:text-[var(--accent-foreground)]',
};

/**
 * Available variant values for the Toggle component
 */
export const ToggleVariants = Object.keys(toggleVariants) as ToggleVariant[];

type ToggleVariant = keyof typeof toggleVariants;

export default ToggleVariant;
