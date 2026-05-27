import React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Dot } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Base OTP input component that wraps the input-otp OTPInput component
 * Provides styling and accessibility features
 */
const BaseInputOTP: React.FC<React.ComponentPropsWithRef<typeof OTPInput>> = ({ ref, className, containerClassName, ...props }) => (
  <OTPInput
    ref={ref}
    containerClassName={cn('flex items-center gap-2 has-[:disabled]:opacity-50', containerClassName)}
    className={cn('disabled:cursor-not-allowed !opacity-0', className)}
    {...props}
  />
);
BaseInputOTP.displayName = 'BaseInputOTP';

/**
 * Group container for OTP input slots
 * Used to organize slots into logical groups
 */
const InputOTPGroup: React.FC<React.ComponentPropsWithRef<'div'>> = ({ ref, className, ...props }) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
);
InputOTPGroup.displayName = 'InputOTPGroup';

/**
 * Individual slot for a single OTP character
 * Shows the character and a blinking caret when active
 */
const InputOTPSlot: React.FC<React.ComponentPropsWithRef<'div'> & { index: number; isError?: boolean }> = ({
  ref,
  index,
  className,
  isError,
  ...props
}) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        [
          'relative',
          'flex',
          'h-9',
          'w-9',
          'items-center',
          'justify-center',
          'border-y',
          'border-r',
          'border-(--border)',
          'text-[length:var(--typography-base-sizes-small-font-size)]',
          'font-normal',
          'leading-[var(--typography-base-sizes-small-line-height)]',
          'transition-all',
          'first:rounded-l-md',
          'first:border-l',
          'last:rounded-r-md',
          isError && 'border-y-[2px] border-r-[2px] first:border-l-[2px] border-(--danger-border) text-[var(--danger-text)]',
        ],
        isActive && `${isError ? 'border-2' : 'border'} border-(--ring)`,
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-[var(--foreground)] duration-1000" />
        </div>
      )}
    </div>
  );
};
InputOTPSlot.displayName = 'InputOTPSlot';

/**
 * Separator component displayed between OTP input groups
 * Provides visual separation between groups of digits
 */
const InputOTPSeparator: React.FC<React.ComponentPropsWithRef<'div'>> = ({ ref, ...props }) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
);
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { BaseInputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
