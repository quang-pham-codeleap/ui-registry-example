import { REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
/**
 * Pattern variants
 */
export const patternVariants = {
  onlyChars: REGEXP_ONLY_CHARS,
  onlyDigits: REGEXP_ONLY_DIGITS,
  onlyDigitsAndChars: REGEXP_ONLY_DIGITS_AND_CHARS,
};

/**
 * Available pattern values for the InputOTP component
 */
export const PatternVariants = Object.keys(patternVariants) as PatternVariant[];

/**
 * Type of pattern
 */
type PatternVariant = keyof typeof patternVariants;

export default PatternVariant;
