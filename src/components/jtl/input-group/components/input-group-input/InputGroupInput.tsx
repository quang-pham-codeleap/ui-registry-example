import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { BaseInput } from '../../../input/InputPrimitive';
import { InputFile, InputType } from '../../../input/types';
import { inputGroupSizes } from '../../types';
import IInputGroupInputProps from './IInputGroupInputProps';
import { useInputGroupContext } from '../../hooks';
import { pickFieldAriaProps } from '@/utils';
import { useInputMask } from '../../../input/hooks';

/**
 * InputGroupInput component - The core data-entry atom (Slot 3).
 * Handles value and onChange events, displays border and focus ring.
 *
 * This component is a direct child of InputGroup (not wrapped in InputGroupAddon).
 * It automatically takes up remaining space and handles focus ring visualization.
 *
 * @param props {@link IInputGroupInputProps} - Props for the InputGroupInput component
 * @returns The rendered InputGroupInput component
 *
 * @example
 * ```tsx
 * // Basic usage within InputGroup
 * <InputGroup>
 *   <InputGroupInput placeholder="Search or enter URL..." />
 *   <InputGroupAddon align="inline-left">
 *     <InputGroupIcon name="Search" size={16} />
 *   </InputGroupAddon>
 * </InputGroup>
 * ```
 */
const InputGroupInput = <T extends InputType = InputType>({
  ref,
  id: propsId,
  type: propsType,
  value: propsValue,
  inputMode: propsInputMode,
  disabled: propsDisabled,
  readOnly: propsIsReadOnly,
  name: propsName,
  placeholder: propsPlaceholder,
  onChange: propsOnChange,
  onFocus,
  onBlur,
  maxLength: propsMaxLength,
  autoComplete: propsAutoComplete,
  mask: propsMask,
  ...props
}: IInputGroupInputProps<T> & React.RefAttributes<HTMLInputElement>): React.ReactElement => {
  // Get context values from parent InputGroup
  const { size, disabled: contextDisabled, readOnly: contextIsReadOnly, inputProps, inputRef: contextInputRef } = useInputGroupContext();

  /**
   * Combine contextInputRef + forwarded ref. Renamed to contextMergedRef so
   * useInputMask can wrap it further with the IMask ref.
   */
  const contextMergedRef = useCallback(
    (el: HTMLInputElement | null) => {
      // Update context ref so inline addons can call .focus()
      if (contextInputRef) {
        (contextInputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
      }
      // Forward to the external ref passed by the consumer
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        (ref as React.RefObject<HTMLInputElement | null>).current = el;
      }
    },
    [ref, contextInputRef],
  );

  // Merge context input props with direct props (direct props take precedence)
  const id = propsId ?? inputProps?.id;
  const type = (propsType ?? inputProps?.type ?? 'text') as T;
  const value = propsValue ?? inputProps?.value;
  const inputMode = propsInputMode ?? inputProps?.inputMode ?? 'text';
  const name = propsName ?? inputProps?.name;
  const placeholder = propsPlaceholder ?? inputProps?.placeholder;
  const maxLength = propsMaxLength ?? inputProps?.maxLength;
  const autoComplete = propsAutoComplete ?? inputProps?.autoComplete;
  const onChange = propsOnChange ?? inputProps?.onChange;
  const isReadOnly = propsIsReadOnly ?? inputProps?.readOnly ?? contextIsReadOnly;
  const mask = propsMask ?? inputProps?.mask;

  // Forward aria-* props from context to the underlying <input> element.
  // These are injected by FieldControl / FormControl for a11y integration.
  // Direct ...props spread below wins when the same key exists on both.
  const ariaPropsFromContext = pickFieldAriaProps(inputProps ?? {});

  // Use props disabled or context disabled
  const disabled = propsDisabled ?? contextDisabled;
  const isReadOnlyState = Boolean(isReadOnly && !disabled);

  // Get size-specific styles
  const sizeStyles = inputGroupSizes[size];

  /**
   * Handle input change events
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'file') {
        (onChange as (value: InputFile) => void)?.(e.target.files);
      } else {
        (onChange as (value: string) => void)?.(e.target.value);
      }
    },
    [onChange, type],
  );

  /**
   * Handle focus events — only forward the event to the consumer.
   * Focus state is managed by the container-level handlers in useInputGroup,
   * which use contains() to correctly track intra-group focus moves.
   * Calling setIsFocused here would fight the container handler and cause
   * 2 renders + visible focus ring flicker on every intra-group focus move.
   */
  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
    },
    [onFocus],
  );

  /**
   * Handle blur events — only forward the event to the consumer.
   * See handleFocus comment for why setIsFocused is not called here.
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    },
    [onBlur],
  );

  // Merges contextMergedRef + IMask ref when mask is active
  const { mergedRef, isMasked } = useInputMask({
    mask: type !== 'file' ? mask : undefined,
    ref: contextMergedRef,
    onChange: onChange as (value: string) => void | undefined,
  });

  /**
   * Input wrapper styles
   * Border, background, focus ring are handled by parent inner container
   */
  const inputStyles = cn(
    // Base layout - takes remaining space
    'flex',
    'flex-1 min-w-0 items-center',
    // Height based on size
    sizeStyles.height,
    // Font styles
    sizeStyles.fontSize,
    sizeStyles.lineHeight,
    // Disabled state
    disabled && 'cursor-not-allowed',
    isReadOnlyState && 'cursor-default',
    // File input specific
    type === 'file' && 'p-0',
  );

  return (
    <div className={inputStyles} style={{ order: 3 }} data-control>
      <BaseInput
        ref={mergedRef}
        id={id}
        type={type}
        name={name}
        inputMode={inputMode}
        disabled={disabled}
        className={cn(isReadOnlyState && 'disabled:cursor-default disabled:opacity-100')}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...(!isMasked && { onChange: handleChange, maxLength })}
        {...(type !== 'file' && { value })}
        {...ariaPropsFromContext}
        {...props}
      />
    </div>
  );
};

InputGroupInput.displayName = 'InputGroupInput';

export default InputGroupInput;
