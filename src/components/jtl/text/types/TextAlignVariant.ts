/**
 * Text align variants
 */
export const textAlignVariants = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right',
  justify: 'text-justify',
};

/**
 * Available text alignment values for the Text component
 */
export const TextAlignVariants = Object.keys(textAlignVariants) as TextAlignVariant[];

/**
 * Type of text align
 */
type TextAlignVariant = keyof typeof textAlignVariants;

export default TextAlignVariant;
