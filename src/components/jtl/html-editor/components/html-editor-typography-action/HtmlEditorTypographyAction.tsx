import React, { useCallback, useMemo, useRef, useState } from 'react';
import { HtmlEditorToolbarPopoverAction } from '../html-editor-toolbar-popover-action';
import { Text } from '../../../text';
import { Icon } from '../../../icon';
import { cn } from '@/lib';
import IHtmlEditorTypographyActionProps from './IHtmlEditorTypographyActionProps';
import { TYPOGRAPHY_STYLES } from '../../constants';
import { ToolbarAction } from '../../types';

/**
 * Typography toolbar action. Opens a popover with a list of
 * text styles. Each item renders its label in its own style
 * so the user can preview the typography before selecting.
 * A check icon marks the currently active style.
 */
const HtmlEditorTypographyAction: React.FC<IHtmlEditorTypographyActionProps> = ({ onAction, selectedStyle }) => {
  /**
   * Tracks the currently keyboard-focused item index.
   * Initialized to the selected style's position so arrow navigation
   * starts from a meaningful position when the popover opens.
   * Falls back to 0 when no style is selected.
   */
  const [focusedIndex, setFocusedIndex] = useState(() =>
    Math.max(
      0,
      TYPOGRAPHY_STYLES.findIndex(s => s.value === selectedStyle),
    ),
  );

  /**
   * Refs to each option button, used to imperatively call `.focus()`
   * when the user presses an arrow key (roving tabindex pattern).
   */
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>(Array(TYPOGRAPHY_STYLES.length).fill(null));

  /**
   * Fires onAction with the chosen style value when the user clicks an item.
   */
  const handleStyleSelect = useCallback(
    (value: ToolbarAction) => {
      onAction(value);
    },
    [onAction],
  );

  /**
   * Keyboard handler on the menu container (roving tabindex pattern).
   * ArrowDown move focus to the next item (wrapping last → first).
   * ArrowUp move focus to the previous item (wrapping first → last).
   * Enter / Space are left to native button behavior.
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const total = TYPOGRAPHY_STYLES.length;

      if (e.key === 'ArrowDown') {
        // Move focus to next item, wrapping from last → first
        e.preventDefault();
        const nextIndex = (focusedIndex + 1) % total;
        setFocusedIndex(nextIndex);
        buttonRefs.current[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        // Move focus to previous item, wrapping from first → last
        e.preventDefault();
        const nextIndex = (focusedIndex - 1 + total) % total;
        setFocusedIndex(nextIndex);
        buttonRefs.current[nextIndex]?.focus();
      }
    },
    [focusedIndex],
  );

  /**
   * Derives the trigger-button label from the currently active style.
   * Falls back to 'Paragraph' when no match is found (e.g. 'small' maps to paragraph in the editor).
   */
  const triggerLabel = useMemo(() => TYPOGRAPHY_STYLES.find(s => s.value === selectedStyle)?.label ?? 'Paragraph', [selectedStyle]);

  /**
   * Popover body — a vertical menu of selectable text styles.
   *
   * ARIA pattern: role="menu" + role="menuitemradio" with aria-checked tracks
   * the single active selection. Roving tabindex ensures only one item is in
   * the tab sequence at a time; arrow keys move focus between items.
   *
   * Note: We don't use JTLDropdown because it doesn't support label styling.
   */
  const popoverContent = useMemo(
    () => (
      // role="menu" marks this as a composite widget so screen readers
      // announce arrow-key navigation instead of reading each Tab stop.
      <div role="menu" aria-label="Typographie" className="flex flex-col" onKeyDown={handleKeyDown}>
        {TYPOGRAPHY_STYLES.map(({ value, label, type }, index) => {
          const isSelected = selectedStyle === value;

          return (
            <button
              key={value}
              // Collect a ref to each button so we can imperatively focus it.
              ref={el => {
                buttonRefs.current[index] = el;
              }}
              type="button"
              // menuitemradio signals a single-select option within the menu.
              role="menuitemradio"
              // aria-checked communicates the current selection to screen readers.
              aria-checked={isSelected}
              // Roving tabindex: only the focused item is reachable via Tab.
              // All others are removed from the tab sequence (tabIndex -1).
              tabIndex={focusedIndex === index ? 0 : -1}
              onClick={() => handleStyleSelect(value)}
              // Keep focusedIndex in sync when the user mouses into an item.
              onFocus={() => setFocusedIndex(index)}
              className={cn(
                'hover:cursor-pointer',
                'flex w-full items-center gap-2 px-2 py-1.5',
                'rounded-[var(--border-radius-md)]',
                // Highlight background when this style is currently active
                isSelected && 'bg-[var(--accent)]',
                'hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]',
              )}
            >
              {/* Check icon – visible only for the active style */}
              <Icon name="Check" size={16} className={cn('shrink-0', isSelected ? 'opacity-100' : 'opacity-0')} />

              {/* Label rendered in its own typography variant for a live preview */}
              <Text type={type} as="span" isLeading={false}>
                {label}
              </Text>
            </button>
          );
        })}
      </div>
    ),
    [selectedStyle, focusedIndex, handleStyleSelect, handleKeyDown],
  );

  return (
    <HtmlEditorToolbarPopoverAction action="typography" label={triggerLabel} ariaLabel="Typographie">
      {popoverContent}
    </HtmlEditorToolbarPopoverAction>
  );
};

HtmlEditorTypographyAction.displayName = 'HtmlEditorTypographyAction';

export default HtmlEditorTypographyAction;
