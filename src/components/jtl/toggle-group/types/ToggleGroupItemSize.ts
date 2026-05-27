export const toggleGroupItemSizes = {
  default: 'h-10 px-3',
  sm: 'h-9 px-2.5',
  lg: 'h-11 px-5',
  xs: 'h-6 px-1.5 py-1',
};

/**
 * Available size values for items inside the ToggleGroup component
 */
export const ToggleGroupItemSizes = Object.keys(toggleGroupItemSizes) as ToggleGroupItemSize[];

type ToggleGroupItemSize = keyof typeof toggleGroupItemSizes;

export default ToggleGroupItemSize;
