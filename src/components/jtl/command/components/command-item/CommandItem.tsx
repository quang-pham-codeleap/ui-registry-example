import React, { memo, useRef, useCallback, useMemo } from 'react';
import ICommandItemProps from './ICommandItemProps';
import { CommandItem as CommandItemPrimitive } from '../../CommandPrimitive';
import { COMMAND_VARIANT } from '../../constants';
import { CommandItem as CommandItemType } from '../../types';
import { highlightMatch } from '../../utils';
import { Box } from '../../../box';
import { Checkbox } from '../../../checkbox';
import { Avatar } from '../../../avatar';
import { Text } from '../../../text';
import { Icon } from '../../../icon';
import { cn } from '@/lib';

const CommandItem: React.FC<ICommandItemProps> = ({ item, variant, inputValue, onItemSelect, renderItem, commandValue }) => {
  /**
   * Ref to the checkbox element
   */
  const checkboxRef = useRef<HTMLButtonElement>(null);

  /**
   * Handler to intercept Enter on the checkbox button before cmdk can capture it.
   * cmdk skips Enter when e.defaultPrevented is true, so calling preventDefault here
   * prevents cmdk from firing onSelect on its internally-highlighted item and instead
   * delegates to an explicit click on the checkbox ref to toggle its checked state.
   */
  const handleCheckboxKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkboxRef.current?.click();
    }
  }, []);

  /**
   * Stops click events from the checkbox button from bubbling up to the cmdk
   * CommandItem. Without this, a direct click on the checkbox would trigger both
   * the checkbox's own toggle and the cmdk onSelect (which calls checkboxRef.click()
   * again), causing a net double-toggle with no visible change.
   */
  const handleCheckboxContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  /**
   * Render function to render item text based on the variant
   */
  const renderedItemText = useMemo(() => {
    const highlightedLabel = highlightMatch(item.label, inputValue);

    const label = (
      <Text type="small" as="span" weight="regular" truncate>
        {highlightedLabel}
      </Text>
    );

    const textContent = (
      <Box className="flex flex-col">
        {label}
        <Text type="xs" weight="regular" color="muted" truncate>
          {item.description}
        </Text>
      </Box>
    );

    const checkboxContent = (
      <Box className="flex flex-row items-center gap-2">
        <div onClick={handleCheckboxContainerClick}>
          <Checkbox value={item.value} ref={checkboxRef} aria-label={item.label} onKeyDown={handleCheckboxKeyDown} />
        </div>
        {renderItem ? (
          renderItem(item)
        ) : (
          <Text type="small" weight="regular" truncate>
            {item.label}
          </Text>
        )}
      </Box>
    );

    const itemComponents = {
      [COMMAND_VARIANT.CHECKBOX]: checkboxContent,
      [COMMAND_VARIANT.SIMPLE]: label,
      [COMMAND_VARIANT.DETAILED]: textContent,
      [COMMAND_VARIANT.CARD]: (
        <Box className="flex flex-row items-start gap-2">
          <Avatar shape="square" imageUrl={item.imageUrl} text={item.label} />
          {textContent}
        </Box>
      ),
    };

    return itemComponents[variant] || label;
  }, [variant, inputValue, item, renderItem, handleCheckboxKeyDown, handleCheckboxContainerClick]);

  /**
   * Handler to handle when an Item in the CommandContent is selected.
   * Only used for non-checkbox variants.
   */
  const handleItemOnSelect = useCallback(
    (item: CommandItemType) => {
      (onItemSelect as (item: CommandItemType) => void)(item);
    },
    [onItemSelect],
  );

  return (
    <CommandItemPrimitive
      htmlFor={String(item.value)}
      key={String(item.value)}
      keywords={[item.label, String(item.value)]}
      value={commandValue ?? String(item.value)}
      onSelect={variant === COMMAND_VARIANT.CHECKBOX ? () => checkboxRef.current?.click() : () => handleItemOnSelect(item)}
      className="p-0 pr-2"
    >
      <div className="w-full px-2 py-1.5">{renderedItemText}</div>
      <Icon name="Check" size={16} aria-hidden={true} className={cn('ml-auto', item.selected ? 'opacity-100' : 'opacity-0')} />
    </CommandItemPrimitive>
  );
};

export default memo(CommandItem) as typeof CommandItem;
