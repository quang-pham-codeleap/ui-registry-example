import type Alignment from './Alignment';

/**
 * Data payload for the insertImage toolbar action.
 * Contains all attributes needed to insert a new image node.
 */
type SetImageData = {
  /** URL of the image source. Required. */
  src: string;

  /** Accessible alt text for the image. Empty string for decorative images. */
  alt?: string;

  /** Horizontal alignment of the image within its container. */
  alignment?: Alignment;

  /** Explicit pixel width of the image. Omit to use the image's natural width. */
  width?: number;

  /** Explicit pixel height of the image. Omit to use the image's natural height. */
  height?: number;
};

export default SetImageData;
