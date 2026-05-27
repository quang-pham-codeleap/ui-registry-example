import React, { useCallback } from 'react';
import { ToggleGroup, ToggleGroupItem } from '../../../toggle-group';
import { Tooltip } from '../../../tooltip';
import IHtmlEditorToolbarProps from './IHtmlEditorToolbarProps';
import HtmlEditorMode from '../../types/HtmlEditorMode';
import { ToolbarAction } from '../../types';
import {
  HtmlEditorTypographyAction,
  HtmlEditorFontSizeAction,
  HtmlEditorTextColorAction,
  HtmlEditorTextAlignmentAction,
  HtmlEditorLinkAction,
  HtmlEditorTableAction,
  HtmlEditorImageAction,
  HtmlEditorVideoAction,
  HtmlEditorSearchAction,
  HtmlEditorReplaceAction,
} from '..';
import { LIST_ACTIONS, STYLE_ACTIONS } from '../../constants';
import { Box } from '../../../box';

/**
 * HtmlEditorToolbar — pure UI toolbar for the HTML Editor.
 *
 * Renders 9 toggle-button groups:
 *   Mode | History | Text Format | Style | Lists | Link+Rule | Table+Quote | Media | Search
 *
 * The toolbar has no direct editor dependency. It emits two event types:
 * - `onModeChange` — fired by the Visual/Code mode toggle (single-select group).
 * - `onToolbarAction` — fired by every other button, carrying the action identifier string.
 *
 * Active formatting state (e.g. bold is ON) is driven by the `activeActions` prop,
 * which maps directly to Radix ToggleGroup's controlled `value` array.
 *
 * @param props {@link IHtmlEditorToolbarProps}
 */
const HtmlEditorToolbar: React.FC<IHtmlEditorToolbarProps> = ({
  mode,
  onModeChange,
  activeActions,
  onToolbarAction,
  selectedStyle,
  selectedFontSize,
  selectedTextColor,
  selectedBgColor,
  colorPalette,
  selectedAlignment,
  selectedLink,
  selectedText,
  selectedImage,
  selectedVideo,
  imagePopoverOpen,
  onImagePopoverClose,
  searchTerm,
  searchResults,
  searchResultIndex,
}) => {
  // --- Shared click handler for all action buttons ---
  // Reads the action name from a data-action attribute on the button element.
  // This avoids creating N separate closures per render.
  // All data-action values are data-less ToolbarAction literals (undo, bold, etc.) — safe to assert.
  const handleDataActionClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const action = event.currentTarget.dataset.action;
      if (action) onToolbarAction(action as ToolbarAction);
    },
    [onToolbarAction],
  );

  // --- Mode toggle onChange ---
  // The single-select ToggleGroup fires onChange with the selected value string.
  const handleModeChange = useCallback(
    (value: string) => {
      onModeChange(value as HtmlEditorMode);
    },
    [onModeChange],
  );

  // --- Derive controlled values for toggleable groups from activeActions ---
  const styleValues = activeActions.filter(a => STYLE_ACTIONS.includes(a));
  const listValues = activeActions.filter(a => LIST_ACTIONS.includes(a));

  return (
    <Box role="toolbar" aria-label="Formatierung" className="flex flex-wrap items-center gap-2 bg-[var(--background)] w-fit">
      {/* Group 1: Mode toggle — single-select, drives editor mode */}
      {/* rovingFocus={false} — disables Radix roving tabindex so every button gets its own tab stop */}
      <ToggleGroup type="single" value={mode} onChange={handleModeChange} shape="rounded" rovingFocus={false}>
        <Tooltip content="Visuell" asChild>
          <ToggleGroupItem value="visual" icon="Eye" label="Visuell" aria-label="Visuell" />
        </Tooltip>
        <Tooltip content="Code" asChild>
          <ToggleGroupItem value="code" icon="CodeXml" label="Code" aria-label="Code" />
        </Tooltip>
      </ToggleGroup>

      {/* Group 2: History — action-only, never visually pressed */}
      <ToggleGroup type="multiple" shape="rounded" rovingFocus={false}>
        <Tooltip content="Rückgängig" asChild>
          <ToggleGroupItem value="undo" icon="Undo" aria-label="Rückgängig" data-action="undo" onClick={handleDataActionClick} />
        </Tooltip>
        <Tooltip content="Wiederholen" asChild>
          <ToggleGroupItem value="redo" icon="Redo" aria-label="Wiederholen" data-action="redo" onClick={handleDataActionClick} />
        </Tooltip>
      </ToggleGroup>

      {/* Group 3: Text Format — popover triggers (typography, fontSize) + alignment buttons */}
      <ToggleGroup type="multiple" shape="rounded" rovingFocus={false}>
        <HtmlEditorTypographyAction onAction={onToolbarAction} selectedStyle={selectedStyle} />
        <HtmlEditorFontSizeAction onAction={onToolbarAction} selectedFontSize={selectedFontSize} />
        <HtmlEditorTextAlignmentAction onAction={onToolbarAction} selectedAlignment={selectedAlignment} />
        <HtmlEditorTextColorAction
          onAction={onToolbarAction}
          selectedTextColor={selectedTextColor}
          selectedBgColor={selectedBgColor}
          colorPalette={colorPalette}
        />
      </ToggleGroup>

      {/* Group 4: Style — toggleable, active state driven by activeActions */}
      <ToggleGroup type="multiple" value={styleValues} shape="rounded" rovingFocus={false}>
        <Tooltip content="Fett" asChild>
          <ToggleGroupItem value="bold" icon="Bold" aria-label="Fett" data-action="bold" onClick={handleDataActionClick} />
        </Tooltip>
        <Tooltip content="Kursiv" asChild>
          <ToggleGroupItem value="italic" icon="Italic" aria-label="Kursiv" data-action="italic" onClick={handleDataActionClick} />
        </Tooltip>
        <Tooltip content="Unterstrichen" asChild>
          <ToggleGroupItem value="underline" icon="Underline" aria-label="Unterstrichen" data-action="underline" onClick={handleDataActionClick} />
        </Tooltip>
        <Tooltip content="Durchgestrichen" asChild>
          <ToggleGroupItem
            value="strikethrough"
            icon="Strikethrough"
            aria-label="Durchgestrichen"
            data-action="strikethrough"
            onClick={handleDataActionClick}
          />
        </Tooltip>
      </ToggleGroup>

      {/* Group 5: Lists — toggleable, active state driven by activeActions */}
      <ToggleGroup type="multiple" value={listValues} shape="rounded" rovingFocus={false}>
        <Tooltip content="Aufzählungsliste" asChild>
          <ToggleGroupItem value="bulletList" icon="List" aria-label="Aufzählungsliste" data-action="bulletList" onClick={handleDataActionClick} />
        </Tooltip>
        <Tooltip content="Nummerierte Liste" asChild>
          <ToggleGroupItem
            value="numberedList"
            icon="ListOrdered"
            aria-label="Nummerierte Liste"
            data-action="numberedList"
            onClick={handleDataActionClick}
          />
        </Tooltip>
      </ToggleGroup>

      {/* Group 6: Link (popover) + Horizontal Rule */}
      <ToggleGroup type="multiple" shape="rounded" rovingFocus={false}>
        {/* Link action receives URL from existing link or empty for new links.
            Display text comes from existing link text or current selection. */}
        <HtmlEditorLinkAction onAction={onToolbarAction} selectedUrl={selectedLink?.url} selectedText={selectedLink?.text ?? selectedText} />
        <Tooltip content="Trennlinie" asChild>
          <ToggleGroupItem
            value="horizontalRule"
            icon="SeparatorHorizontal"
            aria-label="Trennlinie"
            data-action="horizontalRule"
            onClick={handleDataActionClick}
          />
        </Tooltip>
      </ToggleGroup>

      {/* Group 7: Table (button) + Quote */}
      <ToggleGroup type="multiple" shape="rounded" rovingFocus={false}>
        <HtmlEditorTableAction onAction={onToolbarAction} />
        <Tooltip content="Zitat" asChild>
          <ToggleGroupItem value="blockquote" icon="Quote" aria-label="Zitat" data-action="blockquote" onClick={handleDataActionClick} />
        </Tooltip>
      </ToggleGroup>

      {/* Group 8: Media insert — both are popover actions */}
      <ToggleGroup type="multiple" shape="rounded" rovingFocus={false}>
        <HtmlEditorImageAction
          onAction={onToolbarAction}
          selectedImage={selectedImage}
          open={imagePopoverOpen}
          onOpenChange={open => !open && onImagePopoverClose?.()}
        />
        <HtmlEditorVideoAction onAction={onToolbarAction} selectedVideo={selectedVideo} />
      </ToggleGroup>

      {/* Group 9: Search / Replace — both are popover actions */}
      <ToggleGroup type="multiple" shape="rounded" rovingFocus={false}>
        <HtmlEditorSearchAction
          onAction={onToolbarAction}
          searchTerm={searchTerm}
          searchResults={searchResults}
          searchResultIndex={searchResultIndex}
        />
        <HtmlEditorReplaceAction
          onAction={onToolbarAction}
          searchTerm={searchTerm}
          searchResults={searchResults}
          searchResultIndex={searchResultIndex}
        />
      </ToggleGroup>
    </Box>
  );
};

HtmlEditorToolbar.displayName = 'HtmlEditorToolbar';

export default HtmlEditorToolbar;
