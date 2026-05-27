import { FONT_SIZES } from '../constants';

/**
 * Data payload for the fontSize toolbar action.
 * Used when the user picks a font size from the font-size dropdown.
 */
type SetFontSizeData = {
  /** Numeric font size in pixels (e.g. 14, 18, 24). */
  size: (typeof FONT_SIZES)[number];
};

export default SetFontSizeData;
