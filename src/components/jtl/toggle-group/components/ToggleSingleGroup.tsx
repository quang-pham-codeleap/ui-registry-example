import { IToggleSingleGroupProps } from '../interfaces';
import { useSingleToggleGroup } from '../hooks';
import { ToggleGroup } from '../TogglePrimitive';
import { toggleGroupVariants } from '../types';
import { useCallback } from 'react';

/**
 * ToggleSingle component for single selection toggle groups
 */
const ToggleSingle = ({ shape = 'default', size = 'default', variant = 'default', children, ...props }: IToggleSingleGroupProps) => {
  const { defaultValue } = props;

  // Use the single toggle hook
  const { activeValue, toggleValue, extractedProps } = useSingleToggleGroup(props);

  // Handle value change
  const handleValueChange = useCallback(
    (value: string) => {
      toggleValue(value);
    },
    [toggleValue],
  );

  return (
    <ToggleGroup
      {...extractedProps}
      className={toggleGroupVariants[shape]}
      value={activeValue || ''}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      shape={shape}
      variant={variant}
      size={size}
      type="single"
    >
      {children}
    </ToggleGroup>
  );
};

export default ToggleSingle;
