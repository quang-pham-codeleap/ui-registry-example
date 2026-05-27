/**
 * Data payload for the imageAlt toolbar action.
 * Used when the user edits the alt text of a selected image node.
 */
type SetImageAltData = {
  /** New alt text for the image node. Empty string for decorative images. */
  alt: string;
};

export default SetImageAltData;
