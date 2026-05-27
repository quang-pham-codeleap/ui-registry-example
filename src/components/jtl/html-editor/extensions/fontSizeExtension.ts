import { Mark, mergeAttributes } from '@tiptap/core';
import { isValidFontSize } from '../utils';

/**
 * Interface defining the attributes for the FontSize mark.
 */
interface FontSizeAttributes {
  /** The font size value as a string (e.g. "14", "14px", "1.5rem") or CSS variable. */
  size: string | null;
}

/**
 * Custom TipTap mark that applies an inline font-size to selected text.
 *
 * This mark wraps text in `<span style="font-size: value">` and parses it back.
 * Supports plain numbers (converted to px), numbers with CSS units, and CSS variables.
 * Validates all font size values to prevent CSS injection attacks.
 *
 * @example
 * // Plain number (will be converted to px)
 * editor.chain().focus().setMark('fontSize', { size: '14' }).run();
 * // With px unit
 * editor.chain().focus().setMark('fontSize', { size: '14px' }).run();
 * // With rem unit
 * editor.chain().focus().setMark('fontSize', { size: '1.5rem' }).run();
 * // CSS variable
 * editor.chain().focus().setMark('fontSize', { size: 'var(--typography-base-sizes-small-font-size)' }).run();
 * // Remove font size
 * editor.chain().focus().removeMark('fontSize').run();
 */
const FontSize = Mark.create<Record<string, unknown>, FontSizeAttributes>({
  name: 'fontSize',

  /**
   * Defines the mark's attributes.
   * The `size` attribute stores the font size value (e.g. "14", "14px", "1.5rem", "var(--variable)").
   */
  addAttributes() {
    return {
      size: {
        default: null,
        // Parse the font-size from the inline style when reading HTML.
        // Only accept validated formats to prevent injection attacks.
        parseHTML: (element: HTMLElement) => {
          const fontSize = element.style?.fontSize;
          if (!fontSize) return null;

          // Validate the font size before accepting it
          if (!isValidFontSize(fontSize)) return null;

          // Store the value as-is to preserve units and CSS variables
          return fontSize;
        },
        // Render the font-size as an inline style when writing HTML.
        // Validate before rendering as a safety net.
        renderHTML: (attributes: FontSizeAttributes) => {
          if (!attributes.size) return {};

          // Only render validated font sizes to prevent CSS injection
          if (!isValidFontSize(attributes.size)) return {};

          // Add 'px' unit only for plain numbers, preserve existing units
          const sizeValue = /^\d+(\.\d+)?$/.test(attributes.size) ? `${attributes.size}px` : attributes.size;

          return {
            style: `font-size: ${sizeValue}`,
          };
        },
      },
    };
  },

  /**
   * Parses an existing <span style="font-size: ..."> back into this mark.
   * Only matches spans that have an inline font-size style.
   */
  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (node: HTMLElement | string) => {
          // Node could be a string in some cases, guard against that.
          if (typeof node === 'string') {
            return false;
          }
          const fontSize = node.style?.fontSize;
          // Return false to skip nodes without a font-size style.
          if (!fontSize) {
            return false;
          }
          // Return null to indicate the mark should be applied (attrs handled by addAttributes).
          return null;
        },
      },
    ];
  },

  /**
   * Renders the mark as a <span> with merged HTML attributes.
   * The font-size style is applied via the renderHTML function in addAttributes.
   */
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});

export default FontSize;
