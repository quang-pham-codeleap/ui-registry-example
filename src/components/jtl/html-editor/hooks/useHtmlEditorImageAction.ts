import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { TextSelection } from '@tiptap/pm/state';
import { SetImageData, SetImageAlignmentData, SetImageAltData } from '../types';

/**
 * Hook to handle image-related actions in the HTML editor.
 *
 * @param editor - The TipTap editor instance.
 * @returns Object with image handler functions.
 */
export default function useHtmlEditorImageAction(editor: Editor | null) {
  const handleInsertImage = useCallback(
    (data: SetImageData) => {
      if (!editor) return;

      const { src, alt, alignment, width, height } = data;

      // Validation: src is required — do nothing if empty.
      if (!src.trim()) {
        return;
      }

      // Step 1: Insert the image node at the current cursor position.
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'image',
          attrs: {
            src,
            alt: alt ?? '',
            alignment: alignment ?? 'left',
            width: width ?? null,
            height: height ?? null,
          },
        })
        .run();

      // Step 2: Deselect the image by moving cursor to the nearest text position.
      const { $to } = editor.state.selection;
      const resolvedPos = editor.state.doc.resolve(Math.min($to.pos, editor.state.doc.content.size));
      editor.commands.setTextSelection(TextSelection.near(resolvedPos).from);
    },
    [editor],
  );

  const handleUpdateImageAlignment = useCallback(
    (data: SetImageAlignmentData) => {
      if (!editor) return;
      const { alignment } = data;
      editor.chain().focus().updateAttributes('image', { alignment }).run();
    },
    [editor],
  );

  const handleUpdateImageAlt = useCallback(
    (data: SetImageAltData) => {
      if (!editor) return;
      const { alt } = data;
      editor.chain().focus().updateAttributes('image', { alt }).run();
    },
    [editor],
  );

  const handleDeleteImage = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().deleteNode('image').run();
  }, [editor]);

  return { handleInsertImage, handleUpdateImageAlignment, handleUpdateImageAlt, handleDeleteImage };
}
