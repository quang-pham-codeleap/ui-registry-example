import { TooltipTriggerProps } from '@radix-ui/react-tooltip';
import React from 'react';

/**
 * Props for the Tooltip component
 */
export default interface ITooltipProps extends Omit<TooltipTriggerProps, 'className' | 'content'> {
  open?: boolean;
  /**
   * The content to display inside the tooltip
   */
  content: React.ReactNode;

  /**
   * Optional keyboard shortcut keys displayed at the end of the tooltip
   * @example ['Ctrl', 'B']
   */
  shortcut?: string[];

  /**
   * The element that triggers the tooltip
   */
  children: React.ReactNode;

  /**
   * The preferred side of the trigger to render the tooltip
   * @default 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * The preferred alignment against the trigger
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';

  /**
   * The distance in pixels from the trigger
   * @default 4
   */
  sideOffset?: number;

  /**
   * When true, the tooltip will not be shown
   * @default false
   */
  hidden?: boolean;

  /**
   * Optional delay duration in ms for showing the tooltip
   * @default 0
   */
  delayDuration?: number;
}
