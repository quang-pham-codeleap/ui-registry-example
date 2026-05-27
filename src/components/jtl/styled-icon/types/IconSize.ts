export const iconSizes = {
  default: 'w-9 h-9 [&_svg]:w-5 [&_svg]:h-5',
  sm: 'w-7 h-7 [&_svg]:w-4 [&_svg]:h-4',
  lg: 'w-11 h-11 [&_svg]:w-6 [&_svg]:h-6',
};

type IconSize = keyof typeof iconSizes;

export default IconSize;
