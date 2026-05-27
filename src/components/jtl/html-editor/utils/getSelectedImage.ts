import { type Editor } from '@tiptap/react';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { SelectedImageData } from '../types';

/**
 * Reads the image node at the current selection/cursor position and extracts
 * the src, alt, and alignment attributes.
 *
 * Returns null when:
 *   - The cursor is not on an image node
 *   - The image node is not the currently active/selected node
 *
 * IMPORTANT: Uses editor.isActive('image') to ensure the image node itself is selected,
 * not just present in the selection range. This prevents the bubble menu from showing
 * when the cursor is merely near an image—it only shows when the image is actively selected.
 *
 * @param editor - The live TipTap editor instance.
 * @returns An object with `src`, `alt`, and `alignment`, or null if no image is selected.
 */
export default function getSelectedImage(editor: Editor): SelectedImageData | null {
  // Check if an image node is currently active in the selection.
  // isActive('image') returns true only when the selected node itself is an image,
  // not when an image is merely somewhere in the selection range.
  if (!editor.isActive('image')) {
    return null;
  }

  // Get the image node from the editor state.
  // Since isActive('image') returned true, we know a specific image node is selected.
  const { state } = editor;
  const { from, to } = state.selection;

  // Variable to store the image node.
  // Use the ProseMirror Node type so TypeScript can correctly understand `attrs`.
  let imageNode: ProseMirrorNode | null = null;

  // Traverse nodes in the selection range to find the image node.
  // Because isActive('image') is true, we're guaranteed to find exactly one image node.
  state.doc.nodesBetween(from, to, node => {
    if (node.type.name === 'image') {
      imageNode = node;
      // Stop traversal once we find the image.
      return false;
    }
  });

  if (!imageNode) {
    return null;
  }

  // Extract attributes from the image node.
  // TipTap/ProseMirror attrs are untyped (Record<string, unknown>) by default.
  // We cast to the attribute shape we expect from the `image` node extension.
  const attrs = (imageNode as ProseMirrorNode).attrs;

  const src = attrs.src;
  const alt = attrs.alt;
  const alignment = attrs.alignment;
  const width = attrs.width ?? null;
  const height = attrs.height ?? null;

  // If src is missing, the image is invalid — treat as no image.
  if (!src) {
    return null;
  }

  return {
    src,
    alt: alt ?? '',
    alignment: alignment ?? 'left',
    width,
    height,
  };
}
