import React from 'react';
import { useOptionalDialogNavigationContext } from '../../hooks';
import IDialogStepProps from './IDialogStepProps';

/**
 * DialogStep renders its children only when it is the currently active step
 * in a parent `DialogNavigation`. Renders nothing when inactive.
 *
 * @param props {@link IDialogStepProps}
 * @returns The rendered step children or null
 *
 * @example
 * ```tsx
 * <DialogNavigation initialStep="info">
 *   <DialogStep name="info">
 *     <DialogHeader><DialogTitle>Info</DialogTitle></DialogHeader>
 *   </DialogStep>
 * </DialogNavigation>
 * ```
 */
const DialogStep: React.FC<IDialogStepProps> = ({ name, children }: IDialogStepProps) => {
  const context = useOptionalDialogNavigationContext();

  if (context?.currentStep !== name) {
    return null;
  }

  return children;
};

DialogStep.displayName = 'DialogStep';

export default DialogStep;
