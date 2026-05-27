import React, { useContext } from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';
import { ToggleGroupVariant, ToggleGroupItemSize, toggleGroupItemSizes } from './types';
import { ToggleVariant, toggleVariants } from '../toggle/types';
import { IconType } from '../icon';
import { IconExtend } from '../icon/components';

/**
 * Context for sharing toggle group styling props
 */
const ToggleGroupContext = React.createContext<{ size: ToggleGroupItemSize; variant: ToggleVariant; shape: ToggleGroupVariant }>({
  size: 'default',
  variant: 'default',
  shape: 'default',
});

/**
 * Props for the ToggleGroup component
 */
type IToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  React.RefAttributes<HTMLDivElement> & {
    /**
     * Optional type of the toggle group
     */
    type?: 'single' | 'multiple';

    /**
     * Optional variant of the toggle group
     */
    variant?: ToggleVariant;

    /**
     * Optional size of the toggle group
     */
    size?: ToggleGroupItemSize;

    /**
     * Optional shape of the toggle group
     */
    shape?: ToggleGroupVariant;

    /**
     * Optional className for the toggle group
     */
    className?: string;

    /**
     * Optional children for the toggle group
     */
    children?: React.ReactNode;
  };

const ToggleGroup = (props: IToggleGroupProps) => {
  const { className, type = 'single', variant = 'default', size = 'default', shape = 'default', children, ref, ...rest } = props;

  if (type === 'single') {
    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn('flex items-center justify-center gap-1 max-w-max', className)}
        {...(rest as ToggleGroupPrimitive.ToggleGroupSingleProps)}
        type={type}
      >
        <ToggleGroupContext.Provider value={{ variant, size, shape }}>{children}</ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    );
  }

  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn('flex items-center justify-center gap-1 max-w-max', className)}
      {...(rest as ToggleGroupPrimitive.ToggleGroupMultipleProps)}
      type={type}
    >
      <ToggleGroupContext.Provider value={{ variant, size, shape }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
};

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

type IToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  React.RefAttributes<HTMLButtonElement> & {
    variant?: ToggleVariant;
    size?: ToggleGroupItemSize;
    icon?: IconType;
    label?: string;
  };

const TOGGLE_ICON_SIZE = 16;

const ToggleGroupItem = ({ className, variant = 'default', size = 'default', icon, label, ref, ...props }: IToggleGroupItemProps) => {
  const context = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:text-[var(--base-muted-foreground)] hover:bg-[var(--base-muted)] hover:cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-[var(--opacity-opacity-50)] data-[state=on]:bg-[var(--base-accent)] data-[state=on]:text-[var(--base-foreground)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 aria-checked:bg-[var(--base-accent)] aria-checked:text-[var(--base-foreground)]',
        toggleVariants[context.variant || variant],
        toggleGroupItemSizes[context.size || size],
        context.shape === 'pill' && 'rounded-full ',
        className,
      )}
      {...props}
    >
      {icon && <IconExtend icon={icon} size={TOGGLE_ICON_SIZE} />}
      {label}
    </ToggleGroupPrimitive.Item>
  );
};

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
