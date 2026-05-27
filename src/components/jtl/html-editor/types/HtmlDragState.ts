/**
 * Mutable drag state stored in a ref (no re-renders during resize).
 * Tracks the initial mouse position and image dimensions at drag start.
 * Used for horizontal-only dragging with aspect ratio preservation.
 */
type HtmlDragState = {
  /** Starting mouse X position. */
  startX: number;
  /** Image width when drag started. */
  startWidth: number;
  /** Original aspect ratio (width / height) — maintained during resize. */
  aspectRatio: number;
};

export default HtmlDragState;
