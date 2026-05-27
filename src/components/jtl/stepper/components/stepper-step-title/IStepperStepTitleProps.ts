import { IconType } from '../../../icon';
import { StepperStepStatus } from '../../types';

/**
 * Props for StepTitle component
 */
export default interface IStepperStepTitleProps {
  /**
   * Current step title
   */
  currentTitle: string;
  /**
   * Current step description
   */
  currentDescription?: string;
  /**
   * Whether the step is large
   * @default false
   */
  isLarge: boolean;
  /**
   * Whether the step is navigable (clickable)
   * Used for hover text color changes
   * @default false
   */
  isNavigable: boolean;
  /**
   * Current status of the step — drives text color, badge, and hover behavior
   */
  status: StepperStepStatus;
  /**
   * Label to display in the badge when the step is completed (only for large steppers)
   */
  completedBadgeLabel?: string;
  /**
   * Icon to display in the badge when the step is completed (only for large steppers)
   */
  completedBadgeIcon?: IconType;
}
