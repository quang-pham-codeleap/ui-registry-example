import React from 'react';
import HandleToolbarAction from '../../types/HandleToolbarAction';

/**
 * Props for the HtmlEditorReplaceAction component.
 */
export default interface IHtmlEditorReplaceActionProps extends React.PropsWithChildren {
  /**
   * Callback fired when a replace action is triggered.
   * Calls typed actions like onAction('setSearchTerm', { term }), onAction('setReplaceTerm', { term }),
   * onAction('replace'), and onAction('replaceAll').
   */
  onAction?: HandleToolbarAction;

  /**
   * Current search term.
   */
  searchTerm?: string;

  /**
   * Total number of search results.
   */
  searchResults?: number;

  /**
   * Index of the currently active search result (0-based).
   */
  searchResultIndex?: number;
}
