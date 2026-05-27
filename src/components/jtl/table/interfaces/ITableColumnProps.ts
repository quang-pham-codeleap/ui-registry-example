import React from 'react';
import { PathsToString, GetTypeOfField } from '../types';
import { ColumnAlign, SortOrder } from '../types';
import { EditableConfig } from '../../data-table/types';

/**
 * Interface defining the structure of a table column
 */
type ITableColumnProps<T> = {
  [K in PathsToString<T>]: {
    /**
     * Title content to display in the column header
     */
    title: string;

    /**
     * Unique key for the column
     */
    key: string;

    /**
     * Field name in the data record to display
     */
    dataIndex: K;

    /**
     * Custom render function for cell content
     */
    render?: (value: GetTypeOfField<T, K> | undefined, record: T, index: number) => React.ReactNode | string | number | null | undefined;

    /**
     * Column width in pixels
     */
    width?: number;

    /**
     * Minimum column width in pixels.
     * Column will not shrink below this value.
     */
    minWidth?: number;

    /**
     * Maximum column width in pixels.
     * Column will not expand beyond this value.
     */
    maxWidth?: number;

    /**
     * Additional CSS classes for the column
     */
    className?: string;

    /**
     * Text alignment for the column
     */
    align?: ColumnAlign;

    /**
     * Function for sorting the data, receives 2 parameters (a, b) or boolean
     * Returns a number to determine sort order:
     * - Negative: a comes before b
     * - Positive: a comes after b
     * - Zero: a and b are equal
     */
    sorter?: boolean | ((a: T, b: T) => number);

    /**
     * Default sort order on first render
     */
    defaultSortOrder?: SortOrder;

    /**
     * Whether the column cells are editable and which editor to use.
     * Can be:
     * - boolean: true enables text editing, false disables
     * - EditableConfig: object with editor type and options
     * - function: returns boolean or EditableConfig based on record and rowIndex
     *
     * @example
     * Text input (default)
     * editable: true
     *
     * @example
     * Date picker
     * editable: { type: 'date', dateFormat: 'dd.MM.yyyy' }
     *
     * @example
     * Conditionally editable
     * editable: (record, rowIndex) => record.status !== 'locked'
     *
     * @example
     * Conditional with editor config
     * editable: (record) => record.isDate ? { type: 'date' } : true
     */
    editable?: boolean | EditableConfig | ((record: T, rowIndex: number) => boolean | EditableConfig);
  };
}[PathsToString<T>];

export default ITableColumnProps;
