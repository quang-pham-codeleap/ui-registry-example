import HandleToolbarAction from '../../types/HandleToolbarAction';

/**
 * Props for the TextColorAction popover toolbar button.
 */
export default interface IHtmlEditorTextColorActionProps {
  /**
   * Fired when the user picks a color or resets.
   * Calls typed actions like:
   *   - onAction('textColor', { color: '#rrggbb' }) — apply foreground color
   *   - onAction('bgColor', { color: '#rrggbb' })   — apply background color
   *   - onAction('resetTextColor')                  — remove foreground color
   *   - onAction('resetBgColor')                    — remove background color
   */
  onAction: HandleToolbarAction;

  /** Currently active foreground (text) color hex, e.g. "#000000". */
  selectedTextColor?: string;

  /** Currently active background color hex, e.g. "#ffffff". */
  selectedBgColor?: string;

  /**
   * Custom color palette to render as preset swatches in the popover.
   * Falls back to the built-in default palette when omitted.
   */
  colorPalette?: string[];
}
