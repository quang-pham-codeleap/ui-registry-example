import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import type IHtmlEditorImageNodeViewProps from './IHtmlEditorImageNodeViewProps';
import { Box } from '../../../box';
import { HtmlDragState } from '../../types';
import { BaseSkeleton } from '../../../skeleton';
import { Icon } from '../../../icon';
import { Text } from '../../../text';

/** Minimum image width in pixels during resize. */
const MIN_WIDTH = 50;

/**
 * TipTap NodeView for images with interactive resize handle.
 *
 * Renders the image inside a NodeViewWrapper with a vertical resize bar on the right edge.
 * Drag events update the <img> element directly via ref for smooth UX,
 * then commit final dimensions via TipTap's updateAttributes on mouseUp.
 *
 * Features:
 * - Horizontal-only dragging with aspect ratio preservation
 * - Minimum width of 50px
 * - CSS class toggle for selected state
 * - Loading skeleton shown while the image fetches
 * - Error placeholder shown when the image URL is invalid or unreachable
 * - data-drag-handle applied to inner container (not wrapper) to prevent
 *   empty space to the right of the image from being selectable
 */
const HtmlEditorImageNodeView: React.FC<IHtmlEditorImageNodeViewProps> = ({ node, selected, updateAttributes }) => {
  const { src, alt, alignment, width, height } = node.attrs;

  /** Ref to the <img> element — used for direct DOM updates during drag. */
  const imgRef = useRef<HTMLImageElement>(null);

  /** Ref to the mutable drag state — avoids re-renders during drag. */
  const dragRef = useRef<HtmlDragState | null>(null);

  /** State to track whether the image is still loading. Starts true, cleared by load or error events. */
  const [isLoading, setIsLoading] = useState(true);

  /** State to track whether the image failed to load. Set by onError, cleared when src changes. */
  const [isError, setIsError] = useState(false);

  /**
   * Reset both loading and error state whenever the image src changes.
   * This ensures the skeleton reappears and any previous error is cleared when a new URL is set.
   */
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
  }, [src]);

  /**
   * Clears the loading state when the image has fully loaded.
   */
  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  /**
   * Switches from loading state to error state when the image URL is invalid or unreachable.
   * The error placeholder replaces the skeleton so the user knows the URL is broken.
   */
  const handleLoadError = useCallback(() => {
    setIsLoading(false);
    setIsError(true);
  }, []);

  /**
   * Handles mouse movement during horizontal resize drag.
   * Calculates new width from horizontal mouse movement and derives height
   * from aspect ratio. Always maintains proportional scaling.
   *
   * @param e - Mouse event with clientX position
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const drag = dragRef.current;
    const img = imgRef.current;
    if (!drag || !img) return;

    // Calculate width change from horizontal movement only.
    // Resize bar is on the right edge: dragging right increases width.
    const widthDelta = e.clientX - drag.startX;
    const newWidth = Math.max(MIN_WIDTH, drag.startWidth + widthDelta);

    // Always maintain aspect ratio — height is derived from width.
    const newHeight = newWidth / drag.aspectRatio;

    // Apply dimensions directly to the DOM element (no React re-render).
    img.style.width = `${Math.round(newWidth)}px`;
    img.style.height = `${Math.round(newHeight)}px`;
  }, []);

  /**
   * Handles mouse up — commits the final dimensions to TipTap and cleans up.
   *
   * Guards against NaN by falling back to getBoundingClientRect() when
   * inline styles are not set (e.g., mouseDown/mouseUp without dragging).
   */
  const handleMouseUp = useCallback(() => {
    const img = imgRef.current;
    if (img) {
      // Try to read dimensions from inline styles first.
      let finalWidth = parseFloat(img.style.width);
      let finalHeight = parseFloat(img.style.height);

      // If parseFloat returns NaN (empty string or invalid value),
      // fall back to current rendered dimensions from getBoundingClientRect.
      if (!Number.isFinite(finalWidth) || !Number.isFinite(finalHeight)) {
        const rect = img.getBoundingClientRect();
        finalWidth = rect.width;
        finalHeight = rect.height;
      }

      // Only persist to TipTap if we have valid finite numbers.
      if (Number.isFinite(finalWidth) && Number.isFinite(finalHeight)) {
        updateAttributes({ width: Math.round(finalWidth), height: Math.round(finalHeight) });
      }
    }

    // Clean up drag state and global listeners.
    dragRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, updateAttributes]);

  /**
   * Handles mouse down on the resize bar — starts the horizontal drag.
   * Records initial mouse position and image dimensions, then attaches
   * global listeners for smooth dragging even outside the element.
   *
   * @param e - Mouse event from the resize bar
   */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const img = imgRef.current;
      if (!img) return;

      // Use current rendered size as starting dimensions.
      const rect = img.getBoundingClientRect();
      const startWidth = rect.width;
      const startHeight = rect.height;

      dragRef.current = {
        startX: e.clientX,
        startWidth,
        aspectRatio: startWidth / startHeight,
      };

      // Attach global listeners so drag works even outside the element.
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [handleMouseMove, handleMouseUp],
  );

  /**
   * Cleanup global event listeners when the component unmounts.
   * This prevents memory leaks and ensures that the event listeners are
   * only active when the component is mounted.
   */
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Build inline styles for the <img> element.
  const imgStyle: React.CSSProperties = {};
  if (width) imgStyle.width = `${width}px`;
  if (height) imgStyle.height = `${height}px`;

  // Build CSS class for the <img> element.
  const imgClassName = `html-editor-image${selected ? ' html-editor-image--selected' : ''}`;

  return (
    <NodeViewWrapper style={{ textAlign: alignment || 'left' }}>
      <div className="relative inline-block" data-drag-handle="">
        {/* Skeleton placeholder — shown while the image is loading. */}
        {/* Uses absolute positioning to overlay the image's reserved space. */}
        {isLoading && <BaseSkeleton className="absolute inset-0 rounded-[var(--border-radius-sm)]" role="status" aria-label="Bild wird geladen" />}

        {/* Error placeholder — shown when the image URL is invalid or unreachable. */}
        {/* Uses a plain div because Box does not support the style prop. */}
        {/* Dimensions fall back to 200×150px when no explicit size is set on the node. */}
        {isError && (
          <div
            className="flex flex-col items-center justify-center gap-2 rounded-[var(--border-radius-sm)] border border-[var(--border)] bg-[var(--muted)]"
            style={{ width: imgStyle.width ?? '200px', height: imgStyle.height ?? '150px' }}
            role="img"
            aria-label={alt ? `Bild konnte nicht geladen werden: ${alt}` : 'Bild konnte nicht geladen werden'}
          >
            {/* Broken image icon — communicates the error state visually */}
            <Icon name="ImageOff" size={24} className="text-[var(--muted-foreground)]" aria-hidden="true" />
            {/* Short German error label to tell the user the URL is broken */}
            <Text type="small" color="muted">
              Ungültige Bild-URL
            </Text>
          </div>
        )}

        {/* The actual image element — kept in DOM while loading so the browser continues fetching. */}
        {/* Hidden while loading (skeleton covers it) or after an error (placeholder covers it). */}
        <img
          ref={imgRef}
          src={src}
          alt={alt || ''}
          className={imgClassName}
          style={{ ...imgStyle, visibility: isLoading || isError ? 'hidden' : 'visible' }}
          draggable={false}
          onLoad={handleLoad}
          onError={handleLoadError}
        />

        {/* Vertical resize bar — only visible when image is selected */}
        {selected && (
          <Box className="absolute flex items-center h-full top-0 -right-2">
            <div
              className="html-editor-image-resize-handle"
              style={{
                cursor: 'ew-resize',
                height: '4rem',
                width: '0.375rem',
              }}
              onMouseDown={handleMouseDown}
              role="slider"
              aria-label="Bildgröße ändern"
              aria-orientation="vertical"
            />
          </Box>
        )}
      </div>
    </NodeViewWrapper>
  );
};

HtmlEditorImageNodeView.displayName = 'HtmlEditorImageNodeView';

export default HtmlEditorImageNodeView;
