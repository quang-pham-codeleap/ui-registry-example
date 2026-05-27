export const FilterInputMode = {
  CUSTOM_VALUE: 'customValue',
  MULTI: 'multi',
} as const;

export type FilterInputMode = (typeof FilterInputMode)[keyof typeof FilterInputMode];
