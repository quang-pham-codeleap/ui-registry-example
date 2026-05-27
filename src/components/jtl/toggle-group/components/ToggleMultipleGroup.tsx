import { IToggleMultipleGroupProps } from '../interfaces';
import { useMultipleToggleGroup } from '../hooks';
import { ToggleGroup } from '../TogglePrimitive';
import { toggleGroupVariants } from '../types';
import { useCallback } from 'react';

/**
 * ToggleMultiple component for multiple selection toggle groups
 */
const ToggleMultiple = ({ shape = 'default', size = 'default', variant = 'default', children, ...props }: IToggleMultipleGroupProps) => {
  const { defaultValues } = props;

  // Use the multiple toggle hook
  const { activeValues, toggleValue, extractedProps } = useMultipleToggleGroup(props);

  // Handle values change
  const handleValueChange = useCallback(
    (values: string[]) => {
      toggleValue(values);
    },
    [toggleValue],
  );

  return (
    <ToggleGroup
      {...extractedProps}
      className={toggleGroupVariants[shape]}
      value={activeValues}
      defaultValue={defaultValues}
      shape={shape}
      variant={variant}
      size={size}
      onValueChange={handleValueChange}
      type="multiple"
    >
      {children}
    </ToggleGroup>
  );
};

export default ToggleMultiple;
