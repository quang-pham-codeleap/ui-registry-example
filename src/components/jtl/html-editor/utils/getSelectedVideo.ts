import { type Editor } from '@tiptap/react';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { SelectedVideoData } from '../types';

/**
 * Reads the video node at the current selection/cursor position and extracts
 * the src, alignment, width, and height attributes.
 *
 * Returns null when:
 *   - The cursor is not on a video node
 *   - The video node is not the currently active/selected node
 *
 * IMPORTANT: Uses editor.isActive('video') to ensure the video node itself is selected,
 * not just present in the selection range. This prevents the bubble menu from showing
 * when the cursor is merely near a video—it only shows when the video is actively selected.
 *
 * @param editor - The live TipTap editor instance.
 * @returns An object with `src`, `alignment`, `width`, and `height`, or null if no video is selected.
 */
export default function getSelectedVideo(editor: Editor): SelectedVideoData | null {
  // Check if a video node is currently active in the selection.
  // isActive('video') returns true only when the selected node itself is a video,
  // not when a video is merely somewhere in the selection range.
  if (!editor.isActive('video')) {
    return null;
  }

  // Get the video node from the editor state.
  // Since isActive('video') returned true, we know a specific video node is selected.
  const { state } = editor;
  const { from, to } = state.selection;

  // Variable to store the video node.
  // Use the ProseMirror Node type so TypeScript can correctly understand `attrs`.
  let videoNode: ProseMirrorNode | null = null;

  // Traverse nodes in the selection range to find the video node.
  // Because isActive('video') is true, we're guaranteed to find exactly one video node.
  state.doc.nodesBetween(from, to, node => {
    if (node.type.name === 'video') {
      videoNode = node;
      // Stop traversal once we find the video.
      return false;
    }
  });

  if (!videoNode) {
    return null;
  }

  // Extract attributes from the video node.
  // TipTap/ProseMirror attrs are untyped (Record<string, unknown>) by default.
  // We cast to the attribute shape we expect from the `video` node extension.
  const attrs = (videoNode as ProseMirrorNode).attrs;

  const src = attrs.src;
  const alignment = attrs.alignment;
  const width = attrs.width ?? null;
  const height = attrs.height ?? null;

  // If src is missing, the video is invalid — treat as no video.
  if (!src) {
    return null;
  }

  return {
    src,
    alignment: alignment ?? 'left',
    width,
    height,
  };
}
