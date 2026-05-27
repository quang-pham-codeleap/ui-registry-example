import { useState, useCallback } from 'react';
import HtmlEditorMode from '../types/HtmlEditorMode';

/**
 * Manages top-level state for the HTML Editor.
 *
 * Owns the editing mode (visual / code). Additional state slices
 * (activePopover, findReplace, etc.) will be added in later tasks.
 *
 * @param initialMode - Starting mode. Defaults to 'visual'.
 * @returns Reactive mode value and a stable setter.
 */
export default function useHtmlEditorState(initialMode: HtmlEditorMode = 'visual') {
  const [mode, setModeState] = useState<HtmlEditorMode>(initialMode);

  /** Switches the editor between visual and code mode. */
  const setMode = useCallback((newMode: HtmlEditorMode) => {
    setModeState(newMode);
  }, []);

  return { mode, setMode };
}
