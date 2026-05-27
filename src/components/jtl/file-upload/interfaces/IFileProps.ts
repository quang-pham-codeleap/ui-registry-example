import IFileUploadProps from '../IFileUploadProps';
import IFileWithStatus from './IFileWithStatus';

/**
 * Props for File component
 * @interface IFileProps
 * @extends {Pick<IFileUploadProps, 'onChange' | 'onUpload' | 'onDownload' | 'onRemove'>}
 */
export default interface IFileProps extends Pick<IFileUploadProps, 'onDownload' | 'onRemove'> {
  /**
   * The file data
   */
  file: IFileWithStatus;
}
