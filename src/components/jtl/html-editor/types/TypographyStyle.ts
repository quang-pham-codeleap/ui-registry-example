/**
 * Defines the allowed typography styles in the HTML editor.
 * These correspond to the options shown in the typography dropdown in the toolbar.
 * The actual mapping of these styles to editor commands and HTML tags is handled elsewhere (e.g. in the menu configuration).
 */
type TypographyStyle = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small';

export default TypographyStyle;
