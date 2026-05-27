import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import { default as useControlledState } from '@/@/hooks/useControlledState';
import { COMMAND_DELAY_DEFAULT, COMMAND_VARIANT } from '../constants';
import { CommandVariant, UseCommandStateProps, UseCommandStateReturn } from '../types';

/**
 * Manages core Command state: value, open/closed, debounce pending flag,
 * click-outside close, and popover auto-focus.
 */
export const useCommandState = <T extends CommandVariant>({
  value,
  defaultValue,
  onValueChange,
  variant,
  showLoadingOnType,
  onDebouncedValueChange,
  delay = COMMAND_DELAY_DEFAULT,
  isPopover,
  ref,
}: UseCommandStateProps<T>): UseCommandStateReturn => {
  const internalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const availableRef = ref ?? internalRef;

  const [open, setOpen] = useState<boolean>(false);

  // Indicates the period between user typing and debounce completing
  const [isPending, setIsPending] = useState<boolean>(false);

  // If the variant is `CHECKBOX`, we do not pass a value to the Input
  const passedValue = variant === COMMAND_VARIANT.CHECKBOX ? undefined : (value as string);

  const { value: valueState, setValue: setValueState } = useControlledState<string>(passedValue, defaultValue ?? '', onValueChange);

  /**
   * Optional debounce for input value changes
   */
  useDebounce(
    () => {
      if (showLoadingOnType) {
        setIsPending(false);
      }
      onDebouncedValueChange?.(valueState);
    },
    delay,
    [valueState, onDebouncedValueChange],
  );

  /**
   * Autofocus the search input when rendered inside a popover (on mount)
   */
  useEffect(() => {
    if (!isPopover) return;
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [isPopover]);

  return {
    open,
    setOpen,
    isPending,
    setIsPending,
    valueState,
    setValueState,
    availableRef,
    inputRef,
  };
};
