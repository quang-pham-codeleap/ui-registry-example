/**
 * All possible action identifiers that can be dispatched from the HTML editor toolbar.
 *
 * Actions that carry a typed data payload are mapped in {@link ToolbarActionDataMap}.
 * The {@link HandleToolbarAction} generic function type uses that map to enforce
 * the correct data shape at every call site.
 *
 * Every value here is a plain string literal — no template literals or numeric
 * strings. Dynamic data (colors, image src, search terms, etc.) is passed as a
 * separate typed `data` argument instead of being encoded in the action string.
 */
type ToolbarAction =
  // --- History ---
  | 'undo'
  | 'redo'

  // --- Typography / block-level styles ---
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'small'

  // --- Inline formatting ---
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'

  // --- Lists ---
  | 'bulletList'
  | 'numberedList'

  // --- Blocks ---
  | 'horizontalRule'
  | 'blockquote'

  // --- Text alignment ---
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'

  // --- Font size (data: SetFontSizeData) ---
  | 'fontSize'

  // --- Color (data: SetColorData) ---
  | 'textColor'
  | 'bgColor'

  // --- Color reset (no data) ---
  | 'resetTextColor'
  | 'resetBgColor'

  // --- Link (data: SetLinkData) ---
  | 'link'
  | 'unlink'

  // --- Table operations ---
  | 'insertTable'
  | 'addColumnBefore'
  | 'addColumnAfter'
  | 'deleteColumn'
  | 'addRowBefore'
  | 'addRowAfter'
  | 'deleteRow'
  | 'deleteTable'
  | 'mergeCells'
  | 'splitCell'
  | 'toggleHeaderRow'
  | 'toggleHeaderColumn'

  // --- Image (data: SetImageData | SetImageAlignmentData | SetImageAltData) ---
  | 'insertImage'
  | 'imageAlignment'
  | 'imageAlt'
  | 'deleteImage'

  // --- Search and Replace (data: SetSearchTermData | SetReplaceTermData) ---
  | 'setSearchTerm'
  | 'setReplaceTerm'
  | 'nextSearchResult'
  | 'previousSearchResult'
  | 'replace'
  | 'replaceAll'
  | 'resetSearch'

  // -- Video  --
  | 'insertVideo'
  | 'videoAlignment'
  | 'deleteVideo';

export default ToolbarAction;
