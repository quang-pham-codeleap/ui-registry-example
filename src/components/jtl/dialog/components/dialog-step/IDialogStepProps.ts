import type React from 'react';

/**
 * Props for the DialogStep component
 */
export default interface IDialogStepProps extends React.PropsWithChildren {
  /**
   * Unique name identifying this step within a DialogNavigation.
   * Must match the `initialStep` or `to` value used to navigate here.
   */
  name: string;
}
