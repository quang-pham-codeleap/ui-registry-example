import React from 'react';
import { IToggleMultipleGroupProps, IToggleSingleGroupProps } from './interfaces';
import { ToggleSingle, ToggleMultiple } from './components';
import IToggleGroupProps from './IToggleGroupProps';
import { useMemo } from 'react';
import { ErrorMessage } from '../error-message';

/**
 * ToggleGroup component for grouping related toggle buttons
 * Renders either ToggleSingle or ToggleMultiple based on the type prop
 *
 * @param props {@link IToggleGroupProps} - The props for the ToggleGroup component
 * @returns A ToggleGroup component
 *
 * @example
 * ```tsx
 * function App() {
 *   const [value, setValue] = useState('');
 *
 *   return (
 *     <ToggleGroup
 *       label="Toggle Group"
 *       description="This is a toggle group description."
 *       value={value}
 *       onChange={setValue}
 *     >
 *       <ToggleGroupItem value="1">Toggle 1</ToggleGroupItem>
 *       <ToggleGroupItem value="2">Toggle 2</ToggleGroupItem>
 *       <ToggleGroupItem value="3">Toggle 3</ToggleGroupItem>
 *     </ToggleGroup>
 *   );
 * }
 * ```
 */
const ToggleGroup: React.FC<IToggleGroupProps> = props => {
  const { type = 'single', size = 'default', variant = 'default', shape = 'default', errorMessage, ...rest } = props;

  // Memoize the toggle element to prevent unnecessary re-renders
  const toggleElement = useMemo(() => {
    // Render different toggle implementations based on the 'type' prop
    if (type === 'multiple') {
      // For multiple selection mode (like checkboxes)
      const { value: values, onChange: onValuesChange, ...restMultipleProps } = rest as IToggleMultipleGroupProps;

      // Return the multiple selection toggle component
      return <ToggleMultiple value={values} onChange={onValuesChange} {...restMultipleProps} shape={shape} size={size} variant={variant} />;
    }

    // For single selection mode (like radio buttons)
    const { value, onChange, ...restSingleProps } = rest as IToggleSingleGroupProps;

    // Return the single selection toggle component
    return <ToggleSingle value={value} onChange={onChange} {...restSingleProps} shape={shape} size={size} variant={variant} />;
  }, [rest, shape, size, type, variant]);

  return (
    <div className="relative">
      {toggleElement}
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

ToggleGroup.displayName = 'ToggleGroup';

export default ToggleGroup;
