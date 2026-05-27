import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { SetFontSizeData } from '../types';

/**
 * Hook to handle font size actions in the HTML editor.
 *
 * @param editor - The TipTap editor instance.
 * @returns Object with font size handler functions.
 */
export default function useHtmlEditorFontSizeAction(editor: Editor | null) {
  const handleFontSize = useCallback(
    (data: SetFontSizeData) => {
      if (!editor) return;

      const { size } = data;
      const sizeStr = String(size);
      // Check both "14" and "14px" since the mark may be stored with or without the
      // px unit — plain number when set via toolbar, "14px" when parsed from HTML.
      const isActive = editor.isActive('fontSize', { size: sizeStr }) || editor.isActive('fontSize', { size: `${sizeStr}px` });

      if (isActive) {
        editor.chain().focus().unsetMark('fontSize').run();
      } else {
        editor.chain().focus().setMark('fontSize', { size: sizeStr }).run();
      }
    },
    [editor],
  );

  return { handleFontSize };
}
