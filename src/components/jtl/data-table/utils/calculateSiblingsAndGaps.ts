/**
 * Calculates the total height occupied by non-table siblings and the gaps between them.
 *
 * @returns Object containing sum of sibling heights and total gap pixels.
 */
export default function calculateSiblingsAndGaps(outerEl: HTMLElement, tableContainerEl: HTMLElement): { siblingsHeight: number; totalGap: number } {
  let siblingsHeight = 0;
  const children = outerEl.children;
  const computedStyle = getComputedStyle(outerEl);
  const gap = parseFloat(computedStyle.rowGap || computedStyle.gap || '0');

  // Find all children that are actually visible (height > 0)
  const visibleChildrenIndices: number[] = [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    if (child.getBoundingClientRect().height > 0) {
      visibleChildrenIndices.push(i);
    }
  }

  // Sum heights of visible children that do NOT contain the table container
  const tableContainerIndex = visibleChildrenIndices.find(idx => children[idx].contains(tableContainerEl));
  visibleChildrenIndices.forEach(idx => {
    if (idx !== tableContainerIndex) {
      siblingsHeight += (children[idx] as HTMLElement).getBoundingClientRect().height;
    }
  });

  // Count gaps only between two adjacent visible children
  let actualGaps = 0;
  for (let i = 0; i < children.length - 1; i++) {
    const current = children[i] as HTMLElement;
    const next = children[i + 1] as HTMLElement;
    if (current.getBoundingClientRect().height > 0 && next.getBoundingClientRect().height > 0) {
      actualGaps++;
    }
  }

  return {
    siblingsHeight,
    totalGap: gap * actualGaps,
  };
}
