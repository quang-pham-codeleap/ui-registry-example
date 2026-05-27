import React from 'react';
import { StepperStep } from '../components';

/**
 * Validates if a React element is a valid StepperStep component
 * @param element - The React element to validate
 * @returns true if the element is a valid StepperStep
 */
const isValidStepperStep = (element: unknown): element is React.ReactElement => {
  // Check if element exists and is a valid React element
  if (!element || typeof element !== 'object' || !React.isValidElement(element)) {
    return false;
  }

  const componentType = element.type as React.ComponentType<unknown> & { displayName?: string };
  return componentType?.displayName === 'StepperStep' || element.type === StepperStep;
};

export default isValidStepperStep;
