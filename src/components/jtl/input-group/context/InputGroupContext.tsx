import React, { createContext } from 'react';
import { InputGroupContextValue } from '../types';

/**
 * Default context value
 */
const defaultContextValue: InputGroupContextValue = {
  size: 'default',
  isError: false,
  disabled: false,
  readOnly: false,
  isFocused: false,
  setIsFocused: () => {},
  inputProps: undefined,
};

/**
 * InputGroup context for sharing state with child components
 */
const InputGroupContext = createContext<InputGroupContextValue>(defaultContextValue);

/**
 * Props for InputGroupProvider
 */
interface InputGroupProviderProps extends React.PropsWithChildren {
  value: InputGroupContextValue;
}

/**
 * Provider component for InputGroup context.
 * The calling site (InputGroup.tsx) already memoizes contextValue —
 * no need for a redundant useMemo wrapper here.
 */
const InputGroupProvider = ({ children, value }: InputGroupProviderProps) => {
  return <InputGroupContext.Provider value={value}>{children}</InputGroupContext.Provider>;
};

InputGroupProvider.displayName = 'InputGroupProvider';

export { InputGroupContext, InputGroupProvider };
