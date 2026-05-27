import React from 'react';
import { kebabToCamelCase } from '@/utils';

/**
 * Convert SVG data URI to React component
 * @param svgDataUri
 * @returns
 */

export default function convertSvgDataToComponent(svgDataUri: string, name: string): React.FC<React.SVGProps<SVGSVGElement>> {
  // Parse SVG string into DOM

  const svgContent = decodeURIComponent(svgDataUri.replace('data:image/svg+xml,', ''));

  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgElement = svgDoc.querySelector('svg');

  if (!svgElement) {
    throw new Error('Invalid SVG element');
  }

  /** Get all attributes of svgElement */
  const svgAttributes: { [key: string]: string } = {};
  for (const attr of svgElement.attributes) {
    // Convert kebab-case attribute names to camelCase for React props
    svgAttributes[kebabToCamelCase(attr.name)] = attr.value;
  }

  /**
   * Return a React component directly from SVG DOM, without adding <svg> element
   */
  return (props: React.SVGProps<SVGSVGElement>) => {
    /**
     * Combine SVG attributes with props
     */
    const combinedProps = {
      ...svgAttributes,
      ...props,
    };

    /**
     * Create React element from SVG DOM
     */
    return React.createElement(
      'svg',
      combinedProps,
      React.createElement('title', {}, name),
      ...Array.from(svgElement.childNodes)
        .map(child => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            const element = child as Element;
            const childAttributes: { [key: string]: string } = {};
            for (const attr of element.attributes) {
              childAttributes[kebabToCamelCase(attr.name)] = attr.value;
            }
            return React.createElement(
              element.tagName.toLowerCase(),
              childAttributes,
              ...Array.from(element.childNodes)
                .map(nestedChild => {
                  if (nestedChild.nodeType === Node.ELEMENT_NODE) {
                    const nestedElement = nestedChild as Element;
                    const nestedAttributes: { [key: string]: string } = {};
                    for (const attr of nestedElement.attributes) {
                      nestedAttributes[kebabToCamelCase(attr.name)] = attr.value;
                    }
                    return React.createElement(nestedElement.tagName.toLowerCase(), nestedAttributes);
                  }
                  return null;
                })
                .filter(Boolean),
            );
          }
          return null;
        })
        .filter(Boolean),
    );
  };
}
