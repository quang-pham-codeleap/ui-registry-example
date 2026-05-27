/**
 * Visual style variants for the Button component
 */
export const buttonVariants = {
  default:
    'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)] hover:before:absolute hover:before:inset-0 hover:before:bg-[var(--alpha-90)] relative',
  secondary:
    'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)] hover:before:absolute hover:before:inset-0 hover:before:bg-[var(--alpha-80)] relative',
  highlight:
    'bg-[var(--highlight)] text-[var(--highlight-foreground)] hover:bg-[var(--highlight)] hover:before:absolute hover:before:inset-0 hover:before:bg-[var(--alpha-90)] relative',
  destructive:
    'bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive)] hover:before:absolute hover:before:inset-0 hover:before:bg-[var(--alpha-90)] relative',
  outline: 'border border-[var(--input)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)] ',
  ghost: 'bg-[transparent] text-[var(--foreground)] hover:bg-[var(--accent)] ',
  link: 'rounded-[var(--border-radius-full)] bg-[transparent] text-[var(--highlight)] hover:enabled:bg-[transparent] hover:enabled:underline',
};

/**
 * Available variant values for the Button component
 */
export const ButtonVariants = Object.keys(buttonVariants) as ButtonVariant[];

/**
 * List type of Button variants based on the buttonVariants object
 */
type ButtonVariant = keyof typeof buttonVariants;

export default ButtonVariant;
