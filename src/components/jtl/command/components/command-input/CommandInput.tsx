import { Button } from '../../../button';
import { DropdownItem, IJTLDropdownMenuItemProps, JTLDropdown } from '../../../jtl-dropdown';
import React, { useCallback, useMemo, useState } from 'react';
import { CommandInput as CommandInputPrimitive } from '../../CommandPrimitive';
import ICommandInputProps from './ICommandInputProps';

const CommandInput: React.FC<ICommandInputProps> = ({
  maxLength,
  placeholder,
  value,
  onValueChange,
  onBlur,
  onFocus,
  searchConfig,
  showFocusBorder,
  className,
  type,
  ref,
}) => {
  const [internalSelected, setInternalSelected] = useState<(string | null)[]>(() => searchConfig?.defaultSelectedItem || []);

  // Extract the callback to avoid depending on the entire searchConfig object reference
  const onSelectionChange = searchConfig?.onSelectionChange;

  /**
   * Handler to toggle selection of an item.
   */
  const handleToggle = useCallback(
    (itemValue: string | null) => {
      const nextSelected = internalSelected.includes(itemValue)
        ? internalSelected.filter(item => item !== itemValue)
        : [...internalSelected, itemValue];

      setInternalSelected(nextSelected);

      // Notify the parent with the new state and the current input value
      onSelectionChange?.(nextSelected, value ?? '');
    },
    [internalSelected, onSelectionChange, value],
  );

  /**
   * Generate menu items for the dropdown based on the searchConfig
   */
  const menuItems = useMemo((): IJTLDropdownMenuItemProps[] => {
    if (!searchConfig) return [];

    // TODO: There should be a way to pass `value` to DropdownItem
    return searchConfig.groups.flatMap(group => [
      {
        type: DropdownItem.Label,
        label: group.heading,
      },
      {
        type: DropdownItem.Separator,
      },
      ...group.items.map(item => ({
        type: DropdownItem.Checkbox,
        label: item.label,
        isSelected: internalSelected.includes(item.value),
        onClick: () => {
          handleToggle(item.value);
        },
      })),
    ]);
  }, [searchConfig, internalSelected, handleToggle]);

  /**
   * Search Options dropdown
   */
  const suffixButton = useMemo(() => {
    // Only render the button if a valid config and items exist.
    if (!searchConfig || menuItems.length === 0) {
      return null;
    }

    return (
      <JTLDropdown position="right" menuItems={menuItems} width="18rem">
        <Button variant="ghost" size="icon" icon="Settings2" />
      </JTLDropdown>
    );
  }, [menuItems, searchConfig]);

  return (
    <CommandInputPrimitive
      ref={ref}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      onValueChange={onValueChange}
      onBlur={onBlur}
      onFocus={onFocus}
      suffix={suffixButton}
      showFocusBorder={showFocusBorder}
      className={className}
      type={type}
    />
  );
};

export default CommandInput;
