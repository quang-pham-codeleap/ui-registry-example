import React, { useCallback } from 'react';
import { Button } from '../../../button';
import { useDialogNavigationContext } from '../../hooks';
import IDialogNavigateButtonProps from './IDialogNavigateButtonProps';

/**
 * DialogNavigateButton navigates to a named DialogStep when clicked.
 * Must be used inside a `DialogNavigation` tree.
 *
 * @param props {@link IDialogNavigateButtonProps}
 * @returns A Button that triggers step navigation
 *
 * @example
 * ```tsx
 * <DialogNavigateButton to="confirm" label="Next" />
 * ```
 */
const DialogNavigateButton: React.FC<IDialogNavigateButtonProps> = ({ to, onClick, ...buttonProps }) => {
  const { navigateTo } = useDialogNavigationContext();

  const handleClick = useCallback(() => {
    const navigate = () => navigateTo(to);
    if (onClick) {
      onClick(navigate);
    } else {
      navigate();
    }
  }, [navigateTo, to, onClick]);

  return <Button {...buttonProps} type="button" onClick={handleClick} />;
};

DialogNavigateButton.displayName = 'DialogNavigateButton';

export default DialogNavigateButton;
