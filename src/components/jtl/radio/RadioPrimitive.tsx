import React from 'react';
import { Root, Item, Indicator } from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * RadioAtom component that provides the base radio group functionality
 */
const RadioContainer: React.FC<React.ComponentPropsWithRef<typeof Root>> = ({ ref, className, ...props }) => {
  return <Root className={cn('flex flex-col gap-2', props.disabled ? 'opacity-50 cursor-not-allowed' : '', className)} {...props} ref={ref} />;
};
RadioContainer.displayName = Root.displayName;

/**
 * RadioItem component that represents an individual radio button
 */
const RadioItem: React.FC<React.ComponentPropsWithRef<typeof Item>> = ({ ref, className, ...props }) => {
  return (
    <Item
      ref={ref}
      className={cn(
        'flex items-center justify-center aspect-square h-4 w-4 rounded-full border text-primary shadow disabled:cursor-not-allowed disabled:opacity-50',
        'ring-offset-[var(--background)]',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
        'data-[state=checked]:border-[var(--primary)] data-[state=unchecked]:border-[var(--foreground)] data-[state=unchecked]:opacity-50',
        className,
      )}
      {...props}
    >
      <Indicator className="h-2.5 w-2.5 flex items-center justify-center data-[state=checked]:text-[var(--primary)] data-[state=unchecked]:text-[var(--popover-foreground)]">
        <Circle className="h-2.5 w-2.5 fill-[var(--primary)]" />
      </Indicator>
    </Item>
  );
};
RadioItem.displayName = Item.displayName;

export { RadioContainer, RadioItem };
