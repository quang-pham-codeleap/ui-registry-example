import { Collapsible as BaseCollapsible, CollapsibleTrigger, CollapsibleContent } from './CollapsiblePrimitive';
import ICollapsibleProps from './ICollapsibleProps';
import { Fragment, useState, useCallback, useMemo, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../icon';
import { Box } from '../box';
import { Text } from '../text';
import { Button } from '../button';

/**
 * Collapsible component with a structured 4-zone header:
 * [left chevron] [title] [headerSlot flex-1] [right chevron]
 *
 * @example
 * <Collapsible title="Settings" content={<Panel />} togglePosition="left" />
 *
 * @example
 * <Collapsible
 *   title="Orders"
 *   headerSlot={<Text color="muted">3 items</Text>}
 *   content={<List />}
 *   togglePosition="right"
 *   showBorder
 * />
 */
const Collapsible = ({
  title,
  triggerContent,
  content,
  defaultOpen = false,
  showIcon = false,
  togglePosition,
  showDivider = false,
  contentBackground,
  headerSlot,
  secondaryText,
  actionButtons,
  actionIcon,
  actionIconAriaLabel,
  onActionIconClick,
  showBorder = false,
  ...rest
}: ICollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const resolvedTitle = useMemo(() => {
    return title ?? triggerContent;
  }, [title, triggerContent]);

  const legacyHeaderSlot = useMemo(() => {
    if (headerSlot) {
      return headerSlot;
    }

    if (!secondaryText && !actionButtons && !actionIcon) {
      return undefined;
    }

    return (
      <Fragment>
        {secondaryText != null && (typeof secondaryText === 'string' ? <Text color="muted">{secondaryText}</Text> : secondaryText)}
        {actionButtons}
        {actionIcon && (
          <Button
            variant="ghost"
            size="xs"
            icon={actionIcon}
            aria-label={actionIconAriaLabel ?? 'Collapsible action'}
            onClick={event => {
              event.stopPropagation();
              onActionIconClick?.(event);
            }}
          />
        )}
      </Fragment>
    );
  }, [actionButtons, actionIcon, actionIconAriaLabel, headerSlot, onActionIconClick, secondaryText]);

  // togglePosition takes precedence; showIcon is legacy fallback
  const effectiveTogglePosition = togglePosition ?? (showIcon ? 'right' : undefined);

  const handleSlotClick = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  const chevron = (
    <Icon name="ChevronRight" size={16} className={cn('shrink-0 transition-transform duration-200', isOpen && 'rotate-90')} aria-hidden="true" />
  );

  const { className: restClassName, ...rootProps } = rest;

  return (
    <BaseCollapsible
      {...rootProps}
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn('rounded-[var(--border-radius-lg)]', showBorder && 'border border-[var(--border)]', restClassName)}
    >
      <CollapsibleTrigger asChild className="hover:cursor-pointer w-full">
        <div
          tabIndex={0}
          role="button"
          className={cn('w-full inline-flex flex-row items-center gap-2 p-3', showDivider && 'border-b border-[var(--border)]')}
        >
          {effectiveTogglePosition === 'left' && chevron}
          <Box className="shrink-0">
            {typeof resolvedTitle === 'string' ? (
              <Text type="body" weight="medium" color="default">
                {resolvedTitle}
              </Text>
            ) : (
              resolvedTitle
            )}
          </Box>
          {legacyHeaderSlot != null && (
            <div className="flex-1 inline-flex items-center" onClick={handleSlotClick} onKeyDown={e => e.stopPropagation()}>
              {legacyHeaderSlot}
            </div>
          )}
          {effectiveTogglePosition === 'right' && <span className="ml-auto">{chevron}</span>}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <Box
          className={cn(
            'p-3',
            'rounded-b-[var(--border-radius-lg)]',
            effectiveTogglePosition === 'left' && 'pl-9',
            contentBackground === 'muted' && 'bg-[var(--muted)]',
          )}
        >
          {content}
        </Box>
      </CollapsibleContent>
    </BaseCollapsible>
  );
};

Collapsible.displayName = 'Collapsible';
export default Collapsible;
