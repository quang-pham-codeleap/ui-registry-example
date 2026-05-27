import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { SetColorData } from '../types';

/**
 * Hook to handle color-related actions in the HTML editor.
 *
 * @param editor - The TipTap editor instance.
 * @returns Object with color handler functions.
 */
export default function useHtmlEditorColorAction(editor: Editor | null) {
  const handleTextColor = useCallback(
    (data: SetColorData) => {
      if (!editor) return;
      const { color } = data;
      editor.chain().setMark('textColor', { color }).run();
    },
    [editor],
  );

  const handleBgColor = useCallback(
    (data: SetColorData) => {
      if (!editor) return;
      const { color } = data;
      editor.chain().setMark('bgColor', { color }).run();
    },
    [editor],
  );

  const handleResetTextColor = useCallback(() => {
    if (!editor) return;
    editor.chain().unsetMark('textColor').run();
  }, [editor]);

  const handleResetBgColor = useCallback(() => {
    if (!editor) return;
    editor.chain().unsetMark('bgColor').run();
  }, [editor]);

  return { handleTextColor, handleBgColor, handleResetTextColor, handleResetBgColor };
}
