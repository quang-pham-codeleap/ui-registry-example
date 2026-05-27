import StepContentHeader from './StepContentHeader';
import { IStepperStepProps } from '../../stepper/components';
import { StepperStepStatus } from '../../stepper/types';
import NavigationButtonState from './NavigationButtonState';

/**
 * Metadata configuration for a single wizard step.
 * Passed as an array to StepperLayout's `steps` prop.
 */
type StepConfig = Pick<IStepperStepProps, 'title' | 'description' | 'completedTitle' | 'completedBadgeLabel' | 'completedBadgeIcon'> & {
  /**
   * Explicit visual status for this step.
   * Overrides auto-derived completed status (steps before activeStep).
   * 'active' is excluded — always driven by the activeStep prop from the IStepperLayoutProps.
   * When omitted: steps before activeStep auto-complete, others show default.
   */
  status?: Exclude<StepperStepStatus, 'active'>;

  /**
   * Optional card content header (AppHeader) for the step body.
   * When provided, renders an AppHeader inside the Card above the step content.
   * Uses different title/subtitle than the stepper progress bar.
   */
  contentHeader?: StepContentHeader;

  /**
   * Controls Back button state for this step.
   * Overrides the default: hidden on first step, visible on all others.
   */
  backAction?: NavigationButtonState;

  /**
   * Controls Next button state for this step.
   * Overrides the default: visible on all steps except the last, hidden on last step.
   */
  nextAction?: NavigationButtonState;
};

export default StepConfig;
