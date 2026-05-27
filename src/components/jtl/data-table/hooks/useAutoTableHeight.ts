import React, { useEffect, useLayoutEffect, useState, useCallback, useRef } from 'react';
import { DEFAULT_TABLE_HEIGHT } from '../constants/tableDefaults';
import { calculateSiblingsAndGaps, hasBoundedHeight, isFeedbackLoop } from '../utils';

/** Fallback ratio of viewport height used when parent is unbounded */
const VIEWPORT_FALLBACK_RATIO = 0.7;

/**
 * Props for the useAutoTableHeight hook
 */
interface UseAutoTableHeightProps {
  /** Ref to the outer DataTable wrapper element */
  outerRef: React.RefObject<HTMLElement | null>;
  /** Ref to the table container (ScrollArea wrapper) — used to identify siblings */
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
  /** Whether auto-height mode is active */
  enabled: boolean;
  /** Minimum height fallback when parent has no bounded height */
  minHeight?: number;
}

/**
 * Measures available vertical space for the DataTable container using ResizeObserver.
 *
 * When `tableHeight="auto"`, the table should fill the available vertical space
 * in its parent container (like AG Grid's normal mode with a flex parent).
 * This hook observes the outer wrapper, calculates sibling heights (title, action bar),
 * and returns an explicit pixel height for the ScrollArea — ensuring virtualization
 * always works correctly.
 *
 * **Important:** The parent container MUST provide a bounded height (explicit height,
 * max-height, or flex layout with constrained parent). Without it, falls back to
 * `window.innerHeight * 0.7` clamped to `minHeight` and emits a dev warning.
 *
 * @returns The computed pixel height for the table container, or `undefined` when disabled
 */
const useAutoTableHeight = ({
  outerRef,
  tableContainerRef,
  enabled,
  minHeight = DEFAULT_TABLE_HEIGHT,
}: UseAutoTableHeightProps): number | undefined => {
  // Lazy initial state — never start with `undefined` when enabled.
  // Provides a safe fallback height on the very first render so the ScrollArea
  // always has a bounded height and virtualization works immediately.
  const [autoHeight, setAutoHeight] = useState<number | undefined>(() => {
    if (!enabled) return undefined;
    if (typeof window === 'undefined') return DEFAULT_TABLE_HEIGHT;
    return Math.max(Math.floor(window.innerHeight * VIEWPORT_FALLBACK_RATIO), minHeight);
  });

  const rafIdRef = useRef<number>(0);

  // Track whether we've already emitted the dev warning to avoid console spam
  const hasWarnedRef = useRef(false);

  // Store autoHeight in a ref for the feedback-loop check so that
  // `computeHeight` does not depend on the `autoHeight` state value.
  const autoHeightRef = useRef(autoHeight);
  autoHeightRef.current = autoHeight;

  /**
   * Compute the available height for the table container by measuring
   * the outer wrapper height and subtracting sibling element heights.
   */
  const computeHeight = useCallback(() => {
    const outerEl = outerRef.current;
    const tableContainerEl = tableContainerRef.current;

    if (!outerEl || !tableContainerEl) return;

    // 1. Boundary Check: Ensure ancestor actually constrains height
    const isBounded = hasBoundedHeight(outerEl.parentElement);
    if (!isBounded) {
      if (import.meta.env.MODE !== 'production' && !hasWarnedRef.current) {
        console.warn(
          '[DataTable] tableHeight="auto" requires a parent element with a bounded height ' +
            '(e.g. h-screen, height: 100vh, max-height, or a flex/grid container with constrained parent). ' +
            `Falling back to ${Math.floor(window.innerHeight * VIEWPORT_FALLBACK_RATIO)}px. ` +
            'For large datasets without a bounded container, use tableHeight={number} instead.',
        );
        hasWarnedRef.current = true;
      }
      setAutoHeight(Math.max(Math.floor(window.innerHeight * VIEWPORT_FALLBACK_RATIO), minHeight));
      return;
    }

    // 2. Measurement & Basic Validation
    const outerHeight = outerEl.getBoundingClientRect().height;

    // Leak detection: If outerHeight exceeds viewport, ancestor bound is too distant
    // to constrain the table. Force fallback to break the feedback loop.
    if (outerHeight > window.innerHeight * 1.1 || outerHeight <= 0) {
      setAutoHeight(Math.max(Math.floor(window.innerHeight * VIEWPORT_FALLBACK_RATIO), minHeight));
      return;
    }

    // 3. Calculate consumed space (siblings + gaps)
    const { siblingsHeight, totalGap } = calculateSiblingsAndGaps(outerEl, tableContainerEl);
    const available = outerHeight - siblingsHeight - totalGap;

    // 4. Feedback Loop Check: Prevent "shrink-wrap" behavior with 'auto' parents
    // Read from ref instead of state to keep this callback stable.
    if (isFeedbackLoop(outerHeight, available, siblingsHeight, totalGap, autoHeightRef.current)) {
      setAutoHeight(Math.max(Math.floor(window.innerHeight * VIEWPORT_FALLBACK_RATIO), minHeight));
      return;
    }

    // 5. Final Result clamped to minHeight
    setAutoHeight(Math.max(available, minHeight));
  }, [outerRef, tableContainerRef, minHeight]);

  // Synchronous initial measurement — runs before the browser paints.
  // This prevents the "flash of all rows" that occurs when autoHeight is
  // a viewport fallback and the real bounded height is smaller.
  useLayoutEffect(() => {
    if (!enabled) return;
    computeHeight();
  }, [enabled, computeHeight]);

  // ResizeObserver for subsequent size changes (window resize, sibling toggle, etc.)
  useEffect(() => {
    if (!enabled) {
      setAutoHeight(undefined);
      return;
    }

    const outerEl = outerRef.current;
    if (!outerEl) return;

    // Debounce resize observations with requestAnimationFrame
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(computeHeight);
    });

    observer.observe(outerEl);

    // Also observe the parent element to detect when it changes height
    if (outerEl.parentElement) {
      observer.observe(outerEl.parentElement);

      // Observe sibling elements so that when a sibling resizes
      // (e.g. filter bar wraps to new line), computeHeight fires.
      // Without this, only outerEl/parent box changes trigger recomputation
      // and sibling-driven layout shifts are missed.
      const siblings = outerEl.parentElement.children;
      for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling !== outerEl) {
          observer.observe(sibling);
        }
      }
    }

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      observer.disconnect();
    };
  }, [enabled, outerRef, computeHeight]);

  return autoHeight;
};

export default useAutoTableHeight;
