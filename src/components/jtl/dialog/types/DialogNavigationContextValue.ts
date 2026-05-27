/**
 * Value provided by the DialogNavigation context
 */
type DialogNavigationContextValue = {
  /** The name of the currently visible step */
  currentStep: string;

  /** True when there is at least one step in the navigation history */
  canGoBack: boolean;

  /** Pushes the current step onto the history stack and navigates to `step` */
  navigateTo: (step: string) => void;

  /** Pops the last step from the history stack and makes it the current step */
  navigateBack: () => void;
};

export default DialogNavigationContextValue;
