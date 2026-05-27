/**
 * Props for the ColorSwatchGrid sub-component.
 * Renders the tab bar (Text / Hintergrund) and the preset color swatch grid.
 */
export default interface IHtmlEditorColorSwatchGridProps {
  /** Currently visible tab: "text" (foreground) or "background". */
  activeTab: 'text' | 'background';

  /** The color currently applied in the editor for the active tab, used to highlight the matching swatch. */
  activeColor?: string;

  /** Ordered list of hex color strings rendered as swatches. */
  palette: string[];

  /** Called when the user switches tabs. Receives the new tab id ("text" | "background"). */
  onTabChange: (tab: string) => void;

  /** Called when the user clicks a swatch. Receives the hex color string (e.g. "#2563eb"). */
  onSwatchClick: (color: string) => void;
}
