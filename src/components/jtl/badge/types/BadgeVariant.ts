/**
 * Available variants for the Badge component
 */
export const badgeVariants = {
  default: ['bg-[var(--primary)]', 'border-[rgba(0,0,0,0.15)]', 'text-[var(--primary-foreground)]'],
  secondary: ['bg-[var(--secondary)]', 'border-[var(--border)]', 'text-[var(--secondary-foreground)]'],
  outline: ['border', 'border-[var(--border)]', 'text-[var(--foreground)]'],
  destructive: ['bg-[var(--destructive)]', 'text-[var(--destructive-foreground)]'],
  danger: ['border', 'bg-[var(--danger-background)]', 'border-[var(--danger-border)]', 'text-[var(--danger-text)]'],
  success: ['border', 'border-[var(--success-border)]', 'bg-[var(--success-background)]', 'text-[var(--success-text)]'],
  warning: ['border', 'border-[var(--warning-border)]', 'bg-[var(--warning-background)]', 'text-[var(--warning-text)]'],
  info: ['border', 'border-[var(--info-border)]', 'bg-[var(--info-background)]', 'text-[var(--info-text)]'],
};

/**
 * Available variant values for the Badge component
 */
export const BadgeVariants = Object.keys(badgeVariants) as BadgeVariant[];

/**
 * Type of badge
 */
type BadgeVariant = keyof typeof badgeVariants;

export default BadgeVariant;
