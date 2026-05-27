import React from 'react';
import { cn } from '@/lib/utils';
import { alertVariants } from './types';
import { IAlertWrapperProps } from './interfaces';

const AlertWrapper: React.FC<IAlertWrapperProps & React.RefAttributes<HTMLDivElement>> = ({ ref, className, variant = 'default', ...props }) => {
  const styles = cn(
    'relative w-full border [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    'rounded-[var(--border-radius-lg)]',
    'px-5 py-4',
    alertVariants[variant],
    className,
  );
  return <div ref={ref} role="alert" className={styles} {...props} />;
};
AlertWrapper.displayName = 'AlertWrapper';

const AlertTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>> = ({ ref, className, ...props }) => (
  <h5
    ref={ref}
    className={cn(
      'text-[length:var(--typography-base-sizes-base-font-size)] leading-[var(--typography-base-sizes-base-line-height)] tracking-tight',
      className,
    )}
    {...props}
  />
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>> = ({
  ref,
  className,
  ...props
}) => (
  <div
    ref={ref}
    className={cn(
      'text-[length:var(--typography-base-sizes-small-font-size)] leading-[var(--typography-base-sizes-small-line-height)] [&_p]:leading-relaxed',
      className,
    )}
    {...props}
  />
);
AlertDescription.displayName = 'AlertDescription';

export { AlertWrapper, AlertTitle, AlertDescription };
