import { type Editor } from '@tiptap/react';
import getActiveActions from './getActiveActions';
import getActiveStyle from './getActiveStyle';
import getActiveFontSize from './getActiveFontSize';
import getActiveTextColor from './getActiveTextColor';
import getActiveBgColor from './getActiveBgColor';
import getActiveAlignment from './getActiveAlignment';
import getActiveLink from './getActiveLink';
import getSelectedText from './getSelectedText';
import getSelectedImage from './getSelectedImage';
import getSelectedTable from './getSelectedTable';
import getSelectedVideo from './getSelectedVideo';

/**
 * Reads every piece of toolbar-relevant state from the editor in one pass.
 * Called by onUpdate, onSelectionUpdate and onFocus so the derivation
 * logic lives in exactly one place.
 *
 * @param editor - The live TipTap editor instance.
 * @returns A flat object with every derived toolbar value.
 */
export default function getToolbarSnapshot(editor: Editor) {
  return {
    activeActions: getActiveActions(editor),
    selectedStyle: getActiveStyle(editor),
    selectedFontSize: getActiveFontSize(editor),
    selectedTextColor: getActiveTextColor(editor),
    selectedBgColor: getActiveBgColor(editor),
    selectedAlignment: getActiveAlignment(editor),
    // Link-related state for the Link popover action.
    // selectedLink contains href + text when cursor is on an existing link.
    // selectedText contains the currently selected text (for new link creation).
    selectedLink: getActiveLink(editor),
    selectedText: getSelectedText(editor),
    // Image-related state for the Image popover action.
    // selectedImage contains src, alt, and alignment when cursor is on an image node.
    selectedImage: getSelectedImage(editor),
    // Table-related state for the Table bubble menu.
    // selectedTable contains metadata when cursor is inside a table.
    selectedTable: getSelectedTable(editor),
    // Video-related state for the Video popover action.
    // selectedVideo contains src, alignment, width, and height when cursor is on a video node.
    selectedVideo: getSelectedVideo(editor),
  };
}
