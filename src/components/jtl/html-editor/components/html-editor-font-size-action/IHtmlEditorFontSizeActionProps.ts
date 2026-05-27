import HandleToolbarAction from '../../types/HandleToolbarAction';

/**
 * Props for the FontSizeAction component.
 */
export default interface IHtmlEditorFontSizeActionProps {
  /** Fired when the user picks a font size. Calls onAction('fontSize', { size }) with the selected size. */
  onAction: HandleToolbarAction;
  /** The currently active font size at the cursor position. Used to show the checkmark. */
  selectedFontSize?: number;
}
