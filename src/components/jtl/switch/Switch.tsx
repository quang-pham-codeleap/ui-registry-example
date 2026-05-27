import React, { useId } from 'react';
import { SwitchButton } from './SwitchPrimitive';
import { Root } from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';
import ISwitchProps from './ISwitchProps';
import { Label } from '../label';
import { Text } from '../text';
import { Box } from '../box';
import { ErrorMessage } from '../error-message';

/**
 * Switch component with label and description support
 * @param props {@link ISwitchProps} - The props for the Switch component
 * @returns A Switch component
 *
 * @example
 * ```tsx
 * function App() {
 *   const [value, setValue] = useState(true);
 *
 *   return (
 *     <Switch
 *       label="Switch"
 *       description="This is a switch description."
 *       value={value}
 *       onChange={setValue}
 *     />
 *   )
 * }
 * ```
 */
const Switch: React.FC<ISwitchProps & Pick<React.ComponentPropsWithRef<typeof Root>, 'ref'>> = ({
  ref,
  label,
  description,
  value,
  onChange,
  disabled,
  textAlign = 'right',
  errorMessage,
  ...props
}) => {
  const id = `jtl-switch-${useId()}`;

  return (
    <div
      className={cn('relative grid grid-flow-row gap-x-2', label && description && ' grid-cols-2')}
      style={{ gridTemplateColumns: textAlign === 'left' ? '1fr 44px' : '44px 1fr' }}
    >
      <Box className={cn('flex items-center leading-none', textAlign === 'left' && 'order-2')}>
        <SwitchButton value={value} onChange={onChange} disabled={disabled} id={id} {...props} ref={ref} />
      </Box>
      {label && (
        <Box className={cn('flex items-center leading-none', textAlign === 'left' && 'order-1')}>
          <Label
            htmlFor={id}
            className={cn(
              'cursor-pointer',
              'text-[length:var(--typography-base-sizes-small-font-size)]',
              'leading-4',
              'text-medium',
              disabled && 'opacity-70',
            )}
          >
            {label}
          </Label>
        </Box>
      )}
      {label && description && <Box className={cn('empty-cell', textAlign === 'left' && 'order-4')} />}
      {description && (
        <Box className={cn('flex justify-start', textAlign === 'left' && (label ? 'order-3' : 'order-1'))}>
          <Text type="muted" weight="regular">
            {description}
          </Text>
        </Box>
      )}
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

Switch.displayName = 'Switch';

export default Switch;
