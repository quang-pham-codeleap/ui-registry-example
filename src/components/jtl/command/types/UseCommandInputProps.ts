import React from 'react';

/**
 * Props accepted by the useCommandInput hook.
 */
type UseCommandInputProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValueState: (value: string) => void;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  showLoadingOnType: boolean | undefined;
  openOnFocus: boolean | undefined;
};

export default UseCommandInputProps;
