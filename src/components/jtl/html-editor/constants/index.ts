import { TypographyVariant } from '../../text/types';
import { MediaAlignmentOption, TextAlignmentOption, TypographyStyle } from '../types';

// Actions whose on/off state is reflected in the toolbar via activeActions.
export const TOGGLEABLE_ACTIONS = ['bold', 'italic', 'underline', 'strikethrough', 'bulletList', 'numberedList'];

/**
 * Default palette of 24 color swatches displayed in the text-color popover.
 * Arranged in 3 rows × 8 columns matching the Figma design:
 *   Row 1 (dark shades):   black, violet-700, indigo-700, blue-700, green-700, yellow-500, orange-600, red-700
 *   Row 2 (medium shades): gray-400, violet-500, indigo-500, sky-500, emerald-500, yellow-300, orange-500, red-500
 *   Row 3 (light shades):  white, violet-300, indigo-300, blue-300, green-300, yellow-200, orange-200, red-200
 * Consumers can override this via the `colorPalette` prop on HtmlEditor.
 */
export const DEFAULT_COLOR_PALETTE: string[] = [
  // Row 1 — dark shades
  '#000000',
  '#6d28d9',
  '#4338ca',
  '#1d4ed8',
  '#15803d',
  '#eab308',
  '#ea580c',
  '#b91c1c',
  // Row 2 — medium shades
  '#9ca3af',
  '#8b5cf6',
  '#6366f1',
  '#397bf8',
  '#10b981',
  '#fde047',
  '#f97316',
  '#ef4444',
  // Row 3 — light shades
  '#ffffff',
  '#c4b5fd',
  '#a5b4fc',
  '#93c5fd',
  '#86efac',
  '#fef08a',
  '#fed7aa',
  '#fecaca',
];

// Typography style values that map to TipTap heading levels.
// Used to derive the currently active style from editor state.
export const HEADING_STYLES = ['h1', 'h2', 'h3', 'h4'] as const;

// TipTap uses different internal names for some marks / nodes.
// Maps toolbar action names → isActive() identifiers.
export const TIPTAP_NAME_MAP: Record<string, string> = {
  strikethrough: 'strike',
  numberedList: 'orderedList',
};

// Only these actions reflect an on/off state via activeActions.
export const STYLE_ACTIONS = ['bold', 'italic', 'underline', 'strikethrough'];
export const LIST_ACTIONS = ['bulletList', 'numberedList'];

/**
 * Selectable font sizes shown in the popover list.
 * Matches the design spec: 8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 90.
 */
export const FONT_SIZES = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 90] as const;

/** Default size shown on the trigger when nothing is selected. */
export const DEFAULT_FONT_SIZE = 14;

/**
 * Alignment options shown in the text-alignment popover.
 * Order matches the Figma design: left, center, right, justify.
 */
export const ALIGNMENT_OPTIONS: TextAlignmentOption[] = [
  { value: 'alignLeft', icon: 'AlignLeft', ariaLabel: 'Links ausrichten' },
  { value: 'alignCenter', icon: 'AlignCenter', ariaLabel: 'Mitte ausrichten' },
  { value: 'alignRight', icon: 'AlignRight', ariaLabel: 'Rechts ausrichten' },
  { value: 'alignJustify', icon: 'AlignJustify', ariaLabel: 'Bündig ausrichten' },
];

/**
 * Available text styles shown in the typography popover.
 * Each entry maps a selectable value to the label displayed
 * and the Text `type` variant that styles that label.
 */
export const TYPOGRAPHY_STYLES: { value: TypographyStyle; label: string; type: TypographyVariant }[] = [
  { value: 'h1', label: 'Heading 1', type: 'h1' },
  { value: 'h2', label: 'Heading 2', type: 'h2' },
  { value: 'h3', label: 'Heading 3', type: 'h3' },
  { value: 'h4', label: 'Heading 4', type: 'h4' },
  { value: 'body', label: 'Paragraph', type: 'body' },
  { value: 'small', label: 'Caption', type: 'small' },
];

/**
 * Default media alignment options shown in the media-alignment popover.
 * Order matches the Figma design: left, center, right.
 */
export const MEDIA_ALIGNMENT_OPTIONS: MediaAlignmentOption[] = [
  { value: 'left', icon: 'AlignLeft', ariaLabel: 'Links ausrichten' },
  { value: 'center', icon: 'AlignCenter', ariaLabel: 'Zentriert ausrichten' },
  { value: 'right', icon: 'AlignRight', ariaLabel: 'Rechts ausrichten' },
];

/**
 * Minimum width (in pixels) that we allow when resizing videos. This is to prevent users from shrinking videos to an unusably small size.
 */
export const MINIMUM_VIDEO_WIDTH = 100;
export const RESIZE_BAR_TIMEOUT = 5000;
export const VIDEO_DEFAULT_WIDTH = 560;
export const VIDEO_DEFAULT_HEIGHT = 315;
