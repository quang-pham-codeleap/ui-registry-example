import React from 'react';
import { Root, Indicator } from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';
import IProgressProps from './IProgressProps';

/**
 * Progress component provides a visual representation of the progress of an operation.
 * @param props {@link IProgressProps} - The component props
 * @returns Progress component
 *
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   const [progress, setProgress] = useState(0);
 *
 *   const handleUpload = () => {
 *     // Simulate file upload with progress updates
 *     for (let percent = 0; percent <= 100; percent += 10) {
 *       await new Promise(resolve => setTimeout(resolve, 100));
 *       setProgress(percent);
 *     }
 *   };
 *
 *   return <Progress value={progress} />;
 * }
 * ```
 */
const Progress: React.FC<IProgressProps> = ({ className, percent, variant = 'default', ...props }) => {
  const progressBarColor = {
    default: 'bg-[var(--primary)]',
    highlight: 'bg-[var(--highlight)]',
  };

  return (
    <Root className={cn('relative h-2 w-full overflow-hidden rounded-full bg-[var(--secondary)]', className)} {...props}>
      <Indicator
        className={cn('h-full w-full flex-1 transition-all animate-pulse', progressBarColor[variant])}
        style={{ transform: `translateX(-${100 - (percent || 0)}%)` }}
      />
    </Root>
  );
};
Progress.displayName = Root.displayName;

export default Progress;
