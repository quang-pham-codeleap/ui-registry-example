import React, { useCallback, useMemo } from 'react';
import { Box } from '../box';
import { Button } from '../button';
import { Card, CardContent, CardFooter, CardHeader } from '../card';
import { Stepper, StepperStep } from '../stepper';
import IStepperLayoutProps from './IStepperLayoutProps';
import { AppHeader } from '../app-header';
import type { NavigationButtonState } from './types';

/**
 * StepperLayout is a controlled wizard orchestration component.
 *
 * It composes Stepper (header), Card (body), and an action bar (footer) into a
 * standardized multi-step layout. The consumer owns `activeStep`; navigation button
 * visibility is auto-derived, but step visual status must be controlled manually via
 * each step's `status` field:
 * - Steps without `status`: auto-completed when their index < activeStep
 * - Steps with `status: 'error'` or `status: 'warning'`: always show that status, never auto-complete
 * - Steps with `status: 'completed'`: always shown as completed regardless of position
 * - Steps with `status: 'default'`: always shown as default, suppresses auto-complete
 * - Back button: hidden on step 0 by default (override per step via `backAction`)
 * - Next button: hidden on the last step by default (override per step via `nextAction`)
 *
 * @example
 * ```tsx
 * const [activeStep, setActiveStep] = useState(0);
 * const [steps, setSteps] = useState<StepConfig[]>([
 *   { title: 'Setup' },
 *   { title: 'Validation' },
 *   { title: 'Review' },
 * ]);
 *
 * // Mark a step as error — consumer is responsible for updating step status
 * const markStepError = (index: number) => {
 *   setSteps(prev => prev.map((s, i) => (i === index ? { ...s, status: 'error' } : s)));
 * };
 *
 * <StepperLayout
 *   steps={steps}
 *   activeStep={activeStep}
 *   onNext={current => setActiveStep(current + 1)}
 *   onBack={current => setActiveStep(current - 1)}
 * >
 *   {activeStep === 0 && <SetupForm />}
 *   {activeStep === 1 && <ValidationForm onError={() => markStepError(1)} />}
 *   {activeStep === 2 && <ReviewSummary />}
 * </StepperLayout>
 * ```
 */
const StepperLayout: React.FC<IStepperLayoutProps> = ({ steps, activeStep, onNext, onBack, backButton, nextButton, secondaryActions, children }) => {
  const safeStep = Math.max(0, Math.min(activeStep, steps.length - 1));

  const errorSteps = useMemo(() => steps.map((s, i) => (s.status === 'error' ? i : -1)).filter(i => i >= 0), [steps]);

  const warningSteps = useMemo(() => steps.map((s, i) => (s.status === 'warning' ? i : -1)).filter(i => i >= 0), [steps]);

  const completedSteps = useMemo(() => steps.map((s, i) => (s.status === 'completed' ? i : -1)).filter(i => i >= 0), [steps]);

  const isFirstStep = safeStep === 0;
  const isLastStep = safeStep === steps.length - 1;

  const resolveButtonState = useCallback(
    (perStep: NavigationButtonState | undefined, defaultState: NavigationButtonState): NavigationButtonState => perStep ?? defaultState,
    [],
  );

  const backState = resolveButtonState(steps[safeStep].backAction, isFirstStep ? 'hidden' : 'visible');
  const nextState = resolveButtonState(steps[safeStep].nextAction, isLastStep ? 'hidden' : 'visible');

  const handleNext = useCallback(async () => {
    try {
      await onNext(activeStep);
    } catch {
      // consumer error — do not advance
    }
  }, [onNext, activeStep]);

  const handleBack = useCallback(() => {
    onBack(activeStep);
  }, [onBack, activeStep]);

  if (steps.length === 0) return null;

  const currentStep = steps[safeStep];

  return (
    <Box className="flex flex-col h-full gap-6">
      {/* Header: horizontal stepper showing step progress */}
      <Box className="px-6 py-4 bg-[var(--background)] border border-[var(--border)] rounded-[var(--border-radius-default)]">
        <Stepper
          type="horizontal"
          activeSteps={safeStep}
          completedSteps={completedSteps}
          errorSteps={errorSteps}
          warningSteps={warningSteps}
          mode={'display'}
        >
          {steps.map((step, index) => (
            <StepperStep
              key={index}
              title={step.title}
              description={step.description}
              completedTitle={step.completedTitle}
              completedBadgeLabel={step.completedBadgeLabel}
              completedBadgeIcon={step.completedBadgeIcon}
            />
          ))}
        </Stepper>
      </Box>

      <Box className="flex flex-col bg-[var(--background)]">
        {/* Body: card wrapping active step content */}
        <Card className="w-full">
          {/* Content header: renders AppHeader when step has contentHeader config */}
          {currentStep.contentHeader && (
            <CardHeader>
              <AppHeader
                title={currentStep.contentHeader.title}
                subtitle={currentStep.contentHeader.subtitle}
                icon={currentStep.contentHeader.icon}
              />
            </CardHeader>
          )}
          <CardContent>{children}</CardContent>
          <CardFooter>
            <Box className="flex w-full gap-2 justify-between">
              {/* Left slot: Back button */}
              <Box>
                {backState !== 'hidden' && (
                  <Button
                    label="Zurück"
                    icon="ChevronLeft"
                    iconPosition="left"
                    variant="outline"
                    disabled={backState === 'disabled'}
                    data-testid="back-button"
                    onClick={handleBack}
                    {...backButton}
                  />
                )}
              </Box>
              {/* Right slot: secondary actions and Next button */}
              <Box className="flex gap-2">
                <Box>{secondaryActions}</Box>
                {nextState !== 'hidden' && (
                  <Button label="Weiter" disabled={nextState === 'disabled'} data-testid="next-button" onClick={handleNext} {...nextButton} />
                )}
              </Box>
            </Box>
          </CardFooter>
        </Card>
      </Box>
    </Box>
  );
};

StepperLayout.displayName = 'StepperLayout';

export default StepperLayout;
