import { type Editor } from '@tiptap/react';

/**
 * Reads the bgColor mark at the current selection and returns the hex value.
 * Returns undefined when no bgColor mark is active.
 *
 * Uses storedMarks as a fallback for the same reason as {@link getActiveFontSize}:
 * on a new empty paragraph the pending marks live in storedMarks, not on the position.
 *
 * @param editor - The live TipTap editor instance.
 * @returns The active background color as a hex string (e.g. '#84cc16'), or undefined.
 */
export default function getActiveBgColor(editor: Editor): string | undefined {
  const marks = editor.state.storedMarks ?? editor.state.selection.$from.marks();
  const mark = marks.find(m => m.type.name === 'bgColor');
  return mark ? (mark.attrs.color as string) : undefined;
}
