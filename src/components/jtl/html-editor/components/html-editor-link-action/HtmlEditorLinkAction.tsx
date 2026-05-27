import React, { useCallback, useState, useEffect } from 'react';
import { HtmlEditorToolbarPopoverAction } from '../html-editor-toolbar-popover-action';
import { Box } from '../../../box';
import { Input } from '../../../input';
import { Label } from '../../../label';
import { Button } from '../../../button';
import IHtmlEditorLinkActionProps from './IHtmlEditorLinkActionProps';

/**
 * Link toolbar action.
 *
 * Opens a popover containing:
 *   1. A URL input field with a required indicator (red asterisk).
 *   2. A display text input field that pre-fills with selected text.
 *   3. A submit button labeled "Link einfügen" to insert the link.
 *
 * All state and interaction logic is managed internally.
 * This component follows the pattern established by HtmlEditorTextColorAction.
 */
const HtmlEditorLinkAction: React.FC<IHtmlEditorLinkActionProps> = ({ children, onAction, selectedText = '', selectedUrl = '' }) => {
  // Popover state management (controlled mode)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Internal state for form inputs
  const [url, setUrl] = useState<string>(selectedUrl);
  const [displayText, setDisplayText] = useState<string>(selectedText);

  // Update internal state when props change (for editing existing links)
  useEffect(() => {
    setUrl(selectedUrl);
  }, [selectedUrl]);

  useEffect(() => {
    setDisplayText(selectedText);
  }, [selectedText]);

  /**
   * Handle URL input change.
   * Updates the URL state as the user types.
   */
  const handleUrlChange = useCallback((value: string) => {
    setUrl(value);
  }, []);

  /**
   * Handle display text input change.
   * Updates the display text state as the user types.
   */
  const handleDisplayTextChange = useCallback((value: string) => {
    setDisplayText(value);
  }, []);

  /**
   * Handle popover open state change.
   * Resets form inputs to prop values when popover closes.
   */
  const handleOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);

      // Reset form to prop values when popover closes
      if (!open) {
        setUrl(selectedUrl);
        setDisplayText(selectedText);
      }
    },
    [selectedUrl, selectedText],
  );

  /**
   * Handle form submission.
   * Triggers the onAction callback with the link data and closes the popover.
   * Only submits if URL is provided (required field).
   */
  const handleSubmit = useCallback(() => {
    // URL is required - do not submit if empty
    if (!url.trim()) {
      return;
    }

    // Trigger the callback with link data
    onAction?.('link', {
      url: url.trim(),
      displayText: displayText.trim() || url.trim(), // Fallback to URL if no display text
    });

    // Close via handleOpenChange so form reset logic runs consistently
    // for all close paths: submit, Escape, and click-outside.
    handleOpenChange(false);
  }, [url, displayText, onAction, handleOpenChange]);

  /**
   * Handle keyboard shortcuts inside the popover inputs.
   * Enter submits the form; Escape closes the popover and resets form state.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        // Prevent default browser behaviour (e.g. form submit / newline).
        event.preventDefault();
        handleSubmit();
      } else if (event.key === 'Escape') {
        // Explicitly close — Radix DismissableLayer also handles this,
        // but calling handleOpenChange ensures the form state is reset.
        handleOpenChange(false);
      }
    },
    [handleSubmit, handleOpenChange],
  );

  return (
    <HtmlEditorToolbarPopoverAction action="link" icon="Link2" ariaLabel="Link" open={isOpen} onOpenChange={handleOpenChange} popoverWidth="w-fit">
      <Box className="flex flex-col gap-3 p-3 w-64">
        {/* URL Input Field - Required */}
        <Box className="flex flex-col gap-2">
          <Label htmlFor="link-url" variant="field">
            URL <span className="text-[var(--destructive)]">*</span>
          </Label>
          <Input
            id="link-url"
            type="url"
            value={url}
            onChange={handleUrlChange}
            onKeyDown={handleKeyDown}
            placeholder="https://beispiel.de"
            autoComplete="off"
          />
        </Box>

        {/* Display Text Input Field - Optional */}
        <Box className="flex flex-col gap-2">
          <Label htmlFor="link-display-text" variant="field">
            Anzeigetext
          </Label>
          <Input
            id="link-display-text"
            type="text"
            value={displayText}
            onChange={handleDisplayTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Beispiellink"
            autoComplete="off"
          />
        </Box>

        {/* Submit Button - Full Width Dark Button */}
        <Button variant="default" onClick={handleSubmit} disabled={!url.trim()} fullWidth label="Link einfügen" aria-label="Link einfügen" />
      </Box>
      {children}
    </HtmlEditorToolbarPopoverAction>
  );
};

HtmlEditorLinkAction.displayName = 'HtmlEditorLinkAction';

export default HtmlEditorLinkAction;
