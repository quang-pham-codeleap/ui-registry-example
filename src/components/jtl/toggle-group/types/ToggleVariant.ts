export const toggleVariants = {
  default: 'bg-transparent',
  outline: 'border border-[var(--input)] bg-[transparent] hover:bg-[var(--muted)] hover:text-[var(--accent-foreground)]',
};

type ToggleVariant = keyof typeof toggleVariants;

export default ToggleVariant;
