const BADGE_WIDTH = 36; // approximate rendered width of the "+N" overflow badge in pixels
const GAP = 4; // gap between items in pixels, mirrors --spacing-1 (0.25rem × 16)

/**
 * Calculates how many tags overflow the container by walking the rendered tag widths.
 *
 * Walks the tag elements left-to-right, accumulating their widths. When the next tag
 * would exceed the available container width (reserving space for the "+N" badge whenever
 * more tags follow), it records the visible count and stops.
 *
 * @param container - The scrollable container holding the tag elements.
 * @param tagEls - The rendered tag DOM elements to measure.
 * @returns The number of tags that don't fit (0 if everything fits).
 */
const calculateTagOverflow = (container: HTMLElement, tagEls: HTMLElement[]): number => {
  if (tagEls.length <= 1) return 0;

  const containerWidth = container.offsetWidth;
  if (containerWidth === 0) return 0;

  const totalTags = tagEls.length;
  let usedWidth = 0;
  let visibleCount = totalTags; // assume all fit

  for (let i = 0; i < totalTags; i++) {
    const tagWidth = tagEls[i].offsetWidth;
    const gapBefore = i > 0 ? GAP : 0;
    const remainingAfterThis = totalTags - (i + 1);
    const reservedForBadge = remainingAfterThis > 0 ? BADGE_WIDTH + GAP : 0;

    if (usedWidth + gapBefore + tagWidth + reservedForBadge > containerWidth) {
      visibleCount = Math.max(1, i); // always show at least 1 tag
      break;
    }
    usedWidth += gapBefore + tagWidth;
  }

  return totalTags - visibleCount;
};

export default calculateTagOverflow;
