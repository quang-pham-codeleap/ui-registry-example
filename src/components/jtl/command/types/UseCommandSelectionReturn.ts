import CommandVariant from './CommandVariant';
import CommandGroup from './CommandGroup';
import CommandItem from './CommandItem';

/**
 * Return value of the useCommandSelection hook.
 */
type UseCommandSelectionReturn<T extends CommandVariant> = {
  handleContentItemOnSelect: (item: CommandItem | string[]) => void;
  handleCheckboxGroupChange: (vals: (string | null)[]) => void;
  getSelectableGroupValues: (group: CommandGroup<T>) => string[];
  handleGroupSelectAll: (group: CommandGroup<T>) => void;
  handleGroupClear: (group: CommandGroup<T>) => void;
  handleClearAll: () => void;
};

export default UseCommandSelectionReturn;
