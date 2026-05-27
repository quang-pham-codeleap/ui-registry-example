import HtmlEditorMode from '../../types/HtmlEditorMode';
import { SelectedTableData, ActiveLinkData, SelectedImageData, SelectedVideoData, HandleToolbarAction } from '../../types';

/**
 * Props for the HtmlEditorToolbar component.
 * The toolbar is a pure UI component — it emits events upward and has no direct editor dependency.
 */
export default interface IHtmlEditorToolbarProps {
  /** Current editing mode. Controls which mode toggle is visually active. */
  mode: HtmlEditorMode;

  /** Fired when the user selects "Visuell" or "Code" in the mode toggle group. */
  onModeChange: (mode: HtmlEditorMode) => void;

  /**
   * Action names that are currently active (visually pressed).
   * Only toggleable actions appear here: bold, italic, underline, strikethrough, bulletList, numberedList.
   * Typed as string[] because Radix ToggleGroup value prop requires an array.
   */
  activeActions: string[];

  /**
   * Fired when any toolbar button is clicked.
   * Generic over the action type — TypeScript enforces the correct data shape per action.
   * Actions with data (link, textColor, insertImage, etc.) require a typed second argument.
   * Actions without data (undo, bold, etc.) take no second argument.
   */
  onToolbarAction: HandleToolbarAction;

  /**
   * The currently active typography style at the cursor position
   * (e.g. 'h1', 'h2', 'body'). Forwarded to the Typography popover
   * so the check icon tracks the active style.
   */
  selectedStyle?: string;

  /**
   * The currently active font size at the cursor position (e.g. 14).
   * Forwarded to the FontSize popover so the check icon tracks the active size.
   */
  selectedFontSize?: number;

  /**
   * The currently active foreground (text) color at the cursor position (e.g. "#000000").
   * Forwarded to the TextColor popover so the active swatch is highlighted.
   */
  selectedTextColor?: string;

  /**
   * The currently active background color at the cursor position (e.g. "#ffffff").
   * Forwarded to the TextColor popover so the active swatch is highlighted.
   */
  selectedBgColor?: string;

  /**
   * Custom color palette forwarded to the TextColorAction popover.
   * Falls back to the built-in default palette when omitted.
   */
  colorPalette?: string[];

  /**
   * The currently active text alignment at the cursor position (e.g. "alignLeft").
   * Forwarded to the TextAlignment popover so the active button is highlighted
   * and the trigger icon updates accordingly.
   */
  selectedAlignment?: string;

  /**
   * Contains the current link data (url and text) when the cursor is positioned
   * on an existing link. Used to pre-fill the Link popover inputs for editing.
   * When null, the cursor is not on a link.
   */
  selectedLink?: ActiveLinkData | null;

  /**
   * The currently selected/highlighted text in the editor.
   * Used to pre-fill the display text input when creating a new link.
   * Empty string when no text is selected.
   */
  selectedText?: string;

  /**
   * Contains the current image data (src, alt, alignment) when cursor is on an image node.
   * Used by HtmlEditorImageAction to pre-fill inputs for editing.
   * When null, no image is selected.
   */
  selectedImage?: SelectedImageData | null;

  /**
   * When true, the image insert popover is forced open (e.g. after a clipboard paste attempt).
   * Forwarded directly to HtmlEditorImageAction.
   */
  imagePopoverOpen?: boolean;

  /**
   * Called when the image popover closes so the parent can reset the forced-open state
   * and dismiss the clipboard-paste warning alert.
   */
  onImagePopoverClose?: () => void;

  /**
   * Contains the current video data (src, alignment) when cursor is on a video node.
   * Used by HtmlEditorVideoAction to pre-fill inputs for editing.
   * When null, no video is selected.
   */
  selectedVideo?: SelectedVideoData | null;

  /**
   * Contains table metadata when cursor is inside a table.
   * Used to trigger the table bubble menu.
   * When null, cursor is not in a table.
   */
  selectedTable?: SelectedTableData | null;

  /**
   * The current search term being used in the search/replace functionality.
   * Used to maintain search state across popover interactions.
   */
  searchTerm?: string;

  /**
   * Total number of search results found in the document.
   * Used to display "X von Y" in the search/replace popovers.
   */
  searchResults?: number;

  /**
   * Index of the currently active search result (0-based).
   * Used to display "X von Y" in the search/replace popovers.
   */
  searchResultIndex?: number;
}
