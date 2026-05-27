/**
 * Enum representing the status of a file upload.
 *
 * @enum {string}
 * @property {string} uploading - The file is currently being uploaded.
 * @property {string} success - The file has been successfully uploaded.
 * @property {string} error - The file upload failed.
 */
enum FileStatus {
  Uploading = 'uploading',
  Success = 'success',
  Error = 'error',
}

export default FileStatus;
