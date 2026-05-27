import type { IAppHeaderProps } from '../../app-header';

/**
 * Configuration for the card content header (AppHeader) inside a wizard step.
 * Separate from the stepper progress bar's title/description.
 *
 * @example
 * ```tsx
 * contentHeader: {
 *   title: 'Welcome to JTL ERP Cloud',
 *   subtitle: 'Please enter your company data to get started.',
 *   icon: { icon: 'Building2', variant: 'primary', size: 'lg' },
 * }
 * ```
 */
type StepContentHeader = Pick<IAppHeaderProps, 'title' | 'subtitle' | 'icon'>;

export default StepContentHeader;
