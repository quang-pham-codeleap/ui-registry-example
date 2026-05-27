import { IButtonProps } from '../../button';

/**
 * Partial button configuration for the Back and Next navigation buttons.
 * `onClick` is intentionally omitted — StepperLayout manages it internally.
 */
type StepperButtonConfig = Pick<IButtonProps, 'label' | 'icon' | 'iconPosition' | 'variant' | 'disabled' | 'isLoading'>;

export default StepperButtonConfig;
