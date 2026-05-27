import React, { memo } from 'react';
import { Button } from '../../button';
import { Icon } from '../../icon';
import { IFileProps } from '../interfaces';
import { cn } from '@/lib/utils';
import { FileStatus } from '../types';
import { FileHeader, FileSizeLabel, FileUploadProgress, FileUploadSuccessIcon, FileWrapper } from './FilePrimitive';

/**
 * File component represents a single file that is being uploaded or has been uploaded.
 * @param props - The component props
 * @returns File component
 */
const File: React.FC<IFileProps> = ({ file, onDownload, onRemove }) => {
  const { name, url, size, status, error, progress } = file;

  if (status === FileStatus.Error) {
    return (
      <FileWrapper status={status}>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <Icon name="CircleAlert" size={16} />
            <FileHeader>
              {name} {error && error.code}
            </FileHeader>
            <Icon name="X" size={16} onClick={() => onRemove?.(file)} />
          </div>
          <div
            className={cn(
              'pl-8',
              'text-[length:var(--typography-base-sizes-small-font-size)]',
              'font-normal',
              'leading-[var(--typography-base-sizes-small-line-height)]',
            )}
          >
            {error && error.message}
          </div>
        </div>
      </FileWrapper>
    );
  }

  if (status === FileStatus.Success) {
    return (
      <FileWrapper status={status}>
        <div className="flex items-center justify-start gap-4">
          <FileUploadSuccessIcon />
          <div className="flex-1">
            <FileHeader>{name}</FileHeader>
            <FileSizeLabel size={size} />
          </div>
          <div className="flex items-center gap-2">
            {url && <Button type="button" variant="ghost" size="iconSm" icon="Download" onClick={() => onDownload?.(file)} />}
            <Button type="button" variant="ghost" size="iconSm" icon="Trash" onClick={() => onRemove?.(file)} />
          </div>
        </div>
      </FileWrapper>
    );
  }

  return (
    <FileWrapper status={status}>
      <div className="flex items-center justify-start gap-4">
        <div className="flex-1">
          <FileHeader>{name}</FileHeader>
          <FileSizeLabel size={size} />
        </div>
      </div>
      {status === 'uploading' && progress && <FileUploadProgress progress={progress} />}
    </FileWrapper>
  );
};

export default memo(File);
