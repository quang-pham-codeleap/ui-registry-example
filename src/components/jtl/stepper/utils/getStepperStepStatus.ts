import { StepperStepStatus } from '../types';

/**
 * Determine the visual status of a step in the stepper.
 * Priority order: active > error > warning > completed > default
 *
 * Note: this resolves display status only. Whether a step renders its children
 * is controlled separately via `isContentActive` in the Stepper parent.
 */
const getStepperStepStatus = (
  index: number,
  activeStep?: number | number[],
  completedSteps?: number[],
  errorSteps?: number[],
  warningSteps?: number[],
): StepperStepStatus => {
  const isActive = (Array.isArray(activeStep) && activeStep.includes(index)) || index === activeStep;
  if (isActive) {
    return StepperStepStatus.ACTIVE;
  }

  if (errorSteps?.includes(index)) {
    return StepperStepStatus.ERROR;
  }

  if (warningSteps?.includes(index)) {
    return StepperStepStatus.WARNING;
  }

  if (completedSteps?.includes(index)) {
    return StepperStepStatus.COMPLETED;
  }

  return StepperStepStatus.DEFAULT;
};

export default getStepperStepStatus;
