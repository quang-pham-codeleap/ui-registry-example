/**
 * Check if a value is valid for rendering (not undefined, null, or empty string)
 */
const isValidValue = (value: unknown): boolean => {
  return value !== undefined && value !== '';
};

export default isValidValue;
