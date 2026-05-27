import HtmlEditorMode from './HtmlEditorMode';

/** Input parameters for {@link useHtmlEditor}. */
type UseHtmlEditorProps = {
  /** HTML string rendered on mount. */
  initialContent: string;
  /** Fires on every content change with the full HTML output. */
  onContentChange?: (html: string) => void;
  /** Starting editing mode ('visual' | 'code'). */
  initialMode: HtmlEditorMode;
  /** Optional custom color palette forwarded to the toolbar. */
  colorPalette?: string[];
};

export default UseHtmlEditorProps;
