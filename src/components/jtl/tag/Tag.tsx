import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import ITagProps from './ITagProps';
import { tagVariants, tagSizes } from './types';
import { IconExtend } from '../icon/components';
import { Text } from '../text';
import { Box } from '../box';
import { Icon } from '../icon';
import { Button } from '../button';

/**
 * Tag component for displaying labels with close functionality.
 * Used for representing selected items, filters, or removable labels.
 *
 * @component
 *
 * @param props {@link ITagProps} - The component props
 *
 * @example
 *  Basic usage
 * <Tag label="Tag" />
 *
 * @example
 *  With different variant
 * <Tag label="Warning" variant="warning" />
 *
 * @example
 *  With icon
 * <Tag label="Info" variant="info" icon="Info" />
 *
 * @example
 *  Small size
 * <Tag label="Small" size="sm" />
 *
 * @example
 *  With close handler
 * <Tag label="Removable" onClose={() => console.log('closed')} />
 *
 * @example
 *  Non-closable tag
 * <Tag label="Static" closable={false} />
 *
 * @returns {JSX.Element} Tag component
 */
const Tag: React.FC<ITagProps & React.RefAttributes<HTMLDivElement>> = ({
  label,
  variant = 'default',
  size = 'default',
  icon,
  closable = true,
  onClose,
  disabled = false,
  ref,
  ...props
}) => {
  const INLINE_FLEX = 'inline-flex';
  const sizeConfig = tagSizes[size];

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && onClose) {
        onClose();
      }
    },
    [disabled, onClose],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClose) {
        e.preventDefault();
        onClose();
      }
    },
    [disabled, onClose],
  );

  return (
    <div
      ref={ref}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        INLINE_FLEX,
        'w-fit',
        sizeConfig.borderRadius,
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-[var(--ring)]',
        'focus:ring-offset-1',
        'max-w-full',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      onKeyDown={handleKeyDown}
    >
      <Box
        className={cn([
          ...[
            INLINE_FLEX,
            'justify-center',
            'items-center',
            sizeConfig.borderRadius,
            'transition-colors',
            'whitespace-nowrap',
            'overflow-hidden',
            'max-w-full',
          ],
          ...sizeConfig.container,
          ...tagVariants[variant],
          disabled && 'pointer-events-none',
        ])}
        {...props}
      >
        {icon && (
          // This wrapper prevents flex container from affecting SVG sizing
          <Box as="span">
            <IconExtend icon={icon} size={sizeConfig.iconSize} />
          </Box>
        )}
        <Text type={sizeConfig.textType} weight="medium" truncate>
          {label}
        </Text>
        {closable && (
          <Box
            className={cn(
              'tag-close-wrapper',
              'text-current',
              '[&_button]:!bg-transparent',
              '[&_button]:hover:!bg-transparent',
              '[&_button]:hover:opacity-70',
              '[&_button]:!text-current',
              '[&_button]:!h-auto',
              '[&_button]:!w-auto',
              '[&_button]:!p-0',
              '[&_button]:!min-w-0',
              '[&_button_svg]:!text-current',
            )}
          >
            <Button
              size="iconXs"
              variant="ghost"
              icon={<Icon name="X" size={sizeConfig.closeIconSize} />}
              onClick={handleClose}
              disabled={disabled}
              aria-label={`Remove ${label}`}
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

Tag.displayName = 'Tag';

export default Tag;
