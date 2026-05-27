import React from 'react';
import { Text } from '../../../text';
import IDataCellContentProps from './IDataCellContentProps';

const DataCellContent: React.FC<IDataCellContentProps> = ({ text, align }) => {
  return (
    <Text type="small" weight="regular" truncate align={align}>
      {text}
    </Text>
  );
};

export default DataCellContent;
