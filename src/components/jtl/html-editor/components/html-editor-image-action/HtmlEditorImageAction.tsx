import React, { useCallback, useState, useEffect } from 'react';
import { HtmlEditorToolbarPopoverAction } from '../html-editor-toolbar-popover-action';
import { Box } from '../../../box';
import { Input } from '../../../input';
import { Label } from '../../../label';
import { Button } from '../../../button';
import IHtmlEditorImageActionProps from './IHtmlEditorImageActionProps';
import { Text } from '../../../text';

/**
 * Image toolbar action.
 *
 * Opens a popover containing:
 *   1. An image URL input field with a required indicator (red asterisk).
 *   2. An alt text input field for accessibility.
 *   3. A submit button labeled "Bild einfügen" to insert the image.
 *
 * All state and interaction logic is managed internally.
 * This component follows the pattern established by HtmlEditorLinkAction.
 */
const HtmlEditorImageAction: React.FC<IHtmlEditorImageActionProps> = ({ onAction, selectedImage = null, open, onOpenChange }) => {
  // Popover open/close state — controlled so we can close it programmatically after insert.
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Sync external forced-open state (e.g. triggered after a clipboard paste attempt).
  // When the parent sets open=true, we open the popover immediately.
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  // Internal state for form inputs.
  const [src, setSrc] = useState<string>(selectedImage?.src ?? '');
  const [alt, setAlt] = useState<string>(selectedImage?.alt ?? '');

  // Update internal state when props change (for editing existing images).
  useEffect(() => {
    setSrc(selectedImage?.src ?? '');
  }, [selectedImage?.src]);

  useEffect(() => {
    setAlt(selectedImage?.alt ?? '');
  }, [selectedImage?.alt]);

  /**
   * Handle image URL input change.
   * Updates the src state as the user types.
   */
  const handleSrcChange = useCallback((value: string) => {
    setSrc(value);
  }, []);

  /**
   * Handle alt text input change.
   * Updates the alt state as the user types.
   */
  const handleAltChange = useCallback((value: string) => {
    setAlt(value);
  }, []);

  /**
   * Handle popover open state change.
   * Resets form inputs to prop values when the popover closes without submitting.
   * Also notifies the parent so it can reset any forced-open state.
   */
  const handleOpenChange = useCallback(
    (isPopoverOpen: boolean) => {
      setIsOpen(isPopoverOpen);
      // Notify parent (e.g. to clear showImagePasteWarning and imagePopoverOpen).
      onOpenChange?.(isPopoverOpen);

      // Reset form to prop values when popover closes without submitting.
      if (!isPopoverOpen) {
        setSrc(selectedImage?.src ?? '');
        setAlt(selectedImage?.alt ?? '');
      }
    },
    [selectedImage?.src, selectedImage?.alt, onOpenChange],
  );

  /**
   * Handle form submission.
   * Triggers the onAction callback with the image data and closes the popover.
   * Only submits if URL is provided (required field).
   */
  const handleSubmit = useCallback(() => {
    // URL is required — do not submit if empty.
    if (!src.trim()) {
      return;
    }

    // Dispatch typed insertImage action with structured data.
    onAction?.('insertImage', {
      src: src.trim(),
      alt: alt.trim(),
      alignment: selectedImage?.alignment ?? 'left',
    });

    // Close via handleOpenChange so parent state (imagePopoverOpen, showImagePasteWarning)
    // and form reset logic all run consistently on every close path (submit / Escape / click-outside).
    handleOpenChange(false);
  }, [src, alt, selectedImage?.alignment, onAction, handleOpenChange]);

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
    <HtmlEditorToolbarPopoverAction action="image" icon="ImageUp" ariaLabel="Bild einfügen" open={isOpen} onOpenChange={handleOpenChange}>
      <Box className="w-full flex flex-col gap-3 p-3">
        {/* Image URL Input Field - Required */}
        <Box className="flex flex-col gap-2">
          <Label htmlFor="image-src" variant="field">
            URL <span className="text-[var(--destructive)]">*</span>
          </Label>
          <Input
            id="image-src"
            type="url"
            value={src}
            onChange={handleSrcChange}
            onKeyDown={handleKeyDown}
            placeholder="https://beispiel.de/bild.jpg"
            autoComplete="off"
          />
          <Text type="muted">Laden Sie Ihr Bild bei einem anderen Anbieter hoch, um es hier einzubinden.</Text>
        </Box>

        {/* Alt Text Input Field - Optional */}
        <Box className="flex flex-col gap-2">
          <Label htmlFor="image-alt" variant="field">
            Alt-Text
          </Label>
          <Input
            id="image-alt"
            type="text"
            value={alt}
            onChange={handleAltChange}
            onKeyDown={handleKeyDown}
            placeholder="Beschreibung des Bildes"
            autoComplete="off"
          />
          <Text type="muted">Wenn Ihr Bild nicht geladen werden kann wird dieser Text stattdessen dargestellt.</Text>
        </Box>

        {/* Submit Button - Full Width Dark Button */}
        <Button variant="default" onClick={handleSubmit} disabled={!src.trim()} fullWidth label="Bild einfügen" aria-label="Bild einfügen" />
      </Box>
    </HtmlEditorToolbarPopoverAction>
  );
};

HtmlEditorImageAction.displayName = 'HtmlEditorImageAction';

export default HtmlEditorImageAction;
