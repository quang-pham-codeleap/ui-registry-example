import { PropsWithChildren } from 'react';
import { FileStatus } from '../types';
import { cn } from '@/lib/utils';
import { Progress } from '../../progress';
import { Icon } from '../../icon';
import { formatFileSize } from '../utils';

const FileWrapper: React.FC<PropsWithChildren<{ status: FileStatus }>> = ({ status, children }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        'border rounded-[var(--border-radius-lg)]',
        'font-[family-name:var(--typography-font-family-font-sans)]',
        status === 'uploading' && 'px-3 py-3.5 bg-[var(--card)] border-[var(--border)]',
        status === 'success' && 'px-3 py-3.5 bg-[var(--card)] border-[var(--border)]',
        status === 'error' && 'px-5 py-4 bg-[var(--danger-background)] border-[var(--danger-border)] text-[var(--danger-text)]',
      )}
    >
      {children}
    </div>
  );
};

const FileHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        'flex-1 break-all',
        'text-[length:var(--typography-base-sizes-small-font-size)]',
        'font-semibold',
        'leading-[var(--typography-base-sizes-small-line-height)]',
      )}
    >
      {children}
    </div>
  );
};

const FileUploadProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="flex items-center gap-3">
      <Progress percent={progress} className="flex-1" />
      <div
        className={cn(
          'text-[length:var(--typography-base-sizes-extra-small-font-size)]',
          'font-normal',
          'leading-[var(--typography-base-sizes-extra-small-line-height)]',
        )}
      >
        {progress}%
      </div>
    </div>
  );
};

const FileSizeLabel: React.FC<{ size: number }> = ({ size }) => {
  return (
    <div
      className={cn(
        'text-[length:var(--typography-base-sizes-extra-small-font-size)]',
        'font-normal',
        'leading-[var(--typography-base-sizes-extra-small-line-height)]',
      )}
    >
      {formatFileSize(size)}
    </div>
  );
};

const FileUploadSuccessIcon = () => {
  return (
    <div
      className={cn(
        'size-9 flex items-center justify-center p-1',
        'rounded-[var(--border-radius-md)] bg-[var(--success-background)]',
        'text-[var(--success-text)]',
      )}
    >
      <Icon name="File" size={16} />
    </div>
  );
};

export { FileWrapper, FileHeader, FileUploadProgress, FileSizeLabel, FileUploadSuccessIcon };
