import React from 'react';

/**
 * Type for the icon mapping object
 * This type accommodates both React SVG components and string paths
 */
type CustomIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>> | React.ComponentType<React.SVGProps<SVGSVGElement>> | string;

export default CustomIcon;
