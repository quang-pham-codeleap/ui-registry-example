import { HandleToolbarAction, SelectedVideoData } from '../../types';

/**
 * Props for the HtmlEditorVideoBubbleMenu component.
 * Shown when a video node is selected in the editor.
 */
export default interface IHtmlEditorVideoBubbleMenuProps {
  /**
   * The currently selected video data (src, alignment, width, height).
   * When null, the bubble menu should not render.
   */
  selectedVideo: SelectedVideoData | null;

  /**
   * Callback fired when the user interacts with the bubble menu.
   * Emits actions like:
   *   - 'videoAlignment:center'
   *   - 'deleteVideo'
   */
  onAction?: HandleToolbarAction;
}
