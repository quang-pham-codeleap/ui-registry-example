import { type Editor } from '@tiptap/react';
import { TOGGLEABLE_ACTIONS, TIPTAP_NAME_MAP } from '../constants';

/**
 * Reads the current editor state and returns the list of toggleable action
 * names (bold, italic, …) that are active at the current selection.
 *
 * @param editor - The live TipTap editor instance.
 * @returns Array of action name strings that are currently toggled on.
 */
export default function getActiveActions(editor: Editor): string[] {
  return TOGGLEABLE_ACTIONS.filter(action => {
    const tiptapName = TIPTAP_NAME_MAP[action] ?? action;
    return editor.isActive(tiptapName);
  });
}
