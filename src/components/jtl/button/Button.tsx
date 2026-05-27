import React from 'react';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import type IButtonProps from './IButtonProps';
import { buttonShapes, buttonSizes, buttonVariants } from './types';
import { IconExtend } from '../icon/components';
import { Kbd, KbdGroup } from '../kbd';

/**
 * Common variant styles for the Button component
 */
const commonVariants = {
  base: 'relative items-center justify-center text-[length:var(--typography-base-sizes-small-font-size)] font-normal leading-[var(--typography-base-sizes-small-line-height)] transition-colors [&_svg]:shrink-0',
  rounded: 'rounded-[var(--border-radius-default)]',
  states: {
    default:
      'hover:cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ring-offset)]',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
    loading: 'disabled:opacity-50 disabled:cursor-progress',
  },
};

// Constants for button sizing and configuration
const BUTTON_ICON_DEFAULT_SIZE = 16;
const BUTTON_ICON_XS_SIZE = 12;
const ICON_ONLY_SIZES = ['icon', 'iconXs', 'iconLg', 'iconSm'];
const XS_ICON_SIZES = ['xs', 'iconXs'];

/**
 * A versatile Button component that supports various sizes, variants, and states.
 * @param props {@link IButtonProps} - The component props
 * @returns The rendered button component
 *
 * @example
 * ```tsx
 * <Button label="Click me" />
 * ```
 *
 * @example
 * ```tsx
 * // Variant
 * <Button label="Click me" variant="secondary" />
 * ```
 *
 * @example
 * ```tsx
 * // Shape
 * <Button label="Click me" shape="rounded" />
 * ```
 *
 * @example
 * ```tsx
 * // Size - List of available sizes: default, icon, iconXs, iconSm, iconLg
 * <Button label="Click me" size="icon" />
 * ```
 *
 * @example
 * ```tsx
 * // Loading
 * <Button label="Click me" isLoading />
 * ```
 *
 * @example
 * ```tsx
 * // Disabled
 * <Button label="Click me" disabled />
 * ```
 *
 * @example
 * ```tsx
 * // Badge
 * <Button label="Click me" badgeNum={1} />
 * ```
 *
 * @example
 * ```tsx
 * // Full width
 * <Button label="Click me" fullWidth />
 * ```
 *
 * @example
 * ```tsx
 * // Icon only
 * <Button icon="Plus" />
 * ```
 *
 * @example
 * ```tsx
 * // Icon position
 * <Button icon="Plus" iconPosition="right" />
 * ```
 */
const Button: React.FC<IButtonProps & React.RefAttributes<HTMLButtonElement>> = ({
  size = 'default',
  variant = 'default',
  shape = 'default',
  isLoading = false,
  icon,
  iconPosition = 'left',
  disabled,
  label,
  badgeNum,
  fullWidth = false,
  shortcut,
  ref,
  ...props
}) => {
  // Determine button display characteristics
  const isIconOnlySize = ICON_ONLY_SIZES.includes(size);
  const isEmptyLabel = !label || label.trim() === '';
  const hasIconButNoLabel = icon && isEmptyLabel;
  const isIconOnly = isIconOnlySize || hasIconButNoLabel;
  const iconSize = XS_ICON_SIZES.includes(size) ? BUTTON_ICON_XS_SIZE : BUTTON_ICON_DEFAULT_SIZE;

  // Link buttons must have a text label
  if (variant === 'link' && isEmptyLabel) {
    console.warn('Button: Link variant requires a label (text content)');
    return null;
  }

  // Icon-only buttons must have an icon
  if (isIconOnly && !icon) {
    console.warn('Button: Icon-only button requires an icon prop');
    return null;
  }

  // Prepare icon elements based on position
  const leftIcon = icon && iconPosition === 'left' ? <IconExtend icon={icon} size={iconSize} /> : null;
  const rightIcon = icon && iconPosition === 'right' ? <IconExtend icon={icon} size={iconSize} /> : null;

  // Determine if left icon should be visible
  const shouldShowLeftIcon = !isLoading && leftIcon && (variant !== 'link' || Boolean(label));

  // Prepare final rendered content elements
  const leftIconContent = isLoading ? <Loader className="animate-spin" size={iconSize} /> : shouldShowLeftIcon ? leftIcon : null;
  const labelContent = !isIconOnly && (label ?? null);
  const rightIconContent = rightIcon ?? null;
  const shortcutContent =
    !isIconOnly && shortcut?.length ? (
      <KbdGroup aria-label="Keyboard shortcut">
        {shortcut.map((key, i) => (
          <React.Fragment key={`${key}-${i}`}>
            <Kbd>{key}</Kbd>
          </React.Fragment>
        ))}
      </KbdGroup>
    ) : null;

  return (
    <button
      ref={ref}
      className={cn(
        commonVariants.base,
        commonVariants.rounded,
        commonVariants.states.default,
        buttonShapes[shape],
        isLoading ? commonVariants.states.loading : disabled && commonVariants.states.disabled,
        buttonVariants[variant],
        isIconOnly ? buttonSizes[size].iconOnly : buttonSizes[size].base,
        fullWidth ? 'w-full' : '',
      )}
      disabled={disabled || isLoading}
      {...props}
      aria-keyshortcuts={shortcut?.join('+')}
      aria-busy={isLoading}
    >
      {leftIconContent}
      {labelContent}
      {rightIconContent}
      {shortcutContent}
      {Number(badgeNum) > 0 && (
        <div
          className={cn(
            'absolute -top-2 -right-2',
            'flex items-center justify-center',
            'border border-[var(--border)] rounded-[var(--border-radius-full)]',
            'bg-[var(--background)] h-5 w-5',
            'text-[var(--foreground)] text-[length:var(--typography-base-sizes-extra-small-font-size)]',
          )}
        >
          {Number(badgeNum) > 9 ? '9+' : badgeNum}
        </div>
      )}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
