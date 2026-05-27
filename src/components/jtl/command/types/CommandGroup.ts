import { CommandVariant } from './index';
import CommandItem from './CommandItem';

/**
 * Represents a group of Command Items within a CommandContent.
 */
type CommandGroup<T extends CommandVariant = CommandVariant> = {
  /**
   * The heading of a Group of a List of Command Items
   */
  heading: string;

  /**
   * Array of Command Items within the Group
   */
  items: Omit<CommandItem<T>, 'selected'>[];
};

export default CommandGroup;
