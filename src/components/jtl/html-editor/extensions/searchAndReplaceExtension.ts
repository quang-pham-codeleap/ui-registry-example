/* eslint-disable jtl-rule/react/proper-import-and-usage */
// This extension is built based on https://www.npmjs.com/package/@sereneinserenade/tiptap-search-and-replace
// but with some modifications to fit our needs.
// This file uses ProseMirror's dispatch function type, not React.Dispatch
import { Extension, Range } from '@tiptap/core';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { Plugin, PluginKey, type EditorState, type Transaction } from '@tiptap/pm/state';
import { Node as PMNode } from '@tiptap/pm/model';

/**
 * ProseMirror dispatch function type.
 * Takes a transaction and applies it to the editor state.
 */
type Dispatch = (tr: Transaction) => void;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    searchAndReplace: {
      /**
       * Set search term in extension.
       */
      setSearchTerm: (searchTerm: string) => ReturnType;
      /**
       * Set replace term in extension.
       */
      setReplaceTerm: (replaceTerm: string) => ReturnType;
      /**
       * Set case sensitivity in extension.
       */
      setCaseSensitive: (caseSensitive: boolean) => ReturnType;
      /**
       * Reset current search result to first instance.
       */
      resetIndex: () => ReturnType;
      /**
       * Find next instance of search result.
       */
      nextSearchResult: () => ReturnType;
      /**
       * Find previous instance of search result.
       */
      previousSearchResult: () => ReturnType;
      /**
       * Replace first instance of search result with given replace term.
       */
      replace: () => ReturnType;
      /**
       * Replace all instances of search result with given replace term.
       */
      replaceAll: () => ReturnType;
    };
  }

  /**
   * Augment TipTap's Storage interface to include our custom extension storage.
   */
  interface Storage {
    searchAndReplace: {
      searchTerm: string;
      replaceTerm: string;
      results: Range[];
      lastSearchTerm: string;
      caseSensitive: boolean;
      lastCaseSensitive: boolean;
      resultIndex: number;
      lastResultIndex: number;
    };
  }
}

/**
 * Text node with its position in the document.
 */
interface TextNodesWithPosition {
  text: string;
  pos: number;
}

/**
 * Result of processing searches in the document.
 */
interface ProcessedSearches {
  decorationsToReturn: DecorationSet;
  results: Range[];
}

/**
 * Create a RegExp from the search term.
 * Escapes special regex characters if disableRegex is true.
 *
 * @param searchString - The search term
 * @param disableRegex - Whether to treat the search as literal text
 * @param caseSensitive - Whether the search should be case sensitive
 * @returns Regular expression for searching
 */
const getRegex = (searchString: string, disableRegex: boolean, caseSensitive: boolean): RegExp => {
  return RegExp(disableRegex ? searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : searchString, caseSensitive ? 'gu' : 'gui');
};

/**
 * Process the document and find all search results.
 * Creates decorations for highlighting matches and returns the result ranges.
 *
 * @param doc - The ProseMirror document node
 * @param searchTerm - The regex pattern to search for
 * @param searchResultClass - CSS class name for highlighting
 * @param resultIndex - Index of the currently active result
 * @returns Decorations and result ranges
 */
function processSearches(doc: PMNode, searchTerm: RegExp, searchResultClass: string, resultIndex: number): ProcessedSearches {
  const decorations: Decoration[] = [];
  const results: Range[] = [];

  let textNodesWithPosition: TextNodesWithPosition[] = [];
  let index = 0;

  if (!searchTerm) {
    return {
      decorationsToReturn: DecorationSet.empty,
      results: [],
    };
  }

  // Collect all text nodes with their positions
  doc?.descendants((node, pos) => {
    if (node.isText) {
      if (textNodesWithPosition[index]) {
        textNodesWithPosition[index] = {
          text: textNodesWithPosition[index].text + node.text,
          pos: textNodesWithPosition[index].pos,
        };
      } else {
        textNodesWithPosition[index] = {
          text: `${node.text}`,
          pos,
        };
      }
    } else {
      index += 1;
    }
  });

  textNodesWithPosition = textNodesWithPosition.filter(Boolean);

  // Find all matches in the collected text nodes
  for (const element of textNodesWithPosition) {
    const { text, pos } = element;
    const matches = Array.from(text.matchAll(searchTerm));

    for (const match of matches) {
      if (match[0] === '') break;

      if (match.index !== undefined) {
        results.push({
          from: pos + match.index,
          to: pos + match.index + match[0].length,
        });
      }
    }
  }

  // Create decorations for each result
  for (let i = 0; i < results.length; i += 1) {
    const result = results[i];
    const className = i === resultIndex ? `${searchResultClass} ${searchResultClass}-current` : searchResultClass;
    const decoration: Decoration = Decoration.inline(result.from, result.to, {
      class: className,
    });

    decorations.push(decoration);
  }

  return {
    decorationsToReturn: DecorationSet.create(doc, decorations),
    results,
  };
}

/**
 * Replace the first search result with the replace term.
 *
 * @param replaceTerm - Text to replace with
 * @param results - Array of search result ranges
 * @param state - Editor state
 * @param dispatch - Transaction dispatcher (optional in TipTap commands)
 */
const replace = (replaceTerm: string, results: Range[], { state, dispatch }: { state: EditorState; dispatch?: Dispatch }) => {
  const firstResult = results[0];

  if (!firstResult) return;

  // Determine the active result based on the current selection position.
  const selectionFrom = state.selection.from;
  const activeIndex = results.findIndex(result => selectionFrom >= result.from && selectionFrom <= result.to);
  const { from, to } = results[activeIndex >= 0 ? activeIndex : 0];
  if (dispatch) {
    dispatch(state.tr.insertText(replaceTerm, from, to));
  }
};

/**
 * Rebase the next result after a replacement to adjust for length changes.
 *
 * @param replaceTerm - The replacement text
 * @param index - Current result index
 * @param lastOffset - Previous offset adjustment
 * @param results - Array of search result ranges
 * @returns Updated offset and results array, or null if no next result
 */
const rebaseNextResult = (replaceTerm: string, index: number, lastOffset: number, results: Range[]): [number, Range[]] | null => {
  const nextIndex = index + 1;

  if (!results[nextIndex]) return null;

  const { from: currentFrom, to: currentTo } = results[index];

  const offset = currentTo - currentFrom - replaceTerm.length + lastOffset;

  const { from, to } = results[nextIndex];

  results[nextIndex] = {
    to: to - offset,
    from: from - offset,
  };

  return [offset, results];
};

/**
 * Replace all search results with the replace term.
 *
 * @param replaceTerm - Text to replace with
 * @param results - Array of search result ranges
 * @param tr - Transaction
 * @param dispatch - Transaction dispatcher (optional in TipTap commands)
 */
const replaceAll = (replaceTerm: string, results: Range[], { tr, dispatch }: { tr: Transaction; dispatch?: Dispatch }) => {
  let offset = 0;

  let resultsCopy = results.slice();

  if (!resultsCopy.length) return;

  for (let i = 0; i < resultsCopy.length; i += 1) {
    const { from, to } = resultsCopy[i];

    tr.insertText(replaceTerm, from, to);

    const rebaseNextResultResponse = rebaseNextResult(replaceTerm, i, offset, resultsCopy);

    if (!rebaseNextResultResponse) continue;

    offset = rebaseNextResultResponse[0];
    resultsCopy = rebaseNextResultResponse[1];
  }

  if (dispatch) dispatch(tr);
};

/**
 * Plugin key for the search and replace plugin.
 */
export const searchAndReplacePluginKey = new PluginKey('searchAndReplacePlugin');

/**
 * Options for the SearchAndReplace extension.
 */
export interface SearchAndReplaceOptions {
  /**
   * CSS class name for search result highlighting.
   */
  searchResultClass: string;
  /**
   * Whether to disable regex and treat search as literal text.
   */
  disableRegex: boolean;
}

/**
 * Storage interface for the SearchAndReplace extension.
 */
export interface SearchAndReplaceStorage {
  /**
   * Current search term.
   */
  searchTerm: string;
  /**
   * Current replace term.
   */
  replaceTerm: string;
  /**
   * Array of search result ranges in the document.
   */
  results: Range[];
  /**
   * Last search term (used for comparison).
   */
  lastSearchTerm: string;
  /**
   * Whether the search is case sensitive.
   */
  caseSensitive: boolean;
  /**
   * Last case sensitivity setting (used for comparison).
   */
  lastCaseSensitive: boolean;
  /**
   * Index of the currently active search result.
   */
  resultIndex: number;
  /**
   * Last result index (used for comparison).
   */
  lastResultIndex: number;
}

/**
 * SearchAndReplace extension for TipTap.
 *
 * Provides search and replace functionality with:
 * - Text search with regex support
 * - Case sensitivity toggle
 * - Navigation through search results
 * - Replace single or all occurrences
 * - Visual highlighting of search results
 */
export const SearchAndReplaceExtension = Extension.create<SearchAndReplaceOptions, SearchAndReplaceStorage>({
  name: 'searchAndReplace',

  addOptions() {
    return {
      searchResultClass: 'html-editor-search-result',
      disableRegex: true,
    };
  },

  addStorage() {
    return {
      searchTerm: '',
      replaceTerm: '',
      results: [],
      lastSearchTerm: '',
      caseSensitive: false,
      lastCaseSensitive: false,
      resultIndex: 0,
      lastResultIndex: 0,
    };
  },

  addCommands() {
    return {
      setSearchTerm:
        (searchTerm: string) =>
        ({ editor }) => {
          editor.storage.searchAndReplace.searchTerm = searchTerm;

          return false;
        },
      setReplaceTerm:
        (replaceTerm: string) =>
        ({ editor }) => {
          editor.storage.searchAndReplace.replaceTerm = replaceTerm;

          return false;
        },
      setCaseSensitive:
        (caseSensitive: boolean) =>
        ({ editor }) => {
          editor.storage.searchAndReplace.caseSensitive = caseSensitive;

          return false;
        },
      resetIndex:
        () =>
        ({ editor }) => {
          editor.storage.searchAndReplace.resultIndex = 0;

          return false;
        },
      nextSearchResult:
        () =>
        ({ editor }) => {
          const { results, resultIndex } = editor.storage.searchAndReplace;

          const nextIndex = resultIndex + 1;

          if (results[nextIndex]) {
            editor.storage.searchAndReplace.resultIndex = nextIndex;
          } else {
            editor.storage.searchAndReplace.resultIndex = 0;
          }

          return false;
        },
      previousSearchResult:
        () =>
        ({ editor }) => {
          const { results, resultIndex } = editor.storage.searchAndReplace;

          const prevIndex = resultIndex - 1;

          if (results[prevIndex]) {
            editor.storage.searchAndReplace.resultIndex = prevIndex;
          } else {
            editor.storage.searchAndReplace.resultIndex = results.length - 1;
          }

          return false;
        },
      replace:
        () =>
        ({ editor, state, dispatch }) => {
          const { replaceTerm, results } = editor.storage.searchAndReplace;

          replace(replaceTerm, results, { state, dispatch });

          return false;
        },
      replaceAll:
        () =>
        ({ editor, tr, dispatch }) => {
          const { replaceTerm, results } = editor.storage.searchAndReplace;

          replaceAll(replaceTerm, results, { tr, dispatch });

          return false;
        },
    };
  },

  addProseMirrorPlugins() {
    const editor = this.editor;
    const { searchResultClass, disableRegex } = this.options;

    const setLastSearchTerm = (term: string) => (editor.storage.searchAndReplace.lastSearchTerm = term);
    const setLastCaseSensitive = (value: boolean) => (editor.storage.searchAndReplace.lastCaseSensitive = value);
    const setLastResultIndex = (index: number) => (editor.storage.searchAndReplace.lastResultIndex = index);

    return [
      new Plugin<DecorationSet>({
        key: searchAndReplacePluginKey,
        state: {
          init: () => DecorationSet.empty,
          apply(tr: Transaction, decorationSet: DecorationSet) {
            const { doc, docChanged } = tr;
            const { searchTerm, lastSearchTerm, caseSensitive, lastCaseSensitive, resultIndex, lastResultIndex } = editor.storage.searchAndReplace;

            if (!docChanged && lastSearchTerm === searchTerm && lastCaseSensitive === caseSensitive && lastResultIndex === resultIndex) {
              return decorationSet;
            }

            setLastSearchTerm(searchTerm);
            setLastCaseSensitive(caseSensitive);
            setLastResultIndex(resultIndex);

            if (!searchTerm) {
              editor.storage.searchAndReplace.results = [];
              return DecorationSet.empty;
            }

            const { decorationsToReturn, results } = processSearches(
              doc,
              getRegex(searchTerm, disableRegex, caseSensitive),
              searchResultClass,
              resultIndex,
            );

            editor.storage.searchAndReplace.results = results;

            return decorationsToReturn;
          },
        },
        props: {
          decorations(state: EditorState) {
            return this.getState(state) ?? null;
          },
        },
      }),
    ];
  },
});

export default SearchAndReplaceExtension;
