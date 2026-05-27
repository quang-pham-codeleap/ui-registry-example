import React from 'react';

/** Options for cloning a trigger element with ARIA attributes and event handlers. */
interface ICloneTriggerElementOptions {
  /** Fallback id applied when the element has no existing id. Comes from component's id prop. */
  id?: string;
  /** Default id used when neither the element nor the id prop provides one. */
  defaultId: string;
  /** Whether the associated dropdown is currently open (drives aria-expanded). */
  isOpen: boolean;
  /** Whether the trigger is disabled (drives aria-disabled). */
  isDisabled: boolean;
  /** Callback to toggle/open the dropdown. Called after the original onClick (if any). */
  onTriggerClick: () => void;
  /** Callback to close the dropdown. Called when the Escape key is pressed. */
  onEscape: () => void;
}

/**
 * Clones a React trigger element, merging in ARIA attributes and event handlers
 * needed for the date picker / date range picker dropdown pattern.
 *
 * - Preserves any existing id, onClick, and onKeyDown from the original element.
 * - Adds aria-expanded, aria-haspopup, aria-disabled automatically.
 * - Returns `null` when `triggerContent` is not a valid React element.
 *
 * Used by both DatePicker and DateRangePicker to avoid duplicating cloneElement logic.
 */
const cloneTriggerElement = (triggerContent: React.ReactNode, options: ICloneTriggerElementOptions): React.ReactElement | null => {
  if (!React.isValidElement(triggerContent)) {
    return null;
  }

  const { id, defaultId, isOpen, isDisabled, onTriggerClick, onEscape } = options;

  // Cast to access standard HTML element props (id, onClick, onKeyDown)
  const existingProps = triggerContent.props as React.HTMLAttributes<HTMLElement> & { id?: string };

  return React.cloneElement(triggerContent as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
    // Preserve existing id; fall back to provided id prop, then the component-level default
    id: existingProps.id ?? id ?? defaultId,
    'aria-expanded': isOpen,
    'aria-haspopup': 'dialog' as const,
    'aria-disabled': isDisabled,
    // Mirrors the div[role="button"] wrapper: disabled removes from tab order, enabled is reachable
    tabIndex: isDisabled ? -1 : 0,
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      // Call original handler first so consumers can call event.preventDefault() to cancel toggle
      if (typeof existingProps.onClick === 'function') {
        existingProps.onClick(event);
      }
      if (!event.defaultPrevented && !isDisabled) {
        onTriggerClick();
      }
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      // Call original handler first so consumers can intercept keys before we handle them
      if (typeof existingProps.onKeyDown === 'function') {
        existingProps.onKeyDown(event);
      }
      if (!event.defaultPrevented) {
        if (event.key === 'Escape') {
          onEscape();
        } else if (event.key === 'Enter' || event.key === ' ') {
          // Prevent page scroll when Space activates the trigger
          if (event.key === ' ') {
            event.preventDefault();
          }
          if (!isDisabled) {
            onTriggerClick();
          }
        }
      }
    },
  });
};

export default cloneTriggerElement;
