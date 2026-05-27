import React, { useMemo } from 'react';
import { convertSvgDataToComponent } from '../utils';
import { ISVGStringComponentProps } from '../interfaces';

/**
 * Component that converts SVG string to React component
 * Uses memoization to prevent unnecessary conversions
 */
const SVGStringComponent: React.FC<ISVGStringComponentProps & React.RefAttributes<SVGSVGElement>> = ({
  ref,
  svgString,
  name,
  commonProps,
  children,
  ...rest
}) => {
  /**
   * Memoize SVG element conversion
   */
  const SVGElement = useMemo(() => {
    try {
      return convertSvgDataToComponent(svgString, name);
    } catch {
      // Cannot convert SVG data, will fallback to img
      return null;
    }
  }, [svgString, name]);

  if (!SVGElement) {
    return <img src={svgString} alt={name} title={name} {...commonProps} />;
  }

  return (
    <SVGElement ref={ref} aria-label={name} role="img" {...commonProps} {...rest}>
      {children}
    </SVGElement>
  );
};

SVGStringComponent.displayName = 'SVGStringComponent';

export default SVGStringComponent;
