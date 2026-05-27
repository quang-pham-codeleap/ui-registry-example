import { type Editor } from '@tiptap/react';
import { SelectedTableData } from '../types';

/**
 * Checks if the current selection is inside a table and returns table metadata.
 *
 * Returns null when:
 *   - The cursor is not inside a table
 *   - No table is active in the editor
 *
 * IMPORTANT: Uses editor.isActive('table') to ensure the cursor is inside a table.
 * This allows the bubble menu to show when any cell in the table is selected.
 *
 * @param editor - The live TipTap editor instance.
 * @returns An object with table metadata, or null if not in a table.
 */
export default function getSelectedTable(editor: Editor): SelectedTableData | null {
  // Check if the cursor is currently inside a table.
  // isActive('table') returns true when the selection is within any table cell.
  if (!editor.isActive('table')) {
    return null;
  }

  // For now, we only indicate that a table is selected; specific metadata
  // such as header presence or row/column counts is not yet computed.
  // Additional metadata can be extracted from the ProseMirror state if
  // needed for advanced features.
  return {};
}
