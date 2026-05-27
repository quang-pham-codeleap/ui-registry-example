import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../../../button';
import IInputGroupButtonProps from './IInputGroupButtonProps';
import { useInputGroupContext, useInputGroupAddonContext } from '../../hooks';

/**
 * InputGroupButton component wraps the Button component with auto-adjusting size/style
 * to match input height. Supports both external and inline positioning.
 *
 * @param props {@link IInputGroupButtonProps} - Props for the InputGroupButton component
 * @returns The rendered InputGroupButton component
 *
 * @example
 * ```tsx
 * // External button on the right
 * <InputGroup>
 *   <InputGroupInput placeholder="Search..." />
 *   <InputGroupButton label="Search" />
 * </InputGroup>
 * ```
 */
const InputGroupButton: React.FC<IInputGroupButtonProps> = ({
  label,
  icon,
  iconPosition = 'left',
  variant = 'default',
  disabled = false,
  isLoading = false,
  onClick,
}) => {
  const { side, inline } = useInputGroupAddonContext();
  const { size } = useInputGroupContext();

  /**
   * Determine button size based on inline prop and InputGroup size
   */
  const buttonSize = useMemo(() => {
    return inline ? 'xs' : size;
  }, [inline, size]);

  /**
   * Determine button variant - inline buttons typically use ghost variant
   */
  const buttonVariant = useMemo(() => {
    return inline ? 'ghost' : variant;
  }, [inline, variant]);

  /**
   * External button wrapper styles with border radius override
   */
  const externalWrapperStyles = cn(
    '[&_button]:rounded-none',
    side === 'left' && '[&_button]:rounded-l-[var(--border-radius-md)]',
    side === 'right' && '[&_button]:rounded-r-[var(--border-radius-md)]',
  );

  return (
    <div className={cn(inline ? '' : externalWrapperStyles)}>
      <Button
        label={label}
        icon={icon}
        iconPosition={iconPosition}
        variant={buttonVariant}
        size={buttonSize}
        disabled={disabled}
        isLoading={isLoading}
        onClick={onClick}
      />
    </div>
  );
};

InputGroupButton.displayName = 'InputGroupButton';

export default InputGroupButton;
