import React from 'react';
import { IconType } from '../../../icon';
import { StepperStepStatus } from '../../types';

/**
 * Props interface for the StepperStep component
 *
 * This interface includes both public props (that users can set) and internal props
 * (that are automatically managed by the parent Stepper component).
 *
 * Users should only use the public props when creating StepperStep components.
 * Internal props marked with @internal are automatically set by the Stepper parent.
 */
export default interface IStepperStepProps {
  /**
   * The main title/label of the step
   * @example "Email Verification"
   */
  title: string;

  /**
   * Alternative title to display when the step is completed
   * If not provided, the regular title will be used
   * @example "Email Verified"
   */
  completedTitle?: string;

  /**
   * Icon to display in the completion badge (for large stepper layout)
   * @example "BadgeCheck"
   * @deprecated
   */
  completedBadgeIcon?: IconType;

  /**
   * Text label for the completion badge (for large stepper layout)
   * @example "Verified"
   * @deprecated
   */
  completedBadgeLabel?: string;

  /**
   * Description text for the step
   * @example "Please verify your email address to continue"
   * @deprecated
   */
  description?: string;

  /**
   * Alternative description to display when the step is completed
   * If not provided, the regular description will be used
   * @example "Your email has been successfully verified"
   * @deprecated
   */
  completedDescription?: string;

  /**
   * Content to display inside the step
   * The content will be rendered when the step is active and the stepper type is "large".
   * The `activeStep` and `type` is declared in the parent Stepper component.
   * This content can be Forms, Buttons, or other interactive elements
   */
  children?: React.ReactNode;

  /**
   * ===== INTERNAL PROPS (managed by parent Stepper Component) =====
   * Note: If these props are manually set by users, it will be overridden by Stepper
   */

  /**
   * The position of this step in the stepper sequence (1-based)
   * Automatically set by the parent Stepper component
   * @internal
   */
  count?: number;

  /**
   * Current status of the step, automatically calculated by parent Stepper
   * - "default": Step is pending/inactive
   * - "active": Step is currently active/selected
   * - "completed": Step has been completed
   * @default "default"
   * @internal
   */
  status?: StepperStepStatus;

  /**
   * Whether this step's children content should render.
   * Decoupled from visual status — a step can be functionally active (show children)
   * while displaying error/warning/completed styling.
   * @default false
   * @internal
   */
  isContentActive?: boolean;

  /**
   * The status to indicate if a StepperStep is navigable (clickable)
   * When true each step is clickable and will have hover effects
   * @internal
   */
  isNavigable?: boolean;

  /**
   * Click handler for step navigation
   * Automatically provided by parent Stepper when onClick prop is set
   * Makes the step clickable/navigable with hover effects
   * @internal
   */
  onClick?: () => void;

  /**
   * Whether this step is the last in the sequence
   * Used for connector line rendering logic
   * @default false
   * @internal
   */
  isLastStep?: boolean;

  /**
   * The layout type of the parent stepper
   * Automatically passed down from parent Stepper component
   * @internal
   */
  stepperType?: 'horizontal' | 'vertical' | 'large';

  /**
   * The size variant — only applies to horizontal type
   * Automatically passed down from parent Stepper component
   * @default "sm"
   * @internal
   */
  stepperSize?: 'sm' | 'lg';
}
