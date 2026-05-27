import StepConfig from './StepConfig';

/**
 * Defines the return type of the useStepperLayoutState hook, which manages the state of a stepper layout.
 *
 * @property {StepConfig[]} steps - An array of step configurations representing the current state of each step.
 */
type UseStepperLayoutStateReturn = {
  /**
   * An array of step configurations representing the current state of each step. Each StepConfig includes properties such as title, status, and optional description.
   */
  steps: StepConfig[];
  /**
   * The index of the currently active step. This is a zero-based index that indicates which step is currently active in the stepper layout.
   */
  activeStep: number;
  /**
   * Advances to the next step by incrementing the activeStep index. This function does not perform any validation or checks; it simply moves to the next step when called.
   * @returns void
   */
  goNext: () => void;
  /**
   * Moves to the previous step by decrementing the activeStep index. This function does not perform any validation or checks; it simply moves to the previous step when called.
   * @returns void
   */
  goBack: () => void;
  /**
   * Resets the stepper layout to its initial state, including the steps and the active step index.
   * @returns void
   */
  reset: () => void;
  /**
   * Sets the status of a specific step. This function takes the index of the step to update and the new status value. It updates the steps state immutably, ensuring that only the targeted step's status is changed while the rest of the steps remain unchanged.
   * @param index - The index of the step to update.
   * @param status - The new status value for the step.
   * @returns void
   */
  setStepStatus: (index: number, status: StepConfig['status']) => void;
};

export default UseStepperLayoutStateReturn;
