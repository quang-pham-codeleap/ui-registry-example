import React, { useReducer, useCallback, useMemo } from 'react';
import { DialogNavigationProvider } from '../../context';
import IDialogNavigationProps from './IDialogNavigationProps';
import { navigationReducer } from './utils';

/**
 * DialogNavigation manages step-based navigation within a Dialog without
 * stacking multiple dialogs. It provides context consumed by `DialogStep`,
 * `DialogNavigateButton`, and `DialogHeader`.
 *
 * @param props {@link IDialogNavigationProps}
 * @returns The rendered navigation container
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogContent>
 *     <DialogNavigation initialStep="info">
 *       <DialogStep name="info">
 *         <DialogHeader>
 *           <DialogTitle>Basic Info</DialogTitle>
 *         </DialogHeader>
 *         <DialogFooter>
 *           <DialogNavigateButton to="confirm" label="Next" />
 *         </DialogFooter>
 *       </DialogStep>
 *       <DialogStep name="confirm">
 *         <DialogHeader>
 *           <DialogTitle>Confirm</DialogTitle>
 *         </DialogHeader>
 *       </DialogStep>
 *     </DialogNavigation>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const DialogNavigation: React.FC<IDialogNavigationProps> = ({ initialStep, children }: IDialogNavigationProps) => {
  const [state, dispatch] = useReducer(navigationReducer, { currentStep: initialStep, history: [] });

  const navigateTo = useCallback((step: string) => {
    dispatch({ type: 'navigate', step });
  }, []);

  const navigateBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, []);

  const contextValue = useMemo(
    () => ({
      currentStep: state.currentStep,
      canGoBack: state.history.length > 0,
      navigateTo,
      navigateBack,
    }),
    [state.currentStep, state.history.length, navigateTo, navigateBack],
  );

  return <DialogNavigationProvider value={contextValue}>{children}</DialogNavigationProvider>;
};

DialogNavigation.displayName = 'DialogNavigation';

export default DialogNavigation;
