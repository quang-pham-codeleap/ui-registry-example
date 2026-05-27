import React from 'react';

/**
 * Skeleton component props
 */
export default interface ISkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  /**
   * Variant of the skeleton
   */
  variant?: 'default' | 'card' | 'text' | 'line';
}
