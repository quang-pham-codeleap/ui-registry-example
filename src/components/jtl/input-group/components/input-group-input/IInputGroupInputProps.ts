import type { FactoryOpts } from 'imask';
import IInputProps from '../../../input/IInputProps';
import { InputType } from '../../../input/types';

/**
 * Props for the InputGroupInput component
 * Extends the base Input props for consistent behavior within InputGroup
 *
 * This component serves as Slot 3 (The Control) in the InputGroup spatial model.
 * It automatically handles:
 * - Border and focus ring styling based on context
 * - Size adjustments from parent InputGroup
 * - Error and disabled states from context
 */
export default interface IInputGroupInputProps<T extends InputType = InputType> extends Omit<IInputProps<T>, 'size' | 'isError'> {
  /**
   * IMask mask definition. When provided, activates guided input masking.
   * Typically passed via InputGroup context rather than directly.
   * @example "(+49) 000-000-000"
   */
  mask?: FactoryOpts['mask'];
}
