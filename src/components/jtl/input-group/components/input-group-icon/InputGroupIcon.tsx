import React from 'react';
import { Icon } from '../../../icon';
import IInputGroupIconProps from './IInputGroupIconProps';
import { InputGroupAddonWrapper } from '../input-group-addon-wrapper';

/**
 * Default icon size for InputGroupIcon
 */
const DEFAULT_ICON_SIZE = 16;

/**
 * InputGroupIcon component wraps the Icon component for pixel-perfect visual cues.
 * Typically used as inline addons for search icons, validation indicators, etc.
 *
 * @param props {@link IInputGroupIconProps} - Props for the InputGroupIcon component
 * @returns The rendered InputGroupIcon component
 *
 * @example
 * ```tsx
 * // Search icon inside input
 * <InputGroup>
 *   <InputGroupIcon name="Search" />
 *   <InputGroupInput placeholder="Search..." />
 * </InputGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Validation checkmark
 * <InputGroup>
 *   <InputGroupInput value="valid@email.com" />
 *   <InputGroupIcon name="CheckCircle" color="var(--success-text)" />
 * </InputGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Loading spinner
 * <InputGroup>
 *   <InputGroupInput placeholder="Loading..." />
 *   <InputGroupIcon name="LoaderCircle" animation="spin" />
 * </InputGroup>
 * ```
 */
const InputGroupIcon: React.FC<IInputGroupIconProps> = ({ name, animation, color, size = DEFAULT_ICON_SIZE }) => {
  return (
    <InputGroupAddonWrapper className="text-[var(--muted-foreground)]">
      <Icon name={name} size={size} animation={animation} color={color} />
    </InputGroupAddonWrapper>
  );
};

InputGroupIcon.displayName = 'InputGroupIcon';

export default InputGroupIcon;
