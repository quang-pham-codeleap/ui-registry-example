import { type Editor } from '@tiptap/react';
import { ALIGNMENT_OPTIONS } from '../constants';

/**
 * Reads the text-align attribute of the current block and returns the
 * matching toolbar action string (e.g. "alignCenter").
 * Defaults to "alignLeft" when no explicit alignment is set — paragraphs
 * are left-aligned by default in every browser.
 *
 * @param editor - The live TipTap editor instance.
 * @returns The active alignment action key (e.g. 'alignLeft', 'alignCenter').
 */
export default function getActiveAlignment(editor: Editor): string {
  // Walk ALIGNMENT_OPTIONS in order; first match wins.
  // "left" is the implicit default so it's checked last via the fallback.
  const match = ALIGNMENT_OPTIONS.find(({ value }) => {
    // Extract the raw TipTap alignment keyword from the action name (e.g. "alignCenter" → "center").
    const alignment = value.replace('align', '').toLowerCase();
    return editor.isActive({ textAlign: alignment });
  });
  return match?.value ?? 'alignLeft';
}
