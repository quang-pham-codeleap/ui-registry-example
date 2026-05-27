import React, { createContext } from 'react';
import ICheckboxGroupContextProps from './ICheckboxGroupContextProps';
import { CheckboxGroupContextValue } from '../types';

// Create context with undefined default (will be provided by CheckboxGroup)
const CheckboxGroupContext = createContext<CheckboxGroupContextValue | undefined>(undefined);

/**
 * Provider component for CheckboxGroup context
 */
export const CheckboxGroupProvider: React.FC<ICheckboxGroupContextProps> = ({ children, value }) => {
  return <CheckboxGroupContext.Provider value={value}>{children}</CheckboxGroupContext.Provider>;
};

export default CheckboxGroupContext;
