import React from 'react';
import { StepConfig, StepperButtonConfig } from './types';

/**
 * Props for the StepperLayout wizard orchestration component.
 *
 * StepperLayout is fully controlled — the consumer owns `activeStep`.
 * All other state (completedSteps, button visibility) is auto-derived.
 */
export default interface IStepperLayoutProps {
  /**
   * Metadata array describing each wizard step.
   * Order matches step index (0-based).
   */
  steps: StepConfig[];

  /**
   * Index of the currently active step (0-based).
   * Controlled by the consumer — update it inside `onNext` / `onBack`.
   */
  activeStep: number;

  /**
   * Called when the Next button is clicked.
   * Receives the current step index. Consumer decides whether to advance.
   * Supports async for validation/API calls.
   * @param current - Index of the step the user is leaving
   */
  onNext: (current: number) => Promise<void> | void;

  /**
   * Called when the Back button is clicked.
   * Receives the current step index. Consumer decides how to navigate.
   * @param current - Index of the step the user is leaving
   */
  onBack: (current: number) => void;

  /**
   * Overrides for the Back button's label, icon, variant, and state.
   * `onClick` is always managed by StepperLayout — do not pass it here.
   */
  backButton?: StepperButtonConfig;

  /**
   * Overrides for the Next button's label, icon, variant, and state.
   * `onClick` is always managed by StepperLayout — do not pass it here.
   */
  nextButton?: StepperButtonConfig;

  /**
   * Additional actions rendered in the right side of the footer, next to the Next button.
   * Use for Cancel, Save Draft, or other secondary controls.
   * @example <Button label="Abbrechen" variant="ghost" onClick={handleCancel} />
   */
  secondaryActions?: React.ReactNode;

  /**
   * The active step's content (form, summary, etc.).
   * Rendered inside a Card in the scrollable body area.
   */
  children: React.ReactNode;
}
