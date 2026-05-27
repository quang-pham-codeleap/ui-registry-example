import React from 'react';
import { cn } from '@/lib/utils';
import { Toggle as TogglePrimitive } from './TogglePrimitive';
import IToggleProps from './IToggleProps';
import { toggleSizes, toggleVariants } from './types';
import { ErrorMessage } from '../error-message';
import { IconExtend } from '../icon/components';

/**
 * Toggle component for toggling between two states
 * @param props {@link IToggleProps} - The props for the Toggle component
 * @returns A Toggle component
 *
 * @example
 * ```tsx
 * function App() {
 *   const [value, setValue] = useState(true);
 *
 *   return (
 *     <Toggle
 *       label="Bold"
 *       value={value}
 *       onChange={setValue}
 *     />
 *   )
 * }
 * ```
 */
const Toggle: React.FC<IToggleProps> = ({
  variant = 'default',
  size = 'default',
  icon,
  label,
  value,
  isDisabled,
  onChange,
  errorMessage,
  ref,
  ...props
}) => {
  // remove error and errorMessage from props
  return (
    <div className="relative">
      <TogglePrimitive
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--accent)] data-[state=on]:text-[var(--foreground)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
          toggleVariants[variant],
          toggleSizes[size],
        )}
        pressed={value}
        disabled={isDisabled}
        onPressedChange={onChange}
        {...props}
      >
        {icon && <IconExtend icon={icon} size={16} />}
        {label}
      </TogglePrimitive>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
Toggle.displayName = 'Toggle';

export default Toggle;
