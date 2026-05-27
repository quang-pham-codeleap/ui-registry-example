import React, { useCallback } from 'react';
import { Box } from '../../../box';
import { Button } from '../../../button';
import IHtmlEditorTableBubbleMenuProps from './IHtmlEditorTableBubbleMenuProps';
import { Icon } from '../../../icon';

/**
 * Bubble menu that appears when a table is selected in the editor.
 *
 * Provides quick access to common table operations:
 *   - Add column / row
 *   - Merge / split cells
 *   - Delete table
 *
 * Only renders when selectedTable is non-null.
 *
 * @param props {@link IHtmlEditorTableBubbleMenuProps}
 */
const HtmlEditorTableBubbleMenu: React.FC<IHtmlEditorTableBubbleMenuProps> = ({ selectedTable, onAction }) => {
  /**
   * Handle add column button click.
   * Emits 'addColumnAfter' action to insert a new column after the current position.
   */
  const handleAddColumn = useCallback(() => {
    onAction?.('addColumnAfter');
  }, [onAction]);

  /**
   * Handle add row button click.
   * Emits 'addRowAfter' action to insert a new row after the current position.
   */
  const handleAddRow = useCallback(() => {
    onAction?.('addRowAfter');
  }, [onAction]);

  /**
   * Handle merge cells button click.
   * Emits 'mergeCells' action to merge selected cells.
   */
  const handleMergeCells = useCallback(() => {
    onAction?.('mergeCells');
  }, [onAction]);

  /**
   * Handle split cell button click.
   * Emits 'splitCell' action to split a merged cell.
   */
  const handleSplitCell = useCallback(() => {
    onAction?.('splitCell');
  }, [onAction]);

  /**
   * Handle delete table button click.
   * Emits 'deleteTable' action to remove the entire table.
   */
  const handleDeleteTable = useCallback(() => {
    onAction?.('deleteTable');
  }, [onAction]);

  // Don't render if no table is selected.
  if (!selectedTable) {
    return null;
  }

  return (
    // Container styling (bg, shadow, border, rounded, padding) is provided by the
    // parent PopoverContent. This component only handles inner layout.
    <Box className="flex flex-row items-center gap-1">
      {/* Add column button */}
      <Button variant="ghost" size="sm" label="Spalte hinzufügen" onClick={handleAddColumn} aria-label="Spalte hinzufügen" />

      {/* Add row button */}
      <Button variant="ghost" size="sm" label="Zeile hinzufügen" onClick={handleAddRow} aria-label="Zeile hinzufügen" />

      {/* Separator for visual grouping */}
      <Box className="w-[1px] h-6 bg-[var(--border)]" />

      {/* Split cell icon button */}
      <Button variant="ghost" icon="Split" aria-label="Zelle teilen" onClick={handleSplitCell} />

      {/* Merge cells icon button */}
      <Button variant="ghost" icon="Merge" aria-label="Zellen verbinden" onClick={handleMergeCells} />

      {/* Separator for visual grouping */}
      <Box className="w-[1px] h-6 bg-[var(--border)]" />

      {/* Delete table button (destructive) */}
      <Button variant="ghost" icon={<Icon name="Trash2" color="var(--destructive)" />} aria-label="Tabelle löschen" onClick={handleDeleteTable} />
    </Box>
  );
};

HtmlEditorTableBubbleMenu.displayName = 'HtmlEditorTableBubbleMenu';

export default HtmlEditorTableBubbleMenu;
