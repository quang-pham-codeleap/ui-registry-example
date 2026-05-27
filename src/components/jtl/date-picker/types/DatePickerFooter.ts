/**
 * Context passed to the DatePicker footer render prop.
 */
type DatePickerFooter = {
  /**
   * Validates the current input, commits the selected date via `onChange`, and closes the dropdown.
   * Use this as the "confirm" action (e.g., "Filtern" button).
   * Mirrors the behaviour of `onApply` in DateRangePicker for a consistent API.
   */
  onApply: () => void;

  /**
   * Clears the current selection by calling `onChange(undefined)`.
   * Depending on the picker, this may also close the dropdown; see the picker docs for details.
   */
  onClear: () => void;
};

export default DatePickerFooter;
