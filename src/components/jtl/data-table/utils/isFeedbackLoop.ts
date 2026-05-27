/**
 * Detects "shrink-wrap" feedback loops.
 * If the outer container's height is exactly the sum of the calculated available
 * height plus its siblings, it means the parent is growing to fit the table
 * rather than constraining it.
 */
export default function isFeedbackLoop(
  outerHeight: number,
  available: number,
  siblingsHeight: number,
  totalGap: number,
  currentAutoHeight: number | undefined,
): boolean {
  if (!currentAutoHeight || available === currentAutoHeight) return false;

  const estimatedOuter = available + siblingsHeight + totalGap;
  return Math.abs(outerHeight - estimatedOuter) < 1;
}
