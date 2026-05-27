import HandleToolbarAction from '../../types/HandleToolbarAction';

/**
 * Props for the TableAction component.
 * Receives an action dispatcher to trigger table insertion.
 */
export default interface IHtmlEditorTableActionProps {
  /**
   * Callback to dispatch toolbar actions.
   * Called with onAction('insertTable') when the button is clicked.
   */
  onAction: HandleToolbarAction;
}
