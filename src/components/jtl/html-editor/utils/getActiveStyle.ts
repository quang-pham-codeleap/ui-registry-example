import { type Editor } from '@tiptap/react';
import { HEADING_STYLES } from '../constants';

/**
 * Inspects the current editor selection and returns the active typography style key.
 * Returns 'body' when the cursor is inside a plain paragraph (default).
 * Returns 'small' when the cursor is inside a paragraph with a fontSize:14 mark (Caption).
 *
 * @param editor - The live TipTap editor instance.
 * @returns The active style key (e.g. 'h1', 'body', 'small').
 */
export default function getActiveStyle(editor: Editor): string {
  // Check heading levels first — first match wins.
  for (const style of HEADING_STYLES) {
    const level = parseInt(style[1], 10);
    if (editor.isActive('heading', { level })) return style;
  }
  // Caption: a plain paragraph with an explicit fontSize mark of 14px.
  if (editor.isActive('fontSize', { size: '14' })) return 'small';
  // Default: plain paragraph with no fontSize override.
  return 'body';
}
