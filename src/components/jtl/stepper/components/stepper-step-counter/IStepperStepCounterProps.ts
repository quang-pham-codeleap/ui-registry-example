import { StepperStepStatus } from '../../types';

/**
 * Props for StepperStepCounter component
 */
export default interface IStepperStepCounterProps {
  /**
   * Current status of the step — determines which icon to render
   * @default 'default'
   */
  status: StepperStepStatus;
  /**
   * The step number (displayed when status is 'default')
   */
  count: number;
  /**
   * Whether the stepper is displayed horizontally
   * @default true
   */
  isHorizontal: boolean;
  /**
   * The size variant of the horizontal stepper
   * @default "sm"
   */
  stepperSize?: 'sm' | 'lg';
  /**
   * Styles for the indicator container
   */
  indicatorStyles: string;
}
