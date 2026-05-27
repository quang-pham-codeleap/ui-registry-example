import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { DEFAULT_COLOR_PALETTE } from '../constants';
import { ColorTab, HandleToolbarAction } from '../types';

/**
 * Encapsulates all state and interaction logic for the text-color popover.
 *
 * Responsibilities:
 *   - Tab switching (foreground / background).
 *   - Preset swatch selection and hex-code input.
 *   - Native color-picker lifecycle tracking (open / close) so the
 *     Radix popover stays open while the OS panel is visible.
 *   - Firing the correct action string back to the parent via `onAction`.
 *
 * @param onAction          - Callback that routes the action string to TipTap.
 * @param selectedTextColor - Currently active foreground color hex.
 * @param selectedBgColor   - Currently active background color hex.
 * @param colorPalette      - Optional custom palette; falls back to the default 8-swatch set.
 */
export default function useHtmlEditorTextColor(
  onAction: HandleToolbarAction,
  selectedTextColor: string | undefined,
  selectedBgColor: string | undefined,
  colorPalette: string[] | undefined,
) {
  // Resolved palette: consumer-provided colors, or the built-in default.
  const palette = colorPalette ?? DEFAULT_COLOR_PALETTE;

  // -----------------------------------------------------------------------
  // State
  // -----------------------------------------------------------------------

  /** Which tab is currently shown: "text" or "background". */
  const [activeTab, setActiveTab] = useState<ColorTab>('text');

  /** Raw hex string the user is typing (without the leading "#"). */
  const [hexInput, setHexInput] = useState<string>('000000');

  // -----------------------------------------------------------------------
  // Refs
  // -----------------------------------------------------------------------

  /**
   * Ref to the native <input type="color">.
   * Used to attach a native `change` listener — React's synthetic onChange
   * maps to the native `input` event (fires on every colour hover), not on
   * the confirmed pick.
   */
  const colorInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Pending blur-timeout ID. Cancelled if a native `input` event arrives
   * before it fires, proving the color panel is still alive.
   */
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // -----------------------------------------------------------------------
  // Derived values
  // -----------------------------------------------------------------------

  /** The currently active color for whichever tab is selected. */
  const activeColor = activeTab === 'text' ? selectedTextColor : selectedBgColor;

  /** Preview hex with "#" prefix. Shows typed value first, falls back to active color. */
  const previewHex = useMemo(() => {
    return hexInput ? `#${hexInput}` : (activeColor ?? '#000000');
  }, [hexInput, activeColor]);

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------

  /** Switches between Text and Background tabs, resetting the hex input. */
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab as ColorTab);
    // Reset hex input so the preview stays coherent for the new tab.
    setHexInput('');
  }, []);

  /**
   * Applies a preset swatch color and syncs the hex input to match.
   */
  const handleSwatchClick = useCallback(
    (color: string) => {
      // Dispatch typed (action, data) — TypeScript enforces SetColorData shape.
      const action = activeTab === 'text' ? 'textColor' : 'bgColor';
      onAction(action, { color });
      setHexInput(color.replace('#', ''));
    },
    [activeTab, onAction],
  );

  /** Applies the user-typed hex value when the "+" button is clicked. */
  const handleHexApply = useCallback(() => {
    // Guard: only fire if 6 valid hex chars have been typed.
    if (hexInput.length !== 6) return;
    const action = activeTab === 'text' ? 'textColor' : 'bgColor';
    onAction(action, { color: `#${hexInput}` });
  }, [activeTab, hexInput, onAction]);

  /** Resets (removes) the color for the active tab. */
  const handleReset = useCallback(() => {
    const action = activeTab === 'text' ? 'resetTextColor' : 'resetBgColor';
    onAction(action);
    setHexInput('');
  }, [activeTab, onAction]);

  /** Strips non-hex characters and limits to 6 chars as the user types. */
  const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
    setHexInput(value);
  }, []);

  /**
   * Updates the local hex preview in real-time while the native color
   * picker panel is open. No `onAction` call here — the confirmed pick
   * is handled by the native `change` listener in the effect below.
   */
  const handleColorPickerInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value.replace('#', '');
    setHexInput(hex);
  }, []);

  // -----------------------------------------------------------------------
  // Native color-picker lifecycle
  // -----------------------------------------------------------------------
  // `change` — fires once when the user confirms a colour (panel closes).
  //            React's onChange cannot be used here because it maps to `input`.
  // `input`  — fires continuously while the user hovers colours.
  //            Cancels any pending blur timeout — proof the panel is alive.
  // `blur`   — fires when the <input> loses focus.  The native panel steals
  //            focus immediately, so blur arrives *before* the panel is visible
  //            on some browsers.  A short delayed reset lets a following `input`
  //            or `change` event cancel it in time.
  useEffect(() => {
    const input = colorInputRef.current;
    if (!input) return;

    /** Confirmed colour pick — apply and close. */
    const handleNativeChange = () => {
      const hex = input.value.replace('#', '');
      const action = activeTab === 'text' ? 'textColor' : 'bgColor';
      onAction(action, { color: `#${hex}` });

      // Panel is closing — clear any pending blur timeout immediately.
      if (blurTimeoutRef.current !== null) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
    };

    /** Native `input` while the panel is open — cancel pending blur reset. */
    const handleNativeInput = () => {
      if (blurTimeoutRef.current !== null) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
    };

    /**
     * Blur fires when focus leaves the <input>.  Schedule a delayed reset
     * so a subsequent `input`/`change` event can cancel it.
     * 150 ms: long enough for the browser to dispatch the next panel event,
     * short enough to feel instant on dismiss.
     */
    const handleBlur = () => {
      blurTimeoutRef.current = setTimeout(() => {
        blurTimeoutRef.current = null;
      }, 150);
    };

    input.addEventListener('change', handleNativeChange);
    input.addEventListener('input', handleNativeInput);
    input.addEventListener('blur', handleBlur);

    return () => {
      input.removeEventListener('change', handleNativeChange);
      input.removeEventListener('input', handleNativeInput);
      input.removeEventListener('blur', handleBlur);

      // Clean up any pending timeout on unmount / re-attach.
      if (blurTimeoutRef.current !== null) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
    };
  }, [activeTab, onAction]);

  // -----------------------------------------------------------------------
  // Return
  // -----------------------------------------------------------------------

  return {
    activeTab,
    palette,
    activeColor,
    previewHex,
    hexInput,
    colorInputRef,
    handleTabChange,
    handleSwatchClick,
    handleHexApply,
    handleReset,
    handleHexChange,
    handleColorPickerInput,
  };
}
