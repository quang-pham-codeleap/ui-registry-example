import { HandleToolbarAction, SelectedVideoData } from '../../types';

/**
 * Props for the HtmlEditorVideoAction component.
 *
 * This component renders a popover action button in the HTML editor toolbar.
 * When clicked, it opens a popover containing a form to insert or edit a video embed.
 */
export default interface IHtmlEditorVideoActionProps {
  /**
   * Callback fired when the user submits the video form.
   * Follows the {@link HandleToolbarAction} contract and is invoked with:
   *   - the action string (e.g. "insertVideo")
   *   - a payload object containing the video data (e.g. { src, alignment }).
   */
  onAction?: HandleToolbarAction;

  /**
   * The currently selected video node data, if the cursor is on a video.
   * When non-null, the form will pre-fill with existing video attributes.
   * When null, the form starts empty for creating a new video.
   */
  selectedVideo?: SelectedVideoData | null;
}
