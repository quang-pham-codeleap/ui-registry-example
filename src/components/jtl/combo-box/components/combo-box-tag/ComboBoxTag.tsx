import React from 'react';
import { Box } from '../../../box';
import { Icon } from '../../../icon';
import IComboBoxTagProps from './IComboBoxTagProps';
import { Text } from '../../../text';

/**
 * ComboBoxTag component that displays a tag for a selected value.
 * @param {IComboBoxTagProps} props - The component props
 * @returns {React.ReactElement} The rendered ComboBoxTag component
 */
const ComboBoxTag: React.FC<IComboBoxTagProps> = ({ label, onClose }) => {
  return (
    <Box className="flex items-center gap-1 border border-[var(--info-border)]/10 bg-[var(--info-background)] px-2.5 py-0.5 rounded-[var(--border-radius-md)] text-[var(--info-text)]">
      <Text as="span" type="xs" color="info" weight="semibold">
        {label}
      </Text>
      <Icon name="X" onClick={onClose} size={10} />
    </Box>
  );
};

export default ComboBoxTag;
