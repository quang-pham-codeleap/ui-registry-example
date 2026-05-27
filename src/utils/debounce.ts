/**
 * Creates a debounced version of a function that delays its execution until after a specified wait time.
 * @param func The function to debounce.
 * @param wait The number of milliseconds to wait before executing the function.
 * @returns A debounced function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>): void {
    // Clear any existing timeout
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    // Set a new timeout
    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
}
