import React from 'react';
import type { FactoryOpts } from 'imask';
import IInputProps from '../input/IInputProps';

/**
 * Input props that are passed through to InputGroupInput
 * Excludes 'size' and 'isError' as they are handled by InputGroup's own props
 */
type InputGroupInputProps = Omit<IInputProps, 'size' | 'isError'>;

/**
 * Props for the InputGroup component
 * The root container that manages visual state and layout for input groups
 * Extends base input props to allow handling InputGroup like a regular input
 */
export default interface IInputGroupProps extends React.PropsWithChildren, InputGroupInputProps {
  /**
   * Size of the input group
   * @default 'default'
   */
  size?: 'default' | 'sm';

  /**
   * Whether the input group should display a read-only state.
   * When true, the group becomes non-interactive.
   * If `disabled` is also true, `disabled` takes precedence.
   */
  readOnly?: boolean;

  /**
   * Whether the input group is in an error state. Renders an error ring.
   */
  isError?: boolean;

  /**
   * IMask mask definition passed to InputGroupInput.
   *
   * When a mask is provided, InputGroupInput switches to IMask-managed behavior:
   * - `maxLength` is ignored (mask controls input length)
   * - controlled `value` is not forwarded as a native input prop
   * - value updates are emitted via IMask accept events
   *
   * Prefer uncontrolled usage for masked inputs.
   * @example "(+49) 000-000-000"
   */
  mask?: FactoryOpts['mask'];
}
