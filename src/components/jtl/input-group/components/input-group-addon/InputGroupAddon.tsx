import React, { useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import IInputGroupAddonProps from './IInputGroupAddonProps';
import { useInputGroupContext } from '../../hooks';
import { InputGroupAddonAlign, InputGroupAddonChild, InputGroupSide } from '../../types';
import { getAlignOrder, isValidAddonChild, warnInvalidChild } from '../../utils';
import { InputGroupAddonProvider } from '../../context/InputGroupAddonContext';
import { VALID_ADDON_CHILDREN } from '../../constants';

const addonBaseClass = 'flex items-center shrink-0';
/**
 * Alignment-specific styles for positioning and visual treatment
 * Outline positions: Outside the main border
 * Inline positions: Inside the visual boundary with the control
 */
const alignStyles: Record<InputGroupAddonAlign, { base: string; default: string; sm: string; xs: string }> = {
  'outline-left': {
    base: cn(
      addonBaseClass,
      // External addons have their own border and background
      '[&>*]:rounded-l-[var(--border-radius-md)] [&>*]:rounded-r-none',
    ),
    default: '',
    sm: '',
    xs: '',
  },
  'inline-left': {
    base: cn(addonBaseClass, 'text-[var(--muted-foreground)]'),
    default: '',
    sm: '',
    xs: '',
  },
  'inline-right': {
    base: cn(addonBaseClass, 'text-[var(--muted-foreground)]'),
    default: '',
    sm: '',
    xs: '',
  },
  'outline-right': {
    base: cn(
      addonBaseClass,
      // External addons have their own border and background
      '[&>*]:rounded-r-[var(--border-radius-md)] [&>*]:rounded-l-none',
    ),
    default: '',
    sm: '',
    xs: '',
  },
};

/**
 * InputGroupAddon component - The structural catalyst for InputGroup addons.
 *
 * Handles physical space and alignment based on the assigned position:
 * - Outline positions (1 & 5): Outside the main input border
 * - Inline positions (2 & 4): Inside the visual boundary
 *
 * @param props {@link IInputGroupAddonProps} - Props for the InputGroupAddon component
 * @returns The rendered InputGroupAddon component
 *
 * @example
 * ```tsx
 * // External prepend (Slot 1)
 * <InputGroupAddon align="outline-left">
 *   <InputGroupButton>Action</InputGroupButton>
 * </InputGroupAddon>
 * ```
 *
 * @example
 * ```tsx
 * // Internal start (Slot 2) - icon
 * <InputGroupAddon align="inline-left">
 *   <InputGroupIcon name="Dollar" size={16} />
 * </InputGroupAddon>
 * ```
 *
 * @example
 * ```tsx
 * // Internal end (Slot 4) - multiple elements
 * <InputGroupAddon align="inline-right">
 *   <InputGroupBadge>Badge</InputGroupBadge>
 *   <InputGroupButton>Button</InputGroupButton>
 * </InputGroupAddon>
 * ```
 */
const InputGroupAddon: React.FC<IInputGroupAddonProps> = ({ children, align = 'inline-right' }) => {
  // Get context values from parent InputGroup
  const { size, disabled, inputRef } = useInputGroupContext();

  // Get align-specific styles
  const alignStyle = useMemo(() => alignStyles[align], [align]);

  // Get size-specific styles from context
  const sizeStyle = useMemo(() => alignStyle[size] || alignStyle.default, [alignStyle, size]);

  /**
   * Get maximum allowed children count based on alignment
   * Outline addons (external): max 1 component
   * Inline addons (internal): max 2 components
   */
  const getMaxChildrenCount = useCallback((alignment: InputGroupAddonAlign): number => {
    return alignment.includes('outline') ? 1 : 2;
  }, []);

  /**
   * Filter children to only include valid addon components
   * Invalid children are filtered out and a warning is shown in development
   * Limits children count based on alignment type
   */
  const childrenArray = useMemo(() => {
    const validChildren: React.ReactElement<InputGroupAddonChild>[] = [];
    const maxChildren = getMaxChildrenCount(align);

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }

      if (isValidAddonChild(child, VALID_ADDON_CHILDREN as unknown as string[])) {
        validChildren.push(child as React.ReactElement<InputGroupAddonChild>);
      } else {
        warnInvalidChild(child, VALID_ADDON_CHILDREN as unknown as string[], 'InputGroupAddon');
      }
    });

    // Warn and limit children count if exceeded
    if (validChildren.length > maxChildren) {
      if (import.meta.env.MODE === 'development') {
        const alignType = align.includes('outline') ? 'outline' : 'inline';
        console.warn(
          `[InputGroupAddon] Too many children for ${alignType} addon (align="${align}"). ` +
            `Maximum allowed: ${maxChildren}, found: ${validChildren.length}. ` +
            `Only the first ${maxChildren} component(s) will be rendered.`,
        );
      }
      return validChildren.slice(0, maxChildren);
    }

    return validChildren;
  }, [children, align, getMaxChildrenCount]);

  /**
   * Context value to share with child components
   */
  const addonContextValue = useMemo(
    () => ({ side: align.includes('left') ? 'left' : ('right' as InputGroupSide), inline: align.includes('inline') }),
    [align],
  );

  /**
   * For inline addons, clicking a non-interactive element (e.g. InputGroupIcon)
   * should forward focus to the actual <input>.
   *
   * We use `mousedown` (not `click`) to intercept before the browser decides
   * where to move focus. `preventDefault()` stops the browser from shifting
   * focus away from the input (if it was already focused), then we manually
   * focus the input so the user can start typing immediately.
   *
   * Outline addons (buttons/dropdowns) manage their own focus — skip them.
   */
  const handleInlineAddonMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Only forward focus for inline addons; outline addons are interactive on their own
      if (!align.includes('inline')) return;
      // If the click target is already focusable (button, select, etc.) let it handle focus
      const target = e.target as HTMLElement;
      if (target.closest('button, [role="button"], select, a[href], input, textarea')) return;
      // Prevent browser from blurring whatever is currently focused
      e.preventDefault();
      // Forward focus to the input element
      inputRef?.current?.focus();
    },
    [align, inputRef],
  );

  /**
   * Combined styles for the addon wrapper
   */
  const addonStyles = cn(
    alignStyle.base,
    sizeStyle,
    // Add gap between elements in addon
    'gap-2',
  );

  return (
    <InputGroupAddonProvider value={addonContextValue}>
      <div
        className={addonStyles}
        style={{ order: getAlignOrder(align) }}
        data-align={align}
        data-disabled={disabled || undefined}
        onMouseDown={handleInlineAddonMouseDown}
      >
        {childrenArray}
      </div>
    </InputGroupAddonProvider>
  );
};

InputGroupAddon.displayName = 'InputGroupAddon';

export default InputGroupAddon;
