import { useState, useCallback, useMemo } from 'react';
import { Box } from '../../../box';
import { Button } from '../../../button';
import { Command } from '../../../command';
import { COMMAND_VARIANT } from '../../../command/constants';
import { CommandGroup } from '../../../command/types';
import { Popover, PopoverContent, PopoverTrigger } from '../../../popover';
import { useDataTableStaticContext } from '../../hooks';
import IDataTableMoreFilterProps from './IDataTableMoreFilterProps';
import { Icon } from '../../../icon';
import { cn } from '@/lib';

/**
 * DataTableMoreFilter component – "More Filter" button with a Command-based popover.
 *
 * Renders a stable outline button ("More Filter") that opens a popover containing
 * a Command component in checkbox mode. This lets users pick which filterable columns
 * are shown as active filter inputs in the table toolbar.
 *
 * The Command popover contains:
 *  - A search field ("Search Filter Name") to narrow the list
 *  - "Selected" group: columns that are currently active (checked)
 *  - "All Values" group: every filterable column with its current checked state
 *  - Footer "Clear Selection" button to clear all selections at once
 *
 * @template T - The type of the data object
 */
const DataTableMoreFilter = <T extends object>({ filterableColumns, selectedKeys, onSelectionChange }: IDataTableMoreFilterProps<T>) => {
  const { columns } = useDataTableStaticContext<T>();

  /** Controls the Popover open state */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Resolves the display title for a filterable column.
   * Looks it up in the DataTable columns definition; falls back to the key string.
   */
  const getColumnTitle = useCallback(
    (columnKey: keyof T): string => {
      return (columns.find(col => col.key === columnKey)?.title as string) ?? String(columnKey);
    },
    [columns],
  );

  /**
   * Build Command groups:
   * - "Selected": only columns that are currently selected (for quick deselection)
   * - "All Values": all filterable columns so the user can toggle any of them
   *
   * Both groups use String(columnKey) as the item value, which Command's checkbox
   * variant uses to determine whether an item should appear checked.
   */
  const groups = useMemo((): CommandGroup<'checkbox'>[] => {
    const toItem = (columnKey: keyof T) => ({
      label: getColumnTitle(columnKey),
      value: String(columnKey),
    });

    const allItems = filterableColumns.map(col => toItem(col.columnKey));

    const result: CommandGroup<'checkbox'>[] = [];

    result.push({ heading: 'Alle Werte', items: allItems });

    return result;
  }, [filterableColumns, getColumnTitle]);

  /**
   * Selected column keys as string[] – required by Command's checkbox variant.
   * The Command uses this array to mark which items have a filled checkbox.
   */
  const selectedValues = useMemo(() => selectedKeys.map(key => String(key)), [selectedKeys]);

  /**
   * Called by Command whenever the user toggles a checkbox.
   * The checkbox variant passes (string | null)[] – nulls are filtered out before
   * converting back to (keyof T)[] and notifying the parent.
   */
  const handleItemSelect = useCallback(
    (values: (string | null)[]) => {
      const valueSet = new Set(values.filter((v): v is string => v !== null));
      const nextKeys = filterableColumns.filter(col => valueSet.has(String(col.columnKey))).map(col => col.columnKey);
      onSelectionChange(nextKeys);
    },
    [filterableColumns, onSelectionChange],
  );

  /** Clears all selected filter columns at once */
  const handleDeselectAll = useCallback(() => {
    onSelectionChange([]);
  }, [onSelectionChange]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* "Weitere Filter" always looks like a plain outline button – no selected-value tags */}
      <PopoverTrigger asChild>
        <Button
          label="Weitere Filter"
          variant="outline"
          size="sm"
          icon={<Icon name="ChevronDown" className={cn('transition-transform', isOpen ? 'rotate-180' : '')} size={16} />}
          iconPosition="right"
        />
      </PopoverTrigger>

      {/* p-0: Command renders its own padding, border and shadow via isPopover=true */}
      <PopoverContent className="p-0 w-64" align="start">
        <Command<'checkbox'>
          placeholder="Suche Filtername"
          isPopover
          groups={groups}
          variant={COMMAND_VARIANT.CHECKBOX}
          value={selectedValues}
          onItemSelect={handleItemSelect}
          footer={
            selectedKeys.length > 0 ? (
              <Box className="flex justify-center">
                <Button label="Auswahl aufheben" variant="ghost" onClick={handleDeselectAll} />
              </Box>
            ) : null
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default DataTableMoreFilter;
