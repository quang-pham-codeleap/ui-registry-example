import * as LucideIcons from 'lucide-react';
import type { LucideIconName } from '../IIconProps';

/**
 * Get all valid Lucide icon names as an array of strings, without the 'Icon' suffix
 * @returns Array of icon names that start with uppercase, with 'Icon' suffix removed
 */
export default function getLucideIconNames(): LucideIconName[] {
  return Object.keys(LucideIcons)
    .filter(name => /^[A-Z].*Icon$/.test(name))
    .map(name => name.replace(/Icon$/, '')) as LucideIconName[];
}
