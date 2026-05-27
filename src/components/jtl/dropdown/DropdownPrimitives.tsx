import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/utils';
import { Icon } from '../icon';

const DROPDOWN_ICON_SIZE_DEFAULT = 16;

/**
 * A dropdown menu component that displays a menu when triggered.
 * Based on Radix UI's Dropdown Menu primitive.
 *
 * @example
 * ```tsx
 * // Simple dropdown with button trigger
 * function SimpleDropdown() {
 *   return (
 *     <DropdownMenu>
 *       <DropdownMenuTrigger asChild>
 *         <Button variant="outline" label="Open Menu" />
 *       </DropdownMenuTrigger>
 *       <DropdownMenuContent>
 *         <DropdownMenuLabel>My Account</DropdownMenuLabel>
 *         <DropdownMenuSeparator />
 *         <DropdownMenuItem>Profile</DropdownMenuItem>
 *         <DropdownMenuItem>Settings</DropdownMenuItem>
 *         <DropdownMenuItem>Logout</DropdownMenuItem>
 *       </DropdownMenuContent>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Advanced dropdown with custom trigger and multiple sections
 * function UserProfileDropdown() {
 *   return (
 *     <DropdownMenu>
 *       <DropdownMenuTrigger asChild>
 *         <div className="flex cursor-pointer items-center justify-center rounded-md border p-1">
 *           <div className="flex items-center gap-2">
 *             <Logo />
 *             <Icon name="ChevronsUpDown" />
 *           </div>
 *         </div>
 *       </DropdownMenuTrigger>
 *       <DropdownMenuContent align="start" sideOffset={4} className="w-56">
 *         <DropdownMenuLabel>
 *           <Text weight="semibold">Company Name</Text>
 *         </DropdownMenuLabel>
 *         <DropdownMenuSeparator />
 *
 *         <DropdownMenuItem>
 *           <Text type="small">Help Center</Text>
 *         </DropdownMenuItem>
 *
 *         <DropdownMenuSeparator />
 *         <DropdownMenuLabel>Account</DropdownMenuLabel>
 *         <DropdownMenuItem>
 *           <Text type="small">Manage Account</Text>
 *         </DropdownMenuItem>
 *         <DropdownMenuItem className="justify-between">
 *           <Text type="small">Sign Out</Text>
 *           <Icon name="LogOut" />
 *         </DropdownMenuItem>
 *       </DropdownMenuContent>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 */
const DropdownMenu = DropdownMenuPrimitive.Root;

/**
 * The trigger element for the dropdown menu.
 * Can be used with the `asChild` prop to use a custom element as the trigger.
 *
 * @example
 * ```tsx
 * // With Button component
 * <DropdownMenuTrigger asChild>
 *   <Button variant="outline" label="Open Menu" />
 * </DropdownMenuTrigger>
 * ```
 *
 * @example
 * ```tsx
 * // With custom div
 * <DropdownMenuTrigger asChild>
 *   <div className="flex cursor-pointer items-center p-2">
 *     <Icon name="Menu" />
 *     <span>Options</span>
 *   </div>
 * </DropdownMenuTrigger>
 * ```
 */
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/**
 * Groups dropdown menu items together.
 * Useful for organizing related menu items.
 *
 * @example
 * ```tsx
 * <DropdownMenuGroup>
 *   <DropdownMenuItem>Profile</DropdownMenuItem>
 *   <DropdownMenuItem>Settings</DropdownMenuItem>
 *   <DropdownMenuItem>Preferences</DropdownMenuItem>
 * </DropdownMenuGroup>
 * ```
 */
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * Portals the dropdown menu content into the body.
 *
 * @example
 * ```tsx
 * <DropdownMenuPortal>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Item 2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenuPortal>
 * ```
 */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/**
 * Creates a submenu within a dropdown menu.
 * Useful for nested navigation.
 *
 * @example
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Preferences</DropdownMenuItem>
 *     <DropdownMenuItem>Notifications</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * A group of radio items within the dropdown menu.
 * Used when only one option can be selected at a time.
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
 *   <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/**
 * Trigger for a submenu within a dropdown menu.
 * Displays a chevron icon to indicate that it opens a submenu.
 *
 * @param {boolean} inset - Whether to add padding on the left side
 * @param {React.ReactNode} children - The content of the trigger
 *
 * @example
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Submenu Item</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
const DropdownMenuSubTrigger: React.FC<
  React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
> = ({ ref, className, inset, children, ...props }) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default gap-2 select-none items-center rounded-[var(--border-radius-sm)] px-2 py-1 text-[length:var(--typography-base-sizes-small-font-size)] outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      'hover:cursor-pointer hover:bg-[var(--accent)]',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {children}
    <Icon name="ChevronRight" size={DROPDOWN_ICON_SIZE_DEFAULT} className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
);
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

/**
 * Content for a submenu within a dropdown menu.
 * Appears when the submenu trigger is clicked.
 *
 * @example
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Submenu Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Submenu Item 2</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
const DropdownMenuSubContent: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>> = ({ ref, className, ...props }) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-[var(--border-radius-md)] border border-[var(--border)] bg-[var(--popover)] p-1 text-[var(--popover-foreground)] shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 cursor-pointer',
      className,
    )}
    {...props}
  />
);
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

/**
 * Dropdown menu content component that displays the dropdown items.
 * This is the container for all dropdown menu items and sections.
 *
 * @param {"start" | "center" | "end"} align - Alignment of the dropdown content relative to the trigger
 * @param {number} sideOffset - Distance between the trigger and the content
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button variant="outline" label="Open Menu" />
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent align="start" sideOffset={4}>
 *     <DropdownMenuLabel>My Account</DropdownMenuLabel>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>Profile</DropdownMenuItem>
 *     <DropdownMenuItem>Logout</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
const DropdownMenuContent: React.FC<
  React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content> & {
    align?: 'start' | 'center' | 'end';
  }
> = ({ ref, className, sideOffset = 4, align = 'center', onCloseAutoFocus, ...props }) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      alignOffset={align === 'center' ? 0 : undefined}
      onCloseAutoFocus={onCloseAutoFocus ?? (e => e.preventDefault())}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-[var(--border-radius-md)] border border-[var(--border)] bg-[var(--popover)] p-1 text-[var(--popover-foreground)] shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/**
 * Interactive item within a dropdown menu.
 * Can be clicked to perform an action.
 *
 * @param {boolean} inset - Whether to add padding on the left side
 * @param {boolean} disabled - Whether the item is disabled
 *
 * @example
 * ```tsx
 * <DropdownMenuItem>
 *   <Text type="small">Profile</Text>
 * </DropdownMenuItem>
 * ```
 *
 * @example
 * ```tsx
 * // With icon
 * <DropdownMenuItem className="justify-between gap-2">
 *   <Text type="small">Sign Out</Text>
 *   <Icon name="LogOut" />
 * </DropdownMenuItem>
 * ```
 */
const DropdownMenuItem: React.FC<
  React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
> = ({ ref, className, inset, disabled, ...props }) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center gap-2 rounded-[var(--border-radius-sm)] px-2 py-1.5 text-[length:var(--typography-base-sizes-small-font-size)] outline-none transition-colors focus:bg-[var(--accent)] focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
      'hover:bg-[var(--accent)]',
      'hover:cursor-pointer',
      disabled && 'hover:cursor-not-allowed opacity-50 bg-[transparent]',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/**
 * Checkbox item within a dropdown menu.
 * Can be checked or unchecked.
 *
 * @param {boolean} checked - Whether the checkbox is checked
 * @param {boolean} disabled - Whether the checkbox is disabled
 * @param {React.ReactNode} children - The content of the checkbox item
 *
 * @example
 * ```tsx
 * <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
 *   Show Status
 * </DropdownMenuCheckboxItem>
 * ```
 */
const DropdownMenuCheckboxItem: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>> = ({
  ref,
  className,
  children,
  checked,
  disabled,
  ...props
}) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-[var(--border-radius-sm)] py-1.5 pl-8 pr-2 text-[length:var(--typography-base-sizes-small-font-size)] transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'hover:bg-[var(--accent)]',
      'hover:cursor-pointer',
      disabled && 'hover:cursor-not-allowed opacity-50 bg-[transparent]',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Icon name="Check" size={DROPDOWN_ICON_SIZE_DEFAULT} />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

/**
 * Radio item within a dropdown menu radio group.
 * Only one item in a group can be selected.
 *
 * @param {string} value - The value of the radio item
 * @param {React.ReactNode} children - The content of the radio item
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
 *   <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
const DropdownMenuRadioItem: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>> = ({
  ref,
  className,
  children,
  ...props
}) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-[var(--border-radius-sm)] py-1.5 pl-8 pr-2 text-[length:var(--typography-base-sizes-small-font-size)] outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-4 w-4 items-center justify-center rounded-full">
      <DropdownMenuPrimitive.ItemIndicator>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M7.99999 11.335C9.84186 11.335 11.335 9.84186 11.335 7.99999C11.335 6.15812 9.84186 4.66499 7.99999 4.66499C6.15812 4.66499 4.66499 6.15812 4.66499 7.99999C4.66499 9.84186 6.15812 11.335 7.99999 11.335Z"
            fill="var(--popover-foreground)"
          />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

/**
 * Label for a section in a dropdown menu.
 * Used to group related items.
 *
 * @param {boolean} inset - Whether to add padding on the left side
 * @param {React.ReactNode} children - The content of the label
 *
 * @example
 * ```tsx
 * <DropdownMenuLabel>
 *   <Text weight="semibold">My Account</Text>
 * </DropdownMenuLabel>
 * ```
 *
 * @example
 * ```tsx
 * // Simple text label
 * <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
 * ```
 */
const DropdownMenuLabel: React.FC<
  React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
> = ({ ref, className, inset, ...props }) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-[length:var(--typography-base-sizes-small-font-size)] font-semibold', inset && 'pl-8', className)}
    {...props}
  />
);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/**
 * Separator line between dropdown menu items or sections.
 *
 * @example
 * ```tsx
 * <DropdownMenuContent>
 *   <DropdownMenuLabel>Account</DropdownMenuLabel>
 *   <DropdownMenuItem>Profile</DropdownMenuItem>
 *   <DropdownMenuSeparator />
 *   <DropdownMenuItem>Logout</DropdownMenuItem>
 * </DropdownMenuContent>
 * ```
 */
const DropdownMenuSeparator: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>> = ({ ref, className, ...props }) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-[var(--border)]', className)} {...props} />
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/**
 * Displays keyboard shortcuts next to dropdown menu items.
 * Typically shown on the right side of menu items.
 *
 * @param {string} className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <DropdownMenuItem>
 *   <span>Copy</span>
 *   <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />;
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
