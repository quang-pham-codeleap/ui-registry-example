import React from 'react';
import { Icon, LucideIconName } from '../../../icon';
import { cn } from '@/lib/utils';
import IStepperStepCounterProps from './IStepperStepCounterProps';
import { StepperStepStatus } from '../../types';
import { Box } from '../../../box';

const SM_ICON_SIZE = 16;
const LARGE_ICON_SIZE = 24;

/**
 * Map of step status to the icon name rendered inside the counter
 * Default status renders a step number instead of an icon
 */
const STATUS_ICON_MAP: Partial<Record<StepperStepStatus, LucideIconName>> = {
  [StepperStepStatus.COMPLETED]: 'Check',
  [StepperStepStatus.ACTIVE]: 'PencilLine',
  [StepperStepStatus.WARNING]: 'CircleAlert',
  [StepperStepStatus.ERROR]: 'CircleAlert',
};

/**
 * StepCounter component for displaying the step icon or number based on status
 * - Completed: Check icon on green background
 * - Active: PencilLine icon (smaller, no background)
 * - Warning: CircleAlert icon on amber background
 * - Error: CircleAlert icon on red background
 * - Default: Step number on gray background
 */
const StepperStepCounter: React.FC<IStepperStepCounterProps> = ({ status, count, isHorizontal, stepperSize = 'sm', indicatorStyles }) => {
  const iconName = STATUS_ICON_MAP[status];
  const isLargeSize = stepperSize === 'lg';
  const iconSize = isLargeSize ? LARGE_ICON_SIZE : SM_ICON_SIZE;

  return (
    <Box className={indicatorStyles}>
      {iconName ? (
        <Icon name={iconName} size={iconSize} />
      ) : (
        <span
          className={cn(
            isLargeSize ? 'text-[length:var(--typography-base-sizes-large-font-size)]' : 'text-[length:var(--typography-base-sizes-small-font-size)]',
            'font-semibold',
            !isHorizontal && 'text-[length:var(--typography-base-sizes-large-font-size)]',
          )}
        >
          {count}
        </span>
      )}
    </Box>
  );
};

StepperStepCounter.displayName = 'StepperStepCounter';

export default StepperStepCounter;
