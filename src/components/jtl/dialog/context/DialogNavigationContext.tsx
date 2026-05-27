import React, { createContext } from 'react';
import IDialogNavigationContextProps from './IDialogNavigationContextProps';
import { DialogNavigationContextValue } from '../types';

const DialogNavigationContext = createContext<DialogNavigationContextValue | undefined>(undefined);

/**
 * Provider component for DialogNavigation context
 */
export const DialogNavigationProvider: React.FC<IDialogNavigationContextProps> = ({ children, value }) => {
  return <DialogNavigationContext.Provider value={value}>{children}</DialogNavigationContext.Provider>;
};

export default DialogNavigationContext;
