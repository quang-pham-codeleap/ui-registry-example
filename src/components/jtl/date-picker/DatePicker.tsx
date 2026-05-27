import React, { useCallback, useRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import IDatePickerProps from './IDatePickerProps';
import { useDatePicker } from './hooks';
import { DatePickerDropdown } from './components';
import { DATE_FORMAT_DEFAULT, DATE_PICKER_CALENDAR_ID, DATE_PICKER_TRIGGER_ID } from './constants';
import { cloneTriggerElement } from './utils';
import { InputGroup, InputGroupAddon, InputGroupIcon, InputGroupInput } from '../input-group';
import { pickFieldAriaProps } from '@/utils';

/**
 * DatePicker component for selecting a single date.
 * Features a single-month calendar view with optional presets.
 *
 * @param props {@link IDatePickerProps} - The component props
 * @returns The rendered DatePicker component
 *
 * @example
 * Basic usage
 * ```tsx
 * const [date, setDate] = useState<Date>();
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 * />
 * ```
 *
 * @example
 * With inline input and a custom header
 * ```tsx
 * const [date, setDate] = useState<Date>();
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   hasInput
 *   header={<Button>Today</Button>}
 * />
 * ```
 *
 * @example
 * With a custom trigger and footer
 * ```tsx
 * const [date, setDate] = useState<Date>();
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   triggerContent={<Button>{date ? format(date, 'dd.MM.yyyy') : 'Select date'}</Button>}
 *   footer={({ onClear }) => (
 *     <Button label="Clear" onClick={onClear} />
 *   )}
 * />
 * ```
 */
const DatePicker: React.FC<IDatePickerProps> = props => {
  const {
    placeholder,
    isDisabled = false,
    id,
    disableDate,
    format: dateFormat = DATE_FORMAT_DEFAULT,
    header,
    hasInput = false,
    triggerContent,
    footer,
    captionLayout = 'dropdown',
    fromYear,
    toYear,
    isError,
    size = 'default',
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  // Use custom hook for state and logic management
  const { isOpen, setIsOpen, inputValue, parsedInputDate, defaultMonth, handleCalendarChange, handleInputChange, handleInputBlur, handleClear } =
    useDatePicker(props, dateFormat);

  // Ref for container to detect click outside
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Blur handler for the inline DatePickerInput inside the dropdown.
   * Uses requestAnimationFrame to check if focus truly left the picker container
   * before closing. This prevents the picker from closing when the user clicks
   * the operator Select, a calendar day, or a footer button — all of which are
   * inside the container and receive focus after the input blurs.
   *
   * Callers that already know a close is intended (for example, click-outside
   * handlers) may call handleInputBlur directly. The inline DatePickerInput,
   * however, triggers closing by calling .blur() on Enter, which flows through
   * the input's onBlur into this handler, so Enter-based closes go through the
   * same focus check before closing.
   */
  const handleInlineInputBlur = useCallback(() => {
    requestAnimationFrame(() => {
      const activeEl = document.activeElement as Element | null;
      if (containerRef.current?.contains(activeEl)) {
        // Focus moved to another element inside the picker container — keep it open
        return;
      }
      // Focus moved into the dropdown content (Radix portal) — keep it open
      if (activeEl?.closest('[data-radix-popper-content-wrapper]')) {
        return;
      }
      handleInputBlur();
    });
  }, [handleInputBlur]);

  const calendarKey = parsedInputDate ? parsedInputDate.getTime() : DATE_PICKER_CALENDAR_ID;

  // Accessibility props forwarded to the default Input trigger for Field/FormControl integration.
  // Only applied to the default input trigger (no triggerContent). Custom triggers own their a11y.
  const ariaProps = pickFieldAriaProps(props);

  // Handle input focus - open dropdown when input is focused
  const handleTriggerFocus = useCallback(() => {
    if (!isDisabled) {
      setIsOpen(true);
    }
  }, [isDisabled, setIsOpen]);

  // Handle custom trigger click — toggles the dropdown open/closed
  const handleTriggerClick = useCallback(() => {
    if (!isDisabled) {
      setIsOpen(prev => !prev);
    }
  }, [isDisabled, setIsOpen]);

  // Handle Enter key to apply date from input
  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleInputBlur();
        inputRef.current?.blur();
      }
      // Close dropdown on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [handleInputBlur, setIsOpen],
  );

  // Close the dropdown when keyboard focus (Tab) leaves the container entirely.
  // Uses onBlur (React's focusout) — relatedTarget is the element receiving focus.
  // Ignores focus moves into Radix portals (month/year select dropdowns inside the calendar).
  const handleFocusOut = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      const newTarget = e.relatedTarget as Node | null;

      // Focus moved to a Radix portal (e.g. month/year select inside the calendar) — keep open
      const isInsideRadixPortal = !!(newTarget as Element)?.closest?.('[data-radix-popper-content-wrapper]');
      if (isInsideRadixPortal) return;

      // Focus stayed inside the container — do nothing
      if (containerRef.current?.contains(newTarget)) return;

      // Focus left the container — close the dropdown
      if (hasInput) {
        handleInputBlur();
      } else {
        setIsOpen(false);
      }
    },
    [hasInput, handleInputBlur, setIsOpen],
  );

  // Handle keyboard interaction on the custom trigger wrapper
  const handleCustomTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Activate/toggle on Enter or Space for accessibility
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.key === ' ') {
          // Prevent page from scrolling when using Space to activate
          e.preventDefault();
        }
        handleTriggerClick();
        return;
      }
      // Close dropdown on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [handleTriggerClick, setIsOpen],
  );

  // Clone the trigger element (when it's a valid React element) and merge ARIA attrs + handlers
  const clonedTriggerContent = cloneTriggerElement(triggerContent, {
    id,
    defaultId: DATE_PICKER_TRIGGER_ID,
    isOpen,
    isDisabled,
    onTriggerClick: handleTriggerClick,
    onEscape: () => setIsOpen(false),
  });

  // Callback for Radix Popover's onOpenChange — resets/closes when the popover
  // is dismissed by clicking outside or pressing Escape while focus is in the dropdown.
  const handlePopoverOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        handleInputBlur();
        setIsOpen(false);
      }
    },
    [handleInputBlur, setIsOpen],
  );

  return (
    <PopoverPrimitive.Root modal={false} open={isOpen} onOpenChange={handlePopoverOpenChange}>
      <PopoverPrimitive.Anchor asChild>
        <div ref={containerRef} className="relative" onBlur={handleFocusOut}>
          {/* Trigger: custom content OR default input field */}
          {triggerContent ? (
            /* Custom trigger wrapper — no visual styling, user owns the appearance */
            clonedTriggerContent || (
              /* Non-element custom trigger wrapper — no visual styling, user owns the appearance */
              <div
                onClick={handleTriggerClick}
                onKeyDown={handleCustomTriggerKeyDown}
                role="button"
                tabIndex={isDisabled ? -1 : 0}
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                aria-disabled={isDisabled}
                className="group/date-filter w-fit"
              >
                {triggerContent}
              </div>
            )
          ) : (
            /* Default input trigger */
            <InputGroup isError={isError} size={size}>
              <InputGroupInput
                id={id || DATE_PICKER_TRIGGER_ID}
                ref={inputRef}
                disabled={isDisabled}
                placeholder={placeholder || dateFormat}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleTriggerFocus}
                onKeyDown={handleTriggerKeyDown}
                {...ariaProps}
              />
              <InputGroupAddon align="inline-right">
                <InputGroupIcon name="Calendar" />
              </InputGroupAddon>
            </InputGroup>
          )}
        </div>
      </PopoverPrimitive.Anchor>

      {/* Dropdown content — uses Radix Popover portal for collision-aware positioning */}
      {isOpen && (
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            avoidCollisions
            collisionPadding={8}
            // Suppress auto-focus management — the picker manages its own focus
            onOpenAutoFocus={e => e.preventDefault()}
            onCloseAutoFocus={e => e.preventDefault()}
            // When clicking inside the trigger area (containerRef), prevent Radix from
            // dismissing the popover so the trigger's own handlers can manage open state.
            // For all other outside clicks, let onOpenChange handle reset + close.
            onInteractOutside={e => {
              if (containerRef.current?.contains(e.target as Element)) {
                e.preventDefault();
              }
            }}
            onBlur={e => {
              const relatedTarget = e.relatedTarget as Element | null;
              // Focus stayed within the dropdown content — keep open
              if (e.currentTarget.contains(relatedTarget)) return;
              // Focus moved back to the trigger container — keep open
              if (containerRef.current?.contains(relatedTarget)) return;
              // Focus moved to a nested Radix portal (e.g. month/year select) — keep open
              if (relatedTarget?.closest('[data-radix-popper-content-wrapper]')) return;
              // Focus left the picker entirely — reset and close
              handleInputBlur();
              setIsOpen(false);
            }}
          >
            <DatePickerDropdown
              header={header}
              hasInput={hasInput}
              footer={footer}
              dateFormat={dateFormat}
              inputValue={inputValue}
              parsedInputDate={parsedInputDate}
              defaultMonth={defaultMonth}
              calendarKey={calendarKey}
              disableDate={disableDate}
              onInputChange={handleInputChange}
              onInputBlur={handleInlineInputBlur}
              onCalendarChange={handleCalendarChange}
              // onApply: validate + commit current input value + close (mirrors DateRangePicker behaviour)
              onApply={handleInputBlur}
              // onClear: clear value + close
              onClear={() => {
                handleClear();
                setIsOpen(false);
              }}
              captionLayout={captionLayout}
              fromYear={fromYear}
              toYear={toYear}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      )}
    </PopoverPrimitive.Root>
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
