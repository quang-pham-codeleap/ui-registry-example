import HandleToolbarAction from '../../types/HandleToolbarAction';

/**
 * Props for the TextAlignmentAction popover toolbar button.
 */
export default interface IHtmlEditorTextAlignmentActionProps {
  /**
   * Fired when the user selects an alignment option.
   * Calls onAction with e.g. 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify'.
   */
  onAction: HandleToolbarAction;

  /**
   * The currently active alignment value at the cursor position (e.g. "alignLeft").
   * Used to highlight the active button and set the trigger icon.
   */
  selectedAlignment?: string;
}
