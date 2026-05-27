import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { BaseInput, BadgeContainer, InputContainer, AffixContainer } from './InputPrimitive';
import IInputProps from './IInputProps';
import { Icon } from '../icon';
import { Label } from '../label';
import { ErrorMessage } from '../error-message';
import { IconExtend } from '../icon/components';
import { InputFile, InputType } from './types';

/**
 * Input component.
 * @param props {@link IInputProps} - Props for the Input component
 * @returns The rendered Input component
 *
 * @example
 * ```tsx
 * // Basic usage with default settings (text input)
 * function App() {
 *   return <Input label="Username" placeholder="Enter your username" />;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Custom configuration with email input and description
 * function App() {
 *   return (
 *     <Input
 *       label="Email"
 *       type="email"
 *       placeholder="Enter your email"
 *       description="This is an input description."
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Layout prop: horizontal layout (label next to input)
 * <Input
 *   layout="horizontal"
 *   label="Username"
 *   placeholder="Enter username"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Layout prop: vertical layout (default - label above input)
 * <Input
 *   layout="vertical"
 *   label="Username"
 *   placeholder="Enter username"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Type prop: different input types
 * <Input type="text" label="Text" />
 * <Input type="email" label="Email" />
 * <Input type="number" label="Number" />
 * <Input type="password" label="Password" />
 * <Input type="tel" label="Phone" />
 * <Input type="url" label="Website" />
 * <Input type="file" label="Upload file" />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled input with value and onChange
 * function App() {
 *   const [value, setValue] = useState('');
 *   return (
 *     <Input
 *       label="Controlled input"
 *       value={value}
 *       onChange={(newValue) => setValue(newValue)}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Input with description
 * <Input
 *   label="Email"
 *   description="We'll never share your email with anyone else."
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Disabled input
 * <Input
 *   label="Disabled input"
 *   disabled
 *   value="Cannot be edited"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with icons
 * <Input
 *   label="Search"
 *   leftIcon="Search"
 *   placeholder="Search items..."
 * />
 *
 * <Input
 *   label="Password"
 *   type="password"
 *   rightIcon="EyeOff"
 *   placeholder="Enter password"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with prefix and suffix
 * <Input
 *   label="Price"
 *   prefix="$"
 *   placeholder="0.00"
 * />
 *
 * <Input
 *   label="Weight"
 *   suffix="kg"
 *   placeholder="Enter weight"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with notice
 * <Input
 *   label="Username"
 *   notice="Required"
 *   placeholder="Enter username"
 * />
 *
 * <Input
 *   label="Password"
 *   type="password"
 *   notice="Strong"
 *   isNoticeRight={true}
 *   placeholder="Enter password"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with error message
 * <Input
 *   label="Email"
 *   type="email"
 *   errorMessage="Please enter a valid email address"
 *   placeholder="Enter email"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with maxLength
 * <Input
 *   label="Tweet"
 *   maxLength={280}
 *   placeholder="What's happening?"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with autoComplete
 * <Input
 *   label="Email"
 *   type="email"
 *   autoComplete="email"
 *   placeholder="Enter email"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input size variants
 * <Input
 *   label="Default size"
 *   size="default"
 *   placeholder="Default input size"
 * />
 *
 * <Input
 *   label="Small size"
 *   size="sm"
 *   placeholder="Smaller input"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with event handlers
 * <Input
 *   label="Interactive input"
 *   onFocus={() => console.log('Input focused')}
 *   onBlur={() => console.log('Input blurred')}
 *   placeholder="Click me"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom configuration with email input and description
 * function App() {
 *   return (
 *     <Input
 *       label="Email"
 *       type="email"
 *       placeholder="Enter your email"
 *       description="This is an input description."
 *     />
 *   );
 * }
 * ```
 *
 */
const Input = <T extends InputType = InputType>({
  ref,
  layout = 'vertical',
  label,
  id,
  type = 'text' as T,
  value,
  inputMode = 'text',
  description,
  disabled = false,
  readOnly = false,
  name,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  maxLength,
  autoComplete,
  errorMessage,
  notice,
  isNoticeRight = false,
  size = 'default',
  isError,
  ...props
}: IInputProps<T> & React.RefAttributes<HTMLInputElement>): React.ReactElement => {
  // Control the appearance of password and use for type password only
  const [passwordAppearance, setPasswordAppearance] = useState<string | null>(null);
  const isReadOnlyState = readOnly && !disabled;
  const isEffectivelyDisabled = disabled || readOnly;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'file') {
        // For file inputs, pass the file
        (onChange as (value: InputFile) => void)?.(e.target.files);
      } else {
        // For text inputs, pass the string value
        (onChange as (value: string) => void)?.(e.target.value);
      }
    },
    [onChange, type],
  );

  const handlePasswordAppearance: React.MouseEventHandler = useCallback(() => {
    setPasswordAppearance(prev => (prev === null ? 'text' : null));
  }, []);

  return (
    <div className={cn('flex', 'relative', layout === 'horizontal' ? 'flex-row items-center gap-2' : 'flex-col gap-2')}>
      {label && (
        <Label htmlFor={id} variant="field" className={cn(!!errorMessage && 'text-[var(--danger-text)]')}>
          {label}
        </Label>
      )}

      <InputContainer
        error={!!errorMessage || isError}
        readOnly={isReadOnlyState}
        className={cn(
          'flex items-center',
          type === 'file' && 'p-0',
          prefix && 'pl-0',
          suffix && 'pr-0',
          isEffectivelyDisabled && 'pointer-events-none',
        )}
        size={size}
      >
        {type !== 'file' && (
          <>
            {prefix && <AffixContainer text={prefix} />}
            {notice && !isNoticeRight && (
              <div className={cn('flex items-center')}>
                <BadgeContainer text={notice} />
              </div>
            )}
            {leftIcon && (
              <div className={cn('flex items-center text-[var(--muted-foreground)]')}>
                <IconExtend icon={leftIcon} size={16} />
              </div>
            )}
          </>
        )}

        <BaseInput
          ref={ref}
          id={id}
          type={passwordAppearance || type}
          name={name}
          inputMode={inputMode}
          disabled={isEffectivelyDisabled}
          className={cn(isReadOnlyState && 'disabled:cursor-default disabled:opacity-100')}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...(type !== 'file' && { value })}
          {...props}
        />

        {type === 'password' && (
          <div
            className={cn('text-inherit', !isEffectivelyDisabled && 'cursor-pointer')}
            onClick={!isEffectivelyDisabled ? handlePasswordAppearance : undefined}
          >
            <Icon name={passwordAppearance === 'text' ? 'Eye' : 'EyeOff'} size={16} />
          </div>
        )}

        {type !== 'file' && (
          <>
            {rightIcon && (
              <div className={cn('flex items-center text-[var(--muted-foreground)]')}>
                <IconExtend icon={rightIcon} size={16} />
              </div>
            )}
            {notice && isNoticeRight && (
              <div className={cn('flex items-center')}>
                <BadgeContainer text={notice} />
              </div>
            )}
            {suffix && <AffixContainer text={suffix} isSuffix />}
          </>
        )}
      </InputContainer>

      {description && (
        <div className="flex text-sm">
          <p className="text-[var(--muted-foreground)]">{description}</p>
        </div>
      )}
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
Input.displayName = 'Input';

export default Input;
