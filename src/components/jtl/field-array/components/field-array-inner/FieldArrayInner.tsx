import { ArrayPath, FieldValues, useFieldArray, FieldArray, FieldArrayMethodProps } from 'react-hook-form';
import IFieldArrayInnerProps from './IFieldArrayInnerProps';
import { useCallback } from 'react';
import { Box } from '../../../box';
import { cn } from '@/lib';

const FieldArrayInner = <TFieldValues extends FieldValues = FieldValues, TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>>({
  name,
  control,
  children,
  defaultValue,
  min,
  max,
  disabled = false,
}: IFieldArrayInnerProps<TFieldValues, TName>) => {
  // useFieldArray is now safe — control is always defined here
  const { fields, append, prepend, remove, swap, move, insert, update, replace } = useFieldArray({
    control,
    name,
  });

  /**
   * Wrap append with max validation.
   * Falls back to `defaultValue` when no value is provided.
   * Forwards RHF `options` (e.g. `shouldFocus`) to the underlying `append` call.
   * @param value - Value to append (optional, uses defaultValue as fallback)
   * @param options - RHF focus options forwarded to `append`
   */
  const handleAppend = useCallback(
    (value?: FieldArray<TFieldValues, TName> | FieldArray<TFieldValues, TName>[], options?: FieldArrayMethodProps) => {
      const data = value ?? defaultValue;
      // Account for batch adds — data can be an array of items
      const addCount = Array.isArray(data) ? data.length : 1;
      if (max && fields.length + addCount > max) {
        console.warn(`Cannot add more than ${max} items to ${String(name)}`);
        return;
      }
      if (data !== undefined) {
        append(data, options);
      }
    },
    [append, defaultValue, fields.length, max, name],
  );

  /**
   * Wrap prepend with max validation.
   * @param value - Value to prepend to array
   */
  const handlePrepend = useCallback(
    (value?: FieldArray<TFieldValues, TName> | FieldArray<TFieldValues, TName>[]) => {
      const data = value ?? defaultValue;
      // Account for batch adds — data can be an array of items
      const addCount = Array.isArray(data) ? data.length : 1;
      if (max && fields.length + addCount > max) {
        console.warn(`Cannot add more than ${max} items to ${String(name)}`);
        return;
      }

      if (data !== undefined) {
        prepend(data);
      }
    },
    [prepend, defaultValue, fields.length, max, name],
  );

  /**
   * Wrap remove with min validation.
   * @param index - Index to remove
   */
  const handleRemove = useCallback(
    (index?: number | number[]) => {
      // Account for batch removes — index can be an array of indices
      const removeCount = Array.isArray(index) ? index.length : 1;
      if (min && fields.length - removeCount < min) {
        console.warn(`Cannot remove below ${min} items from ${String(name)}`);
        return;
      }
      if (index !== undefined) {
        remove(index);
      }
    },
    [remove, fields.length, min, name],
  );

  /**
   * Wrap insert with max validation.
   * Falls back to `defaultValue` when no value is provided.
   * Forwards RHF `options` (e.g. `shouldFocus`) to the underlying `insert` call.
   * @param index - Index to insert at
   * @param value - Value to insert (optional, uses defaultValue as fallback)
   * @param options - RHF focus options forwarded to `insert`
   */
  const handleInsert = useCallback(
    (index: number, value?: FieldArray<TFieldValues, TName> | FieldArray<TFieldValues, TName>[], options?: FieldArrayMethodProps) => {
      const data = value ?? defaultValue;
      // Account for batch inserts — data can be an array of items
      const addCount = Array.isArray(data) ? data.length : 1;
      if (max && fields.length + addCount > max) {
        console.warn(`Cannot add more than ${max} items to ${String(name)}`);
        return;
      }

      if (data !== undefined) {
        insert(index, data, options);
      }
    },
    [insert, defaultValue, fields.length, max, name],
  );

  return (
    <Box className={cn('flex flex-col gap-4', disabled && 'pointer-events-none opacity-50')}>
      {/* Render children with field array utilities */}
      {children({
        fields,
        append: handleAppend,
        prepend: handlePrepend,
        remove: handleRemove,
        swap,
        move,
        insert: handleInsert,
        update,
        replace,
      })}
    </Box>
  );
};

export default FieldArrayInner;
