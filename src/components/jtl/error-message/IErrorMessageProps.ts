export default interface IErrorMessageProps {
  /**
   * The error message text to display.
   */
  message?: string;

  /**
   * ID for the element — used by aria-describedby to link the error message
   * to the input control for screen reader accessibility.
   */
  id?: string;
}
