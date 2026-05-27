/**
 * Align variants
 */
export const alignVariants = {
  left: 'items-start',
  center: 'items-center',
  right: 'items-end',
};

/**
 * Available alignment values for the InputOTP component
 */
export const AlignVariants = Object.keys(alignVariants) as AlignVariant[];

/**
 * Type of align
 */
type AlignVariant = keyof typeof alignVariants;

export default AlignVariant;
