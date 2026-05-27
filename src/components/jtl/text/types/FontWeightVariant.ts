/**
 * Font weight variants
 */
export const fontWeightVariants = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

/**
 * Available font weight values for the Text component
 */
export const FontWeightVariants = Object.keys(fontWeightVariants) as FontWeightVariant[];

/**
 * Type of font weight
 */
type FontWeightVariant = keyof typeof fontWeightVariants;

export default FontWeightVariant;
