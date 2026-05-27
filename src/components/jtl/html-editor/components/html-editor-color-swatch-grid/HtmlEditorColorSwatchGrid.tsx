import React from 'react';
import { Box } from '../../../box';
import { Tab } from '../../../tab';
import { cn } from '@/lib';
import IHtmlEditorColorSwatchGridProps from './IHtmlEditorColorSwatchGridProps';

/**
 * Tab bar + preset color swatch grid.
 *
 * Renders two tabs ("Text" / "Hintergrund") that let the user toggle between
 * foreground and background color modes, followed by an 8-column grid of
 * circular color swatches (3 rows × 8 columns = 24 colors by default).
 *
 * Each swatch is a 28 × 28 px button containing a 22 × 22 px filled circle,
 * matching the Figma design spec. The swatch matching the currently active
 * editor color is highlighted with a 2 px ring around its circle.
 *
 * White and black swatches include a subtle border so they remain visible
 * against the white popover background.
 */
const HtmlEditorColorSwatchGrid: React.FC<IHtmlEditorColorSwatchGridProps> = ({ activeTab, activeColor, palette, onTabChange, onSwatchClick }) => {
  return (
    <>
      {/* ─── Tab bar: Text / Hintergrund ─── */}
      <Box className="flex border-b border-[var(--border)]">
        <Tab
          tabs={['text', 'background'].map(tab => ({
            id: tab,
            title: tab === 'text' ? 'Text' : 'Hintergrund',
          }))}
          onSelectTab={onTabChange}
          activeTab={activeTab}
        />
      </Box>

      {/* ─── 8 × 3 circular swatch grid ─── */}
      {/* grid-cols-8 gives 8 swatches per row; spacing-1 (4 px) gap matches Figma */}
      <Box className="grid grid-cols-8 gap-1" role="group" aria-label="Farbpalette">
        {palette.map(color => {
          // A swatch is "active" when it matches the color currently applied in the editor.
          const isActive = activeColor?.toLowerCase() === color.toLowerCase();

          // White (#ffffff) and black (#000000) need a border to stay visible
          // against the white popover background.
          const needsBorder = color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#000000';

          return (
            // 28 × 28 px hit-target button — keeps the click area comfortable.
            <button
              key={color}
              type="button"
              onClick={() => onSwatchClick(color)}
              aria-label={`Farbe ${color}`}
              aria-pressed={isActive}
              className={cn(
                'hover:cursor-pointer',
                // Center the inner circle inside the 28 × 28 hit-target container.
                'flex h-7 w-7 items-center justify-center',
                // Active: 2 px ring wraps the container to highlight the circle.
                isActive && 'rounded-full ring-2 ring-[var(--highlight)] ring-offset-1',
                'focus-visible:outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[var(--primary)]',
              )}
            >
              {/* Inner 22 × 22 px filled circle — matches Figma swatch dimensions */}
              <span
                className={cn(
                  'block h-[22px] w-[22px] shrink-0 rounded-full',
                  // Keep white/black swatches visible against the popover background.
                  needsBorder && 'border border-[var(--border)]',
                )}
                style={{ backgroundColor: color }}
              />
            </button>
          );
        })}
      </Box>
    </>
  );
};

HtmlEditorColorSwatchGrid.displayName = 'HtmlEditorColorSwatchGrid';

export default HtmlEditorColorSwatchGrid;
