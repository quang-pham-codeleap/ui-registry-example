/**
 * Configuration options for the alert dialog component
 *
 * @interface IAlertDialogProps
 */
export default interface IAlertDialogProps {
  /**
   * Controls whether the alert dialog is visible
   */
  isOpen?: boolean;
  /**
   * The title of the alert dialog
   */
  title?: string;

  /**
   * The description/message to display in the alert dialog body
   */
  description?: string;

  /**
   * The text for the call-to-action button (primary action)
   */
  ctaLabel?: string;

  /**
   * The text for the cancel button (secondary action)
   */
  cancelText?: string;

  /**
   * Whether the confirm button should use destructive styling (red)
   */
  isDestructive?: boolean;
  /**
   * Callback fired when the user confirms the dialog action
   * @param reason Optional reason for the confirmation
   */
  onAccept?: (reason?: unknown) => void;
  /**
   * Callback fired when the user cancels or dismisses the dialog
   * @param reason Optional reason for the cancellation
   */
  onCancel?: (reason?: unknown) => void;
}
