import React from 'react';
import CommandVariant from './CommandVariant';

/**
 * Props accepted by the useCommandState hook.
 */
type UseCommandStateProps<T extends CommandVariant> = {
  /** Controlled value passed from the parent */
  value: string | (string | null)[] | null | undefined;
  defaultValue: string | undefined;
  onValueChange: ((value: string) => void) | undefined;
  variant: T;
  showLoadingOnType: boolean | undefined;
  onDebouncedValueChange: ((value: string) => void) | undefined;
  delay?: number;
  openOnFocus?: boolean;
  isPopover?: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
};

export default UseCommandStateProps;
