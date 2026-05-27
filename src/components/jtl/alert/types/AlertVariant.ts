/**
 * Alert variants
 */
export const alertVariants = {
  default: 'bg-[var(--background)] text-[var(--foreground)] border-[var(--border)]',
  destructive: 'bg-[var(--danger-background)] border-[var(--danger-border)] text-[var(--danger-text)] [&>svg]:text-[var(--danger-text)]',
  success: 'bg-[var(--success-background)] text-[var(--success-text)] border border-[var(--success-border)]',
  secondary: 'bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)]',
  info: 'bg-[var(--info-background)] text-[var(--info-text)] border border-[var(--info-border)]',
  warning: 'bg-[var(--warning-background)] text-[var(--warning-text)] border border-[var(--warning-border)]',
};

/**
 * Available variant values for the Alert component
 */
export const AlertVariants = Object.keys(alertVariants) as AlertVariant[];

/**
 * Type of alert variant
 */
type AlertVariant = keyof typeof alertVariants;

export default AlertVariant;
