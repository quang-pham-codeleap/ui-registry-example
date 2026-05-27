import { FileError } from 'react-dropzone';
import { FileStatus } from '../types';

/**
 * Represents a file with its status.
 * @interface IFileWithStatus
 */
export default interface IFileWithStatus {
  /**
   * Unique identifier of the file
   */
  id: string;

  /**
   * Name of the file
   */
  name: string;

  /**
   * Optional URL of the uploaded file
   */
  url?: string;

  /**
   * Size of the file in bytes
   */
  size: number;

  /**
   * Status of the file (uploading, success, error)
   */
  status: FileStatus;

  /**
   * Array of errors that occurred during the upload process
   */
  error?: FileError;

  /**
   * Progress of the file upload.
   * The value is between 0 and 100.
   * If the file is not uploading, the value is 0.
   */
  progress?: number;

  /**
   * Original file that was uploaded
   */
  file?: File;
}
