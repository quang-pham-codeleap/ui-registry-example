import type Alignment from './Alignment';

/**
 * Data payload for the imageAlignment toolbar action.
 * Used when the user changes the alignment of a selected image node.
 */
type SetImageAlignmentData = {
  /** New alignment value for the image node. */
  alignment: Alignment;
};

export default SetImageAlignmentData;
