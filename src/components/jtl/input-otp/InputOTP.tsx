import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { OTPInput } from 'input-otp';
import IInputOTPProps from './IInputOTPProps';
import { BaseInputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './InputOTPPrimitive';
import { alignVariants, patternVariants } from './types';
import { cn } from '@/lib/utils';
import { Label } from '../label';
import { ErrorMessage } from '../error-message';

/**
 * InputOTP - A customizable OTP input component with flexible grouping and separator options
 *
 * This component provides a user-friendly interface for entering one-time passwords or verification codes.
 * It supports different grouping patterns and can show or hide separators between groups.
 *
 * @param props {@link IInputOTPProps} - Props for the InputOTP component
 * @returns The rendered InputOTP component
 *
 * @example
 * ```tsx
 * // Basic usage with default settings (6 digits, no group, no separator)
 * function App() {
 *   return <InputOTP />;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Custom configuration with 4 digits grouped by 2
 * function App() {
 *   return <InputOTP maxLength={4} groupLength={2} />;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With separators between groups
 * function App() {
 *   return <InputOTP maxLength={6} groupLength={3} separator />;
 * }
 * ```
 */
const InputOTP: React.FC<IInputOTPProps & Pick<React.ComponentPropsWithRef<typeof OTPInput>, 'ref'>> = ({
  ref,
  maxLength = 6,
  groupLength,
  pattern,
  separator = false,
  description,
  onChange,
  value,
  disabled = false,
  label,
  alignment = 'left',
  errorMessage,
  isError,
}) => {
  // Store the previous pattern to detect changes
  const prevPatternRef = useRef(pattern);

  const handleOnChange = useCallback(
    (newValue: string) => {
      onChange?.(newValue);
    },
    [onChange],
  );

  // Effect to handle pattern changes
  useEffect(() => {
    // If pattern changed and we have a value and onChange handler
    if (prevPatternRef.current !== pattern && value && onChange) {
      // Check if current value matches the new pattern
      const inputPattern = patternVariants[pattern!];
      if (inputPattern) {
        // Filter out characters that don't match the new pattern
        const filteredValue = value
          .split('')
          .filter(char => new RegExp(inputPattern).test(char))
          .join('');

        // Only update if the value changed
        if (filteredValue !== value) {
          handleOnChange(filteredValue);
        }
      }
    }

    // Update the previous pattern reference
    prevPatternRef.current = pattern;
  }, [pattern, value, onChange, handleOnChange]);

  /**
   * Generates the children elements for the OTP input based on configuration
   * @returns React elements representing the OTP input slots and separators
   */
  const renderOtpChildren = useMemo(() => {
    // Create an array of indices from 0 to maxLength - 1
    const indices = Array.from({ length: maxLength }, (_, i) => i);

    // Validate groupLength - ensure it's not greater than maxLength
    const validGroupLength = groupLength && groupLength <= maxLength ? groupLength : undefined;

    // If groupLength is not defined or invalid, handle special cases
    if (!validGroupLength) {
      // If separator is true and groupLength is not defined, each digit gets its own group with separators
      if (separator) {
        return indices.map((index, i) => (
          <React.Fragment key={index}>
            <InputOTPGroup>
              <InputOTPSlot index={index} isError={!!errorMessage || isError} />
            </InputOTPGroup>
            {i < maxLength - 1 && <InputOTPSeparator />}
          </React.Fragment>
        ));
      }

      // If separator is false and groupLength is not defined, all digits go in one group
      return (
        <InputOTPGroup>
          {indices.map(index => (
            <InputOTPSlot key={index} index={index} isError={!!errorMessage || isError} />
          ))}
        </InputOTPGroup>
      );
    }

    // If groupLength is defined and valid, create groups of that size
    const groups = [];
    for (let i = 0; i < maxLength; i += validGroupLength) {
      const groupIndices = indices.slice(i, i + validGroupLength);
      groups.push(groupIndices);
    }

    return groups.map((group, groupIndex) => (
      <React.Fragment key={groupIndex}>
        <InputOTPGroup>
          {group.map(index => (
            <InputOTPSlot key={index} index={index} isError={!!errorMessage || isError} />
          ))}
        </InputOTPGroup>
        {separator && groupIndex < groups.length - 1 && <InputOTPSeparator />}
      </React.Fragment>
    ));
  }, [groupLength, maxLength, separator, errorMessage, isError]);

  /**
   * Renders the complete OTP input component with all necessary props
   */
  const renderInputOtp = useMemo(() => {
    const inputPattern = patternVariants[pattern!];
    const mappingProps = {
      ref,
      maxLength,
      ...(inputPattern && {
        pattern: inputPattern,
      }),
      value,
      onChange: handleOnChange,
      disabled,
    };

    // We don't use a key here to avoid remounting the component
    // Pattern changes are handled in the useEffect above
    return <BaseInputOTP {...mappingProps}>{renderOtpChildren}</BaseInputOTP>;
  }, [disabled, handleOnChange, maxLength, pattern, ref, renderOtpChildren, value]);

  return (
    <div className={cn('flex', 'flex-col', 'relative', 'items-center', alignment && alignVariants[alignment], 'gap-2')}>
      {label && (
        <Label variant="field" className={cn(!!errorMessage && 'text-[var(--danger-text)]')}>
          {label}
        </Label>
      )}
      {renderInputOtp}
      {description && <Label variant="subtitle">{description}</Label>}
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
InputOTP.displayName = 'InputOTP';

export default InputOTP;
