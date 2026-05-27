import { CustomIconName } from '../custom-icon';
import { LucideIconName } from '../IIconProps';

/**
 * Get all custom icon names from the CustomIconName enum
 * @returns Array of custom icon names
 */
export default function getCustomIconNames(): LucideIconName[] {
  return Object.values(CustomIconName) as LucideIconName[];
}
