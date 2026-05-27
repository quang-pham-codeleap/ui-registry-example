/**
 * Border radius configurations based on side position
 * Used for external addons that attach to the input
 */
export const inputGroupSideBorderRadius = {
  left: {
    borderRadius: 'rounded-bl-[var(--border-radius-md)] rounded-tl-[var(--border-radius-md)] rounded-br-none rounded-tr-none',
  },
  right: {
    borderRadius: 'rounded-br-[var(--border-radius-md)] rounded-tr-[var(--border-radius-md)] rounded-bl-none rounded-tl-none',
  },
};

/**
 * Side position for InputGroup addon components
 * - left: Addon appears on the left side of the input
 * - right: Addon appears on the right side of the input
 */
type InputGroupSide = keyof typeof inputGroupSideBorderRadius;

export default InputGroupSide;
