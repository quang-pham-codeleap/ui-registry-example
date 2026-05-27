import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip } from '../../../tooltip';
import { Icon } from '../../../icon';
import IInputGroupTooltipProps from './IInputGroupTooltipProps';
import { InputGroupAddonWrapper } from '../input-group-addon-wrapper';

/**
 * Default icon size for InputGroupTooltip
 */
const DEFAULT_ICON_SIZE = 16;

/**
 * InputGroupTooltip component wraps the Tooltip component for hover/focus guidance.
 * Displays an info icon that reveals helpful information on hover.
 *
 * @param props {@link IInputGroupTooltipProps} - Props for the InputGroupTooltip component
 * @returns The rendered InputGroupTooltip component
 *
 * @example
 * ```tsx
 * // Basic tooltip with info icon
 * <InputGroup>
 *   <InputGroupInput placeholder="Enter value" />
 *   <InputGroupTooltip content="This field accepts alphanumeric values" />
 * </InputGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Tooltip with custom icon and positioning
 * <InputGroup>
 *   <InputGroupInput placeholder="Password" type="password" />
 *   <InputGroupTooltip
 *     content="Password must be at least 8 characters"
 *     icon="HelpCircle"
 *     side="right"
 *   />
 * </InputGroup>
 * ```
 */
const InputGroupTooltip: React.FC<IInputGroupTooltipProps> = ({
  content,
  icon = 'Info',
  iconSize = DEFAULT_ICON_SIZE,
  side: tooltipSide = 'right',
  align = 'center',
  sideOffset = 4,
  delayDuration = 0,
}) => {
  return (
    <Tooltip content={content} side={tooltipSide} align={align} sideOffset={sideOffset} delayDuration={delayDuration}>
      <InputGroupAddonWrapper className={cn('cursor-help', 'text-[var(--muted-foreground)]', 'hover:text-[var(--foreground)]', 'transition-colors')}>
        <Icon name={icon} size={iconSize} />
      </InputGroupAddonWrapper>
    </Tooltip>
  );
};

InputGroupTooltip.displayName = 'InputGroupTooltip';

export default InputGroupTooltip;
