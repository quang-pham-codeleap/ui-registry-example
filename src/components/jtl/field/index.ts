export { default as Field } from './Field';
export type { default as IFieldProps } from './IFieldProps';

// Compound sub-components
export { FieldLabel, FieldDescription, FieldControl } from './components';
export type { IFieldLabelProps, IFieldDescriptionProps, IFieldControlProps } from './components';

// Context hook — for advanced users who need direct context access
export { useFieldContext } from './hooks';
export type { IFieldContext } from './context/FieldContext';
