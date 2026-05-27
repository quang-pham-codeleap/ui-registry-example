import React, { useRef, useLayoutEffect, useCallback, useEffect, useState } from 'react';
import { EditorContent } from '@tiptap/react';
import { Box } from '../box';
import { Alert } from '../alert';
import { CodeEditor } from '../code-editor';
import { Popover, PopoverAnchor, PopoverContent } from '../popover';
import { HtmlEditorToolbar } from './components/html-editor-toolbar';
import { HtmlEditorImageBubbleMenu, HtmlEditorVideoBubbleMenu, HtmlEditorTableBubbleMenu } from './components';
import { useHtmlEditor } from './hooks';
import { formatHtml } from './utils';
import IHtmlEditorProps from './IHtmlEditorProps';

/**
 * HtmlEditor — top-level rich-text editor component.
 *
 * Composes:
 *   - HtmlEditorToolbar  (always visible)
 *   - EditorContent      (Visual mode — TipTap WYSIWYG)
 *   - CodeEditor         (Code mode  — HTML source)
 *
 * @param props {@link IHtmlEditorProps}
 */
const HtmlEditor: React.FC<IHtmlEditorProps> = ({ initialContent = '', onContentChange, mode: initialMode = 'visual', colorPalette }) => {
  const {
    editor,
    mode,
    handleModeChange,
    handleToolbarAction,
    handleCodeChange,
    activeActions,
    selectedStyle,
    selectedFontSize,
    selectedTextColor,
    selectedBgColor,
    selectedAlignment,
    selectedLink,
    selectedText,
    selectedImage,
    selectedVideo,
    selectedTable,
    searchTerm,
    searchResults,
    searchResultIndex,
    showImagePasteWarning,
    imagePopoverOpen,
    handleImagePopoverClose,
  } = useHtmlEditor({ initialContent, onContentChange, initialMode, colorPalette });

  // Ref for the editor content wrapper — positioning context for bubble menu anchors.
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  // Ref for the invisible anchor span — positioned at the selected image's location.
  const imageAnchorRef = useRef<HTMLSpanElement>(null);
  // Ref for the invisible anchor span — positioned at the selected video's location.
  const videoAnchorRef = useRef<HTMLSpanElement>(null);
  // Ref for the invisible anchor span — positioned at the selected table's location.
  const tableAnchorRef = useRef<HTMLSpanElement>(null);

  // Position the anchor span at the selected image's DOM location.
  // Uses useLayoutEffect to run before browser paint, so Floating UI
  // measures the correct position when the Popover first opens.
  useLayoutEffect(() => {
    if (!selectedImage || !editor || !imageAnchorRef.current || !editorWrapperRef.current) return;

    const { from } = editor.state.selection;
    const domNode = editor.view.nodeDOM(from);

    if (domNode instanceof HTMLElement) {
      // The image NodeView renders: <NodeViewWrapper><div><img class="html-editor-image" /></div></NodeViewWrapper>
      // querySelector traverses the wrapper to find the <img> for precise anchor positioning.
      const imgEl = (domNode.querySelector('img.html-editor-image') as HTMLElement) || domNode;
      const imgRect = imgEl.getBoundingClientRect();
      const wrapperRect = editorWrapperRef.current.getBoundingClientRect();

      // Set anchor position relative to the editor wrapper.
      const anchor = imageAnchorRef.current;
      anchor.style.left = `${imgRect.left - wrapperRect.left}px`;
      anchor.style.top = `${imgRect.top - wrapperRect.top}px`;
      anchor.style.width = `${imgRect.width}px`;
      anchor.style.height = `${imgRect.height}px`;
    }
  }, [selectedImage, editor]);

  // Position the anchor span at the selected video's DOM location.
  // Uses useLayoutEffect to run before browser paint, so Floating UI
  // measures the correct position when the Popover first opens.
  useLayoutEffect(() => {
    if (!selectedVideo || !editor || !videoAnchorRef.current || !editorWrapperRef.current) return;

    const { from } = editor.state.selection;
    const domNode = editor.view.nodeDOM(from);

    if (domNode instanceof HTMLElement) {
      // The video NodeView renders: <NodeViewWrapper><div><video class="html-editor-video" /></div></NodeViewWrapper>
      // or <iframe class="html-editor-video" /> for YouTube/Vimeo embeds.
      // querySelector traverses the wrapper to find the video/iframe for precise anchor positioning.
      const videoEl = (domNode.querySelector('video.html-editor-video') || domNode.querySelector('iframe.html-editor-video')) as HTMLElement;
      const targetEl = videoEl || domNode;
      const videoRect = targetEl.getBoundingClientRect();
      const wrapperRect = editorWrapperRef.current.getBoundingClientRect();

      // Set anchor position relative to the editor wrapper.
      const anchor = videoAnchorRef.current;
      anchor.style.left = `${videoRect.left - wrapperRect.left}px`;
      anchor.style.top = `${videoRect.top - wrapperRect.top}px`;
      anchor.style.width = `${videoRect.width}px`;
      anchor.style.height = `${videoRect.height}px`;
    }
  }, [selectedVideo, editor]);

  // Position the anchor span at the selected table's DOM location.
  // Uses useLayoutEffect to run before browser paint, so Floating UI
  // measures the correct position when the Popover first opens.
  useLayoutEffect(() => {
    if (!selectedTable || !editor || !tableAnchorRef.current || !editorWrapperRef.current) return;

    const { from } = editor.state.selection;
    const domNode = editor.view.domAtPos(from).node;

    if (domNode instanceof HTMLElement) {
      // Find the table element by traversing upward from the current cell.
      // Table nodes are configured (via the Tiptap Table extension HTMLAttributes)
      const tableEl = (domNode.closest('table.html-editor-table') as HTMLElement) || domNode;
      const tableRect = tableEl.getBoundingClientRect();
      const wrapperRect = editorWrapperRef.current.getBoundingClientRect();

      // Set anchor position relative to the editor wrapper.
      const anchor = tableAnchorRef.current;
      anchor.style.left = `${tableRect.left - wrapperRect.left}px`;
      anchor.style.top = `${tableRect.top - wrapperRect.top}px`;
      anchor.style.width = `${tableRect.width}px`;
      anchor.style.height = `${tableRect.height}px`;
    }
  }, [selectedTable, editor]);

  // Prevent Popover from stealing focus when it opens.
  // The editor should keep focus so the user can continue interacting.
  const handlePopoverAutoFocus = useCallback((e: Event) => {
    e.preventDefault();
  }, []);

  // Handle Escape key to clear selection and blur editor.
  // When user presses Escape, the editor loses focus and selection is cleared.
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Blur the editor view (removes focus from the contenteditable element)
        if (!editor) return;
        const { selection } = editor.state;
        const nextPos = selection.to;
        editor.chain().setTextSelection(nextPos).run();
      }
    };

    // Attach keyboard listener to the editor DOM element
    const editorElement = editor.view.dom;
    editorElement.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount or editor change
    return () => {
      editorElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);

  // Ref to always hold the latest raw HTML without adding it to effect deps.
  // Avoids re-triggering the mode-switch effect on every TipTap content change.
  const rawHtmlRef = useRef<string>(editor?.getHTML() ?? '');
  rawHtmlRef.current = editor?.getHTML() ?? '';

  // Local state for the code editor value — intentionally decoupled from TipTap state.
  // Initialised once when entering code mode; updated only by user keystrokes afterward.
  // This prevents the feedback loop: user types → TipTap re-serialises → formattedHtml
  // re-computes → CodeEditor value prop changes → cursor jumps.
  const [codeEditorValue, setCodeEditorValue] = useState<string>('');

  // Tracks whether code editor has been initialised for the current code-mode session.
  // Prevents re-initialisation when the editor instance is updated (e.g. after async mount),
  // while still ensuring we get a non-empty snapshot even when immediatelyRender=false.
  const codeEditorInitializedRef = useRef<boolean>(false);

  // Reset the initialization flag whenever the user leaves code mode,
  // so the next code-mode entry always gets a fresh snapshot.
  useEffect(() => {
    if (mode !== 'code') {
      codeEditorInitializedRef.current = false;
    }
  }, [mode]);

  // Initialise code editor content when:
  //   1. mode is 'code', AND
  //   2. the TipTap editor instance is ready (handles immediatelyRender:false delay), AND
  //   3. we haven't already initialised for this code-mode session.
  // rawHtmlRef is read inside the effect so it is always current at execution time
  // without being listed as a dependency (prevents re-firing on every content change).
  useEffect(() => {
    if (mode === 'code' && editor && !codeEditorInitializedRef.current) {
      codeEditorInitializedRef.current = true;
      setCodeEditorValue(formatHtml(rawHtmlRef.current));
    }
  }, [mode, editor]);

  // Handles code editor changes while in code mode.
  // Updates local state immediately (preserves cursor / selection in Monaco)
  // and syncs to TipTap so onContentChange still fires for the parent.
  const handleCodeEditorChange = useCallback(
    (html: string) => {
      setCodeEditorValue(html);
      handleCodeChange(html);
    },
    [handleCodeChange],
  );

  return (
    <Box className="flex flex-col w-full">
      {/* Warning shown when user tries to paste an image from clipboard.
          Direct image paste is not supported — images must be inserted via URL.
          The alert dismisses when the user closes the image URL popover. */}
      {showImagePasteWarning && (
        <Alert
          variant="warning"
          title="Bild aus Zwischenablage nicht unterstützt"
          description="Das direkte Einfügen von Bildern aus der Zwischenablage wird nicht unterstützt. Bitte laden Sie Ihr Bild bei einem externen Anbieter hoch und fügen Sie den Link über das Bild-Menü ein."
          onClose={handleImagePopoverClose}
        />
      )}

      {/* Thin blur strip — covers the spacing-2 gap between viewport top and toolbar.
          Semi-transparent + backdrop-blur blurs scrolled content visible in the gap. */}
      <Box className="sticky top-0 z-10 h-2 bg-[var(--background)]/60 backdrop-blur-md" />

      {/* Toolbar — sticky just below the blur strip. Solid background, fully opaque.
          pb-2 is only applied when toolbar is in its natural position (not stuck). */}
      <Box className={'sticky top-2 z-10 pb-2'}>
        <HtmlEditorToolbar
          mode={mode}
          onModeChange={handleModeChange}
          activeActions={activeActions}
          onToolbarAction={handleToolbarAction}
          selectedStyle={selectedStyle}
          selectedFontSize={selectedFontSize}
          selectedTextColor={selectedTextColor}
          selectedBgColor={selectedBgColor}
          colorPalette={colorPalette}
          selectedAlignment={selectedAlignment}
          selectedLink={selectedLink}
          selectedText={selectedText}
          selectedImage={selectedImage}
          selectedVideo={selectedVideo}
          selectedTable={selectedTable}
          imagePopoverOpen={imagePopoverOpen}
          onImagePopoverClose={handleImagePopoverClose}
          searchTerm={searchTerm}
          searchResults={searchResults}
          searchResultIndex={searchResultIndex}
        />
      </Box>

      {/* Content area — bordered container.
          position: relative is needed for the image bubble menu anchor. */}
      <Box
        ref={editorWrapperRef}
        className="relative w-full rounded-[var(--border-radius-lg)] border border-[var(--border)] overflow-hidden focus-within:ring-1 focus-within:ring-[var(--ring)] focus-within:ring-offset-1 focus-within:ring-offset-transparent"
      >
        {mode === 'visual' ? (
          // Visual mode: TipTap rich-text WYSIWYG editor.
          // EditorContent connects the useEditor instance to the DOM.
          <EditorContent editor={editor} />
        ) : (
          // Code mode: editable HTML source view via the existing Monaco-based CodeEditor.
          // codeEditorValue is a local snapshot taken once on mode switch (formatted for readability).
          // It is updated by handleCodeEditorChange on each keystroke — changes are NOT re-derived
          // from TipTap, preventing the cursor-jump feedback loop.
          <CodeEditor defaultLanguage="html" value={codeEditorValue} onChange={handleCodeEditorChange} />
        )}

        {/* Image bubble menu — floating Popover positioned above the selected image.
            Uses a hidden anchor span that is dynamically positioned at the image's DOM location.
            The Popover is controlled: open when selectedImage is non-null AND mode is visual.
            This prevents the bubble menu from appearing in code mode. */}
        <Popover open={mode === 'visual' && !!selectedImage}>
          <PopoverAnchor asChild>
            <span ref={imageAnchorRef} className="absolute pointer-events-none" aria-hidden="true" />
          </PopoverAnchor>
          <PopoverContent side="top" align="center" sideOffset={8} className="w-auto p-1" onOpenAutoFocus={handlePopoverAutoFocus}>
            <HtmlEditorImageBubbleMenu selectedImage={selectedImage} onAction={handleToolbarAction} />
          </PopoverContent>
        </Popover>

        {/* Video bubble menu — floating Popover positioned above the selected video.
            Uses a hidden anchor span that is dynamically positioned at the video's DOM location.
            The Popover is controlled: open when selectedVideo is non-null AND mode is visual.
            This prevents the bubble menu from appearing in code mode. */}
        <Popover open={mode === 'visual' && !!selectedVideo}>
          <PopoverAnchor asChild>
            <span ref={videoAnchorRef} className="absolute pointer-events-none" aria-hidden="true" />
          </PopoverAnchor>
          <PopoverContent side="top" align="center" sideOffset={8} className="w-auto p-3" onOpenAutoFocus={handlePopoverAutoFocus}>
            <HtmlEditorVideoBubbleMenu selectedVideo={selectedVideo} onAction={handleToolbarAction} />
          </PopoverContent>
        </Popover>

        {/* Table bubble menu — floating Popover positioned above the selected table.
            Uses a hidden anchor span that is dynamically positioned at the table's DOM location.
            The Popover is controlled: open when selectedTable is non-null AND mode is visual.
            This prevents the bubble menu from appearing in code mode. */}
        <Popover open={mode === 'visual' && !!selectedTable}>
          <PopoverAnchor asChild>
            <span ref={tableAnchorRef} className="absolute pointer-events-none" aria-hidden="true" />
          </PopoverAnchor>
          <PopoverContent side="top" align="center" sideOffset={8} className="w-auto p-1" onOpenAutoFocus={handlePopoverAutoFocus}>
            <HtmlEditorTableBubbleMenu selectedTable={selectedTable} onAction={handleToolbarAction} />
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
};

HtmlEditor.displayName = 'HtmlEditor';

export default HtmlEditor;
