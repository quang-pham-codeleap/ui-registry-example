import InputGroupSide from './InputGroupSide';
import InputGroupSize from './InputGroupSize';

/**
 * Props for addon child components within an InputGroup
 */
type InputGroupAddonChild = {
  side?: InputGroupSide;
  inline?: boolean;
  size?: InputGroupSize;
};

export default InputGroupAddonChild;
