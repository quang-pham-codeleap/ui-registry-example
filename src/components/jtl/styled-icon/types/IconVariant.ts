export const iconVariants = {
  primary: 'bg-[var(--primary)] [&_svg]:text-[var(--primary-foreground)]',
  secondary: 'bg-[var(--secondary)] [&_svg]:text-[var(--secondary-foreground)]',
  outline: 'bg-[var(--background)] border border-[var(--input)] [&_svg]:text-[var(--foreground)]',
  ghost: '[&_svg]:text-[var(--foreground)]',
  success: 'bg-[var(--success-background)] [&_svg]:text-[var(--success-text)]',
  info: 'bg-[var(--info-background)] [&_svg]:text-[var(--info-text)]',
  warning: 'bg-[var(--warning-background)] [&_svg]:text-[var(--warning-text)]',
  danger: 'bg-[var(--danger-background)] [&_svg]:text-[var(--danger-text)]',
  destructive: 'bg-[var(--destructive)] [&_svg]:text-[var(--destructive-foreground)]',
};

type IconVariant = keyof typeof iconVariants;

export default IconVariant;
