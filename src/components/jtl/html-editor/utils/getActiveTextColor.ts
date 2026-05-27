import { type Editor } from '@tiptap/react';

/**
 * Reads the textColor mark at the current selection and returns the hex value.
 * Returns undefined when no textColor mark is active.
 *
 * Uses storedMarks as a fallback for the same reason as {@link getActiveFontSize}:
 * on a new empty paragraph the pending marks live in storedMarks, not on the position.
 *
 * @param editor - The live TipTap editor instance.
 * @returns The active foreground color as a hex string (e.g. '#db2777'), or undefined.
 */
export default function getActiveTextColor(editor: Editor): string | undefined {
  const marks = editor.state.storedMarks ?? editor.state.selection.$from.marks();
  const mark = marks.find(m => m.type.name === 'textColor');
  return mark ? (mark.attrs.color as string) : undefined;
}
