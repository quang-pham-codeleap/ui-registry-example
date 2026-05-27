import { LucideIconName } from '../IIconProps';
import getLucideIconNames from './getLucideIconNames';
import getCustomIconNames from './getCustomIconNames';

/**
 * Get all icon names, including Lucide and Custom Icons
 */
export default function getAllIconNames(): LucideIconName[] {
  return [...getLucideIconNames(), ...getCustomIconNames()];
}
