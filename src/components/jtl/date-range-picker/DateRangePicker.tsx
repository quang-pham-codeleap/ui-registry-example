import React, { useCallback, useMemo, useRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import IDateRangePickerProps from './IDateRangePickerProps';
import { useDateRangePicker } from './hooks';
import { DateRangePickerDropdown } from './components';
import { DATE_RANGE_PICKER_TRIGGER_ID } from './constants';
import { DATE_FORMAT_DEFAULT } from '../date-picker/constants';
import { cloneTriggerElement } from '../date-picker/utils';
import { DATE_RANGE_PRESETS } from './utils';
import { InputGroup, InputGroupAddon, InputGroupIcon, InputGroupInput } from '../input-group';
import { pickFieldAriaProps } from '@/utils';

/**
 * DateRangePicker component for selecting a date range.
 * Features two-month calendar view, presets, and range input fields.
 *
 * @param props {@link IDateRangePickerProps} - The component props
 * @returns The rendered DateRangePicker component
 *
 * @example
 * Basic usage
 * ```tsx
 * const [dateRange, setDateRange] = useState<DateRange>();
 *
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 * />
 * ```
 *
 * @example
 * With inline inputs and a custom header
 * ```tsx
 * const [dateRange, setDateRange] = useState<DateRange>();
 *
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   hasInput
 *   header={<Select options={presetOptions} />}
 * />
 * ```
 */
const DateRangePicker: React.FC<IDateRangePickerProps> = props => {
  const {
    isDisabled = false,
    id,
    disableDate,
    format: dateFormat = DATE_FORMAT_DEFAULT,
    placeholder,
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

  // Use custom hook for state and logic management
  const {
    isOpen,
    setIsOpen,
    selectedPreset,
    inputValue,
    parsedFromDate,
    parsedToDate,
    parsedFromDateInput,
    parsedToDateInput,
    defaultMonth,
    fromInputValue,
    toInputValue,
    handlePresetClick,
    handleCalendarChange,
    handleInputChange,
    handleInputBlur,
    handleInputFocus,
    handleFromInputChange,
    handleToInputChange,
    handleFromInputBlur,
    handleToInputBlur,
    handleClear,
    handleApply,
    handleResetToPropValue,
  } = useDateRangePicker(props, dateFormat);

  // Ref for container to detect click outside
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Calendar value for the range highlight.
   * When hasInput=true: driven by individual from/to input parsing.
   * When hasInput=false: driven by the combined trigger input parsing.
   */
  const calendarValue = useMemo(() => {
    const fromDate = hasInput ? parsedFromDateInput : parsedFromDate;
    const toDate = hasInput ? parsedToDateInput : parsedToDate;

    if (!fromDate && !toDate) {
      return undefined;
    }
    return { from: fromDate ?? undefined, to: toDate ?? undefined };
  }, [hasInput, parsedFromDate, parsedToDate, parsedFromDateInput, parsedToDateInput]);

  // Ref for input to blur on Enter/Escape
  const inputRef = useRef<HTMLInputElement>(null);

  // Accessibility props forwarded to the default Input trigger for Field/FormControl integration.
  // Only applied to the default input trigger (no triggerContent). Custom triggers own their a11y.
  const ariaProps = pickFieldAriaProps(props);

  // Handle Enter key to apply date from input
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleApply();
      }
      // Close dropdown on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [handleApply, setIsOpen],
  );

  // Handle custom trigger click — toggles the dropdown open/closed
  const handleTriggerClick = useCallback(() => {
    if (!isDisabled) {
      setIsOpen(prev => !prev);
    }
  }, [isDisabled, setIsOpen]);

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

      // Focus left the container — reset to prop value and close
      handleResetToPropValue();
      setIsOpen(false);
    },
    [handleResetToPropValue, setIsOpen],
  );

  // Handle keyboard interaction on the custom trigger wrapper
  const handleCustomTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        // Prevent page scroll for Space when used to activate the trigger
        if (e.key === ' ') {
          e.preventDefault();
        }
        handleTriggerClick();
      }
    },
    [handleTriggerClick, setIsOpen],
  );

  const individualPresetIndex = useMemo(() => DATE_RANGE_PRESETS.findIndex(preset => !preset.getValue), []);

  // Clone the trigger element (when it's a valid React element) and merge ARIA attrs + handlers
  const clonedTriggerContent = cloneTriggerElement(triggerContent, {
    id,
    defaultId: DATE_RANGE_PICKER_TRIGGER_ID,
    isOpen,
    isDisabled,
    onTriggerClick: handleTriggerClick,
    onEscape: () => setIsOpen(false),
  });

  // Callback for Radix Popover's onOpenChange — resets state when the popover
  // is dismissed by clicking outside or pressing Escape while focus is in the dropdown.
  const handlePopoverOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        handleResetToPropValue();
        setIsOpen(false);
      }
    },
    [handleResetToPropValue, setIsOpen],
  );

  return (
    <PopoverPrimitive.Root modal={false} open={isOpen} onOpenChange={handlePopoverOpenChange}>
      <PopoverPrimitive.Anchor asChild>
        <div ref={containerRef} className="flex relative" onBlur={handleFocusOut}>
          {/* Trigger: custom content OR default input field */}
          {triggerContent ? (
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
                // group/date-filter enables descendant icons to use group-aria-expanded/date-filter:* utilities
                // e.g. an icon inside triggerContent can respond to aria-expanded state with CSS only
                className="group/date-filter w-fit"
              >
                {triggerContent}
              </div>
            )
          ) : (
            /* Default input trigger */
            <InputGroup isError={isError} size={size}>
              <InputGroupInput
                ref={inputRef}
                id={id || DATE_RANGE_PICKER_TRIGGER_ID}
                disabled={isDisabled}
                placeholder={placeholder || `${dateFormat} - ${dateFormat}`}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
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
              handleResetToPropValue();
              setIsOpen(false);
            }}
          >
            <DateRangePickerDropdown
              header={header}
              hasInput={hasInput}
              footer={footer}
              dateFormat={dateFormat}
              calendarValue={calendarValue}
              defaultMonth={defaultMonth}
              selectedPreset={selectedPreset ?? individualPresetIndex}
              individualPresetIndex={individualPresetIndex}
              fromInputValue={fromInputValue}
              toInputValue={toInputValue}
              disableDate={disableDate}
              onPresetClick={index => handlePresetClick(index, DATE_RANGE_PRESETS)}
              onCalendarChange={handleCalendarChange}
              onFromInputChange={handleFromInputChange}
              onToInputChange={handleToInputChange}
              onFromInputBlur={handleFromInputBlur}
              onToInputBlur={handleToInputBlur}
              onClear={handleClear}
              onApply={handleApply}
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

DateRangePicker.displayName = 'DateRangePicker';

export default DateRangePicker;
