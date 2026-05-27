import { CommandVariant } from './index';

/**
 * Type helper for determining the onChange handler based on input type
 * Creates appropriate function signature for each input type
 */
type ItemSelectHandler<T extends CommandVariant = CommandVariant> = T extends 'checkbox'
  ? (value: (string | null)[]) => void
  : (value: string) => void;

export default ItemSelectHandler;
