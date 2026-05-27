import React from 'react';
import { cn } from '@/lib/utils';
import IGridProps from './IGridProps';

/**
 * Grid component for creating responsive grid layouts
 * @param props {@link IGridProps} - Props for the Grid component
 * @returns The rendered Grid component
 *
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   return (
 *     <Grid>
 *       <GridCell>
 *         Full Width
 *       </GridCell>
 *     </Grid>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Responsive grid
 * function App() {
 *   return (
 *     <Grid columns={{ xs: 4, sm: 6, lg: 12 }}>
 *       <GridCell columnSpan={{ xs: 4, sm: 6, lg: 12 }}>
 *         Full Width
 *       </GridCell>
 *       <GridCell columnSpan={{ xs: 2, sm: 3, lg: 6 }}>
 *         Half Width
 *       </GridCell>
 *       <GridCell columnSpan={{ xs: 2, sm: 3, lg: 6 }}>
 *         Half Width
 *       </GridCell>
 *       <GridCell columnSpan={{ xs: 1, sm: 2, lg: 3 }}>
 *         Quarter
 *       </GridCell>
 *       <GridCell columnSpan={{ xs: 1, sm: 2, lg: 3 }}>
 *         Quarter
 *       </GridCell>
 *       <GridCell columnSpan={{ xs: 1, sm: 2, lg: 3 }}>
 *         Quarter
 *       </GridCell>
 *       <GridCell columnSpan={{ xs: 1, sm: 2, lg: 3 }}>
 *         Quarter
 *       </GridCell>
 *     </Grid>
 *   );
 * }
 * ```
 */
const Grid: React.FC<IGridProps & React.RefAttributes<HTMLDivElement>> = ({ ref, columns, children }) => {
  /**
   * Generate responsive grid column classes
   */
  const gridClasses = {
    'grid-cols-(--grid-xs)': columns?.xs,
    'sm:grid-cols-(--grid-sm)': columns?.sm,
    'md:grid-cols-(--grid-md)': columns?.md,
    'lg:grid-cols-(--grid-lg)': columns?.lg,
    'xl:grid-cols-(--grid-xl)': columns?.xl,
  };

  /**
   * Generate responsive grid column variables
   */
  const gridTemplateColumnsVars = {
    ...(columns?.xs && { '--grid-xs': `repeat(${columns?.xs},minmax(0,1fr))` }),
    ...(columns?.sm && { '--grid-sm': `repeat(${columns?.sm},minmax(0,1fr))` }),
    ...(columns?.md && { '--grid-md': `repeat(${columns?.md},minmax(0,1fr))` }),
    ...(columns?.lg && { '--grid-lg': `repeat(${columns?.lg},minmax(0,1fr))` }),
    ...(columns?.xl && { '--grid-xl': `repeat(${columns?.xl},minmax(0,1fr))` }),
  } as React.CSSProperties;

  return (
    <div ref={ref} style={gridTemplateColumnsVars} className={cn('grid', `gap-6`, gridClasses)}>
      {children}
    </div>
  );
};

/**
 * Grid component for creating responsive grid layouts
 */
Grid.displayName = 'Grid';

export default Grid;
