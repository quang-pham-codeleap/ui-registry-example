/**
 * Shape variants for the Button component
 */
export const iconAnimations = {
  spin: 'animate-spin',
  ping: 'animate-ping',
  pulse: 'animate-pulse',
};

/**
 * List type of Button shapes based on the buttonShapes object
 */
type IconAnimation = keyof typeof iconAnimations;

export default IconAnimation;
