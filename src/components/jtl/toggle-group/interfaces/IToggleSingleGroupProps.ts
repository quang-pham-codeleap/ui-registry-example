import { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';
import IToggleBaseGroupProps from './IToggleBaseGroupProps';

export default interface IToggleSingleGroupProps
  extends Omit<ToggleGroupSingleProps, 'asChild' | 'value' | 'defaultValue' | 'onValueChange' | 'values' | 'onChange'>,
    IToggleBaseGroupProps {
  type: 'single';
  /**
   * Default active value
   */
  defaultValue?: string;

  /**
   * Controlled active value
   */
  value?: string;

  /**
   * Callback when value change
   */
  onChange?(value: string): void;
}
