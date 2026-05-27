import React, { useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { GridCell } from '../../../grid';
import { Text } from '../../../text';
import IStepperStepProps from './IStepperStepProps';
import { StepperStepCounter } from '../stepper-step-counter';
import { StepperStepTitle } from '../stepper-step-title';
import { StepperConnector } from '../stepper-connector';
import { StepperStepStatus } from '../../types';
import { Box } from '../../../box';

/**
 * StepperStep component for displaying a single step in the Stepper
 *
 * This component is designed to be used as a child of the Stepper component.
 * State management (active, completed, navigation) is handled by the parent Stepper component.
 *
 * Features:
 * - Multiple layout variants (horizontal, vertical, large)
 * - Status-based styling (active, completed, warning, error, default/counter)
 * - Optional click navigation when onClick is provided by parent
 * - Hover effects for navigable steps with status-specific border colors
 * - Accessibility support with ARIA labels and keyboard navigation
 * - Custom completion states with badges and alternative content
 *
 * @param props - Props for the StepperStep component {@link IStepperStepProps}
 * @returns The rendered StepperStep component
 */
const StepperStep: React.FC<IStepperStepProps> = ({
  status = 'default',
  isNavigable = false,
  isContentActive = false,
  title,
  completedTitle,
  completedBadgeIcon,
  completedBadgeLabel,
  description,
  completedDescription,
  count = 1,
  stepperType = 'horizontal',
  stepperSize = 'sm',
  children,
  isLastStep = false,
  onClick,
}) => {
  // Derive state from status
  const isCompleted = status === StepperStepStatus.COMPLETED;
  const isActive = status === StepperStepStatus.ACTIVE;
  const isError = status === StepperStepStatus.ERROR;
  const isWarning = status === StepperStepStatus.WARNING;

  // Determine the step layout type
  const isLarge = stepperType === 'large';
  const isHorizontal = stepperType === 'horizontal';
  const isVertical = stepperType === 'vertical';

  /**
   * Determine the title and description based on completion state
   */
  const { currentTitle, currentDescription } = useMemo(
    () => ({
      currentTitle: isCompleted && completedTitle ? completedTitle : title,
      currentDescription: isCompleted && completedDescription ? completedDescription : description,
    }),
    [isCompleted, completedTitle, title, completedDescription, description],
  );

  /**
   * Style configurations for different elements of the step
   */
  const styles = useMemo(
    () => ({
      // Indicator (circle) styles — background and size per status
      indicator: cn(
        'flex items-center justify-center rounded-[var(--border-radius-lg)]',
        'transition-colors duration-200',
        stepperSize === 'sm' ? 'w-8 h-8' : 'w-12 h-12',
        // Active state: no background, size varies by stepperSize
        isLarge && 'w-12 h-12',
        // Status backgrounds
        !isActive && !isCompleted && !isError && !isWarning && 'bg-[var(--secondary)] text-[var(--foreground)]',
        isCompleted && 'bg-[var(--success-background)] text-[var(--success-text)]',
        isWarning && 'bg-[var(--warning-background)] text-[var(--warning-text)]',
        isError && 'bg-[var(--danger-background)] text-[var(--danger-text)]',
        isActive && 'text-[var(--info-text)]',
      ),

      // Connector line styles
      connector: cn('transition-colors duration-200', isHorizontal && 'flex-1', isVertical && 'h-5 col-start-1 justify-self-center'),

      // Main container styles
      container: cn(
        isHorizontal && 'flex items-center gap-2',
        isVertical && (stepperSize === 'sm' ? 'grid grid-cols-[3rem_auto] gap-x-6 gap-y-1.5' : 'grid grid-cols-[4rem_auto] gap-x-6 gap-y-1.5'),
        isLarge && 'flex flex-col w-full',
      ),

      // Step content wrapper — handles active blue background and hover backgrounds
      stepContentWrapper: cn(
        'rounded-[var(--border-radius-lg)]',
        'transition-colors duration-200',
        'flex items-center gap-2 p-2 pr-4 w-fit',
        isActive && 'bg-[var(--sidebar-accent)]',
        isVertical && 'col-span-full',
        isNavigable && 'cursor-pointer',
        // Active: blue background (permanent)
        // Navigation hover backgrounds per status
        isNavigable && isCompleted && 'hover:bg-[var(--success-background)]',
        isNavigable && isWarning && 'hover:bg-[var(--warning-background)]',
        isNavigable && isError && 'hover:bg-[var(--danger-background)]',
        isNavigable && !isActive && !isCompleted && !isError && !isWarning && 'hover:bg-[var(--secondary)]',
      ),

      // Children content container styles
      childrenContainer: cn('pl-[4.5rem]', 'pb-6 w-full'),

      // Content wrapper styles
      contentWrapper: cn(isVertical ? 'col-span-full' : 'w-max', isLarge && 'w-full py-6 pr-6'),

      // Flex container for layout elements (large layout)
      flexContainer: cn('flex items-center gap-2', isLarge && 'gap-6'),
    }),
    [isCompleted, isActive, isError, isWarning, isHorizontal, isVertical, isLarge, isNavigable, stepperSize],
  );

  const StepComponent = useMemo(() => (isNavigable ? 'button' : 'div'), [isNavigable]);

  /**
   * Memoized step content — counter icon and title
   */
  const stepContent = useMemo(
    () => (
      <StepComponent className={styles.stepContentWrapper}>
        <Box className="flex items-center">
          <StepperStepCounter
            status={status}
            count={count}
            isHorizontal={isHorizontal}
            stepperSize={stepperSize}
            indicatorStyles={styles.indicator}
          />
        </Box>
        <StepperStepTitle
          currentTitle={currentTitle}
          currentDescription={currentDescription}
          isLarge={isLarge}
          isNavigable={isNavigable}
          status={status}
          completedBadgeLabel={completedBadgeLabel}
          completedBadgeIcon={completedBadgeIcon}
        />
      </StepComponent>
    ),
    [
      status,
      isNavigable,
      currentTitle,
      currentDescription,
      isLarge,
      completedBadgeLabel,
      completedBadgeIcon,
      styles.indicator,
      styles.stepContentWrapper,
      count,
      isHorizontal,
      stepperSize,
      StepComponent,
    ],
  );

  /**
   * Renders the large step layout with grid structure
   */
  const LargeStep = useMemo(
    () => (
      <Box className="grid grid-cols-5 gap-3">
        <Box className="col-span-2">{stepContent}</Box>
        <Box className="col-span-3 flex items-center">{isLarge && currentDescription && <Text type="small">{currentDescription}</Text>}</Box>
      </Box>
    ),
    [currentDescription, isLarge, stepContent],
  );

  /**
   * Standard step layout (horizontal or vertical)
   */
  const StandardStep = stepContent;

  /**
   * Handle click events for navigable steps
   */
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  /**
   * Conditionally renders the step as a <button> or <div> for accessibility.
   * A <button> is used for navigable steps to ensure keyboard interaction.
   * A <div> is used for non-interactive steps.
   */
  const stepperStep = useMemo(() => {
    const stepVisuals = (
      <>
        {/* Initial separator for large steps */}
        {count === 1 && isLarge && <StepperConnector className={styles.connector} isVertical={isVertical} />}

        {/* Step content */}
        <Box className={styles.contentWrapper}>{isLarge ? LargeStep : StandardStep}</Box>

        {/* Children content for active large steps */}
        {isLarge && isContentActive && children && <Box className={styles.childrenContainer}>{children}</Box>}

        {/* Connector line between steps (except for the last step) */}
        {!isLastStep && <StepperConnector className={styles.connector} isVertical={isVertical} />}
      </>
    );

    if (isNavigable) {
      return (
        <div className={cn(styles.container, 'group')} onClick={handleClick} aria-label={`Go to step ${count}: ${title}`}>
          {stepVisuals}
        </div>
      );
    }

    return <Box className={cn(styles.container, 'group')}>{stepVisuals}</Box>;
  }, [
    isNavigable,
    styles.container,
    handleClick,
    title,
    count,
    isLarge,
    styles.connector,
    isVertical,
    styles.contentWrapper,
    LargeStep,
    StandardStep,
    isContentActive,
    children,
    styles.childrenContainer,
    isLastStep,
  ]);

  if (isHorizontal) {
    return <Box className={isLastStep ? 'shrink-0' : 'flex-1'}>{stepperStep}</Box>;
  }

  return <GridCell columnSpan={{ xs: 1 }}>{stepperStep}</GridCell>;
};

StepperStep.displayName = 'StepperStep';

export default StepperStep;
