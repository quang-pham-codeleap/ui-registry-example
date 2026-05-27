import CommandGroup from './CommandGroup';

type SearchConfigHandler = {
  /**
   * Group of Search Options
   */
  groups: CommandGroup[];

  /**
   * Callback fired when the selection changes.
   * A new array of selected values is passed, along with the current search
   * input value so that consumers can immediately re-trigger their search
   * without having to manage the input value themselves.
   * @param selectedValues - The updated list of selected option values
   * @param currentInputValue - The current text in the search input at the time of the change
   */
  onSelectionChange?: (selectedValues: (string | null)[], currentInputValue: string) => void;

  /**
   * Optional default selected items, to set default selection state on initial render
   */
  defaultSelectedItem?: (string | null)[];
};

export default SearchConfigHandler;
