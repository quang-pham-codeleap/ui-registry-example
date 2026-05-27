import React from 'react';
import { TooltipProvider, Tooltip as TooltipRoot, TooltipTrigger, TooltipContent } from './TooltipPrimitive';
import type ITooltipProps from './ITooltipProps';
import { Kbd, KbdGroup } from '../kbd';

/**
 * Tooltip component that displays additional information when hovering over an element.
 * Built on top of Radix UI's Tooltip primitive.
 * @param props {@link ITooltipProps} - The props for the Tooltip component
 * @returns The Tooltip component
 *
 * @example
 * ```tsx
 * <Tooltip content="Tooltip content">
 *   <Button label="Hover me" />
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * <Tooltip content="Bold" shortcut={['Ctrl', 'B']}>
 *   <Button label="Hover me" />
 * </Tooltip>
 * ```
 */
const Tooltip = ({
  content,
  shortcut,
  children,
  side = 'top',
  align = 'center',
  sideOffset = 4,
  hidden = false,
  delayDuration = 0,
  open,
  'aria-keyshortcuts': callerAriaKeyShortcuts,
  ...rest
}: ITooltipProps) => {
  const tooltipContent = shortcut?.length ? (
    <span className="inline-flex items-center gap-2">
      <span>{content}</span>
      <KbdGroup aria-label="Keyboard shortcut">
        {shortcut.map((key, i) => (
          <React.Fragment key={`${key}-${i}`}>
            <Kbd>{key}</Kbd>
          </React.Fragment>
        ))}
      </KbdGroup>
    </span>
  ) : (
    content
  );

  return (
    <TooltipProvider delayDuration={delayDuration} skipDelayDuration={0}>
      <TooltipRoot open={open}>
        <TooltipTrigger aria-keyshortcuts={shortcut?.join('+') ?? callerAriaKeyShortcuts} {...rest}>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} sideOffset={sideOffset} hidden={hidden}>
          {tooltipContent}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
