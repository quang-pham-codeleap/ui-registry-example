import { ToggleGroupMultipleProps } from '@radix-ui/react-toggle-group';
import IToggleBaseGroupProps from './IToggleBaseGroupProps';

export default interface IToggleMultipleGroupProps
  extends Omit<ToggleGroupMultipleProps, 'asChild' | 'value' | 'onValueChange' | 'selectedValues' | 'defaultValue' | 'onChange'>,
    IToggleBaseGroupProps {
  type: 'multiple';
  /**
   * Default active values
   */
  defaultValues?: string[];

  /**
   * Controlled active values
   */
  value?: string[];

  /**
   * Callback when values change
   */
  onChange?(value: string[]): void;
}
