import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';

/**
 * A popover component that displays floating content when a trigger element is activated.
 * Based on Radix UI's Popover primitive for accessibility and composability.
 *
 * @example
 * ```tsx
 * // Basic popover with button trigger
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline" label="Open popover" />
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <div className="grid gap-4">
 *       <div className="space-y-2">
 *         <h4 className="font-medium leading-none">Dimensions</h4>
 *         <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
 *       </div>
 *       <div className="grid gap-2">
 *         <Input id="width" label="Width" placeholder="Width" />
 *         <Input id="height" label="Height" placeholder="Height" />
 *       </div>
 *     </div>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @example
 * ```tsx
 * // With custom anchor element
 * <Popover>
 *   <PopoverAnchor asChild>
 *     <OctagonAlert className="mr-4" />
 *   </PopoverAnchor>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline" label="Show details" />
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <Text>This popover is anchored to the circle element, not the button.</Text>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
const Popover = PopoverPrimitive.Root;

/**
 * The trigger element for the popover.
 * Usually used with the `asChild` prop to use a custom element as the trigger.
 *
 * @example
 * ```tsx
 * <PopoverTrigger asChild>
 *   <Button variant="outline" label="Open popover" />
 * </PopoverTrigger>
 * ```
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Optional anchor element for the popover.
 * When used, the popover will be positioned relative to this element instead of the trigger.
 *
 * @example
 * ```tsx
 * <PopoverAnchor asChild>
 *   <OctagonAlert className="mr-4" />
 * </PopoverAnchor>
 * ```
 */
const PopoverAnchor = PopoverPrimitive.Anchor;

/**
 * The content of the popover.
 * This is the component that contains all the content displayed when the popover is open.
 *
 * @param {"start" | "center" | "end"} align - The alignment of the popover relative to the trigger (default: 'center')
 * @param {number} sideOffset - The distance in pixels between the popover and the trigger (default: 4)
 * @param {"top" | "right" | "bottom" | "left"} side - The preferred side to render the popover (default: 'bottom')
 * @param {string} className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <PopoverContent className="w-80" align="start" sideOffset={8}>
 *   <Text weight="semibold">Popover Title</Text>
 *   <div className="grid gap-4">
 *     <Input id="name" label="Name" />
 *     <Input id="email" label="Email" />
 *   </div>
 * </PopoverContent>
 * ```
 *
 * @example
 * ```tsx
 * // With different alignment
 * <PopoverContent align="end">
 *   <Text>This popover is aligned to the end of the trigger.</Text>
 * </PopoverContent>
 * ```
 */
const PopoverContent: React.FC<React.ComponentPropsWithRef<typeof PopoverPrimitive.Content>> = ({
  ref,
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-[var(--border-radius-md)] bg-[var(--popover)] p-4 text-[var(--popover-foreground)] shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
