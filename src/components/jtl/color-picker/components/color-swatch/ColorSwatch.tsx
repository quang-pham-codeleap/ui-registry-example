import { cn } from '@/lib';
import React, { useCallback } from 'react';
import IColorSwatchProps from './IColorSwatchProps';

/**
 * Single circular color swatch button.
 *
 * A 28 × 28 px hit-target button containing a 22 × 22 px filled circle.
 * Active state is indicated by a 2 px highlight ring. White and black swatches
 * include a subtle border so they remain visible against a light background.
 */
const ColorSwatch: React.FC<IColorSwatchProps> = ({ color, isActive, onSwatchClick }) => {
  // Wrap in useCallback to avoid recreating the handler on each render.
  const handleClick = useCallback(() => onSwatchClick(color), [color, onSwatchClick]);

  // White and black swatches need a border to stay visible against the background.
  // Matches both literal hex values (custom palettes) and the CSS variable tokens
  // used in the default palette.
  const needsBorder =
    color.toLowerCase() === '#ffffff' ||
    color.toLowerCase() === '#000000' ||
    color === 'var(--tailwind-colors-base-white)' ||
    color === 'var(--tailwind-colors-base-black)';

  return (
    // 28 × 28 px hit-target keeps the click area comfortable.
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Farbe ${color}`}
      aria-pressed={isActive}
      className={cn(
        'hover:cursor-pointer',
        // Center the inner circle inside the 28 × 28 hit-target container.
        'flex h-fit w-fit items-center justify-center',
        // Active: 2 px ring wraps the container to highlight the circle.
        isActive && 'rounded-full ring-1 ring-[var(--highlight)] ring-offset-1',
        'focus-visible:outline-none focus-visible:rounded-full focus-visible:ring-[1px] focus-visible:ring-[var(--highlight)] focus-visible:ring-offset-[1px]',
      )}
    >
      {/* Inner 22 × 22 px filled circle — matches Figma swatch dimensions */}
      <span
        className={cn(
          'block h-[22px] w-[22px] shrink-0 rounded-full',
          // Keep white/black swatches visible against the background.
          needsBorder && 'border border-[var(--border)]',
        )}
        style={{ backgroundColor: color }}
      />
    </button>
  );
};

ColorSwatch.displayName = 'ColorSwatch';

export default ColorSwatch;
