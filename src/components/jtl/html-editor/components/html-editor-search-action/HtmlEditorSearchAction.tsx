import React, { useCallback, useState, useEffect } from 'react';
import { HtmlEditorToolbarPopoverAction } from '../html-editor-toolbar-popover-action';
import { Box } from '../../../box';
import { Input } from '../../../input';
import { Label } from '../../../label';
import { Button } from '../../../button';
import { Text } from '../../../text';
import IHtmlEditorSearchActionProps from './IHtmlEditorSearchActionProps';

/**
 * Search toolbar action.
 *
 * Opens a popover containing:
 *   1. A search input field labeled "Suche nach".
 *   2. A result counter showing "X von Y" (e.g., "1 von 4").
 *   3. Previous/next navigation buttons (ChevronLeft/ChevronRight icons).
 *
 * All state management and interaction logic is handled internally.
 * This component follows the pattern established by HtmlEditorLinkAction.
 */
const HtmlEditorSearchAction: React.FC<IHtmlEditorSearchActionProps> = ({
  children,
  onAction,
  searchTerm: initialSearchTerm = '',
  searchResults = 0,
  searchResultIndex = 0,
}) => {
  // Internal state for search input
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);

  // Sync internal state when prop changes
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
   * Enter navigates to the next search result (same as clicking ChevronRight).
   * Escape is handled natively by Radix Popover (closes the popover).
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && searchResults > 0) {
        // Prevent default browser behaviour.
        event.preventDefault();
        handleNext();
      }
    },
    [handleNext, searchResults],
  );

  // Display result counter: "1 von 4" (1-based index for user display)
  const displayIndex = searchResults > 0 ? searchResultIndex + 1 : 0;
  const resultCounterText = searchResults > 0 ? `${displayIndex} von ${searchResults}` : '0 von 0';

  return (
    <HtmlEditorToolbarPopoverAction action="search" icon="Search" ariaLabel="Suchen" onOpenChange={handleOpenChange}>
      <Box className="w-full flex flex-col gap-3 p-3">
        {/* Search Input Field */}
        <Box className="flex flex-col gap-2">
          <Label htmlFor="search-input" variant="field">
            Suche nach
          </Label>
          <Input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
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
      </Box>
      {children}
    </HtmlEditorToolbarPopoverAction>
  );
};

HtmlEditorSearchAction.displayName = 'HtmlEditorSearchAction';

export default HtmlEditorSearchAction;
