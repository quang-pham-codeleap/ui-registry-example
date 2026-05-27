import { InputGroupAddonAlign } from '../types';

/**
 * Get the order value for CSS flexbox ordering
 * Ensures addons appear in correct visual order regardless of DOM order
 */
export default function getAlignOrder(align: InputGroupAddonAlign): number {
  const orderMap: Record<InputGroupAddonAlign, number> = {
    'outline-left': 1,
    'inline-left': 2,
    'inline-right': 4,
    'outline-right': 5,
  };
  return orderMap[align];
}
