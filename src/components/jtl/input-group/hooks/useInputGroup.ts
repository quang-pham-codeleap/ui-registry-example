import React, { useState, useMemo, useCallback } from 'react';
import { InputGroupAddonAlign } from '../types';
import IInputGroupProps from '../IInputGroupProps';
import { isValidAddonChild, warnInvalidChild } from '../utils';

/**
 * Custom hook for InputGroup component
 */
export default function useInputGroup({ children, onFocus, onBlur }: IInputGroupProps) {
  // Track focus state for the entire group
  const [isFocused, setIsFocused] = useState(false);

  /**
   * Filter children to only include valid addon components
   * Invalid children are filtered out and a warning is shown in development
   * Ensures each InputGroupAddon align variant appears only once
   */
  const childrenArray = useMemo(() => {
    const validChildren: React.ReactElement[] = [];
    const seenAlignments = new Set<string>();

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }

      if (isValidAddonChild(child, ['InputGroupAddon', 'InputGroupInput'])) {
        // Check if this is an InputGroupAddon with an align prop
        const displayName = (child.type as { displayName?: string })?.displayName;

        if (displayName === 'InputGroupAddon') {
          const align = (child.props as { align?: string })?.align || 'inline-right';

          if (align) {
            // Check if this alignment has already been used
            if (seenAlignments.has(align)) {
              console.warn(
                `[InputGroup] Duplicate InputGroupAddon with align="${align}" detected. ` +
                  `Each align variant can only appear once. This duplicate will be ignored.`,
              );
              return;
            }
            seenAlignments.add(align);
          }
        }

        validChildren.push(child);
      } else {
        warnInvalidChild(child, ['InputGroupAddon', 'InputGroupInput'], 'InputGroup');
      }
    });

    return validChildren;
  }, [children]);

  /**
   * Separate children into outline addons and inline content
   * Outline addons: outline-left, outline-right (displayed outside border)
   * Inline content: inline-left, InputGroupInput, inline-right (displayed inside border)
   */
  const { outlineAddons, inlineContent, hasOutlineAddon } = useMemo(() => {
    const outline: React.ReactNode[] = [];
    const inline: React.ReactNode[] = [];
    let hasOutline = false;

    React.Children.forEach(childrenArray, child => {
      if (!React.isValidElement<{ align?: InputGroupAddonAlign }>(child)) {
        return;
      }

      // Check if it's an InputGroupAddon with outline alignment
      const align = child.props?.align as string | undefined;
      if (align === 'outline-left' || align === 'outline-right') {
        outline.push(child);
        hasOutline = true;
      } else {
        // InputGroupInput or inline addons go into inner container
        inline.push(child);
      }
    });

    return { outlineAddons: outline, inlineContent: inline, hasOutlineAddon: hasOutline };
  }, [childrenArray]);

  /**
   * Handle focus entering the group
   */
  const handleFocus = useCallback(
    (event: React.FocusEvent) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  /**
   * Handle focus leaving the group
   */
  const handleBlur = useCallback(
    (event: React.FocusEvent) => {
      // Only blur if focus is leaving the entire group
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        setIsFocused(false);
        onBlur?.(event);
      }
    },
    [onBlur],
  );

  /**
   * Filter outline addons by alignment
   */
  const outlineLeftAddons = useMemo(
    () => outlineAddons.filter(addon => React.isValidElement<{ align?: InputGroupAddonAlign }>(addon) && addon.props?.align === 'outline-left'),
    [outlineAddons],
  );
  const outlineRightAddons = useMemo(
    () => outlineAddons.filter(addon => React.isValidElement<{ align?: InputGroupAddonAlign }>(addon) && addon.props?.align === 'outline-right'),
    [outlineAddons],
  );

  return {
    isFocused,
    outlineAddons,
    inlineContent,
    hasOutlineAddon,
    handleFocus,
    handleBlur,
    setIsFocused,
    outlineLeftAddons,
    outlineRightAddons,
  };
}
