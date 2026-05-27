import React from 'react';

/**
 * The 5 ARIA attributes forwarded by form components for Field / FieldControl / FormControl integration.
 * Components that wrap a native input must tunnel these from their outer props down to the actual <input>.
 */
type FieldAriaProps = Pick<React.AriaAttributes, 'aria-invalid' | 'aria-describedby' | 'aria-labelledby' | 'aria-required' | 'aria-label'>;

export default FieldAriaProps;
