import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { SetSearchTermData, SetReplaceTermData } from '../types';

/**
 * Hook to handle search and replace actions in the HTML editor.
 *
 * @param editor - The TipTap editor instance.
 * @param setSearchTerm - State setter for search term.
 * @param setSearchResults - State setter for search results count.
 * @param setSearchResultIndex - State setter for current result index.
 * @returns Object with search and replace handler functions.
 */
export default function useHtmlEditorSearchAction(
  editor: Editor | null,
  setSearchTerm: (term: string) => void,
  setSearchResults: (count: number) => void,
  setSearchResultIndex: (index: number) => void,
) {
  const handleSetSearchTerm = useCallback(
    (data: SetSearchTermData) => {
      if (!editor) return;

      const { term } = data;

      editor.commands.setSearchTerm(term);
      // Sync state from storage after command execution
      setSearchTerm(term);
      setSearchResults(editor.storage.searchAndReplace.results.length);
      setSearchResultIndex(editor.storage.searchAndReplace.resultIndex);
    },
    [editor, setSearchTerm, setSearchResults, setSearchResultIndex],
  );

  const handleSetReplaceTerm = useCallback(
    (data: SetReplaceTermData) => {
      if (!editor) return;
      const { term } = data;
      editor.commands.setReplaceTerm(term);
    },
    [editor],
  );

  const handleNextSearchResult = useCallback(() => {
    if (!editor) return;
    editor.commands.nextSearchResult();
    setSearchResultIndex(editor.storage.searchAndReplace.resultIndex);
  }, [editor, setSearchResultIndex]);

  const handlePreviousSearchResult = useCallback(() => {
    if (!editor) return;
    editor.commands.previousSearchResult();
    setSearchResultIndex(editor.storage.searchAndReplace.resultIndex);
  }, [editor, setSearchResultIndex]);

  const handleReplace = useCallback(() => {
    if (!editor) return;
    editor.commands.replace();
    // After replace, sync results count
    setSearchResults(editor.storage.searchAndReplace.results.length);
    setSearchResultIndex(editor.storage.searchAndReplace.resultIndex);
  }, [editor, setSearchResults, setSearchResultIndex]);

  const handleReplaceAll = useCallback(() => {
    if (!editor) return;
    editor.commands.replaceAll();
    // After replace all, clear search state
    setSearchResults(0);
    setSearchResultIndex(0);
    setSearchTerm('');
    editor.commands.setSearchTerm('');
  }, [editor, setSearchTerm, setSearchResults, setSearchResultIndex]);

  const handleResetSearch = useCallback(() => {
    if (!editor) return;
    editor.commands.setSearchTerm('');
    editor.commands.resetIndex();
    setSearchTerm('');
    setSearchResults(0);
    setSearchResultIndex(0);
  }, [editor, setSearchTerm, setSearchResults, setSearchResultIndex]);

  return {
    handleSetSearchTerm,
    handleSetReplaceTerm,
    handleNextSearchResult,
    handlePreviousSearchResult,
    handleReplace,
    handleReplaceAll,
    handleResetSearch,
  };
}
