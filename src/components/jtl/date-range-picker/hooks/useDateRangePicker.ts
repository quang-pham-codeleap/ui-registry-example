import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import IDateRangePickerProps from '../IDateRangePickerProps';
import {
  formatRangeInputAsTyping,
  parseRangeInput,
  formatRangeValue,
  getDefaultMonth,
  validateAndSwapDates,
  formatRangeString,
  RANGE_SEPARATOR,
} from '../utils';
import { parseFormatParts, formatInputAsTyping } from '../../date-picker';
import { parseDate } from '@/utils';

/**
 * Custom hook to manage DateRangePicker state and logic.
 * Manages two input modes:
 * - Combined trigger input ("01/12/2025 - 08/12/2025") — always active
 * - Individual from/to inline inputs inside the dropdown — active when hasInput=true
 */
export const useDateRangePicker = (props: IDateRangePickerProps, dateFormat: string) => {
  const { onChange, value: propValue, disableDate, isDisabled, hasInput = false, isOpen: controlledIsOpen, onOpenChange } = props;

  // Internal open state — used when isOpen prop is not provided (uncontrolled mode)
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Determine whether we are in controlled or uncontrolled mode
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  // Combined trigger input value (e.g., "01/12/2025 - 08/12/2025")
  const [inputValue, setInputValue] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [isSelectingTo, setIsSelectingTo] = useState(false);

  // Individual inline input values for the dropdown (used when hasInput=true)
  const [fromInputValue, setFromInputValue] = useState('');
  const [toInputValue, setToInputValue] = useState('');

  /**
   * Tracks if a complete date range exists (both from and to dates).
   * When true: User is editing existing dates, skip auto-formatting to allow manual edits.
   * When false: User is typing fresh, apply auto-formatting to help with input.
   */
  const editableMode = useRef(false);

  // Use ref for onChange to avoid stale closures and unnecessary callback recreations
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Typing state ref (use ref to avoid re-renders)
  const isTypingRef = useRef(false);

  /**
   * Format parts for the date range picker
   * Example:
   *  dateFormat: "dd / MM / yyyy"
   *  result:
   *    [
   *      { length: 2, separator: ' / ', type: 'd' },
   *      { length: 2, separator: ' / ', type: 'm' },
   *      { length: 4, separator: '', type: 'y' },
   *    ]
   */
  const formatPart = useMemo(() => parseFormatParts(dateFormat), [dateFormat]);

  // Reset typing state when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      isTypingRef.current = false;
      setIsSelectingTo(false);
    }
  }, [isOpen]);

  // Sync combined input and individual inputs with prop values when propValue changes
  useEffect(() => {
    if (!isTypingRef.current) {
      setInputValue(formatRangeValue(propValue, dateFormat));
      // Also sync individual inputs with prop values
      setFromInputValue(propValue?.from ? format(propValue.from, dateFormat) : '');
      setToInputValue(propValue?.to ? format(propValue.to, dateFormat) : '');
    }

    // Sync editableMode with propValue - enable editing mode only when both dates exist
    editableMode.current = Boolean(propValue?.from && propValue?.to);
  }, [propValue, dateFormat]);

  // Parse from and to dates from the combined input value (used when hasInput=false)
  const { parsedFromDate, parsedToDate } = useMemo(() => parseRangeInput(inputValue, dateFormat), [inputValue, dateFormat]);

  /**
   * Parse from date from the individual "from" input field.
   * Returns a valid Date only when input length matches the format (fully typed).
   */
  const parsedFromDateInput = useMemo(() => {
    return fromInputValue.length === dateFormat.length ? parseDate(fromInputValue, dateFormat) : null;
  }, [fromInputValue, dateFormat]);

  /**
   * Parse to date from the individual "to" input field.
   * Returns a valid Date only when input length matches the format (fully typed).
   */
  const parsedToDateInput = useMemo(() => {
    return toInputValue.length === dateFormat.length ? parseDate(toInputValue, dateFormat) : null;
  }, [toInputValue, dateFormat]);

  // Get default month for calendar display - considers all possible date sources
  const defaultMonth = useMemo(() => {
    // When hasInput is active, prioritize individual input dates for calendar navigation
    const effectiveFrom = hasInput ? parsedFromDateInput || propValue?.from : propValue?.from || parsedFromDate;
    const effectiveTo = hasInput ? parsedToDateInput || propValue?.to : propValue?.to || parsedToDate;
    return getDefaultMonth(effectiveFrom || null, effectiveTo || null);
  }, [hasInput, propValue, parsedFromDate, parsedToDate, parsedFromDateInput, parsedToDateInput]);

  // Unified setter — syncs both internal state and external callback
  const setIsOpen = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      if (isControlled) {
        const prev = controlledIsOpen ?? false;
        const resolved = typeof next === 'function' ? (next as (prev: boolean) => boolean)(prev) : next;
        onOpenChange?.(resolved);
      } else {
        setInternalIsOpen(prev => {
          const resolved = typeof next === 'function' ? (next as (prev: boolean) => boolean)(prev) : next;
          onOpenChange?.(resolved);
          return resolved;
        });
      }
    },
    [isControlled, controlledIsOpen, onOpenChange],
  );

  // Handle preset selection
  const handlePresetClick = useCallback(
    (index: number, presets?: Array<{ label: string; getValue?: () => DateRange }>) => {
      if (!presets) {
        return;
      }

      const presetValue = presets[index].getValue?.();
      setSelectedPreset(index);
      onChangeRef.current?.(presetValue as DateRange);

      // Also sync individual inputs when a preset is applied
      setFromInputValue(presetValue?.from ? format(presetValue.from, dateFormat) : '');
      setToInputValue(presetValue?.to ? format(presetValue.to, dateFormat) : '');
    },
    [dateFormat],
  );

  // Handle calendar date selection
  const handleCalendarChange = useCallback(
    (date: DateRange | undefined, triggerDate: Date) => {
      setSelectedPreset(null);
      isTypingRef.current = true;

      const clickedFromDate = date?.from;

      // Clear selection if no from date
      if (!clickedFromDate) {
        setFromDate(null);
        setInputValue('');
        setFromInputValue('');
        setToInputValue('');
        setIsSelectingTo(false);
        editableMode.current = false;
        return;
      }

      // First click: select 'from' date
      if (!isSelectingTo) {
        setFromDate(triggerDate);
        setInputValue(format(triggerDate, dateFormat));
        setFromInputValue(format(triggerDate, dateFormat));
        setToInputValue(''); // clear "to" so calendar shows partial selection
        setIsSelectingTo(true);
        editableMode.current = false; // Only one date selected, disable editable mode
        return;
      }

      // Second click: select 'to' date (auto-swap handled by formatRangeString)
      // Note: clickedToDate can be undefined when clicking the same date twice
      // So that, we use triggerDate instead of clickedToDate
      if (isSelectingTo && fromDate) {
        const rangeStr = formatRangeString(fromDate, triggerDate, dateFormat);
        setInputValue(rangeStr);

        // Auto-swap: ensure from <= to in individual inputs
        const swappedFrom = fromDate > triggerDate ? triggerDate : fromDate;
        const swappedTo = fromDate > triggerDate ? fromDate : triggerDate;
        setFromInputValue(format(swappedFrom, dateFormat));
        setToInputValue(format(swappedTo, dateFormat));

        setIsSelectingTo(false);
        editableMode.current = true; // Full range selected, enable editable mode
        return;
      }

      // Fallback: start fresh
      setInputValue(format(triggerDate, dateFormat));
      setFromInputValue(format(triggerDate, dateFormat));
      setToInputValue('');
      setIsSelectingTo(true);
      editableMode.current = false;
    },
    [dateFormat, isSelectingTo, fromDate],
  );

  // Handle combined trigger input change - auto-format as user types
  const handleInputChange = useCallback(
    (value: string) => {
      // Mark as typing to prevent useEffect from overwriting
      isTypingRef.current = true;

      if (!editableMode.current) {
        // Auto-format input as user types
        const formatted = formatRangeInputAsTyping(value, formatPart);
        setInputValue(formatted);
      } else {
        setInputValue(value);
      }

      setSelectedPreset(null);

      isTypingRef.current = false;
    },
    [formatPart],
  );

  /**
   * Handle "from" individual input change.
   * Auto-formats the typed value using single-date format parts.
   * The calendar syncs automatically via parsedFromDateInput.
   */
  const handleFromInputChange = useCallback(
    (value: string) => {
      isTypingRef.current = true;
      if (!editableMode.current) {
        const formatted = formatInputAsTyping(value, formatPart);
        setFromInputValue(formatted);
      } else {
        setFromInputValue(value);
      }
      setSelectedPreset(null);
      isTypingRef.current = false;
    },
    [formatPart],
  );

  /**
   * Handle "to" individual input change.
   * Auto-formats the typed value using single-date format parts.
   * The calendar syncs automatically via parsedToDateInput.
   */
  const handleToInputChange = useCallback(
    (value: string) => {
      isTypingRef.current = true;
      if (!editableMode.current) {
        const formatted = formatInputAsTyping(value, formatPart);
        setToInputValue(formatted);
      } else {
        setToInputValue(value);
      }
      setSelectedPreset(null);
      isTypingRef.current = false;
    },
    [formatPart],
  );

  // Handle combined input blur - validate and fix dates
  const handleInputBlur = useCallback(() => {
    isTypingRef.current = false;
  }, []);

  /** Handle blur from the individual "from" input */
  const handleFromInputBlur = useCallback(() => {
    isTypingRef.current = false;
  }, []);

  /** Handle blur from the individual "to" input */
  const handleToInputBlur = useCallback(() => {
    isTypingRef.current = false;
  }, []);

  // Handle click outside to close dropdown and reset to prop value
  const handleResetToPropValue = useCallback(() => {
    setInputValue(propValue ? formatRangeValue(propValue, dateFormat) : '');
    setFromInputValue(propValue?.from ? format(propValue.from, dateFormat) : '');
    setToInputValue(propValue?.to ? format(propValue.to, dateFormat) : '');
    isTypingRef.current = false;
  }, [dateFormat, propValue]);

  // Handle clear action - reset all state and notify parent
  const handleClear = useCallback(() => {
    setSelectedPreset(null);
    setInputValue('');
    setFromInputValue('');
    setToInputValue('');
    isTypingRef.current = false;
    editableMode.current = false; // Reset to enable auto-format on next typing
    setIsSelectingTo(false);
    setFromDate(null);
    onChangeRef.current?.(undefined);
  }, []);

  /**
   * Handles apply when individual from/to inline inputs are active (hasInput=true).
   * - Checks disabled dates and resets if invalid.
   * - Auto-swaps from/to if from > to.
   * - Syncs combined trigger input and notifies parent.
   * @example
   * 1. User types "10/12/2025" in "from" and "05/12/2025" in "to".
   * 2. handleApply auto-swaps to ensure from=05/12/2025 and to=10/12/2025.
   * 3. Combined input updates to "05/12/2025 - 10/12/2025".
   * 4. Parent onChange receives { from: Date(2025-12-05), to: Date(2025-12-10) }.
   */
  const applyFromIndividualInputs = useCallback(() => {
    const isFromDisabled = parsedFromDateInput && disableDate?.(parsedFromDateInput);
    const isToDisabled = parsedToDateInput && disableDate?.(parsedToDateInput);

    if (isFromDisabled || isToDisabled) {
      handleResetToPropValue();
      setIsOpen(false);
      return;
    }

    // Auto-swap from > to dates and update individual inputs to reflect the swap
    let finalFrom = parsedFromDateInput;
    let finalTo = parsedToDateInput;
    if (finalFrom && finalTo && finalFrom > finalTo) {
      [finalFrom, finalTo] = [finalTo, finalFrom];
      setFromInputValue(format(finalFrom, dateFormat));
      setToInputValue(format(finalTo, dateFormat));
    }

    // Sync combined trigger input with the applied range
    if (finalFrom && finalTo) {
      setInputValue(`${format(finalFrom, dateFormat)}${RANGE_SEPARATOR}${format(finalTo, dateFormat)}`);
      editableMode.current = true;
    } else if (finalFrom) {
      setInputValue(format(finalFrom, dateFormat));
      editableMode.current = false;
    }

    onChangeRef.current?.({ from: finalFrom || undefined, to: finalTo || undefined });
    setIsOpen(false);
  }, [parsedFromDateInput, parsedToDateInput, disableDate, handleResetToPropValue, setIsOpen, dateFormat]);

  /**
   * Handles apply when the combined trigger input is active (hasInput=false).
   * - Validates and auto-swaps dates from the combined input string.
   * - Checks disabled dates and resets if invalid.
   * - Updates combined input and notifies parent.
   * @example
   * 1. User types "10/12/2025 - 05/12/2025" in the combined input.
   * 2. handleApply auto-swaps to ensure from=05/12/2025 and to=10/12/2025.
   * 3. Combined input updates to "05/12/2025 - 10/12/2025".
   * 4. Parent onChange receives { from: Date(2025-12-05), to: Date(2025-12-10) }.
   */
  const applyFromCombinedInput = useCallback(() => {
    const validatedValue = validateAndSwapDates(inputValue, dateFormat, formatPart);
    const { parsedFromDate: validatedFrom, parsedToDate: validatedTo } = parseRangeInput(validatedValue, dateFormat);

    // Check if either date falls within disabled dates — reset to prop value if so
    const isFromDisabled = validatedFrom && disableDate?.(validatedFrom);
    const isToDisabled = validatedTo && disableDate?.(validatedTo);

    if (isFromDisabled || isToDisabled) {
      handleResetToPropValue();
      setIsOpen(false);
      return;
    }

    // Enable editable mode only when both dates are present
    editableMode.current = Boolean(validatedFrom && validatedTo);
    setInputValue(validatedValue);
    onChangeRef.current?.({ from: validatedFrom || undefined, to: validatedTo || undefined });
    setIsOpen(false);
  }, [inputValue, dateFormat, formatPart, disableDate, handleResetToPropValue, setIsOpen]);

  /**
   * Routes apply logic to the correct handler based on the active input mode.
   * - hasInput=true  → prefer individual inputs, but fall back to combined input
   * - hasInput=false → applyFromCombinedInput
   */
  const handleApply = useCallback(() => {
    if (hasInput) {
      // When hasInput=true, the combined trigger input is still editable and updates `inputValue`.
      // If the user has not populated the individual inputs (both empty) but has typed a value
      // into the combined input, prefer applying from the combined input so Enter/apply reflects
      // what the user actually edited.
      const hasIndividualValues = Boolean(fromInputValue || toInputValue);
      const hasCombinedValue = Boolean(inputValue);
      if (!hasIndividualValues && hasCombinedValue) {
        applyFromCombinedInput();
      } else {
        applyFromIndividualInputs();
      }
    } else {
      applyFromCombinedInput();
    }
  }, [hasInput, inputValue, fromInputValue, toInputValue, applyFromIndividualInputs, applyFromCombinedInput]);

  // Handle input focus - open dropdown
  const handleInputFocus = useCallback(() => {
    if (!isDisabled) {
      setIsOpen(true);
    }
  }, [isDisabled, setIsOpen]);

  return {
    // State
    isOpen,
    setIsOpen,
    selectedPreset,
    // Combined trigger input value
    inputValue,
    defaultMonth,
    // Parsed dates from combined input (drive calendar when hasInput=false)
    parsedFromDate,
    parsedToDate,
    // Individual inline input values (used when hasInput=true)
    fromInputValue,
    toInputValue,
    // Parsed dates from individual inputs (drive calendar when hasInput=true)
    parsedFromDateInput,
    parsedToDateInput,
    // Handlers
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
  };
};
