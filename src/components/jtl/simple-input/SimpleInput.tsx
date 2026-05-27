import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { BaseInput, InputFile, InputType } from '../input';
import { InputContainer } from '../input/InputPrimitive';
import { useInputMask } from '../input/hooks';
import ISimpleInputProps from './ISimpleInputProps';

/**
 * SimpleInput — a bare input element with no built-in label, description, or error message UI.
 *
 * Use this with {@link Field}, {@link FieldLabel}, {@link FieldControl}, and {@link FieldDescription}
 * to build composable form controls. For the legacy all-in-one component, use {@link Input} instead.
 *
 * @param props {@link ISimpleInputProps} - Props for the SimpleInput component
 * @returns The rendered SimpleInput component
 *
 * @example
 * ```tsx
 * // Standalone usage (no label)
 * <SimpleInput placeholder="Enter text" />
 * ```
 *
 * @example
 * ```tsx
 * // Composed with Field for full form control
 * <Field name="email" control={form.control}>
 *   <FieldLabel>Email</FieldLabel>
 *   <FieldControl>
 *     <SimpleInput type="email" placeholder="you@example.com" />
 *   </FieldControl>
 *   <FieldDescription>We'll never share your email.</FieldDescription>
 * </Field>
 * ```
 *
 * @example
 * ```tsx
 * // Error state
 * <SimpleInput isError placeholder="Invalid value" />
 * ```
 *
 * @example
 * ```tsx
 * // Size variants
 * <SimpleInput size="default" placeholder="Default size" />
 * <SimpleInput size="sm" placeholder="Small size" />
 * ```
 *
 * @example
 * ```tsx
 * // File input
 * <SimpleInput
 *   type="file"
 *   onChange={(files) => console.log(files)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Phone input with IMask pattern
 * <SimpleInput
 *   type="tel"
 *   mask="(+49) 000-000-000"
 *   placeholder="Phone number"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
const SimpleInput = <T extends InputType = InputType>({
  ref,
  id,
  type = 'text' as T,
  value,
  inputMode = 'text',
  disabled = false,
  readOnly = false,
  name,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  maxLength,
  autoComplete,
  size = 'default',
  isError,
  mask,
  ...props
}: ISimpleInputProps<T> & React.RefAttributes<HTMLInputElement>): React.ReactElement => {
  const isReadOnlyState = readOnly && !disabled;
  const isEffectivelyDisabled = disabled || readOnly;

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

  const { mergedRef, isMasked } = useInputMask({
    mask: type !== 'file' ? mask : undefined,
    ref,
    onChange: onChange as (value: string) => void | undefined,
  });

  return (
    <InputContainer
      error={isError}
      readOnly={isReadOnlyState}
      className={cn('flex items-center', type === 'file' && 'p-0', isEffectivelyDisabled && 'pointer-events-none')}
      size={size}
    >
      <BaseInput
        ref={mergedRef}
        id={id}
        type={type}
        name={name}
        inputMode={inputMode}
        disabled={isEffectivelyDisabled}
        className={cn(isReadOnlyState && 'disabled:cursor-default disabled:opacity-100')}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onFocus={onFocus}
        onBlur={onBlur}
        {...(!isMasked && { onChange: handleChange, maxLength })}
        {...(type !== 'file' && !isMasked && { value })}
        {...props}
      />
    </InputContainer>
  );
};
SimpleInput.displayName = 'SimpleInput';

export default SimpleInput;
