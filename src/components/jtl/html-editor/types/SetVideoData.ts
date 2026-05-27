import Alignment from './Alignment';

/**
 * Data payload for the insertVideo toolbar action.
 * Contains all attributes needed to insert a new video node.
 */
type SetVideoData = {
  /** URL of the video source. Required. */
  src: string;

  /** Horizontal alignment of the video within its container. */
  alignment?: Alignment;

  /** Explicit pixel width of the video. Omit to use the video's natural width. */
  width?: number;

  /** Explicit pixel height of the video. Omit to use the video's natural height. */
  height?: number;
};

export default SetVideoData;
