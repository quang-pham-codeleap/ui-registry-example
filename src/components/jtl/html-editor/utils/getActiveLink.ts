import { getMarkRange, type Editor } from '@tiptap/react';
import { ActiveLinkData } from '../types';

/**
 * Reads the link mark at the current selection/cursor position and extracts
 * the URL (href) and display text.
 *
 * This implementation correctly handles:
 *   - Links that span multiple text nodes
 *   - Links with nested structures
 *   - Links at any position in the document
 *
 * Returns null when:
 *   - The cursor is not on a link mark
 *   - The selection does not contain a link
 *
 * @param editor - The live TipTap editor instance.
 * @returns An object with `url` and `text`, or null if no link is active.
 */
export default function getActiveLink(editor: Editor): ActiveLinkData | null {
  // Check if the current selection is on a link mark.
  // TipTap's isActive() checks if the mark is present at the current position.
  if (!editor.isActive('link')) {
    return null;
  }

  // Get the link mark attributes (href, target, etc.) from the current position.
  // getAttributes() returns the mark's attributes when active.
  const linkAttributes = editor.getAttributes('link');
  const url = linkAttributes.href as string | undefined;

  // If no href attribute, the link is incomplete — treat as no link.
  if (!url) {
    return null;
  }

  // Extract the link text from the current selection or cursor position.
  // When the cursor is inside a link, we need to find the full link text.
  const { state } = editor;
  const { selection } = state;

  // Get the link mark type from the schema
  const linkType = state.schema.marks.link;

  if (!linkType) {
    return null;
  }

  // Use the helper function to find exact boundaries of the link mark.
  // This correctly handles links spanning multiple nodes or with nesting.
  const range = getMarkRange(selection.$from, linkType);

  if (!range) {
    return null;
  }

  // Extract the text within the link range.
  // textBetween() handles any separators or nested content correctly.
  const text = state.doc.textBetween(range.from, range.to, '');

  return {
    url,
    text,
  };
}
