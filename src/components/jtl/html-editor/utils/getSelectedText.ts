import { type Editor } from '@tiptap/react';

/**
 * Extracts the currently selected text from the editor.
 *
 * Returns an empty string when:
 *   - No text is selected (cursor is collapsed)
 *   - The selection contains no text nodes
 *
 * This is useful for pre-filling the display text input when creating a new link
 * from selected text.
 *
 * @param editor - The live TipTap editor instance.
 * @returns The selected text, or an empty string if nothing is selected.
 */
export default function getSelectedText(editor: Editor): string {
  const { state } = editor;
  const { from, to, empty } = state.selection;

  // If the selection is collapsed (cursor with no range), return empty string.
  if (empty) {
    return '';
  }

  // Extract text between the selection range.
  // The third argument is the separator for block nodes (we don't need line breaks here).
  return state.doc.textBetween(from, to, '');
}
