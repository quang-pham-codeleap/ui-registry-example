import React, { useCallback, useState, useEffect } from 'react';
import { HtmlEditorToolbarPopoverAction } from '../html-editor-toolbar-popover-action';
import { Box } from '../../../box';
import { Input } from '../../../input';
import { Button } from '../../../button';
import { Text } from '../../../text';
import IHtmlEditorVideoActionProps from './IHtmlEditorVideoActionProps';

/**
 * Video toolbar action.
 *
 * Opens a popover containing:
 *   1. A "Videolink" heading to indicate the purpose.
 *   2. A video URL input field for YouTube, Vimeo, or direct video file URLs.
 *   3. A submit button labeled "Einbetten" (Embed) to insert the video.
 *
 * All state and interaction logic is managed internally.
 * This component follows the pattern established by HtmlEditorImageAction.
 */
const HtmlEditorVideoAction: React.FC<IHtmlEditorVideoActionProps> = ({ onAction, selectedVideo = null }) => {
  // Internal state for the video URL input.
  const [src, setSrc] = useState<string>(selectedVideo?.src ?? '');

  // Popover state management (controlled mode)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Update internal state when props change (for editing existing videos).
  useEffect(() => {
    setSrc(selectedVideo?.src ?? '');
  }, [selectedVideo?.src]);

  /**
   * Handle video URL input change.
   * Updates the src state as the user types.
   */
  const handleSrcChange = useCallback((value: string) => {
    setSrc(value);
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
        setSrc(selectedVideo?.src ?? '');
      }
    },
    [selectedVideo?.src],
  );

  /**
   * Handle form submission.
   * Triggers the onAction callback with the video data.
   * Only submits if URL is provided (required field).
   */
  const handleSubmit = useCallback(() => {
    // URL is required — do not submit if empty.
    if (!src.trim()) {
      return;
    }

    // Trigger the callback with video data as a JSON string.
    // The useHtmlEditor hook will parse this back in handleToolbarAction.
    onAction?.('insertVideo', {
      src: src.trim(),
      alignment: selectedVideo?.alignment ?? 'left',
    });

    // Close via handleOpenChange so form reset logic (setSrc) runs consistently
    // for all close paths: submit, Escape, and click-outside.
    handleOpenChange(false);
  }, [src, selectedVideo?.alignment, onAction, handleOpenChange]);

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
    <HtmlEditorToolbarPopoverAction action="video" icon="Video" ariaLabel="Video einfügen" open={isOpen} onOpenChange={handleOpenChange}>
      <Box className="w-full flex flex-col gap-3 p-3">
        {/* Heading */}
        <Text as="h3">Videolink</Text>

        {/* Video URL Input Field */}
        <Box className="flex flex-col gap-2">
          <Input
            id="video-src"
            type="url"
            value={src}
            onChange={handleSrcChange}
            onKeyDown={handleKeyDown}
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
            autoComplete="off"
            aria-label="Video URL"
          />
        </Box>

        {/* Submit Button - Full Width Dark Button */}
        <Button variant="default" onClick={handleSubmit} disabled={!src.trim()} fullWidth label="Einbetten" aria-label="Video einbetten" />
      </Box>
    </HtmlEditorToolbarPopoverAction>
  );
};

HtmlEditorVideoAction.displayName = 'HtmlEditorVideoAction';

export default HtmlEditorVideoAction;
