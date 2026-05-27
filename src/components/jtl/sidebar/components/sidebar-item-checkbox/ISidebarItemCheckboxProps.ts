/**
 * Props interface for the SidebarItemCheckbox component.
 */
export default interface ISidebarItemCheckboxProps {
  /** Controlled checked state */
  checked?: boolean;

  /** Callback when checked state changes */
  onChange?: (checked: boolean) => void;

  /** Additional CSS class name(s) */
  className?: string;
}
