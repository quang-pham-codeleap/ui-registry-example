import React from 'react';
import { cn } from '@/lib/utils';
import IStepperStepTitleProps from './IStepperStepTitleProps';
import { Label } from '../../../label';
import { Badge } from '../../../badge';
import { Text } from '../../../text';
import { StepperStepStatus } from '../../types';
import { Box } from '../../../box';

/**
 * StepTitle component for displaying the step title, description, and badge
 * Handles text color based on step status and hover states in navigation mode
 */
const StepperStepTitle: React.FC<IStepperStepTitleProps> = ({
  currentTitle,
  currentDescription,
  isLarge = false,
  isNavigable = false,
  status,
  completedBadgeLabel,
  completedBadgeIcon,
}) => {
  // Derive state from status
  const isCompleted = status === StepperStepStatus.COMPLETED;
  const isActive = status === StepperStepStatus.ACTIVE;

  // Title styles based on status and navigation hover
  const titleStyles = cn(
    'font-normal',
    // Active state: blue text
    isActive && 'text-[var(--sidebar-accent-foreground)] font-semibold',
    // Navigation hover: status-specific text color
    isNavigable && 'cursor-pointer',
    isNavigable && isCompleted && 'group-hover:text-[var(--success-text)]',
    isNavigable && status === StepperStepStatus.WARNING && 'group-hover:text-[var(--warning-text)]',
    isNavigable && status === StepperStepStatus.ERROR && 'group-hover:text-[var(--danger-text)]',
  );

  return (
    <Box className="flex flex-col items-start gap-1 w-max">
      <Label variant="title" className={titleStyles}>
        {currentTitle}
      </Label>
      {!isLarge && currentDescription && (
        <Text type="small" weight="regular" color={isActive ? 'info' : undefined}>
          {currentDescription}
        </Text>
      )}
      {isCompleted && isLarge && completedBadgeLabel && <Badge label={completedBadgeLabel} variant="success" icon={completedBadgeIcon} />}
    </Box>
  );
};

StepperStepTitle.displayName = 'StepperStepTitle';

export default StepperStepTitle;
