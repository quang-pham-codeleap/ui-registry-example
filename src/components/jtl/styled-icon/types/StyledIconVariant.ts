export const styledIconVariants = {
  primary: 'bg-[var(--base-primary)] [&_svg]:text-[var(--base-primary-foreground)]',
  secondary: 'bg-[var(--base-secondary)] [&_svg]:text-[var(--base-secondary-foreground)]',
  outline: 'bg-[var(--base-background)] border border-[var(--base-input)] [&_svg]:text-[var(--base-foreground)]',
  ghost: '[&_svg]:text-[var(--base-foreground)]',
  success: 'bg-[var(--base-success-background)] [&_svg]:text-[var(--base-success-text)]',
  info: 'bg-[var(--base-info-background)] [&_svg]:text-[var(--base-info-text)]',
  warning: 'bg-[var(--base-warning-background)] [&_svg]:text-[var(--base-warning-text)]',
  danger: 'bg-[var(--base-danger-background)] [&_svg]:text-[var(--base-danger-text)]',
  destructive: 'bg-[var(--base-destructive)] [&_svg]:text-[var(--base-destructive-foreground)]',
};

/**
 * Available variant values for the StyledIcon component
 */
export const StyledIconVariants = Object.keys(styledIconVariants) as StyledIconVariant[];

type StyledIconVariant = keyof typeof styledIconVariants;

export default StyledIconVariant;
