import React, { Children, cloneElement, isValidElement, useId } from 'react';
import { cn } from '@/lib/utils';
import { IStepperStepProps } from './components';
import IStepperProps from './IStepperProps';
import { getStepperStepStatus, isValidStepperStep } from './utils';
import { StepperMode } from './types';
import { Box } from '../box';

/**
 * Stepper component for displaying a sequence of steps with centralized state management
 * Supports horizontal, vertical, and large display types with optional click navigation
 *
 * @param props {@link IStepperProps} - Props for the Stepper component
 * @returns The rendered stepper component
 *
 * @example
 * ```tsx
 * // Basic horizontal stepper with active and completed steps
 * function App() {
 *   return (
 *     <Stepper activeStep={1} completedSteps={[0]}>
 *       <StepperStep title="Step 1" description="First step" />
 *       <StepperStep title="Step 2" description="Second step" />
 *       <StepperStep title="Step 3" description="Third step" />
 *     </Stepper>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Vertical stepper with navigation
 * function App() {
 *   const [activeStep, setActiveStep] = useState(1);
 *   const [completedSteps, setCompletedSteps] = useState([0]);
 *
 *   const handleStepClick = (stepIndex: number) => {
 *     setActiveStep(stepIndex);
 *     // Update completed steps as needed
 *   };
 *
 *   return (
 *     <Stepper
 *       type="vertical"
 *       activeStep={activeStep}
 *       completedSteps={completedSteps}
 *       onClick={handleStepClick}
 *     >
 *       <StepperStep title="Setup" description="Initial configuration" />
 *       <StepperStep title="Verification" description="Verify your settings" />
 *       <StepperStep title="Complete" description="Finish the process" />
 *     </Stepper>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Advanced large stepper with completion states and custom badges
 * function App() {
 *   return (
 *     <Stepper type="large" activeStep={1} completedSteps={[0]}>
 *       <StepperStep
 *         title="Email Verification"
 *         description="Verify your email address"
 *         completedTitle="Email Verified"
 *         completedDescription="Your email has been successfully verified"
 *         completedBadgeLabel="Verified"
 *         completedBadgeIcon="BadgeCheck"
 *       >
 *         <Box className="flex flex-col gap-4">
 *           <Text>Email verification content</Text>
 *         </Box>
 *       </StepperStep>
 *       <StepperStep
 *         title="Profile Setup"
 *         description="Complete your profile information"
 *       >
 *         <Box className="flex flex-col gap-4">
 *           <Text>Profile setup form</Text>
 *           <Box className="flex justify-end">
 *             <Button label="Continue" />
 *           </Box>
 *         </Box>
 *       </StepperStep>
 *       <StepperStep
 *         title="Final Review"
 *         description="Review and confirm your settings"
 *       />
 *     </Stepper>
 *   );
 * }
 * ```
 */
const Stepper: React.FC<IStepperProps> = ({
  type = 'horizontal',
  size = 'sm',
  children,
  activeSteps,
  completedSteps,
  errorSteps,
  warningSteps,
  onClick,
  mode = 'display',
}) => {
  // Get the total number of steps
  const totalSteps = Children.toArray(children).length;

  // Apply container styles based on stepper type
  const containerStyles = cn(
    'w-full',
    type === 'horizontal' && 'flex items-center',
    type === 'vertical' && 'grid grid-cols-1 items-start gap-2',
    type === 'large' && 'grid grid-cols-1 w-full ',
  );

  const stepperComponentId = useId();

  /**
   * Validation and Warning for Navigation Mode
   */
  if (mode === StepperMode.NAVIGATION) {
    if (activeSteps == null) {
      console.error('Error: activeSteps must be provided in navigation mode of Stepper component.');
      return null;
    }

    // In navigation mode, activeSteps should be a single number as only one step can be active at a time
    if (Array.isArray(activeSteps)) {
      console.error('Error: activeSteps should be a single number in navigation mode of Stepper component.');
      return null;
    }

    if (!onClick) {
      console.warn('Warning: onClick handler should be provided in navigation mode of Stepper component to enable step navigation.');
    }
  }

  return (
    <Box className={containerStyles}>
      {Children.map(children, (child, index) => {
        // Early return for non-React elements
        if (!isValidElement(child)) {
          console.error('Error: Invalid child in Stepper. Expected a React element.');
          return null;
        }

        // Early return with error for invalid StepperStep components
        if (!isValidStepperStep(child)) {
          // Type casting just to log a proper message
          const componentType = (child as React.ReactElement)?.type as React.ComponentType<unknown> & { displayName?: string };
          console.error(
            `Error: Invalid child component in Stepper: Expected StepperStep, but received ${componentType?.displayName || 'unknown component'}`,
          );
          return null;
        }

        // Cast the child to ReactElement with IStepperStepProps to ensure TypeScript knows it's an object type
        const childElement = child as React.ReactElement<IStepperStepProps>;

        // Determine step status from the provided active, completed, error, and warning step state
        const stepStatus = getStepperStepStatus(index, activeSteps, completedSteps, errorSteps, warningSteps);

        // Compute whether the content for this step should be displayed
        const isContentActive = (Array.isArray(activeSteps) && activeSteps.includes(index)) || index === activeSteps;

        // Clone the child element to pass additional props
        return cloneElement(childElement, {
          ...childElement.props,
          count: index + 1,
          key: `${stepperComponentId}-stepper-step-${index}`,
          isLastStep: index === totalSteps - 1,
          stepperType: type,
          stepperSize: size,
          status: stepStatus,
          isContentActive,
          // Pass onClick from parent if provided
          onClick: onClick ? () => onClick(index) : undefined,
          isNavigable: mode === StepperMode.NAVIGATION,
        });
      })}
    </Box>
  );
};

Stepper.displayName = 'Stepper';

export default Stepper;
