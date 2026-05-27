import { IconType } from '../../../icon';
import React from 'react';

/**
 * Props for the reusable ToolbarPopoverAction base component.
 * Each popover-destined toolbar button wraps this component
 * and supplies its own action name, icon, and label.
 */
export default interface IHtmlEditorToolbarPopoverActionProps {
  /** Action identifier — passed to onAction callback. */
  action: string;

  /** Lucide icon name for the trigger button. */
  icon?: IconType;

  /** Text label displayed on the trigger (e.g. "Paragraph", "14px"). */
  label?: string;

  /** Accessible label for the trigger button. */
  ariaLabel: string;

  /** Popover body content. When omitted, a placeholder message is shown. */
  children?: React.ReactNode;

  /** Popover width. */
  popoverWidth?: string;

  /**
   * Controlled state: Whether the popover is open.
   * When provided along with `onOpenChange`, the popover operates in controlled mode.
   * When omitted, the popover operates in uncontrolled mode (Radix manages state internally).
   */
  open?: boolean;

  /**
   * Controlled state handler: Called when the popover's open state changes.
   * When provided along with `open`, the popover operates in controlled mode.
   * When omitted, the popover operates in uncontrolled mode (Radix manages state internally).
   */
  onOpenChange?: (open: boolean) => void;
}
