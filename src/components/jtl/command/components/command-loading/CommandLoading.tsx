import { BaseSkeleton } from '../../../skeleton';
import { Box } from '../../../box';
import { Text } from '../../../text';
import React from 'react';
import { CommandLoading as CommandLoadingPrimitive } from '../../CommandPrimitive';
import { COMMAND_DEFAULT_LOADING_LABEL } from '../../constants';
import ICommandLoadingProps from './ICommandLoadingProps';

const CommandLoading: React.FC<ICommandLoadingProps> = ({ loadingLabel }) => {
  return (
    <CommandLoadingPrimitive>
      <Box className="p-3">
        <Text type="muted" weight="medium">
          {loadingLabel || COMMAND_DEFAULT_LOADING_LABEL}
        </Text>
      </Box>
      <Box className="w-full px-3 py-1.5 space-y-1.5">
        <BaseSkeleton className="h-4 w-200/426 rounded-[var(--border-radius-md)]" />
        <BaseSkeleton className="h-4 w-full rounded-[var(--border-radius-md)]" />
        <BaseSkeleton className="h-4 w-full rounded-[var(--border-radius-md)]" />
      </Box>
    </CommandLoadingPrimitive>
  );
};

export default CommandLoading;
