import { LucideIconName } from '../../icon';

/**
 * Defines the structure of a text alignment option used in the text-alignment popover.
 * Each option includes a value that corresponds to the editor command, an icon name for display, and an aria-label for accessibility.
 */
type TextAlignmentOption = {
  value: 'alignLeft' | 'alignCenter' | 'alignRight' | 'alignJustify';
  icon: LucideIconName;
  ariaLabel: string;
};

export default TextAlignmentOption;
