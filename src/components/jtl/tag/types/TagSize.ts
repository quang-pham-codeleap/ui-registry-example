import { IconSize } from '../../icon';
import { TypographyVariant } from '../../text/types';

/**
 * Available sizes for the Tag component
 */
export const tagSizes: Record<
  string,
  {
    container: string[];
    iconSize: IconSize;
    closeIconSize: IconSize;
    textType: TypographyVariant;
    borderRadius: string;
  }
> = {
  default: {
    container: ['px-2.5', 'py-0.5', 'gap-1'],
    iconSize: 16,
    closeIconSize: 10,
    textType: 'xs',
    borderRadius: 'rounded-[var(--border-radius-md)]',
  },
  lg: {
    container: ['px-3.5', 'py-1.5', 'gap-1.5'],
    iconSize: 16,
    closeIconSize: 16,
    textType: 'small',
    borderRadius: 'rounded-[var(--border-radius-lg)]',
  },
};

/**
 * Type of tag size
 */
type TagSize = keyof typeof tagSizes;

export default TagSize;
