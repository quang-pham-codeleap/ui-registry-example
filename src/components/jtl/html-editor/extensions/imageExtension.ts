import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { HtmlEditorImageNodeView } from '../components/html-editor-image-node-view';

/**
 * Attributes carried by the Image node.
 */
interface ImageAttributes {
  /** The image source URL (required). */
  src: string | null;
  /** The alt text for accessibility (optional, defaults to empty string). */
  alt: string | null;
  /** The alignment of the image: 'left', 'center', 'right' (optional, defaults to 'left'). */
  alignment: string | null;
  /** The explicit width of the image in pixels, or null for natural size. */
  width: number | null;
  /** The explicit height of the image in pixels, or null for natural size. */
  height: number | null;
}

/**
 * Custom TipTap node that renders an image with alignment and resize support.
 *
 * This extends TipTap's built-in image functionality by adding:
 * - Alignment control (left / center / right)
 * - Explicit width/height attributes for resize persistence
 * - A React NodeView with interactive resize handles
 *
 * The NodeView (HtmlEditorImageNodeView) renders the image with resize vertical bar
 * when selected. The renderHTML method provides the fallback
 * output for getHTML() / clipboard / serialisation.
 *
 * @example
 * // Insert a new image
 * editor.chain().focus().insertContent({ type: 'image', attrs: { src: 'https://example.com/image.jpg', alt: 'Example', alignment: 'center' } }).run();
 *
 * // Update image alignment
 * editor.chain().focus().updateAttributes('image', { alignment: 'right' }).run();
 *
 * // Delete selected image
 * editor.chain().focus().deleteNode('image').run();
 */
const Image = Node.create<Record<string, unknown>, ImageAttributes>({
  name: 'image',

  /**
   * Images are block-level elements, not inline.
   * This ensures they occupy their own line in the document.
   */
  inline: false,

  /**
   * Images are in the 'block' group, making them compatible with document structure.
   */
  group: 'block',

  /**
   * Images can be dragged to reposition them in the document.
   */
  draggable: true,

  /**
   * Images can be selected by clicking on them.
   */
  selectable: true,

  /**
   * Defines the node's attributes.
   */
  addAttributes() {
    return {
      src: {
        default: null,
        // Parse the src attribute from HTML.
        parseHTML: (element: HTMLElement) => element.getAttribute('src'),
        // Render the src attribute when writing HTML.
        renderHTML: (attributes: ImageAttributes) => {
          if (!attributes.src) {
            return {};
          }
          return { src: attributes.src };
        },
      },
      alt: {
        default: '',
        // Parse the alt attribute from HTML.
        parseHTML: (element: HTMLElement) => element.getAttribute('alt'),
        // Render the alt attribute when writing HTML.
        renderHTML: (attributes: ImageAttributes) => {
          return { alt: attributes.alt ?? '' };
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
        // Alignment is rendered on the wrapper div, not the img element itself.
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
   * Parses existing <img> elements back into this node.
   * Also handles <div> wrappers with text-align for alignment.
   */
  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: (node: HTMLElement | string) => {
          if (typeof node === 'string') {
            return false;
          }
          // Only match img elements that have a src attribute.
          return node.hasAttribute('src') ? null : false;
        },
      },
    ];
  },

  /**
   * Renders the node as a <div> wrapper with text-align, containing an <img>.
   * The wrapper div enables alignment control via text-align CSS property.
   * The img element is marked with a CSS class for styling.
   * Width/height are applied as inline styles on the <img> for getHTML() output.
   */
  renderHTML({ HTMLAttributes, node }) {
    const alignment = node.attrs.alignment || 'left';
    const nodeWidth = node.attrs.width as number | null;
    const nodeHeight = node.attrs.height as number | null;

    // Build inline style string for width/height if explicitly set.
    const styleParts: string[] = [];
    if (nodeWidth) styleParts.push(`width: ${nodeWidth}px`);
    if (nodeHeight) styleParts.push(`height: ${nodeHeight}px`);
    const styleStr = styleParts.length > 0 ? styleParts.join('; ') : undefined;

    // Build the img attributes, including optional inline styles for dimensions.
    const imgAttributes = mergeAttributes(
      {
        class: 'html-editor-image',
        ...(styleStr ? { style: styleStr } : {}),
      },
      HTMLAttributes,
    );

    // Return: <div style="text-align: {alignment}"><img {...attrs} /></div>
    return ['div', { style: `text-align: ${alignment}` }, ['img', imgAttributes]];
  },

  /**
   * Registers the React NodeView for interactive rendering.
   * The NodeView provides resize handles and selected-state styling.
   */
  addNodeView() {
    return ReactNodeViewRenderer(HtmlEditorImageNodeView);
  },
});

export default Image;
