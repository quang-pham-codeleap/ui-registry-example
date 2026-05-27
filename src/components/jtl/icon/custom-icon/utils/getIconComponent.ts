import { CustomIconName, CustomIcon } from '../types';
import iconMapping from './iconMapping';

/**
 * Gets the SVG component for a given icon name
 * @param name - The name of the icon
 * @returns The corresponding SVG component or undefined if not found
 */
export default function getIconComponent(name: CustomIconName): CustomIcon | undefined {
  return iconMapping[name];
}
