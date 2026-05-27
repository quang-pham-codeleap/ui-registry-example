/**
 * Shape variants for the Button component
 */
export const buttonShapes = {
  default: 'rounded-[var(--border-radius-default)]',
  pill: 'rounded-[var(--border-radius-full)]',
};

/**
 * Available shape values for the Button component
 */
export const ButtonShapes = Object.keys(buttonShapes) as ButtonShape[];

/**
 * List type of Button shapes based on the buttonShapes object
 */
type ButtonShape = keyof typeof buttonShapes;

export default ButtonShape;
