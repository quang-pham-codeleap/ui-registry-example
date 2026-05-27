/**
 * Controls the visibility state of a navigation button for a specific step.
 * Used to override the default Back/Next button behavior:
 * - Back button: hidden on the first step by default, visible on all others
 * - Next button: visible on all steps by default, hidden on the last step
 */
type NavigationButtonState = 'visible' | 'disabled' | 'hidden';

export default NavigationButtonState;
