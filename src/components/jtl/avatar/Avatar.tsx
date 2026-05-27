import React, { useMemo } from 'react';
import { Root } from '@radix-ui/react-avatar';
import { getNameInitials } from '@/utils';
import IAvatarProps from './IAvatarProps';
import { BaseAvatar, AvatarImage, AvatarFallback } from './AvatarPrimitive';
import { shapeVariants } from './types';

/**
 * Avatar component displays a user's profile picture or their initials as a fallback.
 * The component supports different shapes (circle or square) and will automatically
 * generate initials from the provided text if no image is available.
 *
 * @component
 *
 * @param props {@link IAvatarProps} - The component props
 *
 * @example
 * // Basic usage with image
 * <Avatar imageUrl="https://example.com/avatar.jpg" />
 *
 * @example
 * // With fallback text (will show initials)
 * <Avatar text="John Doe" />
 *
 * @example
 * // With specified shape
 * <Avatar text="John Doe" shape="square" />
 *
 * @example
 * // With forwarded ref
 * import { useRef } from 'react';
 * const avatarRef = useRef(null);
 * <Avatar ref={avatarRef} imageUrl="https://example.com/avatar.jpg" />
 *
 * @returns {JSX.Element} Avatar component
 */
const Avatar: React.FC<IAvatarProps & Pick<React.ComponentPropsWithRef<typeof Root>, 'ref'>> =
  /**
   * @param props - Component props
   * @param ref - Forwarded ref
   */
  ({ ref, imageUrl, text, shape = 'circle' }) => {
    // Ensure text is maximum 2 characters
    const displayText = useMemo(() => getNameInitials(text), [text]);

    return (
      <BaseAvatar ref={ref} className={shapeVariants[shape]}>
        {imageUrl && <AvatarImage src={imageUrl} alt={text || 'N/A'} />}
        <AvatarFallback className={shapeVariants[shape]}>{displayText}</AvatarFallback>
      </BaseAvatar>
    );
  };

Avatar.displayName = 'Avatar';

export default Avatar;
