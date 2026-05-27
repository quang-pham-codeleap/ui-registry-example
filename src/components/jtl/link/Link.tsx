import React, { isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip } from '../tooltip';
import ILinkProps from './ILinkProps';
import { IconExtend } from '../icon/components';
import { Box } from '../box';

const NO_HOVER_TAG = ['button'];

const ICON_SIZE = 16;
/**
 * Link component that renders a clickable link with various styles and behaviors.
 * @param props {@link ILinkProps} - Props for the Link component
 * @returns The rendered link component
 *
 * @example
 * ```tsx
 * // Default
 * function App() {
 *   return (
 *     <Link url="/">
 *       Link
 *     </Link>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Monochrome
 * function App() {
 *   return (
 *     <Link url="/" isMonochrome>
 *       Link
 *     </Link>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With icon
 * function App() {
 *   return (
 *     <Link url="/" icon="ArrowRight">
 *       Link
 *     </Link>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With underline
 * function App() {
 *   return (
 *     <Link url="/" hasUnderline>
 *       Link
 *     </Link>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // External URL
 * function App() {
 *   return (
 *     <Link url="/" target="_blank">
 *       Link
 *     </Link>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With onClick
 * function App() {
 *   return (
 *     <Link url="/" onClick={() => console.log('Link clicked')}>
 *       Link
 *     </Link>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With truncation (ellipsis + tooltip when overflowing)
 * function App() {
 *   return (
 *     <Link url="/" truncate>
 *       A very long link label that should be truncated
 *     </Link>
 *   );
 * }
 * ```
 */
const Link: React.FC<ILinkProps & React.RefAttributes<HTMLAnchorElement>> = ({
  ref,
  url,
  target = '_self',
  isMonochrome = false,
  hasUnderline = false,
  onClick,
  id,
  icon,
  children,
  iconPosition = 'right',
  truncate = false,
  ...props
}) => {
  const isExternal = target === '_blank';
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!truncate || !textRef.current) return;

    const el = textRef.current;
    const checkTruncation = () => {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    };

    checkTruncation();

    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [children, truncate]);

  const iconElement = icon ? <IconExtend icon={icon} size={ICON_SIZE} /> : null;

  /**
   * Determines if the link's children contain an element that should disable the hover underline effect.
   * Checks for:
   * - Native HTML elements (e.g. <button>)
   * - Custom components (e.g. identified by displayName 'Button')
   *
   * Returns true if any child matches the no-hover criteria, otherwise false.
   */
  const noHoverStyle = useMemo(
    () =>
      React.Children.toArray(children).some(child => {
        if (isValidElement(child)) {
          // Check for Native HTML elements
          if (NO_HOVER_TAG.includes(child.type as string)) {
            return true;
          }

          // Check for Custom components by displayName
          if (['function', 'object'].includes(typeof child.type)) {
            const componentType = child.type as React.ComponentType;
            const displayName = componentType.displayName?.toLowerCase();
            if (displayName && NO_HOVER_TAG.includes(displayName)) {
              return true;
            }
          }
        }
        return false;
      }),
    [children],
  );

  const leftIcon = iconPosition === 'left' ? iconElement : null;
  const rightIcon = iconPosition === 'right' ? iconElement : null;

  const anchor = (
    <a
      ref={ref}
      href={url}
      target={target}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      id={id}
      className={cn(
        'inline-flex items-center gap-1 transition-colors duration-200',
        truncate && 'max-w-full min-w-0',
        !noHoverStyle && 'hover:underline',
        'ring-offset-[var(--background)] focus:outline-none focus:ring-1 focus:ring-offset-2',
        isMonochrome
          ? [
              'text-[var(--foreground)]',
              !noHoverStyle && 'hover:text-[var(--foreground)]',
              'focus:text-[var(--foreground)] focus:ring-[var(--foreground)]',
            ]
          : ['text-[var(--highlight)]', !noHoverStyle && 'hover:text-[var(--highlight)]', 'focus:ring-[var(--highlight)]'],
        hasUnderline && 'underline',
      )}
      tabIndex={0}
      {...props}
    >
      {leftIcon}
      {truncate ? (
        <Box as="span" ref={textRef} className="flex-1 truncate">
          {children}
        </Box>
      ) : (
        children
      )}
      {rightIcon}
    </a>
  );

  if (!truncate) {
    return anchor;
  }

  const tooltipContent = typeof children === 'string' ? children : (textRef.current?.textContent ?? '');

  return (
    <Tooltip content={tooltipContent} hidden={!isOverflowing} delayDuration={300} asChild>
      {anchor}
    </Tooltip>
  );
};
Link.displayName = 'Link';

export default Link;
