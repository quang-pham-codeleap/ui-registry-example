export const toggleGroupVariants = {
  default: 'p-px',
  rounded: 'border border-[var(--border)] rounded-[var(--border-radius-md)] p-px',
  pill: 'border border-[var(--border)] rounded-[var(--border-radius-full)] p-px',
};

/**
 * Available variant values for the ToggleGroup component
 */
export const ToggleGroupVariants = Object.keys(toggleGroupVariants) as ToggleGroupVariant[];

type ToggleGroupVariant = keyof typeof toggleGroupVariants;

export default ToggleGroupVariant;
