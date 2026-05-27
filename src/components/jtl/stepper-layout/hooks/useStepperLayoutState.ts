import { useCallback, useRef, useState } from 'react';
import type { StepConfig, UseStepperLayoutStateReturn } from '../types';

/**
 * Manages stepper state for any StepperLayout consumer.
 *
 * Returns stable function references — safe to use in dependency arrays.
 * No validation logic: compose the primitives in your own onNext handler.
 */
function useStepperLayoutState(initialSteps: StepConfig[]): UseStepperLayoutStateReturn {
  const initialStepsRef = useRef(initialSteps);

  const [steps, setSteps] = useState<StepConfig[]>(initialSteps);
  const [activeStep, setActiveStep] = useState(0);

  const goNext = useCallback(() => setActiveStep(prev => prev + 1), []);
  const goBack = useCallback(() => setActiveStep(prev => prev - 1), []);

  const reset = useCallback(() => {
    setSteps(initialStepsRef.current);
    setActiveStep(0);
  }, []);

  const setStepStatus = useCallback((index: number, status: StepConfig['status']) => {
    setSteps(prev => prev.map((s, i) => (i === index ? { ...s, status } : s)));
  }, []);

  return { steps, activeStep, goNext, goBack, reset, setStepStatus };
}

export default useStepperLayoutState;
