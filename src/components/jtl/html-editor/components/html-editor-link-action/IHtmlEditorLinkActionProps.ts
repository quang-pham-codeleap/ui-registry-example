import React from 'react';
import HandleToolbarAction from '../../types/HandleToolbarAction';

/**
 * Props for the LinkAction component.
 */
export default interface IHtmlEditorLinkActionProps extends React.PropsWithChildren {
  /**
   * Callback function triggered when the link is submitted.
   * Calls onAction('link', { url, displayText }) with the typed SetLinkData payload.
   */
  onAction?: HandleToolbarAction;

  /**
   * Pre-fill value for the display text input.
   * Typically contains the user's selected text.
   */
  selectedText?: string;

  /**
   * Pre-fill value for the URL input.
   * Used when editing an existing link.
   */
  selectedUrl?: string;
}
