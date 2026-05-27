/**
 * Size configurations for InputGroup addon components
 * Maps to the input size for consistent height alignment
 */
export const inputGroupSizes = {
  default: {
    height: 'h-10',
    padding: 'px-4',
    fontSize: 'text-[length:var(--typography-base-sizes-small-font-size)]',
    lineHeight: 'leading-[var(--typography-base-sizes-small-line-height)]',
    borderRadius: 'rounded-[var(--border-radius-md)]',
  },
  sm: {
    height: 'h-9',
    padding: 'px-3',
    fontSize: 'text-[length:var(--typography-base-sizes-small-font-size)]',
    lineHeight: 'leading-[var(--typography-base-sizes-small-line-height)]',
    borderRadius: 'rounded-[var(--border-radius-md)]',
  },
  // xs: {
  //   height: 'h-8',
  //   padding: 'px-2',
  //   fontSize: 'text-[length:var(--typography-base-sizes-small-font-size)]',
  //   lineHeight: 'leading-[var(--typography-base-sizes-small-line-height)]',
  //   borderRadius: 'rounded-[var(--border-radius-md)]',
  // },
};

/**
 * InputGroup size type based on available sizes
 */
type InputGroupSize = keyof typeof inputGroupSizes;

export default InputGroupSize;
