import { useMemo } from 'react';
import { Text } from '../../../text';
import { Icon } from '../../../icon';
import { Box } from '../../../box';
import { JTLDropdown } from '../../../jtl-dropdown';
import { operatorTextObject } from '../../deprecated/advanced-filter/types';
import { FilterValueType } from '../../types';
import IDataTableFilterDisplayProps from './IDataTableFilterDisplayProps';
import { formatDateValue } from '../../utils';

const DataTableFilterDisplay = <T extends object>({
  ref,
  getOperatorOptions,
  selectedOperator,
  selectedValue,
  columnTitle,
  valueType,
}: IDataTableFilterDisplayProps<T>) => {
  const isDateType = valueType === FilterValueType.DATE;

  /**
   * Formatted display value shown in the chip.
   * For DATE columns, ISO strings are converted to the locale display format.
   * For all other columns, the raw first value is shown with an optional "+N" badge.
   */
  const displayValue = useMemo(() => {
    if (isDateType) {
      return formatDateValue(selectedValue as Date[]);
    }
    return selectedValue[0] as string;
  }, [isDateType, selectedValue]);

  return (
    <div
      ref={ref}
      className="flex max-w-80 items-center gap-2 rounded-[var(--border-radius-default)] border border-[var(--info-border)] bg-[var(--info-background)] px-3 py-2 h-9 hover:cursor-pointer"
    >
      <Box className="max-w-16">
        <Text type="small" color="info" truncate>
          {columnTitle}
        </Text>
      </Box>
      <JTLDropdown menuItems={getOperatorOptions()} width="292px" position="left">
        <div
          className="flex max-w-24 items-center gap-1 rounded-[var(--border-radius-default)] bg-[var(--background)] px-1 py-0.5 text-[var(--base-info-text)] hover:outline hover:outline-[var(--border)]"
          onClick={e => e.stopPropagation()}
        >
          <Text type="small" color="info" truncate>
            {operatorTextObject[selectedOperator]}
          </Text>
          <Icon name="ChevronDown" size={16} />
        </div>
      </JTLDropdown>
      <Text type="small" color="info" truncate>
        {displayValue}
      </Text>
      {/* Show "+N more" badge only for non-date multi-select values */}
      {!isDateType && selectedValue.length > 1 && (
        <Box className="flex items-center gap-1 rounded-[var(--border-radius-default)] bg-[var(--info-border)] px-1 py-0.5 text-[var(--info-text)]">
          <Text type="small" color="info">
            +{Math.max(0, selectedValue.length - 1)}
          </Text>
        </Box>
      )}
      {/* Rotate the chevron 180° when the popover is open to indicate collapse */}
      <Box className="flex items-center text-[var(--info-text)]">
        <Icon name="ChevronDown" size={16} className="transition-transform duration-200 [button[aria-expanded=true]_&]:rotate-180" />
      </Box>
    </div>
  );
};

export default DataTableFilterDisplay;
