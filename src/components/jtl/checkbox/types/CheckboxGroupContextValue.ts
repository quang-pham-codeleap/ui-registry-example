/**
 * Context interface for CheckboxGroup
 * Provides shared state and handlers for child Checkbox components
 */
type CheckboxGroupContextValue = {
  /**
   * Current selected values array
   */
  value: (string | null)[];

  /**
   * Whether the group is disabled
   */
  disabled: boolean;

  /**
   * Handler to toggle a checkbox value
   */
  toggleValue: (checkboxValue: string | null, checked: boolean) => void;

  /**
   * Check if a specific value is selected
   */
  isSelected: (checkboxValue: string | null) => boolean;
};

export default CheckboxGroupContextValue;
