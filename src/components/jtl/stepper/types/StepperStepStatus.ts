export const StepperStepStatus = {
  DEFAULT: 'default',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export type StepperStepStatus = (typeof StepperStepStatus)[keyof typeof StepperStepStatus];
