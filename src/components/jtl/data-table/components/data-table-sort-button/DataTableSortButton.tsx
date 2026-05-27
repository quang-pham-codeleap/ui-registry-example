import React from 'react';
import IDataTableSortButtonProps from './IDataTableSortButtonProps';
import { Box } from '../../../box';
import { Icon } from '../../../icon';
import { ASCENDING, DESCENDING } from '../../constants/tableState';

const SortButton: React.FC<IDataTableSortButtonProps> = ({ sortDirection }) => {
  return (
    <Box className="flex w-7 h-7 items-center justify-center">
      {sortDirection === ASCENDING && <Icon name="ArrowUp" size={16} aria-label="Sortiere aufsteigend" />}
      {sortDirection === DESCENDING && <Icon name="ArrowDown" size={16} aria-label="Sortiere absteigend" />}
    </Box>
  );
};
export default SortButton;
