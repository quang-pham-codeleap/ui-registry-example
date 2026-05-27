import React from 'react';
import IGridCellProps from './IGridCellProps';
import { cn } from '@/lib/utils';

/**
 * GridCell component for defining column spans within a Grid
 * @param props {@link IGridCellProps} - Props for the GridCell component
 * @returns GridCell component
 *
 * @example
 * <GridCell columnSpan={{ xs: 1, lg: 3 }}>
 *   <div>Content</div>
 * </GridCell>
 */
const GridCell: React.FC<IGridCellProps & React.RefAttributes<HTMLDivElement>> = ({ ref, columnSpan, children }) => {
  /**
   * Generate responsive column span classes
   */
  const spanClasses = {
    'col-span-(--grid-cell-xs)': columnSpan?.xs,
    'sm:col-span-(--grid-cell-sm)': columnSpan?.sm,
    'md:col-span-(--grid-cell-md)': columnSpan?.md,
    'lg:col-span-(--grid-cell-lg)': columnSpan?.lg,
    'xl:col-span-(--grid-cell-xl)': columnSpan?.xl,
  };

  /**
   * Generate responsive column span variables
   */
  const gridCellColSpanVars = {
    ...(columnSpan?.xs && { '--grid-cell-xs': columnSpan?.xs }),
    ...(columnSpan?.sm && { '--grid-cell-sm': columnSpan?.sm }),
    ...(columnSpan?.md && { '--grid-cell-md': columnSpan?.md }),
    ...(columnSpan?.lg && { '--grid-cell-lg': columnSpan?.lg }),
    ...(columnSpan?.xl && { '--grid-cell-xl': columnSpan?.xl }),
  } as React.CSSProperties;

  return (
    <div ref={ref} style={gridCellColSpanVars} className={cn(spanClasses)}>
      {children}
    </div>
  );
};

/**
 * GridCell component for defining column spans within a Grid
 */
GridCell.displayName = 'GridCell';

export default GridCell;
