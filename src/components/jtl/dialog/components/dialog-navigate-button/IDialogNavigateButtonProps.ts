import IButtonProps from '../../../button/IButtonProps';

/**
 * Props for the DialogNavigateButton component.
 * Extends IButtonProps — `type` is always set to `"button"` internally.
 * `onClick` is redefined to receive the navigation function as its argument.
 */
export default interface IDialogNavigateButtonProps extends Omit<IButtonProps, 'onClick' | 'type'> {
  /**
   * The `name` of the DialogStep to navigate to when clicked.
   */
  to: string;

  /**
   * Optional interceptor called before navigation. Receives the `navigate` callback.
   * Call `navigate()` to proceed. If omitted, navigation fires immediately on click.
   *
   * @example
   * ```tsx
   * <DialogNavigateButton
   *   to="confirm"
   *   onClick={(navigate) => {
   *     if (isFormValid) navigate();
   *   }}
   * />
   * ```
   */
  onClick?: (navigate: () => void) => void;
}
