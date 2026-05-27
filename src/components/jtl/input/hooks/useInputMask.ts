import { useCallback } from 'react';
import { useIMask } from 'react-imask';
import type { FactoryOpts } from 'imask';
import type React from 'react';

/**
 * Assigns a value to either a callback ref or an object ref.
 */
const setRefValue = <T>(targetRef: React.Ref<T> | undefined, value: T | null): void => {
  if (typeof targetRef === 'function') {
    targetRef(value);
    return;
  }

  if (targetRef) {
    (targetRef as React.RefObject<T | null>).current = value;
  }
};

/**
 * Configuration for the `useInputMask` hook.
 */
interface UseInputMaskOptions {
  /** Mask configuration passed to IMask. */
  mask: FactoryOpts['mask'] | undefined;
  /** Input ref from the consuming component. */
  ref: React.Ref<HTMLInputElement> | undefined;
  /** Optional callback invoked with the accepted masked value. */
  onChange: ((value: string) => void) | undefined;
}

/**
 * Result returned by `useInputMask`.
 */
interface UseInputMaskResult {
  /** Ref callback that merges consumer ref with the internal IMask ref. */
  mergedRef: (node: HTMLInputElement | null) => void;
  /** Indicates whether a mask is currently enabled. */
  isMasked: boolean;
}

/**
 * Creates an input ref callback that conditionally attaches IMask when a mask is provided
 * while always forwarding the input node to the consumer ref.
 */
export default function useInputMask({ mask, ref, onChange }: UseInputMaskOptions): UseInputMaskResult {
  // Always call useIMask (hooks must not be conditional).
  // When no mask, use passthrough regex so IMask is initialized but not attached to DOM.
  const { ref: maskRef } = useIMask({ mask: mask ?? /^[\s\S]*$/ } as FactoryOpts, { onAccept: mask ? (val: string) => onChange?.(val) : undefined });

  const mergedRef = useCallback(
    (node: HTMLInputElement | null) => {
      // Only attach IMask to DOM when mask is defined
      if (mask) {
        setRefValue(maskRef, node);
      }

      setRefValue(ref, node);
    },
    [maskRef, ref, mask],
  );

  return { mergedRef, isMasked: !!mask };
}
