import InputGroupSide from './InputGroupSide';

/**
 * Context value interface for InputGroup
 * Shares state between InputGroup and child components
 */
type InputGroupAddonContextValue = {
  /**
   * Side of the input group
   * @default 'left'
   */
  side: InputGroupSide;

  /**
   * Whether the addon is inline
   * @default false
   */
  inline: boolean;
};

export default InputGroupAddonContextValue;
