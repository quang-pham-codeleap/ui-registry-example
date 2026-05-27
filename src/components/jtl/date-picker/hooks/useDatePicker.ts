import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import IDatePickerProps from '../IDatePickerProps';
import { formatInputAsTyping, formatDateInput, parseFormatParts } from '../utils';
import { parseDate } from '@/utils';

/**
 * Custom hook to manage DatePicker (single mode) state and logic.
 * Supports both uncontrolled (internal state) and controlled (isOpen/onOpenChange) open modes.
 */
export default function useDatePicker(
  { value, onChange, disableDate, isOpen: controlledIsOpen, onOpenChange, closeOnSelect = true }: IDatePickerProps,
  dateFormat: string,
) {
  // Internal open state — used when isOpen prop is not provided (uncontrolled mode)
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Determine whether we are in controlled or uncontrolled mode
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Input field state
  const [inputValue, setInputValue] = useState('');

  /**
   * Tracks if a valid date exists
   * When true: User is editing existing date, skip auto-formatting to allow manual edits
   * When false: User is typing fresh, apply auto-formatting to help with input
   */
  const editableMode = useRef(false);

  // Use ref for onChange to avoid stale closures and unnecessary callback recreations
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Typing state ref (use ref to avoid re-renders)
  const isTypingRef = useRef(false);

  const formatParts = useMemo(() => parseFormatParts(dateFormat), [dateFormat]);

  // Sync input field with prop value only when user is not typing
  useEffect(() => {
    if (!isOpen) {
      isTypingRef.current = false;
    }

    if (!isTypingRef.current) {
      setInputValue(value ? format(value, dateFormat) : '');
    }

    // Sync editableMode with value - enable editing mode only when valid date exists
    editableMode.current = Boolean(value);
  }, [value, dateFormat, isOpen]);

  // Compute parsed date from input value for calendar display
  const parsedInputDate = useMemo(() => {
    return parseDate(inputValue, dateFormat);
  }, [inputValue, dateFormat]);

  // Get default month for calendar display
  const defaultMonth = useMemo(() => {
    return parsedInputDate || new Date();
  }, [parsedInputDate]);

  // Unified setter — syncs both internal state and external callback
  const setIsOpen = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      if (!isControlled) {
        // Uncontrolled mode: derive next value from latest internal state
        setInternalIsOpen(prev => {
          const resolved = typeof next === 'function' ? (next as (p: boolean) => boolean)(prev) : next;
          onOpenChange?.(resolved);
          return resolved;
        });
      } else {
        // Controlled mode: derive next value from latest controlled prop
        const prev = controlledIsOpen ?? false;
        const resolved = typeof next === 'function' ? (next as (p: boolean) => boolean)(prev) : next;
        onOpenChange?.(resolved);
      }
    },
    [isControlled, controlledIsOpen, onOpenChange],
  );

  // Handle calendar date selection
  // Closes the dropdown only when closeOnSelect=true (default)
  const handleCalendarChange = useCallback(
    (date: Date | undefined) => {
      editableMode.current = Boolean(date);
      onChangeRef.current?.(date);
      if (closeOnSelect) {
        setIsOpen(false);
      }
    },
    [closeOnSelect, setIsOpen],
  );

  // Handle input change
  const handleInputChange = useCallback(
    (value: string) => {
      // Mark as typing to prevent useEffect from overwriting
      isTypingRef.current = true;

      if (!editableMode.current) {
        // Auto-format input as user types
        const formatted = formatInputAsTyping(value, formatParts);
        setInputValue(formatted);
      } else {
        setInputValue(value);
      }

      isTypingRef.current = false;
    },
    [formatParts],
  );

  // Handle reset to prop value - used when typed date is disabled
  const handleResetToPropValue = useCallback(() => {
    setInputValue(value ? format(value, dateFormat) : '');
    isTypingRef.current = false;
  }, [dateFormat, value]);

  // Handle blur - validate and fix input
  const handleInputBlur = useCallback(() => {
    if (!inputValue) {
      isTypingRef.current = false;
      editableMode.current = false;
      setInputValue('');
      onChangeRef.current?.(undefined);
      setIsOpen(false);
      return;
    }

    // Validate and fix the input value
    const validated = formatDateInput(inputValue, formatParts);
    setInputValue(validated);

    // Try to parse and call onChange if valid
    const parsed = parseDate(validated, dateFormat);

    // Check if parsed date falls within disabled dates - reset to prop value if so
    if (parsed && disableDate?.(parsed)) {
      handleResetToPropValue();
      setIsOpen(false);
      return;
    }

    if (parsed && validated.length === dateFormat.length) {
      editableMode.current = true;
      onChangeRef.current?.(parsed);
    } else {
      editableMode.current = false;
    }

    isTypingRef.current = false;
    setIsOpen(false);
  }, [inputValue, dateFormat, formatParts, disableDate, handleResetToPropValue, setIsOpen]);

  // Handle clear action
  const handleClear = useCallback(() => {
    setInputValue('');
    isTypingRef.current = false;
    editableMode.current = false; // Reset to enable auto-format on next typing
    onChangeRef.current?.(undefined);
  }, []);

  return {
    // State
    isOpen,
    setIsOpen,
    inputValue,
    defaultMonth,
    // Parsed date from input
    parsedInputDate,
    // Handlers
    handleCalendarChange,
    handleInputChange,
    handleInputBlur,
    handleClear,
  };
}
