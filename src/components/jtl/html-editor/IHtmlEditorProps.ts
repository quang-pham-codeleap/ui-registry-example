import HtmlEditorMode from './types/HtmlEditorMode';

/**
 * Props for the top-level HtmlEditor component.
 */
export default interface IHtmlEditorProps {
  /**
   * Initial HTML string to seed the editor with.
   *
   * Security note:
   * - This HTML is parsed and rendered into the DOM by the editor.
   * - Do not pass untrusted or user-supplied HTML without sanitizing it first,
   *   as this can lead to cross-site scripting (XSS) vulnerabilities.
   * - TipTap provides some built-in protection, but it is not a replacement
   *   for proper HTML sanitization at the boundary where you accept user input.
   *
   * Consumers are responsible for ensuring that any HTML provided here has been
   * sanitized according to their application's security requirements.
   *
   * @default ''
   */
  initialContent?: string;

  /**
   * Fired on every content change with the latest HTML output.
   * @param html - The current editor content as an HTML string.
   */
  onContentChange?: (html: string) => void;

  /**
   * Starting editing mode.
   * @default 'visual'
   */
  mode?: HtmlEditorMode;

  /**
   * Custom color palette displayed in the text-color popover as preset swatches.
   * Each entry must be a valid hex color string (e.g. "#ff5733").
   * No runtime validation is performed; the consumer is responsible for ensuring
   * that all entries are valid hex colors. Falls back to the built-in 8-color
   * default palette when omitted.
   *
   * @default DEFAULT_COLOR_PALETTE
   */
  colorPalette?: string[];
}
