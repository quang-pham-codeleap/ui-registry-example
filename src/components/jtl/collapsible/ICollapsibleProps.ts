import React from 'react';
import { CollapsibleProps } from '@radix-ui/react-collapsible';
import { IconType } from '../icon';

export default interface ICollapsibleProps extends Omit<CollapsibleProps, 'content' | 'title' | 'asChild'> {
  /** Content displayed in the collapsible trigger header. Required unless deprecated `triggerContent` is provided. */
  title?: React.ReactNode;

  /**
   * @deprecated Use `title` instead.
   * Legacy alias for the collapsible trigger content.
   */
  triggerContent?: React.ReactNode;

  /** Content shown or hidden inside the collapsible panel. */
  content: React.ReactNode;

  /** Whether the panel is open on initial render. @default false */
  defaultOpen?: boolean;

  /**
   * @deprecated Use `togglePosition` instead.
   * @default false
   */
  showIcon?: boolean;

  /**
   * Position of the chevron toggle icon.
   * - 'left': chevron before title, content indented to align
   * - 'right': chevron after headerSlot
   */
  togglePosition?: 'left' | 'right';

  /** Show divider border below header. @default false */
  showDivider?: boolean;

  /** Background of content panel. 'muted' applies --muted. */
  contentBackground?: 'base' | 'muted';

  /** Show border around entire component. @default false */
  showBorder?: boolean;

  /**
   * Flexible content zone between title and right icon. Expands to fill remaining header space (flex-1).
   * Interactive elements inside must stop click propagation to avoid toggling the panel.
   */
  headerSlot?: React.ReactNode;

  /**
   * @deprecated Use `headerSlot` instead.
   * Legacy secondary text rendered inside the header slot area when `headerSlot` is not provided.
   */
  secondaryText?: React.ReactNode;

  /**
   * @deprecated Use `headerSlot` instead.
   * Legacy action buttons rendered inside the header slot area when `headerSlot` is not provided.
   */
  actionButtons?: React.ReactNode;

  /**
   * @deprecated Use `headerSlot` instead.
   * Legacy action icon rendered inside the header slot area when `headerSlot` is not provided.
   */
  actionIcon?: IconType;

  /**
   * @deprecated Use `headerSlot` instead.
   * Accessible label for the legacy action icon button.
   */
  actionIconAriaLabel?: string;

  /**
   * @deprecated Use `headerSlot` instead.
   * Click handler for the legacy action icon button.
   */
  onActionIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
