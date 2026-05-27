import { Popover, PopoverContent, PopoverTrigger } from '../../../popover';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { calculateTagOverflow } from '../../utils';
import { ComboBoxTrigger } from '../combo-box-trigger';
import IComboBoxDefaultProps from './IComboBoxDefaultProps';
import { ComboBoxTag } from '../combo-box-tag';
import { Box } from '../../../box';
import { Skeleton } from '../../../skeleton';
import { cn } from '@/lib';
import { ComboBoxSelectMode } from '../../types/ComboBoxMode';
import { Text } from '../../../text';

/**
 * ComboBox component that displays a searchable combo box menu in a popover overlay.
 * Triggered by an input field, and overlaps the input when opened.
 *
 * @param props {@link IComboBoxDefaultProps} - Props interface for the ComboBoxDefault component.
 * @returns {React.ReactElement} Popover with combo box trigger input and content
 */
const ComboBoxDefault: React.FC<IComboBoxDefaultProps> = ({
  handleOpenChange,
  value,
  placeholder,
  isDisabled,
  children,
  triggerId,
  isLoading,
  isOpen,
  contentId,
  handleRemoveValue,
  mode,
  triggerRef,
  groups,
}) => {
  const uniqueId = React.useId();
  const buttonId = triggerId ?? `combo-box-default-${uniqueId.replace(/:/g, '')}`;
  const popoverId = contentId ?? `combo-box-default-content-${uniqueId.replace(/:/g, '')}`;

  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const [overflowCount, setOverflowCount] = useState(0);
  const prevValueRef = useRef<string | null>(null);

  const handleTriggerFocus = useCallback(() => handleOpenChange?.(true), [handleOpenChange]);

  /**
   * Two-phase tag overflow measurement:
   * 1. On value change: reset overflowCount to 0 so all tags render
   * 2. On next render (overflowCount === 0): measure DOM widths and set the overflow count
   */
  useLayoutEffect(() => {
    if (mode !== ComboBoxSelectMode.MULTI) return;

    // Detect value change and reset overflow so all tags render for measurement
    const serializedValue = JSON.stringify(value);
    if (prevValueRef.current !== serializedValue) {
      prevValueRef.current = serializedValue;
      if (overflowCount !== 0) {
        setOverflowCount(0);
        return; // Re-render with all tags, then measure on next run
      }
    }

    // Only measure when all tags are rendered (overflowCount === 0)
    if (overflowCount !== 0) return;

    const container = tagsContainerRef.current;
    if (!container) return;

    const tagEls = Array.from(container.querySelectorAll<HTMLElement>('[data-combo-tag]'));
    const newOverflow = calculateTagOverflow(container, tagEls);
    if (newOverflow > 0) {
      setOverflowCount(newOverflow);
    }
  }, [mode, value, overflowCount]);

  /**
   * Resets overflow count when the container resizes so tags are re-measured.
   */
  useEffect(() => {
    if (mode !== ComboBoxSelectMode.MULTI) return;
    const container = tagsContainerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      prevValueRef.current = null;
      setOverflowCount(0);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [mode]);

  // Check if value is not empty based on mode
  const hasValue = useMemo(() => {
    if (mode === ComboBoxSelectMode.SINGLE) {
      return Boolean((value as string)?.trim());
    } else {
      return Array.isArray(value) && (value as string[]).some(item => item && item.trim() !== '');
    }
  }, [value, mode]);

  /**
   * Selected content to display in the trigger
   */
  const selectedContent = useMemo(() => {
    /**
     * If no value, return placeholder
     */
    if (!hasValue) return placeholder;
    /**
     * Flat groups to get all items
     */
    const groupItemsFlatted = groups?.flatMap(group => group.items) ?? [];
    /**
     * If mode is single, return the value as string
     */
    if (mode === ComboBoxSelectMode.SINGLE) return groupItemsFlatted.find(item => item.value === value)?.label;
    /**
     * If mode is multi, return the value as array of strings
     */
    const listItems = (value as string[])
      ?.map(val => groupItemsFlatted.find(item => item.value === val))
      .filter((item): item is NonNullable<typeof item> => Boolean(item) && item!.label.trim() !== '');
    const visibleCount = overflowCount > 0 ? Math.max(1, listItems.length - overflowCount) : listItems.length;
    const visibleItems = listItems.slice(0, visibleCount);
    const actualOverflow = listItems.length - visibleCount;

    return (
      <div ref={tagsContainerRef} className="flex items-center gap-1 overflow-hidden w-full">
        {visibleItems.map(item => {
          if (!item) return null;
          return (
            <span key={item.value} data-combo-tag className="shrink-0">
              <ComboBoxTag
                label={item.label}
                onClose={e => {
                  e.stopPropagation();
                  handleRemoveValue?.(item.value);
                }}
              />
            </span>
          );
        })}
        {actualOverflow > 0 && (
          <Box className="flex shrink-0 items-center rounded-[var(--border-radius-default)] bg-[var(--info-border)] px-1 py-0.5 text-[var(--info-text)]">
            <Text type="small" color="info">
              +{actualOverflow}
            </Text>
          </Box>
        )}
      </div>
    );
  }, [value, handleRemoveValue, mode, hasValue, placeholder, groups, overflowCount]);

  /**
   * Loading content to display in the trigger
   */
  const loadingContent = useMemo(() => {
    if (mode === ComboBoxSelectMode.SINGLE) {
      return <Skeleton variant="line" />;
    }
    return Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} variant="line" />);
  }, [mode]);

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger disabled={isDisabled} className="w-full" asChild ref={triggerRef}>
        <ComboBoxTrigger id={buttonId} onFocus={handleTriggerFocus} disabled={isDisabled || isLoading} isLoading={isLoading}>
          {isLoading ? (
            <Box className="flex items-center gap-2 w-full">{loadingContent}</Box>
          ) : (
            <Box className={cn('flex min-w-0 flex-1 items-center gap-1 overflow-hidden')}>{selectedContent}</Box>
          )}
        </ComboBoxTrigger>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" id={popoverId} data-testid={contentId}>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default ComboBoxDefault;
