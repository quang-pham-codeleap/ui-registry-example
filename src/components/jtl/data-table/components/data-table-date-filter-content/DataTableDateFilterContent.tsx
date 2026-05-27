import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { DatePicker } from '../../../date-picker';
import { DateRangePicker } from '../../../date-range-picker';
import { Box } from '../../../box';
import { Button } from '../../../button';
import { Select } from '../../../select';
import IDataTableDateFilterContentProps from './IDataTableDateFilterContentProps';
import FilterConditionOperator from '../../deprecated/advanced-filter/types/FilterConditionOperator';

/**
 * Renders the date-specific filter content inside the outer DataTableFilterInput popover.
 *
 * - Operator `in` → DateRangePicker with preset sidebar, two inputs, dual-month calendar
 * - Operator `eq` → single DatePicker with inline input
 *
 * Value contract:
 * - Single operators emit `[Date]` or `[]` (empty when cleared)
 * - Range operator emits `[Date, Date]`, `[Date]`, or `[]` (empty when cleared; one date if only one boundary is set)
 *
 * Staging pattern: selected dates are kept in local refs (for sync reads on button click)
 * and mirrored in state (for re-rendering the trigger label).
 */
const DataTableDateFilterContent = <T extends object>({
  columnTitle,
  operator,
  value,
  operatorOptions,
  onOperatorChange,
  onApply,
  onClear,
  onClose,
  triggerContent: triggerContentProp,
}: IDataTableDateFilterContentProps<T>) => {
  const isRangeMode = operator === FilterConditionOperator.In;

  /**
   * Controlled open state for the picker popover.
   * Lifted here so it persists across operator switches (single ↔ range).
   * When the user changes the operator, the old picker is replaced by a new one —
   * passing `isOpen` ensures the new picker re-opens immediately without a second click.
   */
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // ─── Staged date (single) ─────────────────────────────────────────────────
  // Ref for sync access in footer handler; state for re-rendering trigger label
  const stagedDateRef = useRef<Date | undefined>(undefined);
  const [stagedDate, setStagedDate] = useState<Date | undefined>(undefined);

  // ─── Staged range (range) ─────────────────────────────────────────────────
  const stagedRangeRef = useRef<DateRange | undefined>(undefined);
  const [stagedRange, setStagedRange] = useState<DateRange | undefined>(undefined);

  /**
   * Reset staged values whenever the mode switches (single ↔ range).
   * Prevents stale date data from leaking across operator changes.
   */
  useEffect(() => {
    stagedDateRef.current = undefined;
    stagedRangeRef.current = undefined;
    setStagedDate(undefined);
    setStagedRange(undefined);
  }, [isRangeMode]);

  /**
   * Sync staged dates from external value (Date) whenever the value changes
   * and the picker is closed. This keeps the trigger label accurate when the popover
   * re-opens with an existing filter, and handles external resets (e.g. preset load, clear).
   *
   * Guarded by `!isPickerOpen` so in-progress user interactions are never overwritten.
   * `parseISO` is used instead of `new Date()` for timezone-safe local-date parsing.
   */
  useEffect(() => {
    // Do not overwrite staged state while the user is actively picking dates
    if (isPickerOpen) return;

    if (!value?.length) {
      // External clear — reset staged state to match
      stagedDateRef.current = undefined;
      stagedRangeRef.current = undefined;
      setStagedDate(undefined);
      setStagedRange(undefined);
      return;
    }

    if (isRangeMode) {
      const from = value[0] as Date;
      const to = value[1] as Date;
      const range: DateRange = { from, to };
      stagedRangeRef.current = range;
      setStagedRange(range);
    } else {
      const date = value[0] as Date;
      stagedDateRef.current = date;
      setStagedDate(date);
    }
  }, [value, isRangeMode, isPickerOpen]);

  // ─── Event handlers ───────────────────────────────────────────────────────

  /** Update staged single date — ref is for sync reads, state is for re-renders */
  const handleSingleDateChange = useCallback((date: Date | undefined) => {
    stagedDateRef.current = date;
    setStagedDate(date);
  }, []);

  /** Update staged range — ref is for sync reads, state is for re-renders */
  const handleRangeChange = useCallback((range: DateRange | undefined) => {
    stagedRangeRef.current = range;
    setStagedRange(range);
  }, []);

  /**
   * Apply the staged date(s) to the parent filter.
   * Reads from refs to get the latest value synchronously (avoids stale state in batched updates).
   * Passes raw Date objects — formatting is the caller's responsibility.
   * Closes the picker via controlled state and notifies parent via onClose.
   * Called from the footer "Filtern" button.
   */
  const handleApply = useCallback(() => {
    if (isRangeMode) {
      const range = stagedRangeRef.current;
      // Collect only the Date values that are actually set (omit undefined boundaries)
      const dates = ([range?.from ?? null, range?.to ?? null] as (Date | null)[]).filter((v): v is Date => v !== null);
      onApply(dates);
    } else {
      const date = stagedDateRef.current;
      onApply(date ? [date] : []);
    }
    // Close the picker via controlled state so the new picker (after operator switch) also closes
    setIsPickerOpen(false);
    onClose();
  }, [isRangeMode, onApply, onClose]);

  /**
   * Clear staged state and notify parent.
   * Closes the picker via controlled state and notifies parent via onClose.
   * Called from the footer "Auswahl aufheben" button.
   */
  const handleClear = useCallback(() => {
    stagedDateRef.current = undefined;
    stagedRangeRef.current = undefined;
    setStagedDate(undefined);
    setStagedRange(undefined);
    // Close the picker via controlled state
    setIsPickerOpen(false);
    onClear();
    onClose();
  }, [onClear, onClose]);

  /**
   * Custom trigger element for DatePicker / DateRangePicker.
   * Uses the externally-provided trigger if supplied (e.g. DataTableFilterDisplay chip
   * when a filter is already active), otherwise falls back to the default column-title button.
   */
  const triggerContent = useMemo(
    () => triggerContentProp ?? <Button label={columnTitle} variant={'outline'} size="sm" icon="ChevronDown" iconPosition="right" fullWidth />,
    [triggerContentProp, columnTitle],
  );

  /**
   * Footer render prop passed to DatePicker / DateRangePicker.
   * `pickerApply` validates typed input and commits the date via onChange before we read the ref.
   * `pickerClear` (not used here) would also clear the picker's internal state.
   */
  const renderFooter = useCallback(
    ({ onApply: pickerApply }: { onApply: () => void }) => (
      <Box className="flex w-full items-center justify-end gap-4">
        <Button label="Auswahl aufheben" variant="outline" size="sm" onClick={handleClear} />
        <Button
          label="Filtern"
          size="sm"
          onClick={() => {
            // pickerApply validates any in-progress text input and fires onChange synchronously
            pickerApply();
            // handleApply reads from refs (already updated by pickerApply → onChange → handleSingleDateChange)
            handleApply();
          }}
        />
      </Box>
    ),
    [handleApply, handleClear],
  );

  const onChangeOperator = useCallback(
    (newOperator: string) => {
      onOperatorChange(newOperator as FilterConditionOperator);
    },
    [onOperatorChange],
  );

  return (
    <Box className="flex flex-col gap-2">
      {/* Date picker — switches between single and range based on operator */}
      {isRangeMode ? (
        <DateRangePicker
          header={<Select options={operatorOptions} value={operator} onChange={onChangeOperator} isPortal={false} />}
          value={stagedRange}
          onChange={handleRangeChange}
          hasInput
          triggerContent={triggerContent}
          footer={renderFooter}
          isOpen={isPickerOpen}
          onOpenChange={setIsPickerOpen}
        />
      ) : (
        <DatePicker
          header={<Select options={operatorOptions} value={operator} onChange={onChangeOperator} isPortal={false} />}
          value={stagedDate}
          onChange={handleSingleDateChange}
          hasInput
          closeOnSelect={false}
          triggerContent={triggerContent}
          footer={renderFooter}
          isOpen={isPickerOpen}
          onOpenChange={setIsPickerOpen}
        />
      )}
    </Box>
  );
};

export default DataTableDateFilterContent;
