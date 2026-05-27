import { CommandVariant } from './index';

/**
 * Type helper for determining the value type based on input type
 * Creates appropriate type for each input type
 */
type CommandValue<T extends CommandVariant = CommandVariant> = T extends 'checkbox' ? (string | null)[] : string | null;

export default CommandValue;
