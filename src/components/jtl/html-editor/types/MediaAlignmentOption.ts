import Alignment from './Alignment';
import TextAlignmentOption from './TextAlignmentOption';
/**
 * Represents a media alignment option for videos in the HTML editor.
 * Used in the video bubble menu to allow users to change video alignment.
 */
type MediaAlignmentOption = Omit<TextAlignmentOption, 'value'> & {
  value: Alignment;
};

export default MediaAlignmentOption;
