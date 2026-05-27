import React from 'react';
import HandleToolbarAction from '../../types/HandleToolbarAction';

/**
 * Props for the HtmlEditorSearchAction component.
 */
export default interface IHtmlEditorSearchActionProps extends React.PropsWithChildren {
  /**
   * Callback fired when a search action is triggered.
   * Calls onAction('setSearchTerm', { term }) on input change and navigation actions.
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
