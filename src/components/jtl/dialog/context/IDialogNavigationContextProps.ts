import React from 'react';
import { DialogNavigationContextValue } from '../types';

/**
 * Props for DialogNavigationContext.Provider
 */
export default interface IDialogNavigationContextProps extends React.PropsWithChildren<{ value: DialogNavigationContextValue }> {}
