import React, { Fragment } from 'react';
import {
  Root,
  Group,
  Value,
  Content,
  Portal,
  Viewport,
  ScrollUpButton,
  ScrollDownButton,
  Trigger,
  Label,
  Item,
  ItemIndicator,
  ItemText,
  Icon as WrapIcon,
} from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import { Icon } from '../icon';

const Select = Root;

const SelectGroup = Group;

const SelectValue = Value;

/**
 * Select Trigger where handle user interaction like click, focus, hover
 */
const SelectTrigger: React.FC<React.ComponentPropsWithRef<typeof Trigger> & { size?: 'default' | 'sm' }> = ({
  ref,
  className,
  children,
  size = 'default',
  ...props
}) => (
  <Trigger
    ref={ref}
    className={cn(
      'group flex items-center justify-between w-full whitespace-nowrap border ring-offset-2 ring-offset-[var(--background)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)] disabled:cursor-not-allowed [&>span]:line-clamp-1',
      'h-10',
      'px-3',
      'py-2',
      'bg-[var(--background)]',
      'border-[var(--input)]',
      'rounded-[var(--border-radius-md)]',
      'text-[var(--foreground)]',
      'text-[length:var(--typography-base-sizes-small-font-size)]',
      'placeholder:text-[var(--foreground)]',
      'disabled:opacity-50',
      !props.disabled && 'hover:cursor-pointer',
      size === 'sm' && 'h-9',
      className,
    )}
    {...props}
  >
    {children}
    <WrapIcon asChild>
      {/* Rotates 180° when the select is open via the parent's data-state attribute */}
      <Icon name="ChevronDown" size={16} className="transition-transform group-data-[state=open]:rotate-180" />
    </WrapIcon>
  </Trigger>
);
SelectTrigger.displayName = Trigger.displayName;

/**
 * Select Scroll Up Button with icon
 */
const SelectScrollUpButton: React.FC<React.ComponentPropsWithRef<typeof ScrollUpButton>> = ({ ref, className, ...props }) => (
  <ScrollUpButton
    ref={ref}
    className={cn(
      'absolute',
      'bg-[var(--popover)]',
      'left-0 right-0 top-0 z-10 flex cursor-default items-center justify-center',
      'py-1',
      // 'bg-gradient-to-b from-popover to-transparent',
      'text-[var(--foreground)]',
      className,
    )}
    {...props}
  >
    <Icon name="ChevronUp" size={16} />
  </ScrollUpButton>
);
SelectScrollUpButton.displayName = ScrollUpButton.displayName;

/**
 * Select Scroll Down Button with icon
 */
const SelectScrollDownButton: React.FC<React.ComponentPropsWithRef<typeof ScrollDownButton>> = ({ ref, className, ...props }) => (
  <ScrollDownButton
    ref={ref}
    className={cn(
      'absolute',
      'bg-[var(--popover)]',
      'bottom-0 left-0 right-0 z-10 flex cursor-default items-center justify-center',
      'py-1',
      // 'bg-gradient-to-t from-popover to-transparent',
      'text-[var(--foreground)]',
      className,
    )}
    {...props}
  >
    <Icon name="ChevronDown" size={16} />
  </ScrollDownButton>
);
SelectScrollDownButton.displayName = ScrollDownButton.displayName;

/**
 * Select Content where the options are displayed
 */
const SelectContent: React.FC<React.ComponentPropsWithRef<typeof Content> & { isPortal?: boolean }> = ({
  ref,
  className,
  children,
  position = 'popper',
  isPortal = true,
  ...props
}) => {
  const PortalComponent = isPortal ? Portal : Fragment;
  return (
    <PortalComponent>
      <Content
        ref={ref}
        className={cn(
          'relative',
          'z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-[var(--popover)] text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <Viewport
          className={cn('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]')}
        >
          {children}
        </Viewport>
        <SelectScrollDownButton />
      </Content>
    </PortalComponent>
  );
};
SelectContent.displayName = Content.displayName;

/**
 * Select Label for the group
 */
const SelectLabel: React.FC<React.ComponentPropsWithRef<typeof Label>> = ({ ref, className, children, ...props }) => (
  <Label
    ref={ref}
    className={cn(
      'py-1.5',
      'flex px-2',
      'font-semibold',
      'text-[var(--foreground)]',
      'text-[length:var(--typography-base-sizes-small-font-size)]',
      className,
    )}
    {...props}
  >
    <div className="h-3.5 w-4">&nbsp;</div>
    {children}
  </Label>
);
SelectLabel.displayName = Label.displayName;

/**
 * Select Item where the option are displayed by field 'label'
 */
const SelectItem: React.FC<React.ComponentPropsWithRef<typeof Item>> = ({ ref, className, children, ...props }) => (
  <Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center outline-none focus:bg-accent focus:text-accent-foreground',
      'px-1',
      'py-1',
      'text-[var(--foreground)]',
      'text-[length:var(--typography-base-sizes-small-font-size)]',
      'rounded-[var(--border-radius-sm)]',
      'hover:rounded-[var(--border-radius-sm)] hover:bg-[var(--accent)]',
      'focus:rounded-[var(--border-radius-sm)] focus:bg-[var(--accent)]',
      'data-[disabled]:hover:cursor-not-allowed',
      'data-[disabled]:opacity-50',
      !props.disabled && 'hover:cursor-pointer',
      className,
    )}
    {...props}
  >
    <span className="flex w-5 items-center justify-center flex-shrink-0 pr-1">
      <ItemIndicator>
        <Icon name="Check" size={16} />
      </ItemIndicator>
    </span>
    <ItemText>{children}</ItemText>
  </Item>
);
SelectItem.displayName = Item.displayName;

/**
 * Export all the Select Primitives to use in the Select Component
 */
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectScrollUpButton, SelectScrollDownButton };
