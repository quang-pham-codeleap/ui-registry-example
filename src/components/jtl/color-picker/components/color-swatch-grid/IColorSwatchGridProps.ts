/**
 * Props for the ColorSwatchGrid sub-component.
 *
 * Renders an 8-column grid of circular color swatches.
 * Each swatch is a 28 × 28 px button containing a 22 × 22 px filled circle.
 * The swatch matching `activeColor` is highlighted with a 2 px ring.
 */
export default interface IColorSwatchGridProps {
  /**
   * The currently selected color string used to highlight the matching swatch.
   * May be a hex color (e.g. "#2563eb") or a CSS color token (e.g. "var(--color-primary)").
   */
  activeColor?: string;

  /**
   * Ordered list of color strings rendered as swatches.
   * Each entry may be a hex color (e.g. "#2563eb") or a CSS color token (e.g. "var(--color-primary)").
   */
  palette: string[];

  /**
   * Called when the user clicks a swatch.
   * Receives the color string exactly as specified in `palette`
   * (e.g. a hex color like "#2563eb" or a CSS color token like "var(--color-primary)").
   */
  onSwatchClick: (color: string) => void;
}
