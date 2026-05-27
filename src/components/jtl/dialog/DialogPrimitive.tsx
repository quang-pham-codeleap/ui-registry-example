import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { Box } from '../box';
import { useOptionalDialogNavigationContext } from './hooks';

/**
 * Dialog component based on Radix UI for creating accessible modal dialogs
 * A dialog is a window overlaid on either the primary window or another dialog window.
 *
 * @returns A Dialog component
 *
 * @example
 * ```tsx
 * // Basic usage: Dialog with header, content, and actions
 * function App() {
 *   return (
 *     <Dialog>
 *       <DialogTrigger asChild>
 *         <Button variant="outline" label="Open Dialog" />
 *       </DialogTrigger>
 *       <DialogContent>
 *         <DialogHeader>
 *           <DialogTitle>Edit profile</DialogTitle>
 *           <DialogDescription>Make changes to your profile here.</DialogDescription>
 *         </DialogHeader>
 *         <Input id="name" label="Name" />
 *         <Input id="username" label="Username" />
 *         <DialogFooter>
 *           <DialogClose asChild>
 *             <Button type="submit" label="Save changes" />
 *           </DialogClose>
 *         </DialogFooter>
 *       </DialogContent>
 *     </Dialog>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Dialog with multiple actions in footer
 * function App() {
 *   return (
 *     <Dialog>
 *       <DialogTrigger asChild>
 *         <Button variant="outline" label="Share Link" />
 *       </DialogTrigger>
 *       <DialogContent>
 *         <DialogHeader>
 *           <DialogTitle>Share link</DialogTitle>
 *           <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
 *         </DialogHeader>
 *         <Input id="name" label="Name" placeholder="Placeholder" />
 *         <DialogFooter className="sm:justify-between">
 *           <DialogClose asChild>
 *             <Button variant="outline" label="Close" />
 *           </DialogClose>
 *           <DialogClose asChild>
 *             <Button label="Save changes" />
 *           </DialogClose>
 *         </DialogFooter>
 *       </DialogContent>
 *     </Dialog>
 *   );
 * }
 * ```
 */
const Dialog = DialogPrimitive.Root;

/**
 * The button that opens the dialog when clicked
 * Use `asChild` to use your own component as the trigger
 *
 * @example
 * ```tsx
 * <DialogTrigger asChild>
 *   <Button variant="outline" label="Open Dialog" />
 * </DialogTrigger>
 * ```
 */
const DialogTrigger = DialogPrimitive.Trigger;

/**
 * A container component that portals its children into the body
 * Used internally by DialogContent
 */
const DialogPortal = DialogPrimitive.Portal;

/**
 * The button that closes the dialog
 * Use `asChild` to use your own component as the close button
 *
 * @example
 * ```tsx
 * <DialogClose asChild>
 *   <Button variant="outline" label="Close" />
 * </DialogClose>
 * ```
 */
const DialogClose = DialogPrimitive.Close;

/**
 * The semi-transparent overlay that covers the page behind the dialog
 * Used internally by DialogContent
 */
const DialogOverlay: React.FC<React.ComponentPropsWithRef<typeof DialogPrimitive.Overlay>> = ({ ref, className, ...props }) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * The component that contains the dialog's content
 * Contains the overlay and provides the animated container
 *
 * @param hasCloseButton - Whether to display the X close button in the top-right corner (default: true)
 *
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Dialog Title</DialogTitle>
 *     <DialogDescription>Dialog description goes here.</DialogDescription>
 *   </DialogHeader>
 *   <DialogFooter>
 *     <DialogClose asChild><Button label="Close" /></DialogClose>
 *   </DialogFooter>
 * </DialogContent>
 * ```
 */
const DialogContent: React.FC<React.ComponentPropsWithRef<typeof DialogPrimitive.Content> & { hasCloseButton?: boolean }> = ({
  ref,
  className,
  children,
  hasCloseButton = true,
  ...props
}) => (
  <DialogPortal>
    <DialogOverlay>
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed',
          'left-[50%]',
          'top-[50%]',
          'z-50',
          'grid',
          'w-full',
          'max-w-lg',
          'translate-x-[-50%]',
          'translate-y-[-50%]',
          'gap-4',
          'border',
          'border-[var(--border)]',
          'bg-[var(--background)]',
          'p-6',
          'shadow-lg',
          'duration-200',
          'data-[state=open]:animate-in',
          'data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0',
          'data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95',
          'data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2',
          'data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2',
          'data-[state=open]:slide-in-from-top-[48%]',
          'sm:rounded-[var(--border-radius-lg)]',
          className,
        )}
        {...props}
      >
        {children}
        {hasCloseButton && (
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--background)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground cursor-pointer">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogOverlay>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * A layout component for the dialog header.
 * Contains the title and description with proper spacing.
 *
 * When used inside a `DialogNavigation` and navigation history exists,
 * a back button is automatically rendered on the left side of the header.
 *
 * @example
 * ```tsx
 * <DialogHeader>
 *   <DialogTitle>Dialog Title</DialogTitle>
 *   <DialogDescription>Dialog description goes here.</DialogDescription>
 * </DialogHeader>
 * ```
 */
const DialogHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const navigationContext = useOptionalDialogNavigationContext();
  const canGoBack = navigationContext?.canGoBack ?? false;

  if (!canGoBack) {
    return (
      <Box className={cn('flex', 'flex-col', 'gap-1.5', 'text-center', 'sm:text-left', className)} {...props}>
        {children}
      </Box>
    );
  }

  return (
    <Box className={cn('flex', 'items-start', 'gap-3', className)} {...props}>
      <Button type="button" variant="outline" icon={<ChevronLeft />} onClick={navigationContext?.navigateBack} aria-label="Go back" />
      <Box className="flex flex-1 flex-col gap-1.5 text-left">{children}</Box>
    </Box>
  );
};
DialogHeader.displayName = 'DialogHeader';

/**
 * A layout component for the dialog footer
 * Contains action buttons with responsive layout
 * Arranges buttons in a column on mobile and a row on desktop
 *
 * @example
 * ```tsx
 * <DialogFooter>
 *   <DialogClose asChild><Button variant="outline" label="Cancel" /></DialogClose>
 *   <DialogClose asChild><Button label="Confirm" /></DialogClose>
 * </DialogFooter>
 * ```
 */
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <Box className={cn('flex flex-col-reverse gap-4 sm:flex-row sm:justify-end', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

/**
 * The title of the dialog
 * Should be concise and descriptive of the dialog's purpose
 *
 * @example
 * ```tsx
 * <DialogTitle>Edit Profile</DialogTitle>
 * ```
 */
const DialogTitle: React.FC<React.ComponentPropsWithRef<typeof DialogPrimitive.Title>> = ({ ref, className, ...props }) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-[length:var(--typography-base-sizes-large-font-size)]', 'font-semibold', 'leading-none', 'tracking-tight', className)}
    {...props}
  />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * The description of the dialog
 * Provides additional context about the dialog's purpose
 *
 * @example
 * ```tsx
 * <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
 * ```
 */
const DialogDescription: React.FC<React.ComponentPropsWithRef<typeof DialogPrimitive.Description>> = ({ ref, className, ...props }) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      'text-[length:var(--typography-base-sizes-small-font-size)]',
      'text-[var(--muted-foreground)]',
      'font-normal',
      'leading-[var(--typography-base-sizes-small-line-height)]',
      className,
    )}
    {...props}
  />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
