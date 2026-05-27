/**
 * Icon sizes
 */
export const iconSizes = [24, 20, 16, 12, 10] as const;

/**
 * Icon size type
 */
type IconSize = (typeof iconSizes)[number];

export default IconSize;
