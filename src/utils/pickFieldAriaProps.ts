import { FieldAriaProps } from '@/types';

/**
 * Extracts the 5 field-level ARIA attributes from any props object.
 *
 * Use this to forward a11y context injected by Field / FieldControl / FormControl
 * to the underlying <input> (or trigger element) without manually listing each key.
 *
 * @param props - Any object that may contain the 5 aria attributes
 * @returns A {@link FieldAriaProps} object (values may be undefined)
 *
 * @example
 * ```tsx
 * const ariaProps = pickFieldAriaProps(props);
 * return <input {...ariaProps} />;
 * ```
 */
export default function pickFieldAriaProps(props: Partial<FieldAriaProps>): FieldAriaProps {
  return {
    'aria-invalid': props['aria-invalid'],
    'aria-describedby': props['aria-describedby'],
    'aria-labelledby': props['aria-labelledby'],
    'aria-required': props['aria-required'],
    'aria-label': props['aria-label'],
  };
}
