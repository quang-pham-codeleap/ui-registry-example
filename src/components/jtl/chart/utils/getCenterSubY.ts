/**
 * Helper function to calculate the y position for center subtitle
 * This makes it easier to test the fallback for viewBox.cy
 */
export default function getCenterSubY(cy: number | null | undefined): number {
  return (cy || 0) + 24;
}
