export const toggleSizes = {
  default: 'h-10 px-3',
  sm: 'h-9 px-2.5 ',
  lg: 'h-11 px-5',
  xs: 'h-6 px-1.5',
};

/**
 * Available size values for the Toggle component
 */
export const ToggleSizes = Object.keys(toggleSizes) as ToggleSize[];

type ToggleSize = keyof typeof toggleSizes;

export default ToggleSize;
