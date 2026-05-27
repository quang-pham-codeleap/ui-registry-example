import React from 'react';

/**
 * Props for SVGStringComponent
 */
export default interface ISVGStringComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * SVG string data
   */
  svgString: string;
  /**
   * Icon name for fallback and accessibility
   */
  name: string;
  /**
   * Common props for both SVG and img
   */
  commonProps: {
    width: number;
    height: number;
    className: string;
  };
}
