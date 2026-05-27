import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Card component serves as a container for related content and actions
 * It provides a visually distinct container with borders and padding
 *
 * @returns The rendered Card component
 *
 * @example
 * ```tsx
 * // Default
 * function App() {
 *   return (
 *     <Card>
 *       <CardHeader>
 *         <CardTitle>Card Title</CardTitle>
 *         <CardDescription>Card Description</CardDescription>
 *       </CardHeader>
 *       <CardContent>
 *         Card Content
 *       </CardContent>
 *       <CardFooter>
 *         <Button>Button</Button>
 *       </CardFooter>
 *     </Card>
 *   );
 * }
 * ```
 */
const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> = ({ ref, className, ...props }) => (
  <div
    ref={ref}
    className={cn(
      'flex',
      'flex-col',
      'gap-6',
      'rounded-[var(--border-radius-lg)]',
      'border',
      'border-[var(--border)]',
      'bg-[var(--card)]',
      'text-[var(--card-foreground)]',
      'p-6',
      className,
    )}
    {...props}
  />
);
Card.displayName = 'Card';

/**
 * CardHeader component for the top section of a card
 * Typically contains the title and description
 */
const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> = ({ ref, className, ...props }) => (
  <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />
);
CardHeader.displayName = 'CardHeader';

/**
 * CardTitle component for displaying the main heading of a card
 * Uses larger font size and semibold weight for emphasis
 */
const CardTitle: React.FC<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> = ({ ref, className, ...props }) => (
  <div
    ref={ref}
    className={cn(
      'text-[var(--card-foreground)]',
      'text-[length:var(--typography-typography-components-h4-font-size)]',
      'font-[var(--typography-typography-components-h4-font-weight)]',
      'leading-[var(--typography-typography-components-h4-line-height)]',
      'tracking-(--typography-typography-components-h4-letter-spacing)',
      className,
    )}
    {...props}
  />
);
CardTitle.displayName = 'CardTitle';

/**
 * CardDescription component for secondary text below the title
 * Uses smaller font size and muted color for visual hierarchy
 */
const CardDescription: React.FC<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> = ({ ref, className, ...props }) => (
  <div
    ref={ref}
    className={cn(
      'text-[length:var(--typography-typography-components-small-font-size)]',
      'text-[var(--muted-foreground)]',
      'font-normal',
      'leading-[var(--typography-base-sizes-small-line-height)]',
      'tracking-(--typography-typography-components-small-letter-spacing)',
      className,
    )}
    {...props}
  />
);
CardDescription.displayName = 'CardDescription';

/**
 * CardContent component for the main content area of a card
 * Provides a container for the primary content between header and footer
 */
const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> = ({ ref, className, ...props }) => (
  <div ref={ref} className={cn(className)} {...props} />
);
CardContent.displayName = 'CardContent';

/**
 * CardFooter component for the bottom section of a card
 * Typically contains actions like buttons, aligned horizontally
 */
const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>> = ({ ref, className, ...props }) => (
  <div ref={ref} className={cn('flex items-center justify-end gap-4', className)} {...props} />
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
