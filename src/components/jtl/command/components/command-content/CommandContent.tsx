import React, { Fragment, useCallback, useMemo } from 'react';
import { CommandSeparator, CommandGroup } from '../../CommandPrimitive';
import { COMMAND_VARIANT } from '../../constants';
import { CommandItem as CommandItemType } from '../../types';
import ICommandContentProps from './ICommandContentProps';
import { CheckboxGroup } from '../../../checkbox';
import { CommandItem } from '../command-item';

const CommandContent: React.FC<ICommandContentProps> = ({ groups, inputValue, checkboxValue, onItemSelect, variant, renderItem }) => {
  /**
   * Handler to handle when a Checkbox in the CommandContent is selected.
   */
  const handleCheckboxOnSelect = useCallback(
    (value: (string | null)[]) => {
      (onItemSelect as (value: (string | null)[]) => void)(value);
    },
    [onItemSelect],
  );

  const WrapperComponent = useMemo(() => (variant === COMMAND_VARIANT.CHECKBOX ? CheckboxGroup : Fragment), [variant]);

  return useMemo(
    () => (
      <WrapperComponent {...(variant === COMMAND_VARIANT.CHECKBOX && { value: checkboxValue, onChange: handleCheckboxOnSelect })}>
        {groups.map((group, groupIndex) => (
          <Fragment key={`group-${group.heading}-${groupIndex}`}>
            {groupIndex > 0 && <CommandSeparator />}
            <CommandGroup heading={group.heading}>
              {group.items.map((item: CommandItemType) => (
                <CommandItem
                  key={item.value}
                  item={item}
                  variant={variant}
                  inputValue={inputValue}
                  onItemSelect={onItemSelect as (item: CommandItemType) => void}
                  renderItem={renderItem}
                />
              ))}
            </CommandGroup>
          </Fragment>
        ))}
      </WrapperComponent>
    ),
    [groups, WrapperComponent, checkboxValue, handleCheckboxOnSelect, variant, inputValue, onItemSelect, renderItem],
  );
};

export default CommandContent;
