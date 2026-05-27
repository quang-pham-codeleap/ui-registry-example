/**
 * Props for the TitleCombobox sub-component.
 * Renders the AppHeader title as a dropdown combobox for selecting between options.
 */
export default interface ITitleComboboxProps {
  /** Currently selected title value */
  title: string;

  /** Available options for the combobox dropdown */
  titleOptions: Array<{ label: string; value: string }>;

  /** Callback when a title option is selected */
  onTitleChange?: (value: string) => void;
}
