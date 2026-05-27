import React, { useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';
import { InputGroupProvider } from './context';
import IInputGroupProps from './IInputGroupProps';
import { inputGroupSizes } from './types';
import { useInputGroup } from './hooks';

/**
 * InputGroup component - The root container that manages the overall visual state.
 *
 * Implements the 5-Slot Spatial Model:
 * - Slot 1 (outline-left): External Prepend - outside main border, left side
 * - Slot 2 (inline-left): Internal Start - inside visual boundary, left side
 * - Slot 3: InputGroupInput - the core data-entry atom (direct child, not in InputGroupAddon)
 * - Slot 4 (inline-right): Internal End - inside visual boundary, right side
 * - Slot 5 (outline-right): External Append - outside main border, right side
 *
 * @param props {@link IInputGroupProps} - Props for the InputGroup component
 * @returns The rendered InputGroup component
 *
 * @example
 * ```tsx
 * // Basic usage with external prepend button
 * <InputGroup>
 *   <InputGroupInput placeholder="Search or enter URL..." />
 *   <InputGroupAddon align="outline-left">
 *     <InputGroupButton>Action</InputGroupButton>
 *   </InputGroupAddon>
 * </InputGroup>
 * ```
 *
 * @example
 * ```tsx
 * // With internal addons (icon + input + dropdown)
 * <InputGroup>
 *   <InputGroupInput placeholder="Search..." />
 *   <InputGroupAddon align="inline-left">
 *     <InputGroupIcon name="Search" size={16} />
 *   </InputGroupAddon>
 *   <InputGroupAddon align="inline-right">
 *     <InputGroupDropdown>Options</InputGroupDropdown>
 *   </InputGroupAddon>
 * </InputGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Full example with all slots
 * <InputGroup>
 *   <InputGroupInput placeholder="Enter amount..." />
 *   <InputGroupAddon align="outline-left">
 *     <InputGroupButton>Action</InputGroupButton>
 *   </InputGroupAddon>
 *   <InputGroupAddon align="inline-left">
 *     <InputGroupIcon name="Dollar" size={16} />
 *   </InputGroupAddon>
 *   <InputGroupAddon align="inline-right">
 *     <InputGroupBadge>Badge</InputGroupBadge>
 *     <InputGroupTooltip>Help text</InputGroupTooltip>
 *   </InputGroupAddon>
 *   <InputGroupAddon align="outline-right">
 *     <InputGroupDropdown>Currency</InputGroupDropdown>
 *   </InputGroupAddon>
 * </InputGroup>
 * ```
 */
const InputGroup: React.FC<IInputGroupProps> = props => {
  const {
    size = 'default',
    disabled = false,
    readOnly = false,
    // Input props that will be passed to InputGroupInput
    id,
    type,
    value,
    inputMode,
    name,
    placeholder,
    maxLength,
    autoComplete,
    isError,
    onChange,
    mask,
  } = props;
  const isReadOnlyState = readOnly && !disabled;

  /**
   * Use the filtered children array with the hook
   */
  const { inlineContent, outlineLeftAddons, outlineRightAddons, isFocused, setIsFocused, handleBlur, handleFocus } = useInputGroup(props);

  /**
   * Input props to pass via context to InputGroupInput
   */
  const inputProps = useMemo(
    () => ({
      id,
      type,
      value,
      inputMode,
      name,
      placeholder,
      maxLength,
      autoComplete,
      readOnly,
      onChange,
      mask,
    }),
    [id, type, value, inputMode, name, placeholder, maxLength, autoComplete, onChange, readOnly, mask],
  );

  // Ref to the underlying <input> element — shared via context so inline addons
  // (icon, badge, text) can forward click-focus to the input.
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Get size-specific styles
  const sizeStyles = useMemo(() => inputGroupSizes[size], [size]);

  /**
   * Context value to share with child components
   */
  const contextValue = useMemo(
    () => ({
      size,
      isError,
      disabled,
      readOnly: isReadOnlyState,
      isFocused,
      setIsFocused,
      inputProps,
      // Stable ref object — its identity never changes so it's safe in deps
      inputRef,
    }),
    [size, isError, isReadOnlyState, isFocused, inputProps, setIsFocused, inputRef, disabled],
  );

  /**
   * Outer container styles
   * No padding when outline addons are present (button/dropdown)
   */
  const containerStyles = useMemo(
    () =>
      cn(
        // Base layout
        'group group-input',
        'inline-flex items-stretch w-full',
        // Disabled state — cursor/pointer-events on outer container, opacity is scoped to inner container only
        disabled && 'cursor-not-allowed pointer-events-none',
        isReadOnlyState && 'cursor-default pointer-events-none',
        // Focus ring styles
        'outline outline-transparent outline-[1px]',
        'transition-all duration-200',
        // Focus state
        isFocused && !isError && 'outline-[var(--ring)] outline-offset-2',
        // Border radius - adjusted based on outline addons presence
        'rounded-[var(--border-radius-md)]',
        // Error state
        isError && 'outline-[var(--ring-error)] outline-offset-2',
      ),
    [disabled, isReadOnlyState, isFocused, isError],
  );

  /**
   * Inner container styles for inline addons + base input
   * Handles border, background, focus ring, and gap
   */
  const innerContainerStyles = useMemo(
    () =>
      cn(
        // Base layout with gap for spacing between inline elements
        'inline-flex items-center flex-1 min-w-0',
        'gap-2',
        'px-3',
        // Border and background
        'border border-[var(--input)]',
        'bg-[var(--background)]',
        isReadOnlyState && 'border-[var(--border)] bg-[var(--muted)]',
        // Height based on size
        sizeStyles.height,
        // Border radius - adjusted based on outline addons presence
        'rounded-[var(--border-radius-md)]',
        // Remove left radius when has outline-left addon
        outlineLeftAddons.length > 0 && 'rounded-l-none',
        // Remove right radius when has outline-right addon
        outlineRightAddons.length > 0 && 'rounded-r-none',
      ),
    [outlineLeftAddons.length, outlineRightAddons.length, sizeStyles.height, isReadOnlyState],
  );

  return (
    <InputGroupProvider value={contextValue}>
      <div
        className={containerStyles}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-disabled={disabled || undefined}
        data-error={isError}
        data-focused={isFocused || undefined}
        data-readonly={isReadOnlyState || undefined}
      >
        {/* Outline left addons (order: 1) — wrapper scopes opacity to external addons only */}
        <div className={cn('inline-flex items-stretch', disabled && 'opacity-50')} style={{ order: 1 }}>
          {outlineLeftAddons}
        </div>

        {/* Inner container for inline content (order: 3) */}
        <div className={innerContainerStyles} style={{ order: 3 }} data-inner-container>
          {inlineContent}
        </div>

        {/* Outline right addons (order: 5) — wrapper scopes opacity to external addons only */}
        <div className={cn('inline-flex items-stretch', disabled && 'opacity-50')} style={{ order: 5 }}>
          {outlineRightAddons}
        </div>
      </div>
    </InputGroupProvider>
  );
};

InputGroup.displayName = 'InputGroup';

export default InputGroup;
