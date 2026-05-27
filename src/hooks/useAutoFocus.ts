import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle auto-focusing an input element when a condition is met
 * Useful for focusing search inputs when dialogs or popovers open
 *
 * @param shouldFocus Condition that determines when to focus the input
 * @param delayMs Optional delay in milliseconds before focusing
 * @returns Ref to attach to the input element
 */
export default function useAutoFocus(shouldFocus: boolean, delayMs = 50) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Only set up the timer if shouldFocus is true
    if (shouldFocus) {
      timer = setTimeout(() => {
        // Make sure the ref is still valid when the timeout fires
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, delayMs);
    }

    // Cleanup function to clear the timer
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [shouldFocus, delayMs]);

  return inputRef;
}
