import { Mark, mergeAttributes } from '@tiptap/core';
import { isValidColor } from '../utils';

/**
 * Attributes carried by the TextColor mark.
 */
interface TextColorAttributes {
  /** The foreground color as a hex string, CSS variable, or valid CSS color name. */
  color: string | null;
}

/**
 * Custom TipTap mark that applies an inline foreground color to selected text.
 *
 * Wraps text in `<span style="color: value">` and parses it back on load.
 * Supports hex colors (#RGB, #RRGGBB), CSS variables (var(--name)), and named CSS colors.
 * Validates all color values to prevent CSS injection attacks.
 *
 * @example
 * // Hex color
 * editor.chain().focus().setMark('textColor', { color: '#db2777' }).run();
 * // CSS variable
 * editor.chain().focus().setMark('textColor', { color: 'var(--primary)' }).run();
 * // Named color
 * editor.chain().focus().setMark('textColor', { color: 'red' }).run();
 * // Remove text color
 * editor.chain().focus().removeMark('textColor').run();
 */
const TextColor = Mark.create<Record<string, unknown>, TextColorAttributes>({
  name: 'textColor',

  /**
   * Declares the `color` attribute with HTML parse / render helpers.
   */
  addAttributes() {
    return {
      color: {
        default: null,
        // Read the color value from an existing inline style.
        // Only accept validated color formats to prevent injection attacks.
        parseHTML: (element: HTMLElement) => {
          const textColor = element.style?.color;
          if (!textColor) return null;
          // Validate the color before accepting it
          return isValidColor(textColor) ? textColor : null;
        },
        // Write the color value back as an inline style.
        // Validate before rendering as a safety net.
        renderHTML: (attributes: TextColorAttributes) => {
          if (!attributes.color) return {};
          // Only render validated colors to prevent CSS injection
          if (!isValidColor(attributes.color)) return {};
          return { style: `color: ${attributes.color}` };
        },
      },
    };
  },

  /**
   * Matches `<span>` elements that carry an inline `color` style.
   * Nodes without a color style are skipped (return false).
   */
  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (node: HTMLElement | string) => {
          if (typeof node === 'string') return false;
          // Only claim spans that actually have a color style set.
          return node.style?.color ? null : false;
        },
      },
    ];
  },

  /**
   * Renders the mark as a `<span>` with the color applied via renderHTML in addAttributes.
   */
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});

export default TextColor;
