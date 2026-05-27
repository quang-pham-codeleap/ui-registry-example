import React from 'react';
import type IBoxProps from './IBoxProps';
import { cn } from '@/lib/utils';

/**
 * A flexible container component that can be rendered as any HTML element
 *
 * @component
 * @example
 * ```tsx
 * <Box as="section" className="custom-class">
 *   <p>Content</p>
 * </Box>
 * ```
 */
const Box: React.FC<IBoxProps & React.RefAttributes<HTMLElement>> = ({ as = 'div', children, id, className, ref, role }) => {
  return React.createElement(
    as,
    {
      id,
      ref,
      className: cn(className),
      role,
    },
    children,
  );
};

Box.displayName = 'Box';

export default Box;
