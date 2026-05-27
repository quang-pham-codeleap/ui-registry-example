import React from 'react';
import { cn } from '@/lib/utils';
import type IBadgeProps from './IBadgeProps';
import { badgeVariants } from './types';
import { IconExtend } from '../icon/components';
import { Text } from '../text';
import { Box } from '../box';

/**
 * Badge component for displaying status, labels, or counts.
 * Used for highlighting metadata, statuses, or small pieces of information.
 *
 * @component
 *
 * @param props {@link IBadgeProps} - The component props
 *
 * @example
 * // Basic usage
 * <Badge label="New" />
 *
 * @example
 * // With different variant
 * <Badge label="Warning" variant="warning" />
 *
 * @example
 * // With icon
 * <Badge label="Info" variant="info" icon="Info" />
 *
 * @example
 * // Destructive variant
 * <Badge label="Delete" variant="destructive" icon="Trash" />
 *
 * @example
 * // Success variant
 * <Badge label="Completed" variant="success" icon="CheckCircle" />
 *
 * @returns {JSX.Element} Badge component
 */
const Badge: React.FC<IBadgeProps & React.RefAttributes<HTMLDivElement>> = ({ label: text, variant = 'default', icon, ref, ...props }) => {
  return (
    <Box
      ref={ref}
      className={cn([
        ...[
          'inline-flex',
          'h-5',
          'px-2.5',
          'justify-center',
          'items-center',
          'gap-1',
          'rounded-[var(--border-radius-full)]',
          'whitespace-nowrap',
          'overflow-hidden',
          'max-w-full',
          'w-fit',
        ],
        ...badgeVariants[variant],
      ])}
      {...props}
    >
      {icon && <IconExtend icon={icon} size={10} />}
      <Text type="xs" weight="semibold" truncate>
        {text}
      </Text>
    </Box>
  );
};

Badge.displayName = 'Badge';

export default Badge;
