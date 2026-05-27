import React, { useCallback, useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../../popover';
import { Command } from '../../../command';
import { Icon } from '../../../icon';
import ITitleComboboxProps from './ITitleComboboxProps';

/**
 * TitleCombobox renders a dropdown combobox for selecting a title option.
 * Encapsulates the dropdown open/close state to avoid unnecessary re-renders
 * of sibling elements in the parent AppHeader.
 *
 * @component
 * @param props {@link ITitleComboboxProps}
 */
const TitleCombobox: React.FC<ITitleComboboxProps> = ({ title, titleOptions, onTitleChange }) => {
  const [titleDropdownOpen, setTitleDropdownOpen] = useState(false);

  /** Maps titleOptions to CommandGroup[] format for the Command component */
  const commandGroups = useMemo(() => {
    return [{ heading: '', items: titleOptions.map(opt => ({ label: opt.label, value: opt.value, selected: opt.value === title })) }];
  }, [titleOptions, title]);

  /** Handles title option selection and closes the dropdown */
  const handleTitleSelect = useCallback(
    (value: string | string[]) => {
      const selectedValue = Array.isArray(value) ? value[0] : value;
      onTitleChange?.(selectedValue);
      setTitleDropdownOpen(false);
    },
    [onTitleChange],
  );

  /** Resolves the display label for the current title value */
  const titleDisplayLabel = useMemo(() => {
    return titleOptions.find(opt => opt.value === title)?.label ?? title;
  }, [title, titleOptions]);

  return (
    <Popover open={titleDropdownOpen} onOpenChange={setTitleDropdownOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex shrink-0 cursor-pointer items-center gap-2 border-none bg-transparent p-0 text-[length:var(--typography-typography-components-h3-font-size)] font-[var(--typography-typography-components-h3-font-weight)] leading-[var(--typography-typography-components-h3-line-height)] tracking-[var(--typography-typography-components-h3-letter-spacing)] text-[var(--foreground)]"
          aria-expanded={titleDropdownOpen}
          aria-haspopup="listbox"
        >
          {titleDisplayLabel}
          <Icon name="ChevronDown" size={20} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" side="bottom">
        <Command groups={commandGroups} onItemSelect={handleTitleSelect} isPopover />
      </PopoverContent>
    </Popover>
  );
};

TitleCombobox.displayName = 'TitleCombobox';

export default TitleCombobox;
