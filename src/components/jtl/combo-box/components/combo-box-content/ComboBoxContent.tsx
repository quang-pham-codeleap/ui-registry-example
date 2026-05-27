import React from 'react';
import { Command } from '../../../command';
import IComboBoxContentProps from './IComboBoxContentProps';
import { COMMAND_VARIANT } from '../../../command/constants';

/**
 * ComboBoxContent component that encapsulates the search input and results display.
 * Used by both ComboBox and ComboBoxDialog to ensure consistent UX.
 *
 * @component
 * @param {IComboBoxContentProps} props - The component props
 * @returns {React.ReactElement} The rendered ComboBox content with search and results
 *
 */
const ComboBoxContent: React.FC<IComboBoxContentProps> = ({ placeholder, value = [''], onItemSelect, displayItems, noResultText }) => {
  return (
    <Command
      variant={COMMAND_VARIANT.CHECKBOX}
      groups={displayItems}
      placeholder={placeholder}
      value={value}
      onItemSelect={onItemSelect}
      isPopover
      noResultsLabel={noResultText}
    />
  );
};

export default ComboBoxContent;
