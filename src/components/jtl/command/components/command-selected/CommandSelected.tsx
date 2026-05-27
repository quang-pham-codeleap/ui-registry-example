import { Fragment, useMemo } from 'react';
import { CheckboxGroup } from '../../../checkbox';
import { Box } from '../../../box';
import { Text } from '../../../text';
import { CommandGroup as CommandGroupPrimitive, CommandSeparator } from '../../CommandPrimitive';
import { CommandItem as CommandItemComponent } from '../command-item';
import { CommandEmpty } from '../command-empty';
import { CommandVariant } from '../../types';
import ICommandSelectedProps from './ICommandSelectedProps';

/**
 * Renders the "Selected on top" layout for the checkbox variant of the Command component.
 *
 * When active, two sections are displayed inside the command list:
 * 1. A pinned "Selected" group at the top showing currently checked items with a "Clear all" action.
 *    This group is hidden while the user is searching or when nothing is selected.
 * 2. The main groups, each with optional per-group "Clear" and "Select all" action buttons.
 *
 * Items in the "Selected" group are rendered with a unique `commandValue` to prevent
 * CMDK from treating them as the same entry as their counterpart in the main groups.
 */
const CommandSelected = <T extends CommandVariant = CommandVariant>({
  value,
  groups,
  inputValue,
  selectedGroupRef,
  onCheckboxGroupChange,
  onItemSelect,
  onGroupClear,
  onGroupSelectAll,
  onClearAll,
  noResultsLabel,
  renderItem,
}: ICommandSelectedProps<T>) => {
  const isSearchActive = inputValue !== '';
  const actionButtonClassName =
    'cursor-pointer bg-transparent border-none p-0 text-[length:var(--typography-base-sizes-extra-small-font-size)] leading-[var(--typography-base-sizes-extra-small-line-height)] text-[var(--highlight)]';

  const checkboxValSet = useMemo(() => new Set(value), [value]);

  const selectedItems = useMemo(
    () => groups.flatMap(g => g.items).filter(item => item.value !== null && checkboxValSet.has(String(item.value))),
    [groups, checkboxValSet],
  );

  /**
   * Per-group metadata computed once to avoid repeated inline array scans in the render.
   */
  const groupMeta = useMemo(
    () =>
      groups.map(group => ({
        hasSelection: group.items.some(item => item.value !== null && checkboxValSet.has(String(item.value))),
        hasSelectableItems: group.items.some(item => item.value !== null),
      })),
    [groups, checkboxValSet],
  );

  return (
    <CheckboxGroup value={value} onChange={onCheckboxGroupChange}>
      {/* "Selected" group — hidden when nothing is selected or a search is active */}
      {!isSearchActive && selectedItems.length > 0 && (
        <div ref={selectedGroupRef}>
          <Box className="flex items-center justify-between px-2 py-1.5">
            <Text type="xs" weight="medium" color="muted">
              Ausgewählt
            </Text>
            <button type="button" className={actionButtonClassName} onClick={onClearAll}>
              Aufheben
            </button>
          </Box>
          <CommandGroupPrimitive>
            {selectedItems.map(item => (
              <CommandItemComponent
                key={`selected-${item.value}`}
                item={item}
                variant="checkbox"
                inputValue={inputValue}
                onItemSelect={onItemSelect}
                renderItem={renderItem}
                commandValue={`__selected__${String(item.value)}`}
              />
            ))}
          </CommandGroupPrimitive>
        </div>
      )}

      {/* Main groups with per-group Clear + Select all controls */}
      {groups.map((group, groupIndex) => (
        <Fragment key={`group-${group.heading}-${groupIndex}`}>
          {(groupIndex > 0 || (!isSearchActive && selectedItems.length > 0)) && <CommandSeparator />}
          <Box className="flex items-center justify-between px-2 py-1.5">
            <Text type="xs" weight="medium" color="muted">
              {group.heading}
            </Text>
            <Box className="flex items-center gap-2">
              {groupMeta[groupIndex].hasSelection && (
                <button type="button" className={actionButtonClassName} onClick={() => onGroupClear(group)}>
                  Aufheben
                </button>
              )}
              {groupMeta[groupIndex].hasSelectableItems && (
                <button type="button" className={actionButtonClassName} onClick={() => onGroupSelectAll(group)}>
                  Alle wählen
                </button>
              )}
            </Box>
          </Box>
          <CommandGroupPrimitive>
            {group.items.map(item => (
              <CommandItemComponent
                key={`${group.heading}-${item.value}`}
                item={item}
                variant="checkbox"
                inputValue={inputValue}
                onItemSelect={onItemSelect}
                renderItem={renderItem}
              />
            ))}
          </CommandGroupPrimitive>
        </Fragment>
      ))}

      <CommandEmpty inputValue={inputValue} noResultsLabel={noResultsLabel} />
    </CheckboxGroup>
  );
};

export default CommandSelected;
