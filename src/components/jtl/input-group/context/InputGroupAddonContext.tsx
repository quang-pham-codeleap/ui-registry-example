import React, { createContext } from 'react';
import { InputGroupAddonContextValue } from '../types';

/**
 * Default context value
 */
const defaultContextValue: InputGroupAddonContextValue = {
  side: 'left',
  inline: false,
};

/**
 * InputGroup context for sharing state with child components
 */
const InputGroupAddonContext = createContext<InputGroupAddonContextValue>(defaultContextValue);

/**
 * Props for InputGroupProvider
 */
interface InputGroupAddonProviderProps extends React.PropsWithChildren {
  value: InputGroupAddonContextValue;
}

/**
 * Provider component for InputGroup addon context.
 * The calling site (InputGroupAddon.tsx) already memoizes contextValue —
 * no need for a redundant useMemo wrapper here.
 */
const InputGroupAddonProvider = ({ children, value }: InputGroupAddonProviderProps) => {
  return <InputGroupAddonContext.Provider value={value}>{children}</InputGroupAddonContext.Provider>;
};

InputGroupAddonProvider.displayName = 'InputGroupAddonProvider';

export { InputGroupAddonContext, InputGroupAddonProvider };
