const PADDING_SPACE = 32;
const ACTION_BUTTON_SPACE = 28;

/**
 * Measure the width of a column based on the header text and cell texts.
 * @param headerText The text of the header.
 * @param cellTexts The texts of the cells in the column.
 * @returns The width of the column.
 */
export default function measureColumnWidth(headerText: string, cellTexts: string[]) {
  try {
    const canvas = new OffscreenCanvas(100, 100);
    const ctx = canvas.getContext('2d');

    // Handle case where canvas context is not available
    if (!ctx) {
      // Fallback: estimate width based on character count
      const allTexts = [headerText, ...cellTexts];
      const maxLength = Math.max(...allTexts.map(t => t.length));
      return maxLength * 8 + 24; // Rough estimate: 8px per character + padding
    }

    ctx.font = '500 16px Inter, sans-serif'; // Match your table font

    const allTexts = [headerText, ...cellTexts];
    const maxWidth = Math.round(Math.max(...allTexts.map(t => ctx.measureText(t).width)));

    return maxWidth + PADDING_SPACE + ACTION_BUTTON_SPACE; // add padding, gap, icon
  } catch {
    // Fallback for test environments where canvas is not implemented
    const allTexts = [headerText, ...cellTexts];
    const maxLength = Math.max(...allTexts.map(t => t.length));
    return maxLength * 8 + 24; // Rough estimate: 8px per character + padding
  }
}
