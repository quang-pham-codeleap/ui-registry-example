import type React from 'react';

/**
 * Props for the DialogNavigation component
 */
export default interface IDialogNavigationProps extends React.PropsWithChildren {
  /**
   * The `name` of the step to display initially (uncontrolled mode).
   */
  initialStep: string;
}
