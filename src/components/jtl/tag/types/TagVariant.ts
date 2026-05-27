/**
 * Available variants for the Tag component
 */
export const tagVariants = {
  default: [
    'bg-[var(--primary)]',
    'border',
    'border-[transparent]',
    'text-[var(--primary-foreground)]',
    'hover:bg-linear-[0deg,var(--alpha-80)_0%,var(--alpha-80)_100%,var(--primary)]',
  ],
  secondary: [
    'bg-[var(--secondary)]',
    'border',
    'border-[var(--border)]',
    'text-[var(--secondary-foreground)]',
    'hover:bg-linear-[0deg,var(--alpha-80)_0%,var(--alpha-80)_100%,var(--secondary)]',
  ],
  outline: [
    'bg-transparent',
    'border',
    'border-[var(--border)]',
    'text-[var(--foreground)]',
    'hover:bg-linear-[0deg,var(--alpha-80)_0%,var(--alpha-80)_100%,var(--secondary)]',
    '[&_.tag-close]:text-[var(--foreground)]',
    '[&_.tag-close]:hover:bg-[var(--muted)]',
  ],
  destructive: [
    'bg-[var(--destructive)]',
    'border',
    'border-[var(--destructive)]',
    'text-[var(--destructive-foreground)]',
    'hover:bg-linear-[0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%,var(--destructive)]',
  ],
  danger: [
    'bg-[var(--danger-background)]',
    'border',
    'border-[var(--danger-border)]',
    'text-[var(--danger-text)]',
    'hover:bg-linear-[0deg,var(--alpha-80)_0%,var(--alpha-80)_100%,var(--danger-background)]',
  ],
  success: [
    'bg-[var(--success-background)]',
    'border',
    'border-[var(--success-border)]',
    'text-[var(--success-text)]',
    'hover:bg-linear-[0deg,var(--alpha-80)_0%,var(--alpha-80)_100%,var(--success-background)]',
  ],
  warning: [
    'bg-[var(--warning-background)]',
    'border',
    'border-[var(--warning-border)]',
    'text-[var(--warning-text)]',
    'hover:bg-linear-[0deg,var(--alpha-80)_0%,var(--alpha-80)_100%,var(--warning-background)]',
  ],
  info: [
    'bg-[var(--info-background)]',
    'border',
    'border-[var(--info-border)]',
    'text-[var(--info-text)]',
    'hover:bg-linear-[0deg,var(--alpha-80)_0%,var(--alpha-80)_100%,var(--info-background)]',
  ],
};

/**
 * Type of tag variant
 */
type TagVariant = keyof typeof tagVariants;

export default TagVariant;
