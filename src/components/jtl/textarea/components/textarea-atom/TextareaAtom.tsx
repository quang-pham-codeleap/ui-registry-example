import React from 'react';
import { cn } from '@/lib/utils';
import ITextareaAtomProps from './ITextareaAtomProps';

/**
 * TextareaAtom component provides a base textarea input with consistent styling
 * @param props - Standard textarea props plus optional className for additional styling
 * @param ref - Forwarded ref to access the underlying textarea element
 */
const TextareaAtom: React.FC<ITextareaAtomProps> = ({ ref, className, error, ...props }) => {
  const shouldApplyDefaultMinHeight = props.rows === undefined;

  return (
    <div
      className={cn(
        'relative w-full outline-(length:--border-width-border-1) outline-transparent rounded-[6px] transition-all transform',
        error ? 'outline-[var(--ring-error)]' : 'focus-within:outline-[var(--ring)] focus-within:outline-offset-2',
      )}
    >
      <textarea
        className={cn(
          'flex',
          shouldApplyDefaultMinHeight && 'min-h-[80px]',
          'w-full',
          'gap-[10px]',
          'rounded-[var(--border-radius-md)]',
          'border',
          'border-[var(--input)]',
          'bg-[var(--background)]',
          'px-3',
          'py-2',
          'text-[length:var(--typography-base-sizes-small-font-size)]',
          'text-[var(--foreground)]',
          'font-[family-name:var(--typography-font-family-font-sans)]',
          'font-normal',
          'leading-[var(--typography-base-sizes-small-line-height)]',
          'placeholder:text-[var(--muted-foreground)]',
          'placeholder:font-normal',
          'outline-none',
          'disabled:opacity-50',
          'disabled:cursor-not-allowed',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
};
TextareaAtom.displayName = 'TextareaAtom';

export default TextareaAtom;
