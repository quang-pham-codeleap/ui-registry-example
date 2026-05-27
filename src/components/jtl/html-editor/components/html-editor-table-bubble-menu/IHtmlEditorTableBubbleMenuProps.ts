import { SelectedTableData, HandleToolbarAction } from '../../types';

/**
 * Props for the HtmlEditorTableBubbleMenu component.
 * Shown when a table is selected in the editor.
 */
export default interface IHtmlEditorTableBubbleMenuProps {
  /**
   * The currently selected table data.
   * When null, the bubble menu should not render.
   */
  selectedTable: SelectedTableData | null;

  /**
   * Callback fired when the user interacts with the bubble menu.
   * Calls data-less actions like:
   *   - onAction('addColumnAfter')
   *   - onAction('addRowAfter')
   *   - onAction('mergeCells')
   *   - onAction('splitCell')
   *   - onAction('deleteTable')
   */
  onAction?: HandleToolbarAction;
}
