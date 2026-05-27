import { Accept } from 'react-dropzone';
import { FieldAriaProps, FormError } from '@/types';
import { IFileWithStatus } from './interfaces';

/**
 * Props for FileUpload component
 * @interface IFileUploadProps
 */
export default interface IFileUploadProps extends FormError, FieldAriaProps {
  /**
   * Accepted file types for upload. Files that do not match are rejected with a
   * `file-invalid-type` error.
   *
   * Accepts either:
   * - A comma-separated extension string, e.g. `'.pdf,.jpg,.png'`.
   * - A react-dropzone `Accept` object keyed by MIME type, e.g.
   *   `{ 'image/png': ['.png'], 'application/pdf': ['.pdf'] }`.
   *   Use the object form when the MIME type matters (e.g. blocking files
   *   whose extension lies about their content).
   */
  acceptedFileType?: string | Accept;

  /**
   * Maximum file size in megabytes
   * @default 5
   */
  maxSize?: number;

  /**
   * Allow multiple file uploads
   * @default false
   */
  allowMultiple?: boolean;

  /**
   * Current files with their status
   */
  value?: IFileWithStatus[];

  /**
   * Optional callback will be called when files are dragged and dropped into the upload area
   * @param info.newFiles new files that are being added to the list
   * @param info.fileList current list of files
   */
  onChange?: (info: { newFiles: IFileWithStatus[]; fileList: IFileWithStatus[] }) => void;

  /**
   * Optional callback when a file needs to be downloaded
   */
  onDownload?: (file: IFileWithStatus) => void;

  /**
   * Optional callback when a file needs to be removed
   */
  onRemove?: (file: IFileWithStatus) => void;

  /**
   * Optional callback when a file needs to be uploaded
   */
  onUpload?: (file: IFileWithStatus, setProgress: (progress: number) => void) => Promise<IFileWithStatus> | void;
}
