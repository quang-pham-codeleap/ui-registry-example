import React, { memo } from 'react';
import { Icon } from '../../icon';
import { cn } from '@/lib/utils';
import { IDropZoneProps } from '../interfaces';
import { formatFileSize } from '../utils';

/**
 * DropZone component is a visual representation of a drop area for files.
 * It handles drag and drop events and prevents default browser behavior.
 * @param props - The component props
 * @returns DropZone component
 */
const DropZone: React.FC<IDropZoneProps> = ({ isDragActive, maxSize, errorMessage, ...props }) => {
  return (
    <div
      className={cn(
        'w-[500px] max-w-full flex flex-col items-center gap-6 p-6',
        'bg-[var(--background)] border border-dashed border-[var(--border)] rounded-[var(--border-radius-lg)]',
        'font-[family-name:var(--typography-font-family-font-sans)]',
        'transition-all transform duration-200',
        'hover:cursor-pointer',
        isDragActive && 'bg-[var(--info-background)]',
        errorMessage && 'border-[var(--danger-border)]',
      )}
      {...props}
    >
      <div
        className={cn(
          'size-12 flex items-center justify-center p-2',
          'border border-[var(--border)] rounded-[var(--border-radius-md)] bg-[var(--card)] shadow-sm',
        )}
      >
        <Icon name="Upload" size={24} />
      </div>
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            'text-center',
            'text-[length:var(--typography-base-sizes-small-font-size)]',
            'font-semibold',
            'leading-[var(--typography-base-sizes-small-line-height)]',
          )}
        >
          Drop your file here or <span className="text-[var(--primary)]">browse</span>
        </div>
        <div
          className={cn(
            'text-center',
            'text-[var(--muted-foreground)]',
            'text-[length:var(--typography-base-sizes-small-font-size)]',
            'font-normal',
            'leading-[var(--typography-base-sizes-small-line-height)]',
            'whitespace-pre',
          )}
        >
          {`Pick a file up to ${formatFileSize(maxSize)}.`}
        </div>
      </div>
    </div>
  );
};

export default memo(DropZone);
