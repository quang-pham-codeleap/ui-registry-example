import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { ActiveLinkData, SetLinkData } from '../types';
import { normaliseUrl } from '../utils';

/**
 * Hook to handle link-related actions in the HTML editor.
 *
 * @param editor - The TipTap editor instance.
 * @param selectedLink - The currently selected link data.
 * @returns Object with link handler functions.
 */
export default function useHtmlEditorLinkAction(editor: Editor | null, selectedLink: ActiveLinkData | null) {
  const handleLink = useCallback(
    (data: SetLinkData) => {
      if (!editor) return;

      const { url, displayText } = data;

      // Validation: URL is required — do nothing if empty.
      if (!url.trim()) {
        return;
      }

      const normalisedUrl = normaliseUrl(url);

      // Determine if we are editing an existing link or creating a new one.
      if (selectedLink) {
        // Check if the display text has changed.
        const textChanged = displayText.trim() !== '' && displayText.trim() !== selectedLink.text;

        if (textChanged) {
          // Both URL and text changed — delete existing link text, insert new text with link.
          editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .deleteSelection()
            .insertContent({
              type: 'text',
              text: displayText.trim(),
              marks: [{ type: 'link', attrs: { href: normalisedUrl } }],
            })
            .run();
        } else {
          // Only URL changed — update href attribute, keep existing text.
          editor.chain().focus().extendMarkRange('link').setLink({ href: normalisedUrl }).run();
        }
      } else {
        // --- CREATE new link ---
        const selection = editor.state.selection;

        if (selection.empty) {
          // No text selected — insert new text with link mark applied.
          const textToInsert = displayText.trim() || normalisedUrl;

          editor
            .chain()
            .focus()
            .insertContent({
              type: 'text',
              text: textToInsert,
              marks: [{ type: 'link', attrs: { href: normalisedUrl } }],
            })
            .run();
        } else {
          // Text is selected — apply link mark to the selection.
          editor.chain().focus().setLink({ href: normalisedUrl }).run();
        }
      }
    },
    [editor, selectedLink],
  );

  const handleUnlink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  }, [editor]);

  return { handleLink, handleUnlink };
}
