import { useCallback } from 'react';
import { UseCommandInputProps, UseCommandInputReturn } from '../types';

/**
 * Provides handlers for the Command search input:
 * value changes (with open + pending state side-effects) and focus.
 */
export const useCommandInput = ({
  open,
  setOpen,
  setValueState,
  setIsPending,
  showLoadingOnType,
  openOnFocus,
}: UseCommandInputProps): UseCommandInputReturn => {
  /**
   * Handler to manage input value changes.
   */
  const handleInputOnValueChange = useCallback(
    (value: string) => {
      setValueState(value);

      if (!open) {
        setOpen(true);
      }

      if (showLoadingOnType) {
        setIsPending(true);
      }
    },
    [open, setValueState, showLoadingOnType, setOpen, setIsPending],
  );

  /**
   * Handler to manage input focus event.
   */
  const handleInputOnFocus = useCallback(() => {
    if (openOnFocus) {
      setOpen(true);
    }
  }, [openOnFocus, setOpen]);

  return { handleInputOnValueChange, handleInputOnFocus };
};
