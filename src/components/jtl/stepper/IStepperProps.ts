import React from 'react';
import { IStepperStepExternalProps } from './interfaces';
import { StepperMode } from './types';

/** @deprecated The "large" type is deprecated and will be removed in future versions. */
type DeprecatedLargeStepperVariant = 'large';

type StepperVariant = 'horizontal' | 'vertical' | DeprecatedLargeStepperVariant;

/**
 * Props for the Stepper component
 *
 * The Stepper component uses centralized state management where the parent
 * controls all step states and passes them down to StepperStep children.
 * This approach ensures consistent state across all steps and simplifies navigation logic.
 */
export default interface IStepperProps {
  /**
   * The type of stepper layout to display
   * - "horizontal": Steps arranged in a horizontal row
   * - "vertical": Steps arranged vertically
   * - "large": Large format with expanded content areas
   * @default "horizontal"
   */
  type?: StepperVariant;

  /**
   * The size variant of the stepper — only applies to horizontal type
   * - "sm": Compact indicator (28px), normal icon (16px)
   * - "lg": Larger indicator (40px), larger icon (24px)
   * @default "sm"
   */
  size?: 'sm' | 'lg';

  /**
   * The index of the currently active step (0-based)
   * This step will be highlighted and marked as the current step
   * If display, then we use the array index
   * Priority order: active > error > warning > completed > default
   * @example activeSteps={1} -> Second step is active
   */
  activeSteps?: number | number[];

  /**
   * Array of indices for steps that have been completed (0-based)
   * Completed steps will show completion styling and badges
   * Priority order: active > error > warning > completed > default
   * @example completedSteps={[0, 1]} -> First and second steps are completed
   */
  completedSteps?: number[];

  /**
   * Array of indices for steps that are in error state (0-based)
   * Error steps will show a red CircleAlert icon with danger background
   * Priority order: active > error > warning > completed > default
   * @example errorSteps={[2, 3]} -> Third and fourth steps show error state
   */
  errorSteps?: number[];

  /**
   * Array of indices for steps that are in warning state (0-based)
   * Warning steps will show an amber CircleAlert icon with warning background
   * Priority order: active > error > warning > completed > default
   * @example warningSteps={[4]} -> Fifth step shows warning state
   */
  warningSteps?: number[];

  /**
   * The mode of the Stepper, to determine if it is for navigation or display only
   * - "navigation": Steps are clickable and has a hover effect
   * - "display": Steps are static and not clickable
   * @default "display"
   */
  mode?: StepperMode;

  /**
   * Optional click handler for step navigation
   * When provided, steps become clickable and will call this function with the step index
   * Only provide this if you want to enable step navigation
   * @param stepIndex - The 0-based index of the clicked step
   * @example
   * ```tsx
   * const handleStepClick = (stepIndex: number) => {
   *   setActiveStep(stepIndex);
   *   // Additional navigation logic
   * };
   * ```
   */
  onClick?: (stepIndex: number) => void;

  /**
   * The children of the stepper (should be StepperStep components)
   * Users should only pass props from StepperStepUserProps interface,
   * internal props like status and count are managed by the parent Stepper
   * @example
   * ```tsx
   * <Stepper activeStep={0}>
   *   <StepperStep title="Step 1" description="First step" />
   *   <StepperStep title="Step 2" description="Second step" />
   * </Stepper>
   * ```
   */
  children?: React.ReactElement<IStepperStepExternalProps>[];
}
