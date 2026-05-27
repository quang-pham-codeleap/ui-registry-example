import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { HtmlEditorVideoNodeView } from '../components/html-editor-video-node-view';
import { getVimeoVideoId, getYouTubeVideoId, isTrustedVideoEmbedUrl } from '../utils';
import { SelectedVideoData } from '../types';

/**
 * Custom TipTap node that renders a video with alignment support.
 *
 * This extension supports:
 * - Direct video files (mp4, webm, ogg) rendered with HTML5 `<video>` tag
 * - YouTube videos (auto-converted to iframe embeds)
 * - Vimeo videos (auto-converted to iframe embeds)
 * - Alignment control (left / center / right)
 * - Explicit width/height attributes for size persistence
 * - A React NodeView with interactive rendering
 *
 * The NodeView (HtmlEditorVideoNodeView) renders the video with appropriate wrapper.
 * The renderHTML method provides fallback output for getHTML() / clipboard / serialisation.
 *
 * @example
 * // Insert a new video
 * editor.chain().focus().insertContent({ type: 'video', attrs: { src: 'https://youtube.com/watch?v=VIDEO_ID', alignment: 'center' } }).run();
 *
 * // Update video alignment
 * editor.chain().focus().updateAttributes('video', { alignment: 'right' }).run();
 *
 * // Delete selected video
 * editor.chain().focus().deleteNode('video').run();
 */
const Video = Node.create<Record<string, unknown>, SelectedVideoData>({
  name: 'video',

  /**
   * Videos are block-level elements, not inline.
   * This ensures they occupy their own line in the document.
   */
  inline: false,

  /**
   * Videos are in the 'block' group, making them compatible with document structure.
   */
  group: 'block',

  /**
   * Videos can be dragged to reposition them in the document.
   */
  draggable: true,

  /**
   * Videos can be selected by clicking on them.
   */
  selectable: true,

  /**
   * Defines the node's attributes.
   */
  addAttributes() {
    return {
      src: {
        default: null,
        // Parse the src attribute from HTML (video or iframe).
        parseHTML: (element: HTMLElement) => element.getAttribute('src'),
        // Render the src attribute when writing HTML.
        renderHTML: (attributes: SelectedVideoData) => {
          if (!attributes.src) {
            return {};
          }
          return { src: attributes.src };
        },
      },
      alignment: {
        default: 'left',
        // Parse the alignment from the wrapper div's text-align style.
        parseHTML: (element: HTMLElement) => {
          // The parent wrapper div may have text-align set.
          const parent = element.parentElement;
          if (parent && parent.style.textAlign) {
            return parent.style.textAlign;
          }
          return 'left';
        },
        // Alignment is rendered on the wrapper div, not the video/iframe element itself.
        renderHTML: () => {
          return {};
        },
      },
      width: {
        default: null,
        // Parse width from the element's style or attribute.
        parseHTML: (element: HTMLElement) => {
          const styleWidth = element.style.width;
          if (styleWidth) {
            return parseInt(styleWidth, 10) || null;
          }
          const attrWidth = element.getAttribute('width');
          if (attrWidth) {
            return parseInt(attrWidth, 10) || null;
          }
          return null;
        },
        // Width is rendered as an inline style in renderHTML.
        renderHTML: () => {
          return {};
        },
      },
      height: {
        default: null,
        // Parse height from the element's style or attribute.
        parseHTML: (element: HTMLElement) => {
          const styleHeight = element.style.height;
          if (styleHeight) {
            return parseInt(styleHeight, 10) || null;
          }
          const attrHeight = element.getAttribute('height');
          if (attrHeight) {
            return parseInt(attrHeight, 10) || null;
          }
          return null;
        },
        // Height is rendered as an inline style in renderHTML.
        renderHTML: () => {
          return {};
        },
      },
    };
  },

  /**
   * Parses existing HTML back into this node.
   * Handles both <video> tags and <iframe> embeds.
   */
  parseHTML() {
    return [
      {
        tag: 'video[src]',
        getAttrs: (node: HTMLElement | string) => {
          if (typeof node === 'string') {
            return false;
          }
          // Only match video elements that have a src attribute.
          return node.hasAttribute('src') ? null : false;
        },
      },
      {
        tag: 'iframe[src]',
        getAttrs: (node: HTMLElement | string) => {
          if (typeof node === 'string') {
            return false;
          }
          // Only match iframe elements from trusted video platforms.
          // Use URL hostname check instead of substring match to prevent
          // spoofed URLs like `evil.com/youtube.com/...` from matching.
          const src = node.getAttribute('src') || '';
          if (isTrustedVideoEmbedUrl(src)) {
            return null;
          }
          return false;
        },
      },
    ];
  },

  /**
   * Renders the node as HTML.
   * - For YouTube/Vimeo URLs: renders as <div><iframe></div>
   * - For direct video files: renders as <div><video></div>
   * The wrapper div enables alignment control via text-align CSS property.
   */
  renderHTML({ HTMLAttributes, node }) {
    const alignment = node.attrs.alignment || 'left';
    const nodeWidth = node.attrs.width as number | null;
    const nodeHeight = node.attrs.height as number | null;
    const src = node.attrs.src as string;

    // Check if this is a YouTube or Vimeo video.
    const youtubeId = getYouTubeVideoId(src);
    const vimeoId = getVimeoVideoId(src);

    // Build inline style string for width/height if explicitly set.
    const styleParts: string[] = [];
    if (nodeWidth) styleParts.push(`width: ${nodeWidth}px`);
    if (nodeHeight) styleParts.push(`height: ${nodeHeight}px`);
    const styleStr = styleParts.length > 0 ? styleParts.join('; ') : undefined;

    // If YouTube, render as iframe embed.
    if (youtubeId) {
      const iframeAttributes = mergeAttributes(HTMLAttributes, {
        class: 'html-editor-video',
        src: `https://www.youtube.com/embed/${youtubeId}`,
        frameborder: '0',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen  ',
        ...(styleStr ? { style: styleStr } : { style: 'width: 560px; height: 315px' }),
      });

      return ['div', { style: `text-align: ${alignment}` }, ['iframe', iframeAttributes]];
    }

    // If Vimeo, render as iframe embed.
    if (vimeoId) {
      const iframeAttributes = mergeAttributes(HTMLAttributes, {
        class: 'html-editor-video',
        src: `https://player.vimeo.com/video/${vimeoId}`,
        frameborder: '0',
        allow: 'autoplay; fullscreen; picture-in-picture; fullscreen',
        ...(styleStr ? { style: styleStr } : { style: 'width: 640px; height: 360px' }),
      });

      return ['div', { style: `text-align: ${alignment}` }, ['iframe', iframeAttributes]];
    }

    // For direct video files, render as HTML5 video element.
    const videoAttributes = mergeAttributes(HTMLAttributes, {
      class: 'html-editor-video',
      controls: 'true',
      ...(styleStr ? { style: styleStr } : { style: 'max-width: 100%; height: auto' }),
    });

    // Return: <div style="text-align: {alignment}"><video {...attrs} /></div>
    return ['div', { style: `text-align: ${alignment}` }, ['video', videoAttributes]];
  },

  /**
   * Registers the React NodeView for interactive rendering.
   * The NodeView provides interactive rendering and selected-state styling.
   */
  addNodeView() {
    return ReactNodeViewRenderer(HtmlEditorVideoNodeView);
  },
});

export default Video;
