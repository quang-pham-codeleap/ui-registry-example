import React from 'react';
import DatePickerFooter from './DatePickerFooter';

/**
 * Base props shared by all DatePicker variants
 */
type DatePickerBase = {
  /**
   * Placeholder text for the trigger button
   * @default Datum auswählen
   */
  placeholder?: string;

  /**
   * If true, disables the date picker
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Custom ID for the trigger element
   */
  id?: string;

  /**
   * Function to disable specific dates
   */
  disableDate?: (date: Date) => boolean;

  /**
   * Date format pattern for display and input
   * Uses date-fns format tokens
   * @default dd / MM /yyyy
   * @example "yyyy/MM/dd" - displays as 2025/11/27
   * @example "MM-dd-yyyy" - displays as 11-27-2025
   * @see https://date-fns.org/docs/format
   */
  format?: string;

  /**
   * Optional content rendered above the calendar inside the dropdown.
   * Use this header to inject custom UI elements such as quick-select buttons
   * or info text without modifying the core component logic.
   * @example <Button>Today</Button>
   */
  header?: React.ReactNode;

  /**
   * Whether to show an inline date input field inside the dropdown.
   * When enabled, users can type a date directly — the calendar highlights
   * the date as a valid value is entered.
   * Keyboard: Enter to confirm, Escape to close.
   * @default false
   */
  hasInput?: boolean;

  /**
   * Custom content for the trigger element. If not provided, a default input field will be used.
   * This allows you to use any React node (e.g., a button or custom input) as the trigger for the date picker.
   * @example <Button label="Choose Date" icon="Calendar" />
   */
  triggerContent?: React.ReactNode;

  /**
   * Controlled open state for the dropdown.
   * Use with `onOpenChange` to take full control of when the dropdown opens and closes.
   */
  isOpen?: boolean;

  /**
   * Callback fired when the dropdown open state changes.
   * Use this to sync external state with the internal open state.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Custom footer content below the calendar.
   * Accepts either a static ReactNode or a render prop receiving `{ onApply, onClear }`.
   *
   * Use the render prop form when you need to commit the staged selection from a custom footer.
   * `onApply` fires `onChange` with the current selection and closes the dropdown.
   * `onClear` fires `onChange(undefined)` without closing.
   *
   * When omitted, the built-in footer (Löschen / Anwenden) is shown.
   *
   * @example Static node
   * footer={<Box>Custom content</Box>}
   *
   * @example Render prop with callbacks
   * footer={({ onApply, onClear }) => (
   *   <Box className="flex gap-4">
   *     <Button label="Aufheben" onClick={() => { onClear(); onOpenChange(false); }} />
   *     <Button label="Filtern" onClick={onApply} />
   *   </Box>
   * )}
   */
  footer?: React.ReactNode | ((ctx: DatePickerFooter) => React.ReactNode);

  /**
   * Layout of the calendar header.
   * - `'dropdown'`: Shows interactive dropdowns to jump directly to any month/year (default)
   * - `'label'`: Shows a plain text "Month Year" label with prev/next navigation only
   *
   * Use `'label'` if you want to avoid the implicit year-range restriction that comes
   * with `'dropdown'` mode, or if you do not need fast year navigation.
   * @default 'dropdown'
   */
  captionLayout?: 'label' | 'dropdown';

  /**
   * Earliest year shown in the calendar year dropdown (captionLayout="dropdown").
   * @default currentYear - 100
   */
  fromYear?: number;

  /**
   * Latest year shown in the calendar year dropdown (captionLayout="dropdown").
   * @default currentYear + 10
   */
  toYear?: number;

  /**
   * Size of the date picker input, affecting spacing and font size.
   * @default 'default'
   */
  size?: 'sm' | 'default';
};

export default DatePickerBase;
