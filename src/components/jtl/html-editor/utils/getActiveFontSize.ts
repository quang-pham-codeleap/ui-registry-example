import { type Editor } from '@tiptap/react';

/**
 * Reads the fontSize mark at the current selection and returns it as a number.
 * Returns undefined when no fontSize mark is active (default paragraph size).
 *
 * Uses storedMarks as a fallback: when the cursor sits at the start of a new
 * empty paragraph (e.g. right after pressing Enter), ProseMirror does not
 * attach marks to the position yet — it stores them in storedMarks instead.
 * These are the marks that will be applied to the next typed character.
 *
 * @param editor - The live TipTap editor instance.
 * @returns The active font size in pixels, or undefined if none is set.
 */
export default function getActiveFontSize(editor: Editor): number | undefined {
  const marks = editor.state.storedMarks ?? editor.state.selection.$from.marks();
  const fontSizeMark = marks.find(mark => mark.type.name === 'fontSize');
  if (!fontSizeMark) return undefined;

  // attrs.size can be "14" (set via toolbar) or "14px" (parsed from HTML style attribute).
  // Use parseInt to strip any unit suffix before converting to a number.
  const parsed = parseInt(String(fontSizeMark.attrs.size), 10);
  return isNaN(parsed) ? undefined : parsed;
}
