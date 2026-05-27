/**
 * Props for TextareaAtom component
 * @interface ITextareaAtomProps
 */
export default interface ITextareaAtomProps extends React.ComponentPropsWithRef<'textarea'> {
  /**
   * Indicates if the textarea has an error state.
   */
  error?: boolean;
}
