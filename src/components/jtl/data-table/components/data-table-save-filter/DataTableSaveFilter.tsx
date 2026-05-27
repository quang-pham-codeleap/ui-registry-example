import IDataTableSaveFilterProps from './IDataTableSaveFilterProps';
import { Button } from '../../../button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../dialog';
import { Box } from '../../../box';
import { Input } from '../../../input';
import { Text } from '../../../text';
import { Icon } from '../../../icon';
import { FieldFilter } from '../../types';
import { useCallback, useMemo, useState } from 'react';

const DataTableSaveFilter = <T extends object>({ conditions, presets, onSavePreset }: IDataTableSaveFilterProps<T>) => {
  const listFilters = Object.entries(conditions || {}).map(([key, condition]) => ({ key, condition }) as { key: keyof T; condition: FieldFilter<T> });

  const [filterName, setFilterName] = useState('');

  const handleSavePreset = useCallback(() => {
    if (!filterName.trim() || !conditions) return;

    onSavePreset?.([
      ...(presets || []),
      {
        label: filterName.trim(),
        value: conditions,
      },
    ]);

    // Reset the form
    setFilterName('');
  }, [filterName, conditions, onSavePreset, presets]);

  const handleDeletePreset = useCallback(
    (label: string) => {
      if (!presets) return;
      onSavePreset?.(presets.filter(preset => preset.label !== label));
    },
    [presets, onSavePreset],
  );

  const isDuplicateFilterName = useMemo(() => presets?.some(preset => preset.label === filterName), [filterName, presets]);

  if (!listFilters.some(item => item.condition.value.length > 0)) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" label="Filter speichern" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter speichern</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Box className="flex flex-col gap-8">
          <Box className="w-full">
            <Input
              id="jtl-filter-preset"
              label="Filtername"
              value={filterName}
              onChange={setFilterName}
              errorMessage={isDuplicateFilterName ? 'Filtername existiert bereits' : ''}
            />
          </Box>
          {presets && (
            <Box className="flex flex-col gap-3">
              <Text type="small" weight="medium">
                Gespeicherte Filter
              </Text>
              {presets.map(item => {
                return (
                  <Box className="flex items-center justify-between gap-2.5">
                    <Box className="flex items-center gap-2">
                      <Icon name="List" />
                      <Text type="small" weight="regular" truncate>
                        {item.label}
                      </Text>
                    </Box>
                    <Button variant="ghost" icon="Trash2" size="iconSm" onClick={() => handleDeletePreset(item.label)} />
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button label="Abbrechen" variant="secondary" />
          </DialogClose>
          <DialogClose asChild>
            <Button label="Filter speichern" type="submit" onClick={handleSavePreset} disabled={isDuplicateFilterName} />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DataTableSaveFilter;
