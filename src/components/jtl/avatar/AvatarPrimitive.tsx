import React from 'react';
import { Root, Image, Fallback } from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

/**
 * Base Avatar component that provides the container for the avatar
 *
 * @component
 */
const BaseAvatar: React.FC<React.ComponentPropsWithRef<typeof Root>> =
  /**
   * @param props - Component props
   * @param ref - Forwarded ref
   * @returns BaseAvatar component
   */
  ({ ref, className, ...props }) => <Root ref={ref} className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden', className)} {...props} />;
BaseAvatar.displayName = Root.displayName;

/**
 * Avatar Image component that displays the user's profile picture
 *
 * @component
 */
const AvatarImage: React.FC<React.ComponentPropsWithRef<typeof Image>> =
  /**
   * @param props - Component props
   * @param ref - Forwarded ref
   * @returns AvatarImage component
   */
  ({ ref, className, ...props }) => <Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />;
AvatarImage.displayName = Image.displayName;

/**
 * Avatar Fallback component that displays when the image is not available
 *
 * @component
 */
const AvatarFallback: React.FC<React.ComponentPropsWithRef<typeof Fallback>> =
  /**
   * @param props - Component props
   * @param ref - Forwarded ref
   * @returns AvatarFallback component
   */
  ({ ref, className, ...props }) => (
    <Fallback ref={ref} className={cn('flex h-full w-full p-3 items-center justify-center rounded-full bg-[var(--accent)]', className)} {...props} />
  );
AvatarFallback.displayName = Fallback.displayName;

export { BaseAvatar, AvatarImage, AvatarFallback };
