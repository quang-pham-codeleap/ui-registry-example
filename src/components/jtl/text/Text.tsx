import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type ITextProps from './ITextProps';
import type { TypographyVariant } from './types';
import { typographyVariants, fontWeightVariants, textAlignVariants, textColorVariants } from './types';
import { Tooltip } from '../tooltip';

/**
 * List of paragraph types
 */
const PARAGRAPH_TYPES: TypographyVariant[] = ['body', 'large', 'small', 'muted', 'lead', 'xs'];

/**
 * Text component for consistent text styling across the application
 * Supports various text types, weights, alignments and other text modifications
 * @param props {@link ITextProps} - The props for the Text component
 * @returns The Text component
 *
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   return (
 *     <Text type="body">This is a body text</Text>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Heading types
 * function HeadingsExample() {
 *   return (
 *     <>
 *       <Text type="h1">Heading 1</Text>
 *       <Text type="h2">Heading 2</Text>
 *       <Text type="h3">Heading 3</Text>
 *       <Text type="h4">Heading 4</Text>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Different text types
 * function TextTypesExample() {
 *   return (
 *     <>
 *       <Text type="body">Body text for standard content</Text>
 *       <Text type="lead">Lead text for introductory content</Text>
 *       <Text type="large">Large text for emphasis</Text>
 *       <Text type="small">Small text for less important information</Text>
 *       <Text type="muted">Muted text for secondary information</Text>
 *       <Text type="inline-code">const example = "code";</Text>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Font weight variations
 * function FontWeightsExample() {
 *   return (
 *     <>
 *       <Text weight="regular">Regular weight text</Text>
 *       <Text weight="medium">Medium weight text</Text>
 *       <Text weight="semibold">Semibold weight text</Text>
 *       <Text weight="bold">Bold weight text</Text>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Text alignment options
 * function AlignmentExample() {
 *   return (
 *     <>
 *       <Text align="start">Left aligned text</Text>
 *       <Text align="center">Center aligned text</Text>
 *       <Text align="end">Right aligned text</Text>
 *       <Text align="justify">Justified text that spans multiple lines to demonstrate the justify alignment</Text>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Text color variations
 * function ColorExample() {
 *   return (
 *     <>
 *       <Text color="default">Default text</Text>
 *       <Text color="primary">Primary text</Text>
 *       <Text color="muted">Muted text</Text>
 *       <Text color="success">Success text</Text>
 *       <Text color="danger">Danger text</Text>
 *       <Text color="warning">Warning text</Text>
 *       <Text color="info">Info text</Text>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Special styling
 * function SpecialStylingExample() {
 *   return (
 *     <>
 *       <Text isStriked>Strikethrough text</Text>
 *       <Text truncate>This text will be truncated if it exceeds the container width</Text>
 *     </>
 *   );
 * }
 * ```
 */
const Text = ({
  type = 'body',
  isStriked = false,
  align = 'start',
  weight,
  breakWord = true,
  truncate = false,
  maxLines,
  id = null,
  children,
  color,
  isLeading = true,
  as,
}: ITextProps) => {
  // Ref to check if text is actually truncated
  const textRef = useRef<HTMLElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  /**
   * Whether multi-line truncation is active
   * Requires truncate=true and maxLines >= 1
   */
  const isMultiLineTruncate = truncate && maxLines !== undefined && maxLines >= 1;

  /**
   * Check if text is actually truncated (ellipsis shown)
   */
  useEffect(() => {
    if (!truncate || !textRef.current) {
      return;
    }

    const element = textRef.current;

    const checkTruncation = () => {
      if (element) {
        /**
         * Multi-line: check vertical OR horizontal overflow
         * (long unbroken words can overflow horizontally while scrollHeight stays equal)
         * Single-line: check horizontal overflow (scrollWidth > clientWidth)
         */
        const isOverflowing = isMultiLineTruncate
          ? element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
          : element.scrollWidth > element.clientWidth;
        setIsTruncated(isOverflowing);
      }
    };

    checkTruncation();

    // Use ResizeObserver to detect when the element itself resizes
    // This covers parent container resizing, not just window resizing
    const resizeObserver = new ResizeObserver(() => {
      checkTruncation();
    });

    resizeObserver.observe(element);

    window.addEventListener('resize', checkTruncation);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkTruncation);
    };
  }, [truncate, children, isMultiLineTruncate]);

  /**
   * Determine the HTML tag based on type
   */
  const Component = as || (PARAGRAPH_TYPES.includes(type) ? 'p' : type === 'inline-code' ? 'code' : type);

  const multiLineClampClassName = isMultiLineTruncate ? `line-clamp-[${maxLines}]` : null;

  /**
   * Apply styles to the component
   */
  const styles = cn(
    textAlignVariants[align],
    typographyVariants[type],
    color && textColorVariants[color],
    weight && fontWeightVariants[weight],
    isStriked && 'line-through',
    truncate ? `${as === 'span' ? 'w-fit' : 'w-full'}${isMultiLineTruncate ? '' : ' truncate'}` : breakWord && 'break-words',
    multiLineClampClassName,
    // Honor breakWord for multi-line truncation to prevent horizontal clipping of long URLs/tokens
    isMultiLineTruncate && breakWord && 'break-words',
    !isLeading && 'leading-none',
  );

  const textElement = React.createElement(
    Component,
    {
      id,
      className: styles,
      style: isMultiLineTruncate ? { overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: maxLines } : undefined,
      ref: truncate ? textRef : undefined,
    },
    children,
  );

  const isTooltipVisible = truncate && isTruncated && typeof children === 'string';

  return (
    <Tooltip content={children as string} hidden={!isTooltipVisible} delayDuration={300} asChild>
      {textElement}
    </Tooltip>
  );
};
Text.displayName = 'Text';

export default Text;
