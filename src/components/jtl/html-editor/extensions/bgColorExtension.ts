import { Mark, mergeAttributes } from '@tiptap/core';
import { isValidColor } from '../utils';

/**
 * Attributes carried by the BgColor mark.
 */
interface BgColorAttributes {
  /** The background color as a hex string, CSS variable, or valid CSS color name. */
  color: string | null;
}

/**
 * Custom TipTap mark that applies an inline background color to selected text.
 *
 * Wraps text in `<span style="background-color: value">` and parses it back on load.
 * Supports hex colors (#RGB, #RRGGBB), CSS variables (var(--name)), and named CSS colors.
 * Validates all color values to prevent CSS injection attacks.
 *
 * @example
 * // Hex color
 * editor.chain().focus().setMark('bgColor', { color: '#84cc16' }).run();
 * // CSS variable
 * editor.chain().focus().setMark('bgColor', { color: 'var(--primary)' }).run();
 * // Named color
 * editor.chain().focus().setMark('bgColor', { color: 'yellow' }).run();
 * // Remove background color
 * editor.chain().focus().removeMark('bgColor').run();
 */
const BgColor = Mark.create<Record<string, unknown>, BgColorAttributes>({
  name: 'bgColor',

  /**
   * Declares the `color` attribute with HTML parse / render helpers.
   */
  addAttributes() {
    return {
      color: {
        default: null,
        // Read the background-color value from an existing inline style.
        // Only accept validated color formats to prevent injection attacks.
        parseHTML: (element: HTMLElement) => {
          const bgColor = element.style?.backgroundColor;
          if (!bgColor) return null;
          // Validate the color before accepting it
          return isValidColor(bgColor) ? bgColor : null;
        },
        // Write it back as an inline style.
        // Validate before rendering as a safety net.
        renderHTML: (attributes: BgColorAttributes) => {
          if (!attributes.color) return {};
          // Only render validated colors to prevent CSS injection
          if (!isValidColor(attributes.color)) return {};
          return { style: `background-color: ${attributes.color}` };
        },
      },
    };
  },

  /**
   * Matches `<span>` elements that carry an inline `background-color` style.
   * Nodes without a background-color style are skipped (return false).
   */
  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (node: HTMLElement | string) => {
          if (typeof node === 'string') return false;
          // Only claim spans that actually have a background-color style set.
          return node.style?.backgroundColor ? null : false;
        },
      },
    ];
  },

  /**
   * Renders the mark as a `<span>` with background-color applied via renderHTML in addAttributes.
   */
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});

export default BgColor;
