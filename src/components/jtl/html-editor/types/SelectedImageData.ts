import Alignment from './Alignment';

/**
 * Represents image information extracted from the editor.
 */
type SelectedImageData = {
  /** The src URL of the image */
  src: string;
  /** The alt text of the image */
  alt: string;
  /** The alignment of the image: 'left', 'center', 'right' */
  alignment: Alignment;
  /** The width of the image in pixels, or null if not explicitly set */
  width: number | null;
  /** The height of the image in pixels, or null if not explicitly set */
  height: number | null;
};

export default SelectedImageData;
