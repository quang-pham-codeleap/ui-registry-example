import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { TextSelection } from '@tiptap/pm/state';
import { SetVideoAlignmentData, SetVideoData } from '../types';

/**
 * Hook to handle video-related actions in the HTML editor.
 *
 * @param editor - The TipTap editor instance.
 * @returns Object with video handler functions.
 */
export default function useHtmlEditorVideoAction(editor: Editor | null) {
  const handleInsertVideo = useCallback(
    (data: SetVideoData) => {
      if (!editor) return;

      const { src, alignment, width, height } = data;

      // Validation: src is required — do nothing if empty.
      if (!src.trim()) {
        return;
      }

      // Step 1: Insert the video node at the current cursor position.
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'video',
          attrs: {
            src,
            alignment: alignment ?? 'left',
            width: width ?? null,
            height: height ?? null,
          },
        })
        .run();

      // Step 2: Deselect the video by moving cursor to the nearest text position.
      const { $to } = editor.state.selection;
      const resolvedPos = editor.state.doc.resolve(Math.min($to.pos, editor.state.doc.content.size));
      editor.commands.setTextSelection(TextSelection.near(resolvedPos).from);
    },
    [editor],
  );

  const handleUpdateVideoAlignment = useCallback(
    (data: SetVideoAlignmentData) => {
      if (!editor) return;
      const { alignment } = data;
      editor.chain().focus().updateAttributes('video', { alignment }).run();
    },
    [editor],
  );
  const handleDeleteVideo = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().deleteNode('video').run();
  }, [editor]);

  return { handleInsertVideo, handleUpdateVideoAlignment, handleDeleteVideo };
}
