import React from 'react';
import IColorSwatchGridProps from './IColorSwatchGridProps';
import ColorSwatch from '../color-swatch/ColorSwatch';

/**
 * 8-column circular color swatch grid.
 *
 * Renders an 8-column grid of circular color swatches (3 rows × 8 columns = 24 colors by default).
 * The swatch matching `activeColor` is highlighted with a 2 px ring.
 *
 * A native `<div>` is used for the group container (instead of Box) so that
 * `role` and `aria-label` are forwarded to the DOM — Box does not forward aria-* attributes.
 */
const ColorSwatchGrid: React.FC<IColorSwatchGridProps> = ({ activeColor, palette, onSwatchClick }) => {
  return (
    // grid-cols-8 gives 8 swatches per row; gap matches Figma spec.
    <div className="grid grid-cols-8 gap-1" role="group" aria-label="Farbpalette">
      {palette.map((color, index) => (
        <ColorSwatch
          key={`${color}-${index}`}
          color={color}
          isActive={activeColor?.toLowerCase() === color.toLowerCase()}
          onSwatchClick={onSwatchClick}
        />
      ))}
    </div>
  );
};

ColorSwatchGrid.displayName = 'ColorSwatchGrid';

export default ColorSwatchGrid;
