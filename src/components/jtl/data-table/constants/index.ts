import { DropdownItem, IJTLDropdownMenuItemProps } from '../../jtl-dropdown';
import { ColumnAction } from '../types';
import { ColumnActionEnum } from '../enums';
import { FilterConditionOperator } from '../deprecated/advanced-filter/types';

/**
 * Column actions for DataTable
 */
const columnActions: (IJTLDropdownMenuItemProps & { action?: ColumnAction })[] = [
  {
    type: DropdownItem.Default,
    label: 'Sort Ascending',
    icon: 'ArrowDownAZ',
    action: ColumnActionEnum.SortAsc,
  },
  {
    type: DropdownItem.Default,
    label: 'Sort Descending',
    icon: 'ArrowDownZA',
    action: ColumnActionEnum.SortDes,
  },
  {
    type: DropdownItem.Default,
    label: 'Filter this Column',
    icon: 'Filter',
    action: ColumnActionEnum.Filter,
  },
  {
    type: DropdownItem.Separator,
  },
  {
    type: DropdownItem.Default,
    label: 'Pin to Left',
    icon: 'Pin',
    action: ColumnActionEnum.PinLeft,
  },
  {
    type: DropdownItem.Default,
    label: 'Pin to Right',
    icon: 'Pin',
    action: ColumnActionEnum.PinRight,
  },
  {
    type: DropdownItem.Default,
    label: 'Rename Column',
    icon: 'Edit3',
    action: ColumnActionEnum.Rename,
  },
  {
    type: DropdownItem.Default,
    label: 'Hide Column',
    icon: 'EyeOff',
    action: ColumnActionEnum.Hide,
  },
  {
    type: DropdownItem.Default,
    label: 'Change Column Color',
    icon: 'PaintBucket',
    action: ColumnActionEnum.SetColor,
  },
  {
    type: DropdownItem.Separator,
  },
  {
    type: DropdownItem.Default,
    label: 'Auto-Resize Column',
    icon: 'MoveHorizontal',
    action: ColumnActionEnum.AutoResize,
  },
  {
    type: DropdownItem.Default,
    label: 'Auto-Resize All Columns',
    icon: 'StretchVertical',
    action: ColumnActionEnum.AutoResizeAll,
  },
];

/**
 * Operators supported by STRING type (GraphQL StringOperationFilterInput)
 */
const STRING_OPERATORS: FilterConditionOperator[] = [
  FilterConditionOperator.Equals,
  FilterConditionOperator.NotEquals,
  FilterConditionOperator.Contains,
  FilterConditionOperator.StartsWith,
  FilterConditionOperator.EndsWith,
  FilterConditionOperator.In,
];

/**
 * Operators supported by NUMBER type (GraphQL Comparable*OperationFilterInput).
 * DATE columns use DATE_OPERATORS instead.
 */
const COMPARABLE_OPERATORS: FilterConditionOperator[] = [
  FilterConditionOperator.Equals,
  FilterConditionOperator.NotEquals,
  FilterConditionOperator.GreaterThan,
  FilterConditionOperator.GreaterThanOrEqual,
  FilterConditionOperator.LessThan,
  FilterConditionOperator.LessThanOrEqual,
  FilterConditionOperator.In,
];

/**
 * Operators supported by BOOLEAN type (GraphQL BooleanOperationFilterInput)
 */
const BOOLEAN_OPERATORS: FilterConditionOperator[] = [FilterConditionOperator.Equals, FilterConditionOperator.NotEquals];

/**
 * Operators supported by DATE type in the UI.
 * Single-date pickers use "Equals".
 * Date-range pickers use "In" (interpreted as "is within range").
 * Text-based operators (startsWith, endsWith, contains) are intentionally excluded.
 */
const DATE_OPERATORS: FilterConditionOperator[] = [FilterConditionOperator.Equals, FilterConditionOperator.In];

/** Display format for date values in the filter chip */
const DEFAULT_DATE_DISPLAY_FORMAT = 'dd.MM.yyyy';

/**
 * Label overrides for DATE filter operators.
 * The global operatorTextObject uses "ist einer" for FilterConditionOperator.In,
 * but in date filter context this operator means "within range" → "innerhalb".
 * This override is scoped to date filters only to preserve the global label for other filter types.
 */
const DATE_OPERATOR_TEXT_OVERRIDES: Partial<Record<FilterConditionOperator, string>> = {
  [FilterConditionOperator.In]: 'innerhalb',
};

export {
  columnActions,
  STRING_OPERATORS,
  COMPARABLE_OPERATORS,
  BOOLEAN_OPERATORS,
  DATE_OPERATORS,
  DEFAULT_DATE_DISPLAY_FORMAT,
  DATE_OPERATOR_TEXT_OVERRIDES,
};
