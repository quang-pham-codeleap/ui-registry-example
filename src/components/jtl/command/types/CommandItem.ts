import { CommandVariant } from './index';

/**
 * A singular command item.
 */
type CommandItem<T extends CommandVariant = CommandVariant> = {
  /**
   * The label of the Command Item
   */
  label: string;

  /**
   * The description of the Command Item
   */
  description?: string;

  /**
   * The value of the Command Item. This should be unique.
   */
  value: T extends 'checkbox' ? string | null : string;

  /**
   * The image URL of the Command Item (for CARD variant only).
   * If not provided, a placeholder gray avatar will be shown.
   */
  imageUrl?: string;

  /**
   * The checked state of the Command Item.
   */
  selected?: boolean;
};

export default CommandItem;
