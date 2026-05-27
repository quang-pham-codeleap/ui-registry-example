import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import type IHtmlEditorVideoNodeViewProps from './IHtmlEditorVideoNodeViewProps';
import { HtmlDragState } from '../../types';
import { getVimeoVideoId, getYouTubeVideoId } from '../../utils';
import { MINIMUM_VIDEO_WIDTH, RESIZE_BAR_TIMEOUT, VIDEO_DEFAULT_HEIGHT, VIDEO_DEFAULT_WIDTH } from '../../constants';
import { BaseSkeleton } from '../../../skeleton';

/**
 * TipTap NodeView for videos with support for direct video files and embeds.
 *
 * Renders the video inside a NodeViewWrapper with automatic platform detection:
 * - YouTube URLs → iframe embed with https://www.youtube.com/embed/{videoId}
 * - Vimeo URLs → iframe embed with https://player.vimeo.com/video/{videoId}
 * - Direct video files (.mp4, .webm, etc.) → HTML5 <video> element with controls
 *
 * Features:
 * - Alignment support (left / center / right) via wrapper div
 * - CSS class toggle for selected state
 * - Interactive resize handle with aspect ratio preservation
 * - Responsive sizing with max-width constraint
 * - Proper ARIA attributes for accessibility
 */
const HtmlEditorVideoNodeView: React.FC<IHtmlEditorVideoNodeViewProps> = ({ node, selected, updateAttributes }) => {
  const { src, alignment, width, height } = node.attrs;

  /** Ref to the video/iframe element — used for direct DOM updates during drag. */
  const videoRef = useRef<HTMLVideoElement | HTMLIFrameElement>(null);

  /** Ref to the mutable drag state — avoids re-renders during drag. */
  const dragRef = useRef<HtmlDragState | null>(null);

  /** Ref to the hide timeout — used to clear timeout when user re-enters hover area. */
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /** State to track whether resize bar should be visible (hover or timeout active). */
  const [isResizeBarVisible, setIsResizeBarVisible] = useState(false);

  /** State to track whether the video/iframe is still loading. Starts true, cleared by load or error events. */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Reset the loading state whenever the video src changes.
   * This ensures the skeleton reappears when the user sets a new video URL.
   */
  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  /**
   * Clears the loading state when the video/iframe has fully loaded.
   * Called by onLoad (iframe) or onLoadedData (HTML5 video).
   */
  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  /**
   * Clears the loading state on a load error so the skeleton doesn't persist indefinitely.
   * The browser's native error state will be visible in the video/iframe element instead.
   */
  const handleLoadError = useCallback(() => {
    setIsLoading(false);
  }, []);

  /**
   * Handles mouse enter on video wrapper — shows resize bar immediately.
   */
  const handleMouseEnter = useCallback(() => {
    // Clear any existing timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    // Show resize bar
    setIsResizeBarVisible(true);
  }, []);

  /**
   * Handles mouse leave from video wrapper — starts 5-second timeout to hide resize bar.
   */
  const handleMouseLeave = useCallback(() => {
    // Start timeout to hide resize bar after 5 seconds
    hideTimeoutRef.current = setTimeout(() => {
      setIsResizeBarVisible(false);
      hideTimeoutRef.current = null;
    }, RESIZE_BAR_TIMEOUT);
  }, []);

  /**
   * Handles mouse enter on resize bar — cancels hide timeout to keep bar visible.
   */
  const handleResizeBarEnter = useCallback(() => {
    // Clear timeout when hovering over the resize bar itself
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsResizeBarVisible(true);
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
    const videoElement = videoRef.current;
    if (!drag || !videoElement) return;

    // Calculate width change from horizontal movement only.
    // Resize bar is on the right edge: dragging right increases width.
    const widthDelta = e.clientX - drag.startX;
    const newWidth = Math.max(MINIMUM_VIDEO_WIDTH, drag.startWidth + widthDelta);

    // Always maintain aspect ratio — height is derived from width.
    const newHeight = newWidth / drag.aspectRatio;

    // Apply dimensions directly to the DOM element (no React re-render).
    videoElement.style.width = `${Math.round(newWidth)}px`;
    videoElement.style.height = `${Math.round(newHeight)}px`;
  }, []);

  /**
   * Handles mouse up — commits the final dimensions to TipTap and cleans up.
   */
  const handleMouseUp = useCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Read final dimensions from the DOM element.
      const styleWidth = parseFloat(videoElement.style.width);
      const styleHeight = parseFloat(videoElement.style.height);

      const rect = videoElement.getBoundingClientRect();

      const width = Number.isFinite(styleWidth) ? styleWidth : rect.width;
      const height = Number.isFinite(styleHeight) ? styleHeight : rect.height;

      const finalWidth = Math.round(width);
      const finalHeight = Math.round(height);

      // Persist to TipTap node attributes only if values are valid numbers.
      if (Number.isFinite(finalWidth) && Number.isFinite(finalHeight)) {
        updateAttributes({ width: finalWidth, height: finalHeight });
      }
    }

    // Clean up drag state and global listeners.
    dragRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, updateAttributes]);

  /**
   * Handles mouse down on the resize bar — starts the horizontal drag.
   * Records initial mouse position and video dimensions, then attaches
   * global listeners for smooth dragging even outside the element.
   *
   * @param e - Mouse event from the resize bar
   */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const videoElement = videoRef.current;
      if (!videoElement) return;

      // Use current rendered size as starting dimensions.
      const rect = videoElement.getBoundingClientRect();
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
   * Cleanup timeout and global listeners on unmount to prevent memory leaks.
   */
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      // Ensure any global drag listeners are removed if the NodeView unmounts mid-drag.
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  /**
   * Memoized video element rendering.
   * Determines whether to render an iframe (YouTube/Vimeo) or HTML5 video element.
   */
  const videoElement = useMemo(() => {
    // Check if this is a YouTube or Vimeo video.
    const youtubeId = getYouTubeVideoId(src);
    const vimeoId = getVimeoVideoId(src);

    // Build inline styles for width/height if explicitly set.
    const inlineStyle: React.CSSProperties = {};
    if (width) inlineStyle.width = `${width}px`;
    if (height) inlineStyle.height = `${height}px`;

    // Build CSS class for selected state.
    const baseClassName = 'html-editor-video';
    const className = selected ? `${baseClassName} html-editor-video--selected` : baseClassName;

    // If YouTube, render as iframe embed.
    if (youtubeId) {
      return (
        <iframe
          ref={videoRef as React.RefObject<HTMLIFrameElement>}
          src={`https://www.youtube.com/embed/${youtubeId}`}
          className={className}
          style={{
            width: width ? `${width}px` : `${VIDEO_DEFAULT_WIDTH}px`,
            height: height ? `${height}px` : `${VIDEO_DEFAULT_HEIGHT}px`,
            maxWidth: '100%',
            ...inlineStyle,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          title="YouTube video"
          onLoad={handleLoad}
        />
      );
    }

    // If Vimeo, render as iframe embed.
    if (vimeoId) {
      return (
        <iframe
          ref={videoRef as React.RefObject<HTMLIFrameElement>}
          src={`https://player.vimeo.com/video/${vimeoId}`}
          className={className}
          style={{
            width: width ? `${width}px` : `${VIDEO_DEFAULT_WIDTH}px`,
            height: height ? `${height}px` : `${VIDEO_DEFAULT_HEIGHT}px`,
            maxWidth: '100%',
            ...inlineStyle,
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          title="Vimeo video"
          onLoad={handleLoad}
        />
      );
    }

    // For direct video files, render as HTML5 video element.
    // onLoadedData fires when enough data has loaded to show the first frame.
    return (
      <video
        ref={videoRef as React.RefObject<HTMLVideoElement>}
        src={src}
        className={className}
        style={{
          maxWidth: '100%',
          height: 'auto',
          ...inlineStyle,
        }}
        controls
        aria-label="Video"
        onLoadedData={handleLoad}
        onError={handleLoadError}
      />
    );
  }, [src, width, height, selected, handleLoad, handleLoadError]);

  return (
    <NodeViewWrapper style={{ textAlign: alignment || 'left' }}>
      <div
        className="html-editor-video-wrapper relative inline-block"
        data-drag-handle=""
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Skeleton placeholder — shown while the video/iframe is loading. */}
        {/* Uses the same dimensions a s the video to prevent layout shift. */}
        {isLoading && <BaseSkeleton className="absolute inset-0 rounded-[var(--border-radius-sm)]" role="status" aria-label="Video wird geladen" />}

        {/* The actual video/iframe element — kept in DOM while loading so it continues fetching. */}
        {/* Invisible while loading to avoid a flash of empty content before the skeleton mounts. */}
        <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>{videoElement}</div>

        {/* Vertical resize bar — visible on hover with 5-second timeout or when selected */}
        <div
          className="html-editor-video-resize-bar absolute flex items-center h-full top-0 -right-2"
          data-visible={isResizeBarVisible || selected}
          onMouseEnter={handleResizeBarEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="html-editor-video-resize-handle"
            style={{
              cursor: 'ew-resize',
              height: '4rem',
              width: '0.375rem',
            }}
            onMouseDown={handleMouseDown}
            role="separator"
            aria-label="Videogröße ändern"
            aria-orientation="vertical"
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

HtmlEditorVideoNodeView.displayName = 'HtmlEditorVideoNodeView';

export default HtmlEditorVideoNodeView;
