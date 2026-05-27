import React from 'react';
import {
  Control,
  FieldValues,
  FieldArray as FieldArrayValue,
  ArrayPath,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayPrepend,
  UseFieldArraySwap,
  UseFieldArrayMove,
  UseFieldArrayInsert,
  UseFieldArrayUpdate,
  UseFieldArrayReplace,
} from 'react-hook-form';

/**
 * Helper type for FieldArray render props.
 * Ensures proper type inference for generic field types.
 */
type FieldArrayRenderProps<TFieldValues extends FieldValues = FieldValues, TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>> = {
  /** Array of field items with unique IDs */
  fields: FieldArrayWithId<TFieldValues, TName, 'id'>[];
  /** Add item to end of array */
  append: UseFieldArrayAppend<TFieldValues, TName>;
  /** Add item to beginning of array */
  prepend: UseFieldArrayPrepend<TFieldValues, TName>;
  /** Remove item at index */
  remove: UseFieldArrayRemove;
  /** Swap two items */
  swap: UseFieldArraySwap;
  /** Move item to new position */
  move: UseFieldArrayMove;
  /** Insert item at index */
  insert: UseFieldArrayInsert<TFieldValues, TName>;
  /** Update item at index */
  update: UseFieldArrayUpdate<TFieldValues, TName>;
  /** Replace entire array */
  replace: UseFieldArrayReplace<TFieldValues, TName>;
};

/**
 * Props interface for FieldArray component.
 * Manages dynamic field lists with add/remove/reorder operations.
 *
 * **Usage Modes:**
 * 1. **Inside Form (Recommended)**: Only provide `name`, control is obtained from FormProvider context
 * 2. **Outside Form**: Provide both `name` and `control`
 */
export default interface IFieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends ArrayPath<TFieldValues> = ArrayPath<TFieldValues>,
> {
  /**
   * Field array name (path to array in form data).
   * Required for identifying the array field in the form.
   */
  name: TName;

  /**
   * React Hook Form control object.
   *
   * **Optional when inside Form**: Control is automatically obtained from useFormContext()
   * **Required when outside Form**: Must be provided explicitly for react-hook-form integration
   */
  control?: Control<TFieldValues>;

  /**
   * Render function with field array utilities.
   * Provides access to fields array and manipulation methods.
   */
  children: (props: FieldArrayRenderProps<TFieldValues, TName>) => React.ReactNode;

  /**
   * Default value for new items when using append/prepend.
   */
  defaultValue?: FieldArrayValue<TFieldValues, TName>;

  /**
   * Minimum number of items (validation).
   * Prevents removal below this count.
   */
  min?: number;

  /**
   * Maximum number of items (validation).
   * Prevents addition beyond this count.
   */
  max?: number;

  /**
   * Disable all array operations.
   * @default false
   */
  disabled?: boolean;
}
