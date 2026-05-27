import { Stack } from '../../../stack';
import { StyledIcon } from '../../../styled-icon';
import { Text } from '../../../text';
import React, { useMemo } from 'react';
import noResultBackground from '../../assets/noResultBackground.png';
import { CommandEmpty as CommandEmptyPrimitive } from '../../CommandPrimitive';
import { COMMAND_NO_RESULTS_MESSAGE } from '../../constants';
import ICommandEmptyProps from './ICommandEmptyProps';

const CommandEmpty: React.FC<ICommandEmptyProps> = ({ inputValue, noResultsLabel }) => {
  const noResultMessage = useMemo(() => {
    // If function, we call it with inputValue
    if (typeof noResultsLabel === 'function') {
      return noResultsLabel(inputValue);
    }

    return noResultsLabel || COMMAND_NO_RESULTS_MESSAGE(inputValue);
  }, [inputValue, noResultsLabel]);

  return (
    <CommandEmptyPrimitive
      className="p-6 flex flex-col gap-4 items-center justify-center min-h-[190px]"
      style={{
        backgroundImage: `url(${noResultBackground})`,
        backgroundSize: 142,
        backgroundPositionY: 4,
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Stack direction="column" spacing="4" itemAlign="center" justify="center">
        <StyledIcon size="default" variant="outline" icon={'Search'} />
        <Text type="small" weight="regular">
          {noResultMessage}
        </Text>
      </Stack>
    </CommandEmptyPrimitive>
  );
};

export default CommandEmpty;
