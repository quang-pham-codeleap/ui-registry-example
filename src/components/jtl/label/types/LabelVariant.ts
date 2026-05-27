/**
 * Label variants for different styling options
 */
export const labelVariants = {
  title: `text-[var(--foreground)] text-[length:var(--typography-base-sizes-base-font-size)] font-medium leading-[var(--typography-base-sizes-base-line-height)]`,
  field: `text-[var(--foreground)] text-[length:var(--typography-base-sizes-small-font-size)] font-medium leading-none`,
  subtitle: `text-[var(--muted-foreground)] text-[length:var(--typography-base-sizes-small-font-size)] font-normal leading-[var(--typography-base-sizes-small-line-height)]`,
  error: `text-[var(--danger-text)] text-[length:var(--typography-base-sizes-extra-small-font-size)] font-normal leading-none`,
};

/**
 * Available variant values for the Label component
 */
export const LabelVariants = Object.keys(labelVariants) as LabelVariant[];

/**
 * Label variant types for different styling options based on the labelVariants object
 */
type LabelVariant = keyof typeof labelVariants;

export default LabelVariant;
