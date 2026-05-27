import React from 'react';
import CommandVariant from './CommandVariant';
import OnItemSelect from './OnItemSelect';

/**
 * Props accepted by the useCommandSelection hook.
 */
type UseCommandSelectionProps<T extends CommandVariant> = {
  value: string | (string | null)[] | null | undefined;
  variant: T;
  setValueState: (value: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onItemSelect: OnItemSelect<T> | undefined;
  commandListRef: React.RefObject<HTMLDivElement | null>;
  selectedGroupRef: React.RefObject<HTMLDivElement | null>;
};

export default UseCommandSelectionProps;
