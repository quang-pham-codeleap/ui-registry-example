import { ShapeVariant } from './types';

/**
 * Interface for Avatar component props
 */
export default interface IAvatarProps {
  /**
   * URL of the image to be displayed in the avatar
   */
  imageUrl?: string;

  /**
   * Text to be displayed as fallback when image is not available
   */
  text?: string;

  /**
   * Shape of the avatar
   * @default 'circle'
   */
  shape?: ShapeVariant;
}
