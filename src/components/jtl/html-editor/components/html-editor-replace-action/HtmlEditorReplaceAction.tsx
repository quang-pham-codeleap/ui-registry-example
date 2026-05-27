import React, { useCallback, useState, useEffect } from 'react';
import { HtmlEditorToolbarPopoverAction } from '../html-editor-toolbar-popover-action';
import { Box } from '../../../box';
import { Input } from '../../../input';
import { Label } from '../../../label';
import { Button } from '../../../button';
import { Text } from '../../../text';
import IHtmlEditorReplaceActionProps from './IHtmlEditorReplaceActionProps';

/**
 * Replace toolbar action.
 *
 * Opens a popover containing:
 *   1. A search input field labeled "Suche nach".
 *   2. A result counter showing "X von Y" (e.g., "1 von 4").
 *   3. Previous/next navigation buttons (ChevronLeft/ChevronRight icons).
 *   4. A replace input field labeled "Ersetzen durch".
 *   5. Two action buttons: "Ersetzen" (single replace) and "Alle ersetzen" (replace all).
 *
 * All state management and interaction logic is handled internally.
 * This component follows the pattern established by HtmlEditorLinkAction and HtmlEditorSearchAction.
 */
const HtmlEditorReplaceAction: React.FC<IHtmlEditorReplaceActionProps> = ({
  children,
  onAction,
  searchTerm: initialSearchTerm = '',
  searchResults = 0,
  searchResultIndex = 0,
}) => {
  // Internal state for search and replace inputs
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [replaceTerm, setReplaceTerm] = useState<string>('');

  // Sync internal search term when prop changes
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  /**
   * Handle search input change.
   * Triggers the setSearchTerm command to update editor state and find matches.
   */
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      onAction?.('setSearchTerm', { term: value });
    },
    [onAction],
  );

  /**
   * Handle replace input change.
   * Updates the replace term in the editor storage.
   */
  const handleReplaceChange = useCallback(
    (value: string) => {
      setReplaceTerm(value);
      onAction?.('setReplaceTerm', { term: value });
    },
    [onAction],
  );

  /**
   * Navigate to the previous search result.
   */
  const handlePrevious = useCallback(() => {
    onAction?.('previousSearchResult');
  }, [onAction]);

  /**
   * Navigate to the next search result.
   */
  const handleNext = useCallback(() => {
    onAction?.('nextSearchResult');
  }, [onAction]);

  /**
   * Replace the current (first) search result.
   */
  const handleReplace = useCallback(() => {
    onAction?.('replace');
  }, [onAction]);

  /**
   * Replace all search results.
   * Clears the search term and replace term after execution.
   */
  const handleReplaceAll = useCallback(() => {
    onAction?.('replaceAll');
    // Clear inputs after replacing all
    setSearchTerm('');
    setReplaceTerm('');
  }, [onAction]);

  /**
   * Handle popover open state changes.
   * When the popover closes, clear the search term in the editor to hide highlights.
   */
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        // Clear search term in editor when popover closes to hide highlights
        onAction?.('setSearchTerm', { term: '' });
      }
    },
    [onAction],
  );

  /**
   * Handle keyboard shortcuts inside the search input.
   * Enter navigates to the next result (same as clicking ChevronRight).
   * Escape is handled natively by Radix Popover (closes the popover).
   */
  const handleSearchKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && searchResults > 0) {
        // Prevent default browser behaviour.
        event.preventDefault();
        handleNext();
      }
    },
    [handleNext, searchResults],
  );

  /**
   * Handle keyboard shortcuts inside the replace input.
   * Enter triggers replace of the current match (same as clicking "Ersetzen").
   * Escape is handled natively by Radix Popover (closes the popover).
   */
  const handleReplaceKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && searchResults > 0 && searchTerm.trim()) {
        // Prevent default browser behaviour.
        event.preventDefault();
        handleReplace();
      }
    },
    [handleReplace, searchResults, searchTerm],
  );

  // Display result counter: "1 von 4" (1-based index for user display)
  const displayIndex = searchResults > 0 ? searchResultIndex + 1 : 0;
  const resultCounterText = searchResults > 0 ? `${displayIndex} von ${searchResults}` : '0 von 0';

  return (
    <HtmlEditorToolbarPopoverAction action="replace" icon="Replace" ariaLabel="Ersetzen" onOpenChange={handleOpenChange}>
      <Box className="w-full flex flex-col gap-3 p-3">
        {/* Search Input Field */}
        <Box className="flex flex-col gap-2">
          <Label htmlFor="replace-search-input" variant="field">
            Suche nach
          </Label>
          <Input
            id="replace-search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Suchtext eingeben"
            autoComplete="off"
          />
        </Box>

        {/* Result Counter and Navigation */}
        <Box className="flex items-center justify-between gap-2">
          {/* Result Counter */}
          <Box>{searchTerm && <Text type="muted">{resultCounterText}</Text>}</Box>

          {/* Navigation Buttons */}
          <Box className="flex gap-1">
            <Button
              variant="outline"
              size="iconXs"
              icon="ChevronLeft"
              aria-label="Vorheriges Suchergebnis"
              onClick={handlePrevious}
              disabled={searchResults === 0}
            />
            <Button
              variant="outline"
              size="iconXs"
              icon="ChevronRight"
              aria-label="Nächstes Suchergebnis"
              onClick={handleNext}
              disabled={searchResults === 0}
            />
          </Box>
        </Box>

        {/* Replace Input Field */}
        <Box className="flex flex-col gap-2">
          <Label htmlFor="replace-input" variant="field">
            Ersetzen durch
          </Label>
          <Input
            id="replace-input"
            type="text"
            value={replaceTerm}
            onChange={handleReplaceChange}
            onKeyDown={handleReplaceKeyDown}
            placeholder="Neuer Text"
            autoComplete="off"
          />
        </Box>

        {/* Replace Action Buttons */}
        <Box className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReplace}
            disabled={searchResults === 0 || !searchTerm.trim()}
            fullWidth
            label="Ersetzen"
            aria-label="Aktuelle Fundstelle ersetzen"
          />
          <Button
            variant="default"
            onClick={handleReplaceAll}
            disabled={searchResults === 0 || !searchTerm.trim()}
            fullWidth
            label="Alle ersetzen"
            aria-label="Alle Fundstellen ersetzen"
          />
        </Box>
      </Box>
      {children}
    </HtmlEditorToolbarPopoverAction>
  );
};

HtmlEditorReplaceAction.displayName = 'HtmlEditorReplaceAction';

export default HtmlEditorReplaceAction;
