/**
 * Size configurations for the Button component
 */
export const buttonSizes = {
  default: {
    base: 'inline-flex h-10 px-4 py-2 gap-2',
    iconOnly: 'flex h-10 w-10 p-2',
  },
  lg: {
    base: 'inline-flex h-11 px-8 py-2 gap-2',
    iconOnly: 'flex h-11 w-11 p-2',
  },
  sm: {
    base: 'inline-flex h-9 px-3 py-2 gap-2',
    iconOnly: 'flex h-9 w-9 p-2',
  },
  xs: {
    base: 'inline-flex h-7 px-2 py-1 gap-2 text-[length:var(--typography-base-sizes-extra-small-font-size)]',
    iconOnly: 'flex h-7 w-7 p-2',
  },
  icon: {
    base: 'flex h-10 w-10 p-2',
    iconOnly: 'flex h-10 w-10 p-2',
  },
  iconLg: {
    base: 'flex h-11 w-11 p-2',
    iconOnly: 'flex h-11 w-11 p-2',
  },
  iconSm: {
    base: 'flex h-9 w-9 ',
    iconOnly: 'flex h-9 w-9 ',
  },
  iconXs: {
    base: 'flex h-7 w-7 ',
    iconOnly: 'flex h-7 w-7 ',
  },
};

/**
 * Available size values for the Button component
 */
export const ButtonSizes = Object.keys(buttonSizes) as ButtonSize[];

/**
 * Button size types for the Button component based on the buttonSizes object
 */
type ButtonSize = keyof typeof buttonSizes;

export default ButtonSize;
