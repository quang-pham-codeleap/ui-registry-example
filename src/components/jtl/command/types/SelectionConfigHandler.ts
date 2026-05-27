import { SelectItem } from '../../select';

/**
 * Interface for the Selection Config Handler
 * It is used to handle the selection of an item in the Command
 * @param enabled - Whether the selection config is enabled
 * @param options - Array of options to be displayed in the selection config
 * @param onSelect - Optional callback function to be called when an item is selected
 * @param value - Optional current value of the selection config
 * @param placeholder - Optional placeholder for the selection config
 */
type SelectionConfigHandler = {
  enabled: boolean;
  options: SelectItem[];
  onSelect?: (item: string) => void;
  value?: string;
};

export default SelectionConfigHandler;
