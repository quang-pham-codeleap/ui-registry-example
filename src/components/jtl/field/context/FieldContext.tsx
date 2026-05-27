import { createContext } from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';

/**
 * Shape of the FieldContext value shared between Field and its sub-components.
 *
 * Provides RHF state and field metadata to any descendant at any nesting depth.
 * Sub-components (FieldLabel, FieldControl) consume this to auto-inject props
 * without requiring positional child scanning or cloneElement tricks.
 *
 * Form integration is implicit: `field` being defined means RHF is wired.
 * No explicit `isFormIntegrated` flag needed — sub-components check `field` directly.
 */
export interface IFieldContext {
  /**
   * The RHF field name.
   * FieldLabel reads this to auto-inject `htmlFor` (works in both modes).
   */
  name?: string;

  /**
   * The RHF field props (value, onChange, onBlur, ref, name).
   * FieldControl reads this to inject into the wrapped form control.
   * Undefined when Field is used in composition mode (no `name`/`FormProvider`).
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field?: ControllerRenderProps<any, any>;

  /**
   * The RHF field state (invalid, error, isDirty, isTouched).
   * FieldControl reads this to inject `error` into the wrapped form control.
   */
  fieldState?: ControllerFieldState;

  /**
   * Layout orientation of the Field wrapper.
   * - `'vertical'` (default): flex-col stack
   * - `'horizontal'`: CSS grid layout with control + label side by side
   */
  orientation?: 'vertical' | 'horizontal';

  /**
   * When `true`, signals that the Field data is being loaded.
   * `FieldControl` reads this value to render a skeleton placeholder
   * in place of the wrapped form control.
   */
  isLoading?: boolean;
}

/** Default context value — safe to consume outside a Field provider. */
const defaultContext: IFieldContext = {
  name: undefined,
  field: undefined,
  fieldState: undefined,
  orientation: undefined,
  isLoading: undefined,
};

/**
 * FieldContext — shared state between Field and its sub-components.
 *
 * Provided by `<Field>` and consumed by `<FieldLabel>` and `<FieldControl>`.
 * Works at any nesting depth — no positional child scanning required.
 */
const FieldContext = createContext<IFieldContext>(defaultContext);

export default FieldContext;
