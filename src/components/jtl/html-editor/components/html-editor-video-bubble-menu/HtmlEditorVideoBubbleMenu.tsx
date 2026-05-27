import React, { useCallback } from 'react';
import { Box } from '../../../box';
import { Button } from '../../../button';
import IHtmlEditorVideoBubbleMenuProps from './IHtmlEditorVideoBubbleMenuProps';
import { Alignment } from '../../types';
import { MEDIA_ALIGNMENT_OPTIONS } from '../../constants';

/**
 * Bubble menu that appears when a video node is selected in the editor.
 *
 * Allows quick editing of:
 *   - Video alignment (left / center / right)
 *   - Deletion of the video
 *
 * Only renders when selectedVideo is non-null.
 */
const HtmlEditorVideoBubbleMenu: React.FC<IHtmlEditorVideoBubbleMenuProps> = ({ selectedVideo, onAction }) => {
  /**
   * Handle alignment button clicks.
   * Emits 'videoAlignment:{value}' action.
   */
  const handleAlignment = useCallback(
    (alignment: Alignment) => {
      onAction?.('videoAlignment', {
        alignment,
      });
    },
    [onAction],
  );

  /**
   * Handle delete button click.
   * Emits 'deleteVideo' action.
   */
  const handleDelete = useCallback(() => {
    onAction?.('deleteVideo');
  }, [onAction]);

  // Don't render if no video is selected.
  if (!selectedVideo) {
    return null;
  }

  return (
    // Container styling (bg, shadow, border, rounded, padding) is provided by the
    // parent PopoverContent. This component only handles inner layout.
    <Box className="flex flex-row items-center gap-2">
      {/* Alignment buttons */}
      <Box className="flex flex-row gap-1">
        {MEDIA_ALIGNMENT_OPTIONS.map(option => (
          <Button
            key={option.value}
            variant={selectedVideo.alignment === option.value ? 'default' : 'outline'}
            icon={option.icon}
            aria-label={option.ariaLabel}
            onClick={() => handleAlignment(option.value)}
          />
        ))}
      </Box>

      {/* Delete button */}
      <Button variant="destructive" icon="Trash2" aria-label="Video löschen" onClick={handleDelete} />
    </Box>
  );
};

HtmlEditorVideoBubbleMenu.displayName = 'HtmlEditorVideoBubbleMenu';

export default HtmlEditorVideoBubbleMenu;
