import React from 'react';

/**
 * Return value of the useCommandState hook.
 */
type UseCommandStateReturn = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  valueState: string;
  setValueState: (value: string) => void;
  availableRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export default UseCommandStateReturn;
