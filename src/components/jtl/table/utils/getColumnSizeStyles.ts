import React from 'react';
import { ColumnSizeInput } from '../types';

/**
 * Computes inline styles for column width, minWidth, and maxWidth constraints.
 *
 * Uses direct CSS properties (not CSS custom properties) so that
 * `element.style.minWidth` is readable in tests and by the browser.
 *
 * With `table-layout: fixed` + `width: 100%` on the table, the browser uses
 * cell `width` values to allocate column space. Setting `width: maxWidth`
 * means constrained columns get exactly `maxWidth` pixels, and unconstrained
 * columns share the remainder. `max-width` alone is ignored by browsers for
 * column distribution in fixed-layout tables.
 *
 * @param column - Column size properties (width, minWidth, maxWidth)
 * @returns React.CSSProperties with the computed styles
 */
const getColumnSizeStyles = (column: ColumnSizeInput): React.CSSProperties => {
  const style: React.CSSProperties = {};

  if (column.minWidth !== undefined) {
    style.minWidth = `${column.minWidth}px`;
  }

  if (column.width !== undefined && column.maxWidth !== undefined) {
    // Clamp width to maxWidth: in table-layout: fixed the width hint drives
    // space allocation; allowing width > maxWidth wastes adjacent column budget.
    style.width = `${Math.min(column.width, column.maxWidth)}px`;
    style.maxWidth = `${column.maxWidth}px`;
  } else if (column.width !== undefined) {
    // width-only: also set maxWidth so cells cannot grow beyond the declared
    // width (fixes regression from the old CSS-variable approach).
    style.width = `${column.width}px`;
    style.maxWidth = `${column.width}px`;
  } else if (column.maxWidth !== undefined) {
    // maxWidth-only: set width = maxWidth so table-layout: fixed correctly
    // allocates maxWidth pixels for this column.
    style.width = `${column.maxWidth}px`;
    style.maxWidth = `${column.maxWidth}px`;
  }

  return style;
};

export default getColumnSizeStyles;
