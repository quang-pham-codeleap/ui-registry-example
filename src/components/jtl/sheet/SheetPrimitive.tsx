import React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Sheet component based on Radix UI Dialog for creating accessible slide-in panels
 * A sheet is a panel that slides in from the edge of the screen, typically used for secondary content or actions
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <Sheet>
 *       <SheetTrigger asChild>
 *         <Button label="Open Sheet" />
 *       </SheetTrigger>
 *       <SheetBody>
 *         <SheetHeader>
 *           <div className="flex items-center gap-2">
 *             <SheetTitle>Edit profile</SheetTitle>
 *           </div>
 *           <SheetDescription>Make changes to your profile here.</SheetDescription>
 *         </SheetHeader>
 *         <SheetContent>
 *           <Input id="name" label="Name" />
 *         </SheetContent>
 *         <SheetFooter>
 *           <p className="text-sm">Helper text</p>
 *           <div className="flex gap-2">
 *             <SheetClose asChild><Button variant="outline" label="Cancel" /></SheetClose>
 *             <SheetClose asChild><Button label="Save" /></SheetClose>
 *           </div>
 *         </SheetFooter>
 *       </SheetBody>
 *     </Sheet>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <Sheet>
 *       <SheetTrigger asChild>
 *         <Button label="Open Left Sheet" />
 *       </SheetTrigger>
 *       <SheetBody side="left">
 *         <SheetHeader>
 *           <SheetTitle>Left Sheet</SheetTitle>
 *           <SheetDescription>This sheet slides in from the left.</SheetDescription>
 *         </SheetHeader>
 *         <SheetFooter>
 *           <span />
 *           <SheetClose asChild>
 *             <Button label="Close" />
 *           </SheetClose>
 *         </SheetFooter>
 *       </SheetBody>
 *     </Sheet>
 *   );
 * }
 * ```
 */
const Sheet = SheetPrimitive.Root;
Sheet.displayName = 'Sheet';

/**
 * SheetTrigger component for triggering the opening of the sheet
 *
 * @example
 * ```tsx
 * <SheetTrigger asChild>
 *   <Button label="Open Sheet" />
 * </SheetTrigger>
 * ```
 */
const SheetTrigger = SheetPrimitive.Trigger;
SheetTrigger.displayName = 'SheetTrigger';

/**
 * SheetClose component for closing the sheet
 *
 * @example
 * ```tsx
 * <SheetClose asChild>
 *   <Button label="Close" />
 * </SheetClose>
 * ```
 */
const SheetClose = SheetPrimitive.Close;
SheetClose.displayName = 'SheetClose';

/**
 * Portal component for rendering sheet content in a portal
 * Used internally by SheetBody
 */
const SheetPortal = SheetPrimitive.Portal;

/**
 * Semi-transparent overlay that appears behind the sheet
 * Used internally by SheetBody
 */
const SheetOverlay: React.FC<React.ComponentPropsWithRef<typeof SheetPrimitive.Overlay>> = ({ ref, className, ...props }) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
);
SheetOverlay.displayName = 'SheetOverlay';

const sheetVariants = cva(
  'fixed z-50 flex flex-col gap-2 bg-[var(--background)] shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out overflow-hidden',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 !max-w-none [border-bottom:1px_solid_var(--border)]  rounded-b-[var(--border-radius-xl)] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 !max-w-none [border-top:1px_solid_var(--border)]  rounded-t-[var(--border-radius-xl)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-2 left-0 w-3/4 [border-right:1px_solid_var(--border)] rounded-r-[var(--border-radius-xl)] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        right:
          'inset-y-2 right-0 w-3/4 [border-left:1px_solid_var(--border)] rounded-l-[var(--border-radius-xl)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      },
      size: {
        sm: 'sm:max-w-sm',
        lg: 'lg:max-w-lg',
        xl: 'xl:max-w-xl',
        '2xl': '2xl:max-w-2xl',
        '3xl': '3xl:max-w-3xl',
        '4xl': '4xl:max-w-4xl',
        '5xl': '5xl:max-w-5xl',
        '6xl': '6xl:max-w-6xl',
        '7xl': '7xl:max-w-7xl',
      },
    },
    defaultVariants: {
      side: 'right',
      size: 'sm',
    },
  },
);

interface SheetBodyProps extends React.ComponentPropsWithRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {}

/**
 * The sliding panel container — renders the visible sheet with the overlay.
 * Place SheetHeader, SheetContent, and SheetFooter as direct children.
 *
 * @param side - The side from which the sheet slides in: 'top', 'right', 'bottom', or 'left' (default: 'right')
 * @param size - Maximum width of the panel (default: 'sm')
 *
 * @example
 * ```tsx
 * <SheetBody side="left">
 *   <SheetHeader>
 *     <SheetTitle>Left Sheet</SheetTitle>
 *   </SheetHeader>
 *   <SheetContent>...</SheetContent>
 *   <SheetFooter>
 *     <span />
 *     <SheetClose asChild><Button label="Close" /></SheetClose>
 *   </SheetFooter>
 * </SheetBody>
 * ```
 */
const SheetBody: React.FC<SheetBodyProps> = ({ ref, side = 'right', className, children, size = 'sm', ...props }) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side, size }), className)} {...props}>
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--background)] transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none ">
        <X className="h-4 w-4 cursor-pointer" aria-hidden="true" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
);
SheetBody.displayName = 'SheetBody';

/**
 * Layout component for the sheet header.
 * Place SheetTitle, SheetDescription, and any action rows (buttons, badges) inside.
 * Users compose their own icons, badges, and quick-action buttons as children.
 *
 * @example
 * ```tsx
 * <SheetHeader>
 *   <div className="flex items-center gap-2">
 *     <SheetTitle>Sheet Title</SheetTitle>
 *   </div>
 *   <SheetDescription>Sheet description goes here.</SheetDescription>
 * </SheetHeader>
 * ```
 */
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-3 px-6 py-3 border-b border-[var(--border)] bg-[var(--muted)]', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

/**
 * Scrollable content area between the header and footer.
 * Grows to fill available space and scrolls vertically when content overflows.
 *
 * @example
 * ```tsx
 * <SheetContent>
 *   <Input id="name" label="Name" />
 *   <Input id="email" label="Email" />
 * </SheetContent>
 * ```
 */
const SheetContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 overflow-y-auto px-6 py-4', className)} {...props} />
);
SheetContent.displayName = 'SheetContent';

/**
 * Layout component for the sheet footer.
 * Uses justify-between: place helper text on the left and action buttons on the right.
 *
 * @example
 * ```tsx
 * <SheetFooter>
 *   <p className="text-sm">Helper text</p>
 *   <div className="flex gap-2">
 *     <SheetClose asChild><Button variant="outline" label="Cancel" /></SheetClose>
 *     <SheetClose asChild><Button label="Confirm" /></SheetClose>
 *   </div>
 * </SheetFooter>
 * ```
 */
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-between gap-2 px-6 py-3 border-t border-[var(--border)]', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

/**
 * The title of the sheet
 * Should be concise and descriptive of the sheet's purpose
 *
 * @example
 * ```tsx
 * <SheetTitle>Edit Profile</SheetTitle>
 * ```
 */
const SheetTitle: React.FC<React.ComponentPropsWithRef<typeof SheetPrimitive.Title>> = ({ ref, className, ...props }) => (
  <SheetPrimitive.Title ref={ref} className={cn('text-lg font-semibold text-foreground', className)} {...props} />
);
SheetTitle.displayName = 'SheetTitle';

/**
 * The description of the sheet
 * Provides additional context about the sheet's purpose
 *
 * @example
 * ```tsx
 * <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
 * ```
 */
const SheetDescription: React.FC<React.ComponentPropsWithRef<typeof SheetPrimitive.Description>> = ({ ref, className, ...props }) => (
  <SheetPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
);
SheetDescription.displayName = 'SheetDescription';

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetBody,
  SheetHeader,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
