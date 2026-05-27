/**
 * Shape variants
 */
export const shapeVariants = {
  square: 'rounded-[var(--border-radius-md)]',
  circle: 'rounded-full',
};

/**
 * Available shape variant values for the Avatar component
 */
export const ShapeVariants = Object.keys(shapeVariants) as ShapeVariant[];

/**
 * Type of shape
 */
type ShapeVariant = keyof typeof shapeVariants;

export default ShapeVariant;
