import { useState, useCallback } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import {
  FontSizeExtension,
  TextColorExtension,
  BgColorExtension,
  ImageExtension,
  VideoExtension,
  OpenLinkOnModClickExtension,
  SearchAndReplaceExtension,
} from '../extensions';
import { Table } from '@tiptap/extension-table';
import { DEFAULT_FONT_SIZE } from '../constants';
import { getToolbarSnapshot } from '../utils';
import useHtmlEditorState from './useHtmlEditorState';
import HtmlEditorMode from '../types/HtmlEditorMode';
import {
  UseHtmlEditorProps,
  SetLinkData,
  SetColorData,
  SetImageData,
  SetImageAlignmentData,
  SetImageAltData,
  SetSearchTermData,
  SetReplaceTermData,
  SetFontSizeData,
  SelectedTableData,
  ActiveLinkData,
  SelectedImageData,
  ToolbarAction,
  HandleToolbarAction,
  SelectedVideoData,
  SetVideoData,
  SetVideoAlignmentData,
} from '../types';
import useHtmlEditorLinkAction from './useHtmlEditorLinkAction';
import useHtmlEditorImageAction from './useHtmlEditorImageAction';
import useHtmlEditorSearchAction from './useHtmlEditorSearchAction';
import useHtmlEditorColorAction from './useHtmlEditorColorAction';
import useHtmlEditorFontSizeAction from './useHtmlEditorFontSizeAction';
import useHtmlEditorVideoAction from './useHtmlEditorVideoAction';

/**
 * Owns all editor state, the TipTap instance, and the toolbar action dispatcher.
 *
 * Responsibilities:
 *   - Initialises the TipTap editor with the correct extension set.
 *   - Keeps 6 toolbar-state slices in sync via a single {@link getToolbarSnapshot} call.
 *   - Dispatches every toolbar action string to the matching TipTap command.
 *   - Manages the visual / code mode toggle.
 *
 * @param props - See {@link UseHtmlEditorProps}.
 * @returns Everything the HtmlEditor render shell needs.
 */
export default function useHtmlEditor({ initialContent, onContentChange, initialMode, colorPalette }: UseHtmlEditorProps) {
  // --- Mode ---
  const { mode, setMode } = useHtmlEditorState(initialMode);

  // --- Image paste warning state ---
  // True while the "clipboard images are not supported" alert is visible.
  const [showImagePasteWarning, setShowImagePasteWarning] = useState(false);

  // True when the image popover should be forced open (e.g. after a clipboard paste attempt).
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false);

  // Dismisses the warning and closes the forced-open image popover.
  const handleImagePopoverClose = useCallback(() => {
    setShowImagePasteWarning(false);
    setImagePopoverOpen(false);
  }, []);

  // --- Toolbar state slices ---
  // Each tracks one piece of editor state that the toolbar needs to render correctly.
  const [activeActions, setActiveActions] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('body');
  const [selectedFontSize, setSelectedFontSize] = useState<number | undefined>(DEFAULT_FONT_SIZE);
  const [selectedTextColor, setSelectedTextColor] = useState<string | undefined>(undefined);
  const [selectedBgColor, setSelectedBgColor] = useState<string | undefined>(undefined);
  const [selectedAlignment, setSelectedAlignment] = useState<string>('alignLeft');
  // Link-related state: tracks existing link at cursor and current text selection.
  const [selectedLink, setSelectedLink] = useState<ActiveLinkData | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  // Image-related state: tracks selected image node attributes.
  const [selectedImage, setSelectedImage] = useState<SelectedImageData | null>(null);

  // Video-related state: tracks selected video node attributes.
  const [selectedVideo, setSelectedVideo] = useState<SelectedVideoData | null>(null);

  // Table-related state: tracks selected table metadata.
  const [selectedTable, setSelectedTable] = useState<SelectedTableData | null>(null);

  // Search and replace state: tracks search term, results count, and current index.
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<number>(0);
  const [searchResultIndex, setSearchResultIndex] = useState<number>(0);

  // Applies every value from a snapshot object to the toolbar state in one go.
  // Keeps the three callback bodies (onUpdate / onSelectionUpdate / onFocus)
  // as a single line each.
  const applySnapshot = useCallback((snapshot: ReturnType<typeof getToolbarSnapshot>) => {
    setActiveActions(snapshot.activeActions);
    setSelectedStyle(snapshot.selectedStyle);
    setSelectedFontSize(snapshot.selectedFontSize);
    setSelectedTextColor(snapshot.selectedTextColor);
    setSelectedBgColor(snapshot.selectedBgColor);
    setSelectedAlignment(snapshot.selectedAlignment);
    // Link state — used by HtmlEditorLinkAction popover to pre-fill inputs.
    setSelectedLink(snapshot.selectedLink);
    setSelectedText(snapshot.selectedText);
    // Image state — used by HtmlEditorImageAction popover to pre-fill inputs.
    setSelectedImage(snapshot.selectedImage);
    // Video state — used by HtmlEditorVideoAction popover to pre-fill inputs.
    setSelectedVideo(snapshot.selectedVideo);
    // Table state — used to show/hide table bubble menu.
    setSelectedTable(snapshot.selectedTable);
  }, []);

  // --- TipTap editor initialisation ---
  const editor = useEditor({
    // TipTap v3: Prevent immediate render to avoid hydration mismatches in SSR frameworks.
    // This ensures the editor only renders after client-side hydration is complete.
    immediatelyRender: false,
    extensions: [
      // Configure heading to support levels 1–4 (default is 1–3).
      // TipTap v3: StarterKit now includes link and underline by default, so we disable them
      // here to use our custom configurations below.
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
        link: {
          openOnClick: false,
          HTMLAttributes: {
            class: 'html-editor-link',
            rel: 'noopener noreferrer',
            target: '_blank',
          },
        },
      }),
      // Custom mark for font-size inline styling.
      FontSizeExtension,
      // Custom marks for foreground and background color inline styling.
      TextColorExtension,
      BgColorExtension,
      // Custom image node with alignment support.
      ImageExtension,
      // Custom video node with alignment support and embed detection (YouTube, Vimeo).
      VideoExtension,
      // Block-level text alignment (left / center / right / justify).
      // Applies a text-align style to paragraph, heading, and table cell nodes.
      TextAlign.configure({ types: ['heading', 'paragraph', 'tableCell', 'tableHeader'] }),
      // Enables Ctrl/Cmd+Click to open links in a new tab.
      // Must be registered after Link so the link mark type exists in the schema.
      OpenLinkOnModClickExtension,
      // Custom Table extension with related node types.
      // Enables table creation, editing, and manipulation with resizable columns.
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      // Search and replace extension for finding and replacing text in the editor.
      SearchAndReplaceExtension,
    ],
    content: initialContent,
    // Style the contenteditable ProseMirror div directly via editorProps.
    // TipTap best practice: set attributes here rather than targeting .ProseMirror via CSS.
    editorProps: {
      attributes: {
        class: 'p-4 min-h-50 outline-none',
      },
      // Intercept paste events that contain raw image data (e.g. screenshots from clipboard).
      // TipTap/ProseMirror would otherwise embed them as base64 strings, which is unwanted.
      // Instead: block the paste, show a warning, and open the image URL popover.
      handlePaste: (_view, event) => {
        const items = Array.from(event.clipboardData?.items ?? []);
        const hasImageFile = items.some(item => item.type.startsWith('image/'));

        if (hasImageFile) {
          // Show the alert and open the image popover so the user can insert via URL.
          setShowImagePasteWarning(true);
          setImagePopoverOpen(true);
          // Return true = we handled the paste; prevents TipTap from inserting base64 content.
          return true;
        }

        // Return false = let TipTap handle all other paste events normally.
        return false;
      },
    },
    // Fires on every content change. Only place that notifies the parent.
    // Also syncs toolbar state because content changes move the selection.
    onUpdate: ({ editor: updatedEditor }) => {
      onContentChange?.(updatedEditor.getHTML());
      applySnapshot(getToolbarSnapshot(updatedEditor));

      // Sync search state when document changes during active search.
      // The search extension automatically recomputes matches when content changes,
      // but React state (searchResults, searchResultIndex) won't update unless we sync it here.
      if (searchTerm) {
        setSearchResults(updatedEditor.storage.searchAndReplace.results.length);
        setSearchResultIndex(updatedEditor.storage.searchAndReplace.resultIndex);
      }
    },
    // Fires on every cursor / selection move inside the editor.
    // Keeps toolbar in sync when the user navigates between lines
    // without typing (no content change → onUpdate would not fire).
    onSelectionUpdate: ({ editor: updatedEditor }) => {
      applySnapshot(getToolbarSnapshot(updatedEditor));
    },
    // Fires when the content editable re-gains focus after the user clicked
    // away (e.g. interacted with a popover or another element).
    // onSelectionUpdate is not guaranteed in that case, so onFocus is the
    // reliable fallback that keeps the toolbar and typography popover in sync.
    onFocus: ({ editor: focusedEditor }) => {
      applySnapshot(getToolbarSnapshot(focusedEditor));
    },
  });

  // --- Specialized Action Handlers ---
  const { handleLink, handleUnlink } = useHtmlEditorLinkAction(editor, selectedLink);
  const { handleInsertImage, handleUpdateImageAlignment, handleUpdateImageAlt, handleDeleteImage } = useHtmlEditorImageAction(editor);
  const {
    handleSetSearchTerm,
    handleSetReplaceTerm,
    handleNextSearchResult,
    handlePreviousSearchResult,
    handleReplace,
    handleReplaceAll,
    handleResetSearch,
  } = useHtmlEditorSearchAction(editor, setSearchTerm, setSearchResults, setSearchResultIndex);
  const { handleTextColor, handleBgColor, handleResetTextColor, handleResetBgColor } = useHtmlEditorColorAction(editor);
  const { handleFontSize } = useHtmlEditorFontSizeAction(editor);
  const { handleInsertVideo, handleUpdateVideoAlignment, handleDeleteVideo } = useHtmlEditorVideoAction(editor);

  // --- Toolbar action handler ---
  // Maps the toolbar's string action identifiers to TipTap editor commands.
  // Actions that carry data (fontSize, textColor, link, insertImage, etc.) receive a
  // typed payload via the second argument. See HandleToolbarAction and ToolbarActionDataMap
  // for the full type mapping. Cast to HandleToolbarAction enforces generic inference at
  // every call site so TypeScript rejects wrong data shapes at compile time.
  const handleToolbarAction = useCallback(
    (
      action: ToolbarAction,
      data?:
        | SetLinkData
        | SetColorData
        | SetImageData
        | SetImageAlignmentData
        | SetImageAltData
        | SetSearchTermData
        | SetReplaceTermData
        | SetFontSizeData,
    ) => {
      if (!editor) return;

      // Each entry runs the corresponding TipTap chain command.
      // Unknown actions (e.g. popover triggers) are silently ignored.
      const commands: Record<string, () => void | boolean> = {
        // --- History ---
        undo: () => editor.chain().focus().undo().run(),
        redo: () => editor.chain().focus().redo().run(),

        // --- Typography / block-level styles ---
        h1: () =>
          (editor.isActive('heading', { level: 1 }) ? editor.chain().focus().setParagraph() : editor.chain().focus().setHeading({ level: 1 })).run(),
        h2: () =>
          (editor.isActive('heading', { level: 2 }) ? editor.chain().focus().setParagraph() : editor.chain().focus().setHeading({ level: 2 })).run(),
        h3: () =>
          (editor.isActive('heading', { level: 3 }) ? editor.chain().focus().setParagraph() : editor.chain().focus().setHeading({ level: 3 })).run(),
        h4: () =>
          (editor.isActive('heading', { level: 4 }) ? editor.chain().focus().setParagraph() : editor.chain().focus().setHeading({ level: 4 })).run(),
        body: () => editor.chain().focus().setParagraph().unsetMark('fontSize').run(),
        small: () => editor.chain().focus().setParagraph().setMark('fontSize', { size: '14' }).run(),

        // --- Inline formatting ---
        bold: () => editor.chain().focus().toggleBold().run(),
        italic: () => editor.chain().focus().toggleItalic().run(),
        underline: () => editor.chain().focus().toggleUnderline().run(),
        strikethrough: () => editor.chain().focus().toggleStrike().run(),

        // --- Lists ---
        bulletList: () => editor.chain().focus().toggleBulletList().run(),
        numberedList: () => editor.chain().focus().toggleOrderedList().run(),

        // --- Blocks ---
        horizontalRule: () => editor.chain().focus().setHorizontalRule().run(),
        blockquote: () => editor.chain().focus().toggleBlockquote().run(),

        // --- Text alignment ---
        alignLeft: () => editor.chain().focus().setTextAlign('left').run(),
        alignCenter: () => editor.chain().focus().setTextAlign('center').run(),
        alignRight: () => editor.chain().focus().setTextAlign('right').run(),
        alignJustify: () => editor.chain().focus().setTextAlign('justify').run(),

        // --- Table manipulation ---
        insertTable: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
        addColumnBefore: () => editor.chain().focus().addColumnBefore().run(),
        addColumnAfter: () => editor.chain().focus().addColumnAfter().run(),
        deleteColumn: () => editor.chain().focus().deleteColumn().run(),
        addRowBefore: () => editor.chain().focus().addRowBefore().run(),
        addRowAfter: () => editor.chain().focus().addRowAfter().run(),
        deleteRow: () => editor.chain().focus().deleteRow().run(),
        deleteTable: () => editor.chain().focus().deleteTable().run(),
        mergeCells: () => editor.chain().focus().mergeCells().run(),
        splitCell: () => editor.chain().focus().splitCell().run(),
        toggleHeaderRow: () => editor.chain().focus().toggleHeaderRow().run(),
        toggleHeaderColumn: () => editor.chain().focus().toggleHeaderColumn().run(),

        // --- Specialized Actions (Delegated) ---
        fontSize: () => handleFontSize(data as SetFontSizeData),
        textColor: () => handleTextColor(data as SetColorData),
        bgColor: () => handleBgColor(data as SetColorData),
        resetTextColor: () => handleResetTextColor(),
        resetBgColor: () => handleResetBgColor(),
        link: () => handleLink(data as SetLinkData),
        unlink: () => handleUnlink(),
        insertImage: () => handleInsertImage(data as SetImageData),
        imageAlignment: () => handleUpdateImageAlignment(data as SetImageAlignmentData),
        imageAlt: () => handleUpdateImageAlt(data as SetImageAltData),
        deleteImage: () => handleDeleteImage(),
        setSearchTerm: () => handleSetSearchTerm(data as SetSearchTermData),
        setReplaceTerm: () => handleSetReplaceTerm(data as SetReplaceTermData),
        nextSearchResult: () => handleNextSearchResult(),
        previousSearchResult: () => handlePreviousSearchResult(),
        replace: () => handleReplace(),
        replaceAll: () => handleReplaceAll(),
        resetSearch: () => handleResetSearch(),
        insertVideo: () => handleInsertVideo(data as SetVideoData),
        videoAlignment: () => handleUpdateVideoAlignment(data as SetVideoAlignmentData),
        deleteVideo: () => handleDeleteVideo(),
      };

      if (commands[action]) {
        commands[action]();
      }
    },
    [
      editor,
      handleFontSize,
      handleTextColor,
      handleBgColor,
      handleResetTextColor,
      handleResetBgColor,
      handleLink,
      handleUnlink,
      handleInsertImage,
      handleUpdateImageAlignment,
      handleUpdateImageAlt,
      handleDeleteImage,
      handleSetSearchTerm,
      handleSetReplaceTerm,
      handleNextSearchResult,
      handlePreviousSearchResult,
      handleReplace,
      handleReplaceAll,
      handleResetSearch,
      handleInsertVideo,
      handleUpdateVideoAlignment,
      handleDeleteVideo,
    ],
  ) as HandleToolbarAction;

  // --- HTML code sync handler ---
  // Allows the code editor to update TipTap content when user edits HTML source.
  // Called by the CodeEditor's onChange prop in code mode.
  const handleCodeChange = useCallback(
    (html: string) => {
      if (!editor) return;
      // Update TipTap content from HTML source.
      // setContent replaces the entire document with the new HTML.
      // This triggers onUpdate which calls onContentChange, completing the sync cycle.
      editor.commands.setContent(html);
    },
    [editor],
  );

  // --- Mode change handler ---
  // When switching modes (visual ↔ code), clear any image/table selection state.
  // This prevents bubble menus from incorrectly reappearing when returning to visual mode.
  const handleModeChange = useCallback(
    (newMode: HtmlEditorMode) => {
      setMode(newMode);

      // Clear the React state variables that track selected nodes.
      setSelectedImage(null);
      setSelectedTable(null);

      // Clear the editor's actual selection state by setting a text cursor at position 0.
      // This is critical: without this, the TipTap editor still has a NodeSelection,
      // which would cause getToolbarSnapshot to re-populate selected state when onFocus fires.
      if (editor) {
        editor.chain().setTextSelection(0).run();
      }
    },
    [setMode, editor],
  );

  // --- Public surface ---
  return {
    editor,
    mode,
    handleModeChange,
    handleToolbarAction,
    // Image paste warning — shown when the user tries to paste an image from clipboard.
    showImagePasteWarning,
    imagePopoverOpen,
    handleImagePopoverClose,
    // HTML code sync — updates TipTap content when code editor changes.
    // Used by CodeEditor's onChange prop in code mode.
    handleCodeChange,
    // Toolbar state
    activeActions,
    selectedStyle,
    selectedFontSize,
    selectedTextColor,
    selectedBgColor,
    selectedAlignment,
    colorPalette,
    // Link state — contains existing link data when cursor is on a link,
    // or null when not on a link. Used by HtmlEditorLinkAction popover.
    selectedLink,
    // Selected text — the currently highlighted text in the editor.
    // Used to pre-fill display text when creating a new link.
    selectedText,
    // Image state — contains image data when cursor is on an image node,
    // or null when not on an image. Used by HtmlEditorImageAction popover.
    selectedImage,
    // Video state — contains video data when cursor is on a video node,
    // or null when not on a video. Used by HtmlEditorVideoAction popover.
    selectedVideo,
    // Table state — contains table metadata when cursor is inside a table,
    // or null when not in a table. Used by HtmlEditorTableBubbleMenu.
    selectedTable,
    // Search and replace state — tracks search term, results count, and current result index.
    // Used by HtmlEditorSearchAction and HtmlEditorReplaceAction popovers.
    searchTerm,
    searchResults,
    searchResultIndex,
  };
}
