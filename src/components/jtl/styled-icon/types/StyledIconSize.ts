export const styledIconSizes = {
  default: 'w-[var(--width-w-9)] h-[var(--height-h-9)] [&_svg]:w-[var(--width-w-5)] [&_svg]:h-[var(--height-h-5)]',
  sm: 'w-[var(--width-w-7)] h-[var(--height-h-7)] [&_svg]:w-[var(--width-w-4)] [&_svg]:h-[var(--height-h-4)]',
  lg: 'w-[var(--width-w-11)] h-[var(--height-h-11)] [&_svg]:w-[var(--width-w-6)] [&_svg]:h-[var(--height-h-6)]',
};

/**
 * Available size values for the StyledIcon component
 */
export const StyledIconSizes = Object.keys(styledIconSizes) as StyledIconSize[];

type StyledIconSize = keyof typeof styledIconSizes;

export default StyledIconSize;
