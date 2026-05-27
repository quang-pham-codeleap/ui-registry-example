import type { SelectGroup, SelectItem } from '../types';

/**
 * Check if the option is a select group
 */
export default function isSelectGroup(option: SelectItem | SelectGroup): option is SelectGroup {
  return typeof option === 'object' && option !== null && 'children' in option && Array.isArray(option.children);
}
