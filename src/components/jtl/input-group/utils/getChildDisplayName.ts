import React from 'react';

/**
 * Get the display name of a React element
 * @param child - React element to get display name from
 * @returns The display name or null
 */
export default function getChildDisplayName(child: React.ReactElement): string | null {
  return typeof child.type === 'function' || typeof child.type === 'object'
    ? (child.type as React.ComponentType).displayName || (child.type as React.ComponentType).name || null
    : null;
}
