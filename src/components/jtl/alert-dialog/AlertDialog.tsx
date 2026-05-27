import React from 'react';
import IAlertDialogProps from './IAlertDialogProps';
import { useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../dialog';
import { Button } from '../button';

/**
 * AlertDialog component that displays a modal dialog for confirmations, alerts, or destructive actions.
 * Used to prompt users about critical or destructive actions that require explicit confirmation.
 *
 * @component
 *
 * @param props {@link IAlertDialogProps} - The component props
 *
 * @example
 * // Basic confirmation dialog
 * <AlertDialog
 *   isOpen={true}
 *   title="Delete Account"
 *   description="Are you sure you want to delete your account? This action cannot be undone."
 *   ctaLabel="Delete"
 *   cancelText="Cancel"
 *   isDestructive={true}
 *   onAccept={() => console.log('Confirmed')}
 *   onCancel={() => console.log('Cancelled')}
 * />
 *
 * @returns {JSX.Element} AlertDialog component
 */
const AlertDialog: React.FC<IAlertDialogProps> = ({
  isOpen = false,
  title,
  description: message,
  ctaLabel: confirmText,
  cancelText,
  isDestructive,
  onAccept: onConfirm,
  onCancel,
}) => {
  /**
   * Handles the confirm action
   */
  const handleConfirm = useCallback(() => {
    onConfirm?.();
  }, [onConfirm]);

  /**
   * Handles the cancel action
   */
  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) handleCancel();
      }}
    >
      <DialogContent hasCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {message && <DialogDescription>{message}</DialogDescription>}
        </DialogHeader>

        <DialogFooter className="gap-2 mt-4">
          <Button type="button" label={cancelText} variant="outline" onClick={handleCancel} />
          <Button type="button" label={confirmText} variant={isDestructive ? 'destructive' : 'default'} onClick={handleConfirm} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
