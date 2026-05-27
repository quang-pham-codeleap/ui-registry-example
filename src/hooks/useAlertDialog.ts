import React, { useId } from 'react';
import { createRoot } from 'react-dom/client';
import { AlertDialog, IAlertDialogProps } from '../components/jtl/alert-dialog';

/**
 * Hook that provides a way to show alert dialogs imperatively without needing a provider.
 * Creates a portal and renders the AlertDialog component directly in the DOM.
 *
 * @returns An object containing the alertDialog function
 *
 * @example
 * ```tsx
 * const { alertDialog } = useAlertDialog();
 *
 * const handleDeleteClick = async () => {
 *   const confirmed = await alertDialog({
 *     title: 'Delete Item',
 *     description: 'Are you sure you want to delete this item?',
 *     ctaLabel: 'Delete',
 *     cancelText: 'Cancel',
 *     isDestructive: true,
 *   });
 *
 *   if (confirmed) {
 *     // Handle confirmation
 *     deleteItem();
 *   }
 * };
 * ```
 */
export default function useAlertDialog() {
  const id = useId();
  /**
   * Shows an alert dialog with the given options
   * @param options - Configuration options for the alert dialog
   * @returns A promise that resolves to true if confirmed, false if canceled
   */
  const alertDialog = (options: Omit<IAlertDialogProps, 'isOpen' | 'onAccept' | 'onCancel'>): Promise<boolean> => {
    // Create a DOM node for this dialog
    const container = document.createElement('div');
    container.id = id;
    document.body.appendChild(container);

    return new Promise<boolean>(resolve => {
      const root = createRoot(container);

      /**
       * Handles closing the dialog and cleaning up the DOM node
       * @param result - The result of the dialog (true for confirm, false for cancel)
       */
      const handleClose = (result: boolean) => {
        resolve(result);
        setTimeout(() => {
          root.unmount();
          container.remove();
        }, 0);
      };

      root.render(
        React.createElement(AlertDialog, {
          ...options,
          isOpen: true,
          onAccept: () => handleClose(true),
          onCancel: () => handleClose(false),
        }),
      );
    });
  };

  return { alertDialog };
}
