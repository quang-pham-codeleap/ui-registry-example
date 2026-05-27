import React from 'react';
import getChildDisplayName from './getChildDisplayName';

/**
 * Warn about invalid child in non-production environments only.
 * Gated to avoid leaking warnings in production builds.
 * @param child - Invalid child element
 * @param validChildren - List of supported child component names
 * @param componentName - Name of the parent component emitting the warning
 */
export default function warnInvalidChild(child: React.ReactElement, validChildren: string[], componentName: string): void {
  if (import.meta.env.MODE === 'production') return;

  const childType = getChildDisplayName(child) || String(child.type);

  console.warn(
    `[${componentName}] Invalid child component "${childType}" detected and removed. ` +
      `${componentName} only supports: ${validChildren.join(', ')}. ` +
      `Please use one of the supported components.`,
  );
}
