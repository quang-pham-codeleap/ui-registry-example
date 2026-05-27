import { DropzoneRootProps } from 'react-dropzone';
import { FormError } from '@/types';

/**
 * Props for the DropZone component.
 * @interface IDropZoneProps
 */
export default interface IDropZoneProps extends DropzoneRootProps, FormError {
  /**
   * The maximum size of a file that can be uploaded in bytes.
   * @default Infinity
   */
  maxSize: number;

  /**
   * If true, the Dropzone is currently active (dragging over the component).
   * @default false
   */
  isDragActive: boolean;
}
