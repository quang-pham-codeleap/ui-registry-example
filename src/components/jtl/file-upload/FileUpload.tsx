import React, { useCallback, useMemo, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { generateCustomID } from '@/utils';
import { DropZone, File } from './components';
import { IFileWithStatus } from './interfaces';
import { FileStatus } from './types';
import IFileUploadProps from './IFileUploadProps';
import { ErrorMessage } from '../error-message';
import { cn } from '@/lib';

/**
 * FileUpload component provides a user interface for selecting and uploading files.
 * Can work in both controlled and uncontrolled modes:
 * - Controlled mode: when fileList and onChange props are provided
 * - Uncontrolled mode: when fileList and onChange props are not provided (component manages its own state)
 * @param props {@link IFileUploadProps} - The component props
 * @returns FileUpload component
 *
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   const [fileList, setFileList] = useState<IFileWithStatus[]>([]);
 *
 *   const onChange = ({fileList}: {fileList: IFileWithStatus[]}) => {
 *     setFileList(fileList);
 *   };
 *
 *   return (
 *     <FileUpload
 *       value={fileList}
 *       onChange={onChange}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Example for onUpload function when file is uploaded
 * function App() {
 *   const [fileList, setFileList] = useState<IFileWithStatus[]>([]);
 *
 *   // This function will be called when each file is uploaded
 *   // You can use this function to update the file list or perform other actions
 *   const onUpload = (file: IFileWithStatus, setProgress: (progress: number) => void) => {
 *     // Simulate file upload with progress updates
 *     for (let percent = 0; percent <= 100; percent += 10) {
 *       await new Promise(resolve => setTimeout(resolve, 100));
 *       setProgress(percent);
 *     }
 *   };
 *
 *   const onChange = ({fileList}: {fileList: IFileWithStatus[]}) => {
 *     setFileList(fileList);
 *   };
 *
 *   return <FileUpload allowMultiple={true} onUpload={onUpload} value={fileList} onChange={onChange} />;
 * }
 * ```
 */
const FileUpload: React.FC<IFileUploadProps> = ({
  maxSize = 5,
  allowMultiple = false,
  acceptedFileType,
  value: externalFileList,
  errorMessage,
  onChange,
  onRemove: externalOnRemove,
  onDownload: externalOnDownload,
  onUpload,
  isError = false,
}) => {
  // Internal state for uncontrolled mode
  const [internalFileList, setInternalFileList] = useState<IFileWithStatus[]>([]);

  // Use external file list if provided (controlled mode), otherwise use internal state (uncontrolled mode)
  const isControlled = externalFileList !== undefined;
  const fileList = isControlled ? externalFileList : internalFileList;
  const maxSizeInBytes = useMemo(() => maxSize * 1024 * 1024, [maxSize]);
  const filesCount = useMemo(
    () =>
      fileList.reduce(
        (acc, file) => {
          if (file.status === FileStatus.Success) {
            acc.success++;
          }

          if (file.status === FileStatus.Error) {
            acc.error++;
          }

          if (file.status === FileStatus.Uploading) {
            acc.uploading++;
          }
          return acc;
        },
        { success: 0, error: 0, uploading: 0 },
      ),
    [fileList],
  );

  /**
   * Updates a file's progress in the internal file list
   */
  const updateFileProgress = useCallback(
    (fileId: string, progress: number) => {
      setInternalFileList(prev => {
        const updatedFileList = prev.map(f => (f.id === fileId ? { ...f, status: FileStatus.Uploading, progress } : f));
        onChange?.({ newFiles: [], fileList: updatedFileList });
        return updatedFileList;
      });
    },
    [onChange],
  );

  /**
   * Marks a file as successfully uploaded
   */
  const markFileAsSuccess = useCallback(
    (fileId: string, url?: string) => {
      setInternalFileList(prev => {
        const updatedFileList = prev.map(f =>
          f.id === fileId
            ? {
                ...f,
                url: url || (f.file ? URL.createObjectURL(f.file) : undefined),
                status: FileStatus.Success,
                progress: 100,
              }
            : f,
        );
        onChange?.({ newFiles: [], fileList: updatedFileList });
        return updatedFileList;
      });
    },
    [onChange],
  );

  /**
   * Marks a file as failed to upload with error message
   */
  const markFileAsError = useCallback(
    (fileId: string, error: Error | unknown) => {
      setInternalFileList(prev => {
        const updatedFileList = prev.map(f =>
          f.id === fileId
            ? {
                ...f,
                status: FileStatus.Error,
                progress: 100,
                error: {
                  code: 'Upload failed',
                  message: error instanceof Error ? error.message : 'Something bad happened please try again',
                },
              }
            : f,
        );
        onChange?.({ newFiles: [], fileList: updatedFileList });
        return updatedFileList;
      });
    },
    [onChange],
  );

  // Set progress for a file
  const setProgress = useCallback(
    (fileId: string) => {
      return (progress: number) => {
        setInternalFileList(prev => {
          const updatedFileList = prev.map(f => (f.id === fileId ? { ...f, status: FileStatus.Uploading, progress } : f));
          onChange?.({ newFiles: [], fileList: updatedFileList });
          return updatedFileList;
        });
      };
    },
    [onChange],
  );

  // Internal upload handler for uncontrolled mode
  const handleUpload = useCallback(
    async (file: IFileWithStatus) => {
      try {
        if (onUpload) {
          const result = await onUpload(file, setProgress(file.id));
          markFileAsSuccess(result?.id || file.id, result?.url);
        } else {
          // Simulate file upload with progress updates
          for (let percent = 0; percent <= 100; percent += 10) {
            await new Promise(resolve => setTimeout(resolve, 100));
            updateFileProgress(file.id, percent);
          }

          await new Promise(resolve => setTimeout(resolve, 500));
          markFileAsSuccess(file.id);
        }
      } catch (error) {
        markFileAsError(file.id, error);
      }
    },
    [updateFileProgress, markFileAsSuccess, markFileAsError, onUpload, setProgress],
  );

  // Internal remove handler for uncontrolled mode
  const handleRemove = useCallback(
    (fileToRemove: IFileWithStatus) => {
      setInternalFileList(current => current.filter(file => file.id !== fileToRemove.id));
      externalOnRemove?.(fileToRemove);
    },
    [externalOnRemove],
  );

  // Normalize the accept prop into the Accept shape react-dropzone v14 expects.
  // String form (".pdf,.jpg") is grouped under an empty MIME key so react-dropzone
  // validates by extension only via attr-accept.
  const normalizedAccept = useMemo(() => {
    if (!acceptedFileType) return undefined;
    if (typeof acceptedFileType === 'object') return acceptedFileType;
    const extensions = acceptedFileType
      .split(',')
      .map(ext => ext.trim())
      .filter(Boolean)
      .map(ext => (ext.startsWith('.') ? ext : `.${ext}`));
    return extensions.length ? { '': extensions } : undefined;
  }, [acceptedFileType]);

  // Comma-separated list of allowed extensions, used in the invalid-type error message.
  const allowedExtensionsLabel = useMemo(() => {
    if (!normalizedAccept) return '';
    return Object.values(normalizedAccept).flat().join(', ');
  }, [normalizedAccept]);

  const handleDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Create new files with initial "uploading" status
      const newAcceptedFiles: IFileWithStatus[] = acceptedFiles.map(file => ({
        id: generateCustomID('file'),
        name: file.name,
        size: file.size,
        status: FileStatus.Uploading,
        file,
      }));

      // Handle rejected files
      const newRejectedFiles: IFileWithStatus[] = rejectedFiles.map(({ file, errors }) => {
        const error = errors[0];
        let mappedError: IFileWithStatus['error'] = error;
        if (error.code === 'file-too-large') {
          mappedError = {
            code: 'exceeds file size limit',
            message: `Please upload a file smaller than ${maxSize}MB.`,
          };
        } else if (error.code === 'file-invalid-type') {
          mappedError = {
            code: 'unsupported file type',
            message: allowedExtensionsLabel ? `Please upload one of: ${allowedExtensionsLabel}.` : 'This file type is not supported.',
          };
        }
        return {
          id: generateCustomID('file'),
          name: file.name,
          size: file.size,
          status: FileStatus.Error,
          error: mappedError,
        };
      });

      const updatedFileList = [...fileList, ...newAcceptedFiles, ...newRejectedFiles];

      // Update internal state if in uncontrolled mode
      setInternalFileList(updatedFileList);
      // Start upload process for new files
      newAcceptedFiles.forEach(file => handleUpload(file));
    },
    [maxSize, fileList, handleUpload, allowedExtensionsLabel],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // Enables opening file dialog when clicking the dropzone
    noClick: false,
    // Disables opening file dialog when pressing enter
    noKeyboard: true,
    // Indicates that user can upload multiple files at once.
    multiple: allowMultiple,
    // Maximum size of the file in bytes.
    maxSize: maxSizeInBytes,
    // Restrict selectable file types — invalid picks (including drag-drop and OS "All files" override) are routed to rejectedFiles.
    accept: normalizedAccept,
    // The function that will be called when the user drops files into the dropzone.
    onDrop: handleDrop,
    // Prevents the dropzone from being disabled when the user is uploading files.
    disabled: !allowMultiple && filesCount.uploading > 0,
  });

  const executeDownload = useCallback((url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.dispatchEvent(new MouseEvent('click'));

    // Clean up the URL object after download starts
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  }, []);

  const handleDownload = useCallback(
    async (file: IFileWithStatus) => {
      const handleDownloadInternal = async () => {
        if (file.file) {
          const downloadUrl = URL.createObjectURL(file.file);
          executeDownload(downloadUrl, file.name);
          return;
        } else if (file.url) {
          try {
            const response = await fetch(file.url);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const fileReader = new FileReader();

            fileReader.onload = () => {
              const arrayBuffer = fileReader.result;
              if (arrayBuffer) {
                const downloadUrl = URL.createObjectURL(new Blob([arrayBuffer]));
                executeDownload(downloadUrl, file.name);
              }
            };

            fileReader.readAsArrayBuffer(blob);
          } catch (error) {
            console.error('Error downloading file:', error);
          }
        }
      };

      // Use external download handler if provided, otherwise use internal handler
      if (externalOnDownload) {
        externalOnDownload(file);
      } else {
        handleDownloadInternal();
      }
    },
    [externalOnDownload, executeDownload],
  );

  return (
    <div className={cn('relative flex flex-col gap-3 w-[500px] max-w-full', isError && 'ring-1 ring-[var(--ring-error)] ring-offset-2 rounded-md')}>
      <input {...getInputProps({ role: 'textbox' })} />

      {(allowMultiple || filesCount.success < 1) && <DropZone {...getRootProps({ isDragActive, maxSize: maxSizeInBytes, errorMessage })} />}

      {!!fileList.length && (
        <div className="flex flex-col gap-3">
          {fileList.map(file => (
            <File key={file.id} file={file} onRemove={isControlled ? externalOnRemove : handleRemove} onDownload={handleDownload} />
          ))}
        </div>
      )}

      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default FileUpload;
