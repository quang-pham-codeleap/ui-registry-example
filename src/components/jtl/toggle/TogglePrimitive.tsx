import React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';

const Toggle = ({
  className,
  ref,
  onPressedChange,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>, 'onPressedChange'> &
  React.RefAttributes<HTMLButtonElement> & {
    onPressedChange?: (pressed: boolean) => void;
  }) => <TogglePrimitive.Root ref={ref} onPressedChange={onPressedChange} className={className} {...props} />;

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
