import { useCallback, useMemo } from 'react';
import { MonacoDragNDropProvider, TDropHandler } from '../provider';

type MonacoEditorInstance = import('monaco-editor').editor.IStandaloneCodeEditor;
type MonacoNamespace = typeof import('monaco-editor');
type MonacoNamespaceWithOptionalEditor = MonacoNamespace & {
  editor: MonacoNamespace['editor'] & {
    getEditors?: () => MonacoEditorInstance[];
  };
};

const getMonacoFromWindow = (): MonacoNamespaceWithOptionalEditor | undefined => {
  return (window as Window & { monaco?: MonacoNamespaceWithOptionalEditor }).monaco;
};

export default function useDragAndDropProvider() {
  const insertTextAtPos = useCallback(
    (instance: MonacoEditorInstance, text: string, coords: [number, number] = [0, 0], placeCursor: boolean = false) => {
      const monaco = getMonacoFromWindow();
      if (!monaco) {
        return;
      }

      const { Range, Selection } = monaco;
      const range = new Range(coords[0], coords[1], coords[0], coords[1]);
      if (placeCursor) {
        const selection = new Selection(coords[0], coords[1], coords[0], coords[1]);
        instance.executeEdits('insert', [{ range, text, forceMoveMarkers: true }], [selection]);
        instance.focus();
      } else {
        instance.executeEdits('insert', [{ range, text, forceMoveMarkers: true }]);
      }
      instance.pushUndoStop();
    },
    [],
  );

  // Handler for drop events
  const handleDrop: TDropHandler = useCallback(
    (e, target, instance) => {
      e.preventDefault();
      e.stopPropagation();

      const text = e.dataTransfer?.getData('text');
      if (text && instance) {
        insertTextAtPos(instance, text, [target.position?.lineNumber ?? 0, target.position?.column ?? 0], true);
      }
    },
    [insertTextAtPos],
  );

  // Instance getter for Monaco
  const getInstance = useCallback(() => {
    const monaco = getMonacoFromWindow();
    const getEditors = monaco?.editor?.getEditors;

    if (getEditors) {
      const editors = getEditors();
      if (editors && editors.length > 0) {
        // Cast to IStandaloneCodeEditor to satisfy type requirements
        return editors[0] as MonacoEditorInstance;
      }
    }

    return null;
  }, []);

  // Memoize drag and drop provider so props are available on first render and do not change unnecessarily
  return useMemo(() => {
    return new MonacoDragNDropProvider(handleDrop, getInstance);
  }, [handleDrop, getInstance]);
}
