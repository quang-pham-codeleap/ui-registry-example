import React from 'react';
import { Skeleton as BaseSkeleton } from './SkeletonPrimitive';
import ISkeletonProps from './ISkeletonProps';
import { Box } from '../box';

/**
 * Skeleton variants
 */
const skeletonVariants: Record<NonNullable<ISkeletonProps['variant']>, React.ReactNode> = {
  default: (
    <Box className="flex w-full items-center gap-4">
      <BaseSkeleton className="h-16 w-16 rounded-full" />
      <Box className="space-y-2 flex-1">
        <BaseSkeleton className="h-4 w-full" />
        <BaseSkeleton className="h-4 w-3/4" />
      </Box>
    </Box>
  ),
  card: (
    <Box className="space-y-5 w-full">
      <BaseSkeleton className="h-52 w-full rounded-lg" />
      <BaseSkeleton className="h-4 w-1/3" />
      <BaseSkeleton className="h-4 w-full" />
    </Box>
  ),
  text: (
    <Box className="space-y-2 w-full">
      <BaseSkeleton className="h-4 w-full" />
      <BaseSkeleton className="h-4 w-3/4" />
    </Box>
  ),
  line: (
    <Box className="w-full">
      <BaseSkeleton className="h-4 w-full" />
    </Box>
  ),
};

/**
 * Skeleton component for displaying loading states and placeholder content before data arrives.
 * Provides various pre-defined layouts to match common UI patterns during loading.
 *
 * @component
 *
 * @param props {@link ISkeletonProps} - The component props
 *
 * @example
 * // Default variant (avatar with text lines)
 * <Skeleton />
 *
 * @example
 * // Card variant with image placeholder and text
 * <Skeleton variant="card" />
 *
 * @example
 * // Text-only variant with multiple lines
 * <Skeleton variant="text" />
 *
 * @example
 * // Single line placeholder
 * <Skeleton variant="line" />
 *
 * @returns {JSX.Element} Skeleton component with animated loading effect
 */
const Skeleton: React.FC<ISkeletonProps> = ({ variant = 'default', ...props }) => {
  const content = skeletonVariants[variant] ?? skeletonVariants.default;

  return (
    <Box className="w-full" {...props}>
      {content}
    </Box>
  );
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;
