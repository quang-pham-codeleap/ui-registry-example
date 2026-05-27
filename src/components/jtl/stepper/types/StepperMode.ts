export const StepperMode = {
  NAVIGATION: 'navigation',
  DISPLAY: 'display',
} as const;

export type StepperMode = (typeof StepperMode)[keyof typeof StepperMode];
