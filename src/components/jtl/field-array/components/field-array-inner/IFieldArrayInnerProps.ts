import { Control, FieldValues, ArrayPath } from 'react-hook-form';
import IFieldArrayProps from '../../IFieldArrayProps';

/**
 * Inner component that calls useFieldArray only when control is guaranteed defined.
 * Separated from FieldArray to comply with React hooks rules — hooks must not be
 * called conditionally, so the undefined-control guard happens in the outer shell.
 */
export default interface IFieldArrayInnerProps<TFieldValues extends FieldValues, TName extends ArrayPath<TFieldValues>> {
  name: TName;
  control: Control<TFieldValues>;
  children: IFieldArrayProps<TFieldValues, TName>['children'];
  defaultValue?: IFieldArrayProps<TFieldValues, TName>['defaultValue'];
  min?: number;
  max?: number;
  disabled?: boolean;
}
