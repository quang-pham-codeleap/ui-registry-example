import React, { useCallback, useState, useEffect } from 'react';
import { Box } from '../../../box';
import { Input } from '../../../input';
import { Button } from '../../../button';
import IHtmlEditorImageBubbleMenuProps from './IHtmlEditorImageBubbleMenuProps';
import { MEDIA_ALIGNMENT_OPTIONS } from '../../constants';
import { Alignment } from '../../types';

/**
 * Bubble menu that appears when an image node is selected in the editor.
 *
 * Allows quick editing of:
 *   - Image alignment (left / center / right)
 *   - Alt text for accessibility
 *   - Deletion of the image
 *
 * Only renders when selectedImage is non-null.
 */
const HtmlEditorImageBubbleMenu: React.FC<IHtmlEditorImageBubbleMenuProps> = ({ selectedImage, onAction }) => {
  const [altText, setAltText] = useState(selectedImage?.alt ?? '');

  // Update internal state when selectedImage.alt changes.
  useEffect(() => {
    setAltText(selectedImage?.alt ?? '');
  }, [selectedImage?.alt]);

  /**
   * Handle alignment button clicks.
   * Dispatches typed imageAlignment action with structured data.
   */
  const handleAlignment = useCallback(
    (alignment: Alignment) => {
      onAction?.('imageAlignment', { alignment });
    },
    [onAction],
  );

  /**
   * Handle alt text change on blur.
   * Only dispatches the action if the value has changed.
   */
  const handleAltBlur = useCallback(() => {
    if (altText !== selectedImage?.alt) {
      onAction?.('imageAlt', { alt: altText });
    }
  }, [altText, selectedImage?.alt, onAction]);

  /**
   * Handle alt text change on Enter key press.
   * Triggers the same logic as onBlur.
   */
  const handleAltKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleAltBlur();
      }
    },
    [handleAltBlur],
  );

  /**
   * Handle delete button click.
   * Emits 'deleteImage' action.
   */
  const handleDelete = useCallback(() => {
    onAction?.('deleteImage');
  }, [onAction]);

  // Don't render if no image is selected.
  if (!selectedImage) {
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
            variant={selectedImage.alignment === option.value ? 'default' : 'outline'}
            icon={option.icon}
            aria-label={option.ariaLabel}
            onClick={() => handleAlignment(option.value)}
          />
        ))}
      </Box>

      {/* Alt text input */}
      <Input type="text" value={altText} onChange={setAltText} onBlur={handleAltBlur} onKeyDown={handleAltKeyDown} placeholder="Alt-Text" />

      {/* Delete button */}
      <Button variant="destructive" icon="Trash2" aria-label="Bild löschen" onClick={handleDelete} />
    </Box>
  );
};

HtmlEditorImageBubbleMenu.displayName = 'HtmlEditorImageBubbleMenu';

export default HtmlEditorImageBubbleMenu;
