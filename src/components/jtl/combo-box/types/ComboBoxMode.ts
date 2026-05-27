export const ComboBoxSelectMode = {
  SINGLE: 'single',
  MULTI: 'multi',
} as const;

type ComboBoxMode = (typeof ComboBoxSelectMode)[keyof typeof ComboBoxSelectMode];

export default ComboBoxMode;
