/**
 * Option shape that react-day-picker passes to its Dropdown component.
 * Each option represents a selectable month or year.
 */
type DropdownOption = {
  value: number | string;
  label: string;
  disabled?: boolean;
};

export default DropdownOption;
