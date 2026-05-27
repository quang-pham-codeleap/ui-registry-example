import React from 'react';
import { Root as CheckboxPrimitiveRoot, Indicator as CheckboxPrimitiveIndicator } from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import ICheckboxIndicatorProps from './ICheckboxIndicatorProps';

const CheckboxIndicator: React.FC<ICheckboxIndicatorProps & Pick<React.ComponentPropsWithRef<typeof CheckboxPrimitiveRoot>, 'ref'>> = ({
  ref,
  indeterminate,
  checked, // Controlled state prop
  defaultChecked, // Uncontrolled state prop
  onChange, // Handler for state changes
  disabled,
  isError,
  ...props
}) => {
  // Determine the state to pass to Radix Root's 'checked' prop.
  // If indeterminate is true and checked is false, the state is 'indeterminate'.
  // Otherwise, pass the 'checked' prop value (true, false, or undefined).
  // Radix handles the controlled/uncontrolled logic based on whether 'checked' is defined.
  const effectiveCheckedState = indeterminate && !checked ? 'indeterminate' : checked;

  const isIndeterminate = effectiveCheckedState === 'indeterminate';
  const Icon = isIndeterminate && !checked ? Minus : Check;

  return (
    <CheckboxPrimitiveRoot
      ref={ref}
      checked={effectiveCheckedState} // Pass the determined state
      defaultChecked={defaultChecked} // Pass defaultChecked for uncontrolled behavior
      onCheckedChange={onChange} // Pass handler
      disabled={disabled}
      className={cn(
        'peer h-4 w-4 shrink-0',
        'rounded-[var(--border-radius-sm)] ring-offset-[var(--background)] cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        // Apply styles based on the effective state (checked, indeterminate, unchecked)
        'data-[state=checked]:bg-[var(--highlight)] data-[state=checked]:text-[var(--primary-foreground)]',
        'data-[state=indeterminate]:bg-[var(--highlight)] data-[state=indeterminate]:text-[var(--primary-foreground)]',
        'data-[state=unchecked]:border data-[state=unchecked]:border-[var(--secondary-foreground)] data-[state=unchecked]:opacity-50 data-[state=unchecked]:text-[var(--secondary-foreground)]',
        // Error state — red outline ring to indicate validation failure
        isError && 'ring-1 ring-[var(--ring-error)] ring-offset-1',
      )}
      {...props}
    >
      <CheckboxPrimitiveIndicator className={cn('flex items-center justify-center text-current')}>
        <Icon className="h-4 w-4 text-[var(--primary-foreground)]" />
      </CheckboxPrimitiveIndicator>
    </CheckboxPrimitiveRoot>
  );
};
CheckboxIndicator.displayName = 'CheckboxIndicator';

export default CheckboxIndicator;
