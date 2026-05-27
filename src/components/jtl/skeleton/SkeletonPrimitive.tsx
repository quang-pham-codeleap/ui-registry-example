import { cn } from '@/lib/utils';

const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="skeleton" className={cn('bg-[var(--skeleton)] animate-pulse rounded-[var(--border-radius-xl)]', className)} {...props} />;
};

export { Skeleton };
