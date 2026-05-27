import Alignment from './Alignment';

/**
 * Data structure representing a selected video node in the HTML editor.
 * Used to track the currently selected video's properties for editing in the video bubble menu.
 */
type SelectedVideoData = {
  /** The video source URL (can be direct video file or embed URL like YouTube/Vimeo). */
  src: string;
  /** The alignment of the video: 'left', 'center', or 'right'. */
  alignment: Alignment;
  /** The explicit width of the video in pixels, or null if using default size. */
  width: number | null;
  /** The explicit height of the video in pixels, or null if using default size. */
  height: number | null;
};

export default SelectedVideoData;
