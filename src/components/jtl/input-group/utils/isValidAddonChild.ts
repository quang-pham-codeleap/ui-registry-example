import React from 'react';
import getChildDisplayName from './getChildDisplayName';

/**
 * Check if a child element is a valid addon component
 * @param child - React element to validate
 * @returns true if the child is a valid addon component
 */
export default function isValidAddonChild(child: React.ReactElement, validChildren: string[]): boolean {
  const displayName = getChildDisplayName(child);
  return displayName !== null && validChildren.includes(displayName as (typeof validChildren)[number]);
}
